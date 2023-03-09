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

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        icon: "home",
        path: "/home",
        label: "Página inicial",
      },
      {
        icon: "people",
        path: "/people",
        label: "Pessoas",
      },
      {
        icon: "location_city",
        path: "/cities",
        label: "Cities",
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
