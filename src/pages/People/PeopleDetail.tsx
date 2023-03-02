import { LinearProgress } from "@mui/material";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { DetailTools } from "../../shared/components";
import { VTextField } from "../../shared/forms/VTextField";
import { BaseLayout } from "../../shared/layouts";
import { PeopleService } from "../../shared/services/api/people/PeopleServices";

interface IFormData {
  email: string;
  cityId: string;
  wholeName: string;
}

export const PeopleDetail = () => {
  const { id = "new" } = useParams<"id">();
  const navigate = useNavigate();

  const formRef = useRef<FormHandles>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [name, setname] = useState("");

  useEffect(() => {
    if (id !== "new") {
      setIsLoading(true);
      void PeopleService.getById(+id).then(result => {
        setIsLoading(false);
        if (result instanceof Error) {
          alert(result.message);
          navigate("./people");
        } else {
          setname(result.wholeName);
          console.log(result);
        }
      });
    }
  }, [id]);

  const handleSave = (data: IFormData) => {
    console.log(data);
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
          onClickSave={() => formRef.current?.submitForm()}
          onClickSaveAndClose={() => formRef.current?.submitForm()}
          onClickDelete={() => handleDelete(+id)}
          onClickNew={() => navigate("/people/detail/new")}
          onClickBack={() => navigate("/people")}
        />
      }
    >
      <Form ref={formRef} onSubmit={handleSave}>
        <VTextField name="wholeName" />
        <VTextField name="email" />
        <VTextField name="cityId" />
      </Form>

      {isLoading && <LinearProgress variant="indeterminate" />}
      {id}
    </BaseLayout>
  );
};
