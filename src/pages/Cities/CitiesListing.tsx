import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Icon,
  IconButton,
  LinearProgress,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from "@mui/material";

import { ListingTools } from "../../shared/components";
import { BaseLayout } from "../../shared/layouts";
import { useDebounce } from "../../shared/hooks";
import {
  ICities,
  CitiesService,
} from "../../shared/services/api/cities/CitiesService";
import { Environment } from "../../shared/environment";
import { TextsProvider } from "../../translation/cities-listing";

export const CitiesListing = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce();
  const navigate = useNavigate();
  const texts = TextsProvider.get();

  const [rows, setRows] = useState<ICities[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const search = useMemo(() => {
    return searchParams.get("search") ?? "";
  }, [searchParams]);

  const page = useMemo(() => {
    return Number(searchParams.get("page") ?? "1");
  }, [searchParams]);

  useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      void CitiesService.getAll(page, search).then(result => {
        setIsLoading(false);

        if (result instanceof Error) {
          alert(result.message);
        } else {
          setTotalCount(result.totalCount);
          setRows(result.data);
        }
      });
    });
  }, [search, page]);

  const handleDelete = (id: number) => {
    if (confirm("Realmente deseja apagar?")) {
      void CitiesService.deleteById(id).then(result => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          alert("Registro apagado com sucesso!");
          setRows(oldRows => [...oldRows.filter(oldRow => oldRow.id !== id)]);
        }
      });
    }
  };

  return (
    <BaseLayout
      title={texts.CITIES_LISTING_TITLE_TEXT}
      ToolsBar={
        <ListingTools
          showSearchInput
          onChangeSearchText={text =>
            setSearchParams({ search: text, page: "1" }, { replace: true })
          }
          onClickNew={() => navigate("/cities/detail/new")}
        />
      }
    >
      <TableContainer
        component={Paper}
        variant="outlined"
        sx={{ m: "0.5rem", width: "auto" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{texts.ACTIONS}</TableCell>
              <TableCell>{texts.CITY_NAME}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => {
              return (
                <TableRow key={row.id}>
                  <TableCell>
                    <IconButton
                      size="small"
                      sx={{ padding: "0", marginRight: "0.8rem" }}
                      onClick={() => handleDelete(row.id)}
                    >
                      <Icon>delete</Icon>
                    </IconButton>
                    <IconButton
                      size="small"
                      sx={{ padding: "0" }}
                      onClick={() => navigate(`/cities/detail/${row.id}`)}
                    >
                      <Icon>edit</Icon>
                    </IconButton>
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>

          {totalCount === 0 && !isLoading && (
            <caption>{Environment.EMPITY_LISTING}</caption>
          )}

          <TableFooter>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={3}>
                  <LinearProgress variant="indeterminate" />
                </TableCell>
              </TableRow>
            )}

            {totalCount > 0 && totalCount > Environment.LINES_LIMIT && (
              <TableRow>
                <TableCell colSpan={3}>
                  <Pagination
                    size="small"
                    page={page}
                    count={Math.ceil(totalCount / Environment.LINES_LIMIT)}
                    onChange={(_, newPage) =>
                      setSearchParams(
                        { search, page: newPage.toString() },
                        { replace: true }
                      )
                    }
                  />
                </TableCell>
              </TableRow>
            )}
          </TableFooter>
        </Table>
      </TableContainer>
    </BaseLayout>
  );
};
