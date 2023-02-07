import { DetailTools } from "../../shared/components";
import { BaseLayout } from "../../shared/layouts";

export const Dashboard = () => {
  return (
    <BaseLayout title="Página inicial" ToolsBar={<DetailTools />}>
      <h1>isto é um H1</h1>
    </BaseLayout>
  );
};
