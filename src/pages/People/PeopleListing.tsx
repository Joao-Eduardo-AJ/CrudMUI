import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { ListingTools } from "../../shared/components";
import { useDebounce } from "../../shared/hooks";
import { BaseLayout } from "../../shared/layouts";
import { PeopleService } from "../../shared/services/api/people/PeopleServices";

export const PeopleListing = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce(1000, false);

  const search = useMemo(() => {
    return searchParams.get("search") ?? "";
  }, [searchParams]);

  useEffect(() => {
    debounce(() => {
      void PeopleService.getAll(1, search).then(result => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          console.log(result);
        }
      });
    });
  }, [search]);

  return (
    <BaseLayout
      title="Listagem de pessoas"
      ToolsBar={
        <ListingTools
          showSearchInput
          searchText={search}
          newbuttonText="nova"
          onChangeSearchText={e =>
            setSearchParams({ search: e }, { replace: true })
          }
        />
      }
    >
      <div></div>
    </BaseLayout>
  );
};
