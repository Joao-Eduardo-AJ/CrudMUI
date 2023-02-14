import { Routes, Route, Navigate } from "react-router-dom";
import { useDrawerContext } from "../shared/contexts";
import { useEffect } from "react";
import { CitiesListing, Dashboard } from "../pages";

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        icon: "home",
        path: "/home",
        label: "home",
      },
      {
        icon: "location_city",
        path: "/cities",
        label: "cities",
      },
    ]);
  }, []);

  return (
    <Routes>
      <Route path="/home" element={<Dashboard />} />
      <Route path="/cities" element={<CitiesListing />} />
      {/* <Route path="/cities/details/:id" element={<CitiesListing />} /> */}

      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
};
