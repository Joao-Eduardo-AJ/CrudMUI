import { Routes, Route, Navigate } from "react-router-dom";
import { useDrawerContext } from "../shared/contexts";
import { useEffect } from "react";
import { PeopleListing, Dashboard } from "../pages";

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
    ]);
  }, []);

  return (
    <Routes>
      <Route path="/home" element={<Dashboard />} />
      <Route path="/people" element={<PeopleListing />} />
      {/* <Route path="/cities/details/:id" element={<CitiesListing />} /> */}

      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
};
