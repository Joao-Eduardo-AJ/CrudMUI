import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { ListingTools } from "../../shared/components";
import { BaseLayout } from "../../shared/layouts";

export const CitiesListing = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = useMemo(() => {
    return searchParams.get("search") ?? "";
  }, [searchParams]);

  return (
    <BaseLayout
      title="Cities Listing"
      ToolsBar={
        <ListingTools
          showSearchInput
          newbuttonText="nova"
          searchText={search}
          onChangeSearchText={e =>
            setSearchParams({ search: e }, { replace: true })
          }
        />
      }
    >
      <p>aa</p>
    </BaseLayout>
  );
};
