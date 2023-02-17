import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  LinearProgress,
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
  IPeopleListing,
  PeopleService,
} from "../../shared/services/api/people/PeopleServices";
import { Environment } from "../../shared/environment";

export const PeopleListing = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce();

  const [rows, setRows] = useState<IPeopleListing[]>([]);
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
      void PeopleService.getAll(page, search).then(result => {
        setIsLoading(false);

        if (result instanceof Error) {
          alert(result.message);
        } else {
          console.log(result);

          setTotalCount(result.totalCount);
          setRows(result.data);
        }
      });
    });
  }, [search]);

  return (
    <BaseLayout
      title="Listagem de pessoas"
      ToolsBar={
        <ListingTools
          showSearchInput
          searchText={search}
          newbuttonText="Nova"
          onChangeSearchText={text =>
            setSearchParams({ search: text }, { replace: true })
          }
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
              <TableCell>Ações</TableCell>
              <TableCell>Nome completo</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => {
              return (
                <TableRow key={row.idCity}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.wholeName}</TableCell>
                  <TableCell>{row.email}</TableCell>
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
          </TableFooter>
        </Table>
      </TableContainer>
    </BaseLayout>
  );
};
