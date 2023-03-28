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

import { TextsProvider } from "../../../translation/text-tools";

interface IListingTools {
  showSearchInput?: boolean;
  onChangeSearchText?: (novoTexto: string) => void;
  showNewButton?: boolean;
  onClickNew?: () => void;
}

export const ListingTools = ({
  onChangeSearchText,
  showSearchInput = false,
  onClickNew,
  showNewButton = true,
}: IListingTools) => {
  const theme = useTheme();
  const texts = TextsProvider.get();

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
          placeholder={texts.SEARCH_TEXT}
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
            {texts.NEW_BUTTON_TEXT}
          </Button>
        )}
      </Box>
    </Box>
  );
};
