import {
  Box,
  Button,
  Divider,
  Icon,
  Paper,
  Skeleton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

interface IDetailToolsProps {
  newButtonText?: string;
  showButtonNew?: boolean;
  showButtonBack?: boolean;
  showButtonDelete?: boolean;
  showButtonSave?: boolean;
  showButtonSaveAndClose?: boolean;

  showLoadButtonNew?: boolean;
  showLoadButtonBack?: boolean;
  showLoadButtonDelete?: boolean;
  showLoadButtonSave?: boolean;
  showLoadButtonSaveAndClose?: boolean;

  onClickNew?: () => void;
  onClickBack?: () => void;
  onClickDelete?: () => void;
  onClickSave?: () => void;
  onClickSaveAndClose?: () => void;
}

export function DetailTools({
  newButtonText = "novo",
  showButtonNew = true,
  showButtonBack = true,
  showButtonDelete = true,
  showButtonSave = true,
  showButtonSaveAndClose = true,

  showLoadButtonNew = false,
  showLoadButtonBack = false,
  showLoadButtonDelete = false,
  showLoadButtonSave = false,
  showLoadButtonSaveAndClose = false,

  onClickNew,
  onClickBack,
  onClickDelete,
  onClickSave,
  onClickSaveAndClose,
}: IDetailToolsProps) {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const mdDown = useMediaQuery(theme.breakpoints.down("sm"));

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
      {showButtonSave && !showLoadButtonSave && (
        <Button
          variant="contained"
          disableElevation
          color="primary"
          onClick={onClickSave}
          startIcon={<Icon>save</Icon>}
        >
          <Typography
            variant="button"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
          >
            Salvar
          </Typography>
        </Button>
      )}
      {showLoadButtonSave && <Skeleton width={110} height={62} />}
      {showButtonSaveAndClose &&
        !showLoadButtonSaveAndClose &&
        !mdDown &&
        !smDown && (
          <Button
            variant="outlined"
            disableElevation
            color="primary"
            onClick={onClickSaveAndClose}
            startIcon={<Icon>save</Icon>}
          >
            <Typography
              variant="button"
              whiteSpace="nowrap"
              textOverflow="ellipsis"
              overflow="hidden"
            >
              Salvar e voltar
            </Typography>
          </Button>
        )}
      {showLoadButtonSaveAndClose && !mdDown && !smDown && (
        <Skeleton width={180} height={62} />
      )}
      {showButtonDelete && !showLoadButtonDelete && (
        <Button
          variant="outlined"
          disableElevation
          color="primary"
          onClick={onClickDelete}
          startIcon={<Icon>delete</Icon>}
        >
          <Typography
            variant="button"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
          >
            Apagar
          </Typography>
        </Button>
      )}
      {showLoadButtonDelete && <Skeleton width={110} height={62} />}
      {showButtonNew && !showLoadButtonNew && !smDown && (
        <Button
          variant="outlined"
          disableElevation
          color="primary"
          onClick={onClickNew}
          startIcon={<Icon>add</Icon>}
        >
          <Typography
            variant="button"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
          >
            {newButtonText}
          </Typography>
        </Button>
      )}
      {showLoadButtonNew && !smDown && <Skeleton width={110} height={62} />}
      {showButtonSave ||
        showButtonSaveAndClose ||
        showLoadButtonDelete ||
        showButtonNew ||
        (!showButtonBack && (
          <Divider variant="middle" orientation="vertical" />
        ))}
      {showButtonBack && !showLoadButtonBack && (
        <Button
          variant="outlined"
          disableElevation
          color="primary"
          onClick={onClickBack}
          startIcon={<Icon>arrow_back</Icon>}
        >
          <Typography
            variant="button"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
          >
            Voltar
          </Typography>
        </Button>
      )}
      {showLoadButtonBack && <Skeleton width={110} height={62} />}
    </Box>
  );
}
