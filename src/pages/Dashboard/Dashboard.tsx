import { Card, CardContent, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { ListingTools } from "../../shared/components";
import { BaseLayout } from "../../shared/layouts";
import { CitiesService } from "../../shared/services/api/cities/CitiesService";
import { PeopleService } from "../../shared/services/api/people/PeopleService";
import { TextsProvider } from "../../translation/dashboard";

export const Dashboard = () => {
  const texts = TextsProvider.get();
  const [isCitiesLoading, setIsCitiesLoading] = useState(true);
  const [isPeopleLoading, setIsPeopleLoading] = useState(true);
  const [totalCitiesCount, setTotalCitiesCount] = useState(0);
  const [totalPeopleCount, setTotalPeopleCount] = useState(0);

  useEffect(() => {
    setIsCitiesLoading(true);
    setIsPeopleLoading(true);

    void CitiesService.getAll(1).then(result => {
      setIsCitiesLoading(false);

      if (result instanceof Error) {
        alert(result.message);
      } else {
        setTotalCitiesCount(result.totalCount);
      }
    });
    void PeopleService.getAll(1).then(result => {
      setIsPeopleLoading(false);

      if (result instanceof Error) {
        alert(result.message);
      } else {
        setTotalPeopleCount(result.totalCount);
      }
    });
  }, []);

  return (
    <BaseLayout
      title={texts.DASHBOARD_PAGE_TITLE}
      ToolsBar={<ListingTools showNewButton={false} />}
    >
      <Box width="100%" display="flex">
        <Grid container margin={2}>
          <Grid container item spacing={2}>
            <Grid item xs={12} md={8} lg={4} xl={3}>
              <Card>
                <CardContent>
                  <Typography variant="h5" align="center">
                    {texts.PEOPLE_TOTAL_COUNT_CARD_TEXT}
                  </Typography>
                  <Box
                    padding={6}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    {!isPeopleLoading && (
                      <Typography variant="h1">{totalPeopleCount}</Typography>
                    )}
                    {isPeopleLoading && (
                      <Typography variant="h6">{texts.LOADING_TEXT}</Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={8} lg={4} xl={3}>
              <Card>
                <CardContent>
                  <Typography variant="h5" align="center">
                    {texts.CITY_TOTAL_COUNT_CARD_TEXT}
                  </Typography>
                  <Box
                    padding={6}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    {!isCitiesLoading && (
                      <Typography variant="h1">{totalCitiesCount}</Typography>
                    )}
                    {isCitiesLoading && (
                      <Typography variant="h6">{texts.LOADING_TEXT}</Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </BaseLayout>
  );
};
