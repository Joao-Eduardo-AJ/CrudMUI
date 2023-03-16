import { BrowserRouter } from "react-router-dom";

import "./shared/forms/translationYup";

import { AppRoutes } from "./routes";
import { LateralMenu, Login } from "./shared/components";
import {
  AppThemeProvider,
  DrawerProvider,
  AuthProvider,
} from "./shared/contexts";

export const App = () => {
  return (
    <AuthProvider>
      <AppThemeProvider>
        <Login>
          <DrawerProvider>
            <BrowserRouter>
              <LateralMenu>
                <AppRoutes />
              </LateralMenu>
            </BrowserRouter>
          </DrawerProvider>
        </Login>
      </AppThemeProvider>
    </AuthProvider>
  );
};
