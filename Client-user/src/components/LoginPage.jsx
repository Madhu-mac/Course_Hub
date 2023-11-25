import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Card, Typography, CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState, useRecoilCallback } from "recoil";
import { userState } from "../../src/store/atoms/user";
import { toast } from "react-hot-toast";
import "../index.css";

function LoginPage() {
  const [user, setUser] = useState({ email: "", password: "" });
  const setUserRecoil = useSetRecoilState(userState);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Recoil callback for atomic state updates
  const handleLogin = useRecoilCallback(({ set }) => async () => {
    if (user.email.trim() === "" || user.password.trim() === "") {
      setMessage("Email/password field cannot be empty");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/users/login", {
        username: user.email,
        password: user.password,
      });

      // Update Recoil state atomically
      set(userState, (prev) => ({
        ...prev,
        email: user.email,
        username: user.email.split("@")[0].toUpperCase(),
        isLoggedIn: true,
      }));

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("email", user.email);

      setMessage("");
      toast.success(res.data.message);
      setIsLoading(false);
      navigate("/courses");
    } catch (err) {
      console.log(err);
      setMessage(err.response.data.message);
      setIsLoading(false);
    }
  });

  useEffect(() => {
    // Check localStorage for previous login
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const userEmail = localStorage.getItem("email");

    if (isLoggedIn && userEmail) {
      setUserRecoil({
        email: userEmail,
        username: userEmail.split("@")[0].toUpperCase(),
        isLoggedIn: true,
      });
      navigate("/courses");
    }
  }, [setUserRecoil, navigate]);

  return (
    <div>
      <div
        style={{
          paddingTop: 150,
          marginBottom: 10,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography variant={"h6"}>Welcome to Coursera. Login Below</Typography>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card varint={"outlined"} style={{ width: 400, padding: 20 }}>
          <TextField
            onChange={(e) =>
              setUser((prev) => ({ ...prev, email: e.target.value }))
            }
            fullWidth={true}
            label="Email"
            variant="outlined"
          />
          <br />
          <br />
          <TextField
            onChange={(e) =>
              setUser((prev) => ({ ...prev, password: e.target.value }))
            }
            fullWidth={true}
            label="Password"
            variant="outlined"
            type="password"
          />
          <br />
          <br />

          {isLoading ? (
            <Button
              style={{ backgroundColor: "#101460" }}
              className="button"
              variant="contained"
              onClick={handleLogin}
            >
              <CircularProgress size={25} />
            </Button>
          ) : (
            <Button
              style={{ backgroundColor: "#101460" }}
              className="button"
              variant="contained"
              onClick={handleLogin}
            >
              Login
            </Button>
          )}

          <br></br>
          <div>
            <h3 style={{ fontWeight: "500" }}>
              New here? Click here to register new account.
            </h3>
            <br />
            <Button
              style={{ backgroundColor: "#101460" }}
              className="button"
              variant="contained"
              onClick={() => navigate("/register")}
            >
              Register
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default LoginPage;
