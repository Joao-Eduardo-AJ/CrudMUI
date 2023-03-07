import { Box, Grid, LinearProgress, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { DetailTools } from "../../shared/components";
import { VTextField, VForm, useVForm } from "../../shared/forms";
import { BaseLayout } from "../../shared/layouts";
import {
  IPeople,
  PeopleService,
} from "../../shared/services/api/people/PeopleServices";

export const PeopleDetail = () => {
  const { id = "new" } = useParams<"id">();
  const navigate = useNavigate();
  const { formRef, save, saveAndClose, isSaveAndClose } = useVForm();

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
        idCity: "",
      });
    }
  }, [id]);

  const handleSave = (data: IPeople) => {
    setIsLoading(true);

    if (id === "new") {
      void PeopleService.create(data).then(result => {
        setIsLoading(false);

        if (result instanceof Error) {
          alert(result.message);
        } else {
          if (isSaveAndClose()) {
            navigate("./people");
          } else {
            navigate(`/people/detail/${result}`);
          }
        }
      });
    } else {
      void PeopleService.updateById(+id, data).then(result => {
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
      title={id === "new" ? "Nova pessoa" : name}
      ToolsBar={
        <DetailTools
          newButtonText="Nova"
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
              <Typography variant="h6">Geral</Typography>
            </Grid>
            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={10} md={6} lg={4} xl={3}>
                <VTextField
                  label="wholeName"
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
                  label="email"
                  name="email"
                  fullWidth
                  disabled={isLoading}
                />
              </Grid>
            </Grid>
            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={10} md={6} lg={4} xl={3}>
                <VTextField
                  label="city"
                  name="city"
                  fullWidth
                  disabled={isLoading}
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </VForm>

      {isLoading && <LinearProgress variant="indeterminate" />}
      {id}
    </BaseLayout>
  );
};
