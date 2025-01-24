import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import InputAdornment from "@mui/material/InputAdornment";
import { IconButton } from "@mui/material";
import toast from "react-hot-toast";

const defaultTheme = createTheme();

export default function SignUp() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
  });
  const [visibility, setVisibility] = useState(false);
  const { isSigningUp, signUp } = useAuthStore();
  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");

    return true;
  };

  const handleSubmit = () => {
    const check = validateForm();
    if (check === true) signUp(formData);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="fullName"
                  label="FullName"
                  name="fullName"
                  onChange={handleChange}
                  value={formData.fullName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  onChange={handleChange}
                  value={formData.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={visibility ? "text" : "password"}
                  id="password"
                  onChange={handleChange}
                  value={formData.password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setVisibility(!visibility)}
                          edge="end"
                        >
                          {visibility ? "HIDE" : "SHOW"}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>

            <Button type="button" disabled={isSigningUp} onClick={handleSubmit}>
              {isSigningUp ? (
                <>
                  <Loader
                    style={{
                      width: "3rem",
                      height: "3rem",
                      animation: "spin 1s linear infinite",
                    }}
                  />
                  Loading...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Login
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
