import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  CssBaseline,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
function Login({ setIsLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = (event) => {
    event.preventDefault();
    // Here you should add your authentication logic
    if (username === "user" && password === "pass") {
      navigate("dashboard");
      // Replace with real validation
      setIsLoggedIn(true);
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <Container component="main" maxWidth="xs" style={{ marginTop: "20vh" }}>
      <CssBaseline />
      <Typography component="h1" variant="h5" style={{ textAlign: "center" }}>
        Sign In
      </Typography>
      <form onSubmit={handleLogin} style={{ marginTop: "1rem" }}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
          autoFocus
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            marginTop: "24px",
            backgroundColor: "blue",
            "&:hover": { backgroundColor: "darkblue" },
          }}
        >
          Sign In.
        </Button>
      </form>
    </Container>
  );
}

export default Login;
