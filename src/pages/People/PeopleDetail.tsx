import { Box, Grid, LinearProgress, Paper, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as yup from "yup";

import { VTextField, VForm, useVForm, IVFormErrors } from "../../shared/forms";
import { DetailTools } from "../../shared/components";
import { BaseLayout } from "../../shared/layouts";
import { PeopleService } from "../../shared/services/api/people/PeopleService";
import { CityAutoComplete } from "./components/CityAutoComplete";
import { TextsProvider } from "../../translation/people-listing";

interface IFormData {
  wholeName: string;
  email: string;
  idCity: number;
}

const formValidationSchema: yup.ObjectSchema<IFormData> = yup.object().shape({
  wholeName: yup.string().required().min(5),
  email: yup.string().required().email(),
  idCity: yup.number().required(),
});

export const PeopleDetail = () => {
  const { id = "new" } = useParams<"id">();
  const navigate = useNavigate();
  const { formRef, save, saveAndClose, isSaveAndClose } = useVForm();
  const texts = TextsProvider.get();

  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    if (id !== "new") {
      setIsLoading(true);
      void PeopleService.getById(+id).then(result => {
        setIsLoading(false);
        if (result instanceof Error) {
          alert(result.message);
          navigate("./people");
        } else {
          setName(result.wholeName);
          console.log(result);

          formRef.current?.setData(result);
        }
      });
    } else {
      formRef.current?.setData({
        wholeName: "",
        email: "",
        idCity: undefined,
      });
    }
  }, [id]);

  const handleSave = (data: IFormData) => {
    console.log(data);
    void formValidationSchema
      .validate(data, { abortEarly: false })
      .then(validatedData => {
        setIsLoading(true);

        if (id === "new") {
          void PeopleService.create(validatedData).then(result => {
            setIsLoading(false);

            if (result instanceof Error) {
              alert(result.message);
            } else {
              if (isSaveAndClose()) {
                navigate("/people");
              } else {
                navigate(`/people/detail/${result}`);
              }
            }
          });
        } else {
          void PeopleService.updateById(+id, {
            id: +id,
            ...validatedData,
          }).then(result => {
            setIsLoading(false);

            if (result instanceof Error) {
              alert(result.message);
            } else {
              if (isSaveAndClose()) {
                navigate("./people");
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
      void PeopleService.deleteById(id).then(result => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          alert("Registro apagado com sucesso!");
          navigate("./people");
        }
      });
    }
  };

  return (
    <BaseLayout
      title={id === "new" ? texts.NEW_PERSON_TITLE_TEXT : name}
      ToolsBar={
        <DetailTools
          showButtonSaveAndClose
          showButtonNew={id !== "new"}
          showButtonDelete={id !== "new"}
          onClickSave={save}
          onClickSaveAndClose={saveAndClose}
          onClickDelete={() => handleDelete(+id)}
          onClickNew={() => navigate("/people/detail/new")}
          onClickBack={() => navigate("/people")}
        />
      }
    >
      <VForm ref={formRef} onSubmit={handleSave}>
        <Box margin={1} display="flex" flexDirection="column" component={Paper}>
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
                  label={texts.WHOLE_NAME}
                  name="wholeName"
                  fullWidth
                  disabled={isLoading}
                  onChange={e => setName(e.target.value)}
                />
              </Grid>
            </Grid>
            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={10} md={6} lg={4} xl={3}>
                <VTextField
                  label={texts.EMAIL}
                  name="email"
                  fullWidth
                  disabled={isLoading}
                />
              </Grid>
            </Grid>
            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={10} md={6} lg={4} xl={3}>
                <CityAutoComplete isExternalLoading={isLoading} />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </VForm>

      {isLoading && <LinearProgress variant="indeterminate" />}
    </BaseLayout>
  );
};
