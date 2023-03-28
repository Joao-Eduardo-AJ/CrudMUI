/* eslint-disable @typescript-eslint/no-floating-promises */
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import * as yup from "yup";

import { useAuthContext } from "../../contexts";
import { TextsProvider } from "../../../translation/login";

const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required().min(8),
});

interface ILoginProps {
  children: React.ReactNode;
}

export const Login = ({ children }: ILoginProps) => {
  const { isAuthenticated, login } = useAuthContext();
  const texts = TextsProvider.get();

  const [isLoading, setIsLoading] = useState(false);

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleSubmit = () => {
    setIsLoading(true);
    loginSchema
      .validate({ email, password }, { abortEarly: false })
      .then(validatedData => {
        login(validatedData.email, validatedData.password).then(() => {
          setIsLoading(false);
        });
      })
      .catch((errors: yup.ValidationError) => {
        setIsLoading(false);
        errors.inner.forEach(error => {
          if (error.path === "email") {
            setEmailError(error.message);
          } else if (error.path === "password") {
            setPasswordError(error.message);
          }
        });
      });
  };

  if (isAuthenticated) return <>{children}</>;
  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Card>
        <CardContent>
          <Box display="flex" flexDirection="column" gap={2} width="16rem">
            <Typography variant="h5" align="center">
              {texts.LOGIN}
            </Typography>
            <TextField
              fullWidth
              value={email}
              label={texts.EMAIL}
              type="email"
              disabled={isLoading}
              error={!!emailError}
              helperText={emailError}
              onKeyDown={() => setEmailError("")}
              onChange={e => setEmail(e.target.value)}
            ></TextField>
            <TextField
              fullWidth
              value={password}
              label={texts.PASSWORD}
              type="password"
              disabled={isLoading}
              error={!!passwordError}
              helperText={passwordError}
              onKeyDown={() => setPasswordError("")}
              onChange={e => setPassword(e.target.value)}
            ></TextField>
          </Box>
        </CardContent>
        <CardActions>
          <Box width="100%" display="flex" justifyContent="center">
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={isLoading}
              endIcon={
                isLoading ? (
                  <CircularProgress
                    size={20}
                    variant="indeterminate"
                    color="inherit"
                  />
                ) : undefined
              }
            >
              {texts.LOGIN}
            </Button>
          </Box>
        </CardActions>
      </Card>
    </Box>
  );
};
