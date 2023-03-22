import { Routes, Route, Navigate } from "react-router-dom";
import { useDrawerContext } from "../shared/contexts";
import { useEffect } from "react";
import {
  PeopleListing,
  Dashboard,
  PeopleDetail,
  CitiesDetail,
  CitiesListing,
} from "../pages";
import { TextsProvider } from "../translation/lateral-menu";

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();
  const texts = TextsProvider.get();

  useEffect(() => {
    setDrawerOptions([
      {
        icon: "home",
        path: "/home",
        label: `${texts.DASHBOARD_NAVIGATE_BUTTON_TEXT}`,
      },
      {
        icon: "people",
        path: "/people",
        label: `${texts.PEOPLE_NAVIGATE_BUTTON_TEXT}`,
      },
      {
        icon: "location_city",
        path: "/cities",
        label: `${texts.CITIES_NAVIGATE_BUTTON_TEXT}`,
      },
    ]);
  }, []);

  return (
    <Routes>
      <Route path="/home" element={<Dashboard />} />

      <Route path="/cities" element={<CitiesListing />} />
      <Route path="/cities/detail/:id" element={<CitiesDetail />} />

      <Route path="/people" element={<PeopleListing />} />
      <Route path="/people/detail/:id" element={<PeopleDetail />} />

      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
};
