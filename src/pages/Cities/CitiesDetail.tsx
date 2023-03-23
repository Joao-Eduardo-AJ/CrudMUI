import { Box, Grid, LinearProgress, Paper, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as yup from "yup";

import { VTextField, VForm, useVForm, IVFormErrors } from "../../shared/forms";
import { DetailTools } from "../../shared/components";
import { BaseLayout } from "../../shared/layouts";
import { CitiesService } from "../../shared/services/api/cities/CitiesService";
import { TextsProvider } from "../../translation/cities-listing";

interface IFormData {
  name: string;
}

const formValidationSchema: yup.ObjectSchema<IFormData> = yup.object().shape({
  name: yup.string().required().min(5),
});

export const CitiesDetail = () => {
  const { id = "new" } = useParams<"id">();
  const navigate = useNavigate();
  const { formRef, save, saveAndClose, isSaveAndClose } = useVForm();
  const texts = TextsProvider.get();

  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    if (id !== "new") {
      setIsLoading(true);

      void CitiesService.getById(+id).then(result => {
        setIsLoading(false);
        if (result instanceof Error) {
          alert(result.message);
          navigate("./cities");
        } else {
          setName(result.name);
          formRef.current?.setData(result);
        }
      });
    } else {
      formRef.current?.setData({
        name: "",
      });
    }
  }, [id]);

  const handleSave = (data: IFormData) => {
    void formValidationSchema
      .validate(data, { abortEarly: false })
      .then(validatedData => {
        setIsLoading(true);

        if (id === "new") {
          void CitiesService.create(validatedData).then(result => {
            setIsLoading(false);

            if (result instanceof Error) {
              alert(result.message);
            } else {
              if (isSaveAndClose()) {
                navigate("/cities");
              } else {
                navigate(`/cities/detail/${result}`);
              }
            }
          });
        } else {
          void CitiesService.updateById(+id, {
            id: +id,
            ...validatedData,
          }).then(result => {
            setIsLoading(false);

            if (result instanceof Error) {
              alert(result.message);
            } else {
              if (isSaveAndClose()) {
                navigate("/cities");
              }
            }
          });
        }
      })
      .catch((errors: yup.ValidationError) => {
        const validationErrors: IVFormErrors = {};

        errors.inner.forEach(error => {
          if (!error.path) return;

          validationErrors[error.path] = error.message;
        });

        formRef.current?.setErrors(validationErrors);
      });
  };

  const handleDelete = (id: number) => {
    if (confirm("Realmente deseja apagar?")) {
      void CitiesService.deleteById(id).then(result => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          alert("Registro apagado com sucesso!");
          navigate("/cities");
        }
      });
    }
  };

  return (
    <BaseLayout
      title={id === "new" ? texts.NEW_CITY_TITLE_TEXT : name}
      ToolsBar={
        <DetailTools
          showButtonSaveAndClose
          showButtonNew={id !== "new"}
          showButtonDelete={id !== "new"}
          onClickSave={save}
          onClickSaveAndClose={saveAndClose}
          onClickDelete={() => handleDelete(+id)}
          onClickNew={() => navigate("/cities/detail/new")}
          onClickBack={() => navigate("/cities")}
        />
      }
    >
      <VForm ref={formRef} onSubmit={handleSave}>
        <Box
          margin={1}
          display="flex"
          flexDirection="column"
          component={Paper}
          variant="outlined"
        >
          <Grid container direction="column" padding={2} spacing={2}>
            {isLoading && (
              <Grid item>
                <LinearProgress variant="indeterminate" />
              </Grid>
            )}
            <Grid item>
              <Typography variant="h6">{texts.GENERAL}</Typography>
            </Grid>
            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={10} md={6} lg={4} xl={3}>
                <VTextField
                  label={texts.CITY_NAME}
                  name="name"
                  fullWidth
                  disabled={isLoading}
                  onChange={e => setName(e.target.value)}
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </VForm>

      {isLoading && <LinearProgress variant="indeterminate" />}
    </BaseLayout>
  );
};
