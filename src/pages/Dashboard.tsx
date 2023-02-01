import { ListingTools } from "../shared/components";
import { BaseLayout } from "../shared/layouts";

export const Dashboard = () => {
  return (
    <BaseLayout title="Home" ListingTools={<ListingTools showSearchInput />}>
      <h1>isto é um H1</h1>
    </BaseLayout>
  );
};
