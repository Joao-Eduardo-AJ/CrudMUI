import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { useField } from "@unform/core";
import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "../../../shared/hooks";
import { CitiesService } from "../../../shared/services/api/cities/CitiesService";
import { TextsProvider } from "../../../translation/autocomplete";

interface IAutoCompleteOptions {
  id: number;
  label: string;
}

interface ICityAutoCompleteProps {
  isExternalLoading?: boolean;
}

export const CityAutoComplete = ({
  isExternalLoading = false,
}: ICityAutoCompleteProps) => {
  const { fieldName, registerField, defaultValue, error, clearError } =
    useField("idCity");
  const { debounce } = useDebounce();
  const texts = TextsProvider.get();

  const [options, setOptions] = useState<IAutoCompleteOptions[]>([]);
  const [selectedId, setSelectedId] = useState<number | undefined>(
    defaultValue
  );
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => selectedId,
      setValue: (_, newSelectedId) => setSelectedId(newSelectedId),
    });
  }, [registerField, fieldName, selectedId]);

  useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      void CitiesService.getAll(1, search).then(result => {
        setIsLoading(false);

        if (result instanceof Error) {
          alert(result.message);
        } else {
          console.log(result);

          setOptions(
            result.data.map(city => ({ id: city.id, label: city.name }))
          );
        }
      });
    });
  }, [search]);

  const autoCompleteSelectedOption = useMemo(() => {
    if (!selectedId) return null;

    const selectedOption = options.find(option => option.id === selectedId);
    if (!selectedOption) return null;

    return selectedOption;
  }, [selectedId, options]);

  return (
    <Autocomplete
      openText={texts.OPEN_TEXT}
      closeText={texts.CLOSE_TEXT}
      noOptionsText={texts.NO_OPTION_TEXT}
      loadingText={texts.LOADING_TEXT}
      disablePortal
      options={options}
      loading={isLoading}
      disabled={isExternalLoading}
      value={autoCompleteSelectedOption}
      popupIcon={
        isExternalLoading || isLoading ? (
          <CircularProgress size={28} />
        ) : undefined
      }
      renderInput={params => (
        <TextField
          {...params}
          label={texts.LABEL}
          error={!!error}
          helperText={error}
        />
      )}
      onInputChange={(_, newValue) => setSearch(newValue)}
      onChange={(_, newValue) => {
        setSelectedId(newValue?.id);
        setSearch("");
        clearError();
      }}
    ></Autocomplete>
  );
};
