import {
  Button,
  Icon,
  InputAdornment,
  Paper,
  TextField,
  useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Box } from "@mui/system";

import { Enviroment } from "../../environment";

interface IListingTools {
  searchText?: string;
  showSearchInput?: boolean;
  onChangeSearchText?: (novoTexto: string) => void;
  newbuttonText?: string;
  showNewButton?: boolean;
  onClickNew?: () => void;
}

export const ListingTools = ({
  onChangeSearchText,
  showSearchInput = false,
  searchText = "",
  onClickNew,
  showNewButton = true,
  newbuttonText = "Novo",
}: IListingTools) => {
  const theme = useTheme();

  return (
    <Box
      height={theme.spacing(5)}
      marginX={1}
      padding={1}
      paddingX={2}
      display="flex"
      alignItems="center"
      gap={1}
      component={Paper}
    >
      {showSearchInput && (
        <TextField
          size="small"
          placeholder={Enviroment.SEARCH_INPUT}
          value={searchText}
          onChange={e => onChangeSearchText?.(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      )}
      <Box flex={1} display="flex" justifyContent="end">
        {showNewButton && (
          <Button
            variant="contained"
            disableElevation
            color="primary"
            endIcon={<Icon>add</Icon>}
            onClick={onClickNew}
          >
            {newbuttonText}
          </Button>
        )}
      </Box>
    </Box>
  );
};
