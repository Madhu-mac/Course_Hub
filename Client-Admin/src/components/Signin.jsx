import {
  Button,
  TextField,
  Card,
  Typography,
  CircularProgress,
} from "@mui/material/";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userState } from "../store/atoms/user";
import "../index.css";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Track loading state
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userState);

  const handleSignin = async () => {
    try {
      setLoading(true); // Set loading to true during signin
      const res = await axios.post(
        "https://coursehub-7s37.onrender.com/admin/login",
        {
          username: email,
          password: password,
        },
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const data = res.data;

      localStorage.setItem("token", data.token);
      setUser({
        userEmail: email,
        isLoading: false,
      });
      navigate("/courses");
    } catch (error) {
      console.error("Error during signin:", error);
    } finally {
      setLoading(false); // Reset loading state after signin, whether success or error
    }
  };

  return (
    <div>
      <div
        style={{
          paddingTop: 60,
          marginBottom: 10,
          display: "flex",
          justifyContent: "center",
          color: "white",
        }}
      >
        <Typography
          variant="h6"
          style={{
            color: "white",
            fontFamily: "cursive",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Welcome to CourseHub. Signin Below..
        </Typography>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card
          className="cardstyle"
          variant="outlined"
          sx={{ width: "250px", height: "270px" }}
        >
          <TextField
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            fullWidth={true}
            label="Email"
            variant="outlined"
          />
          <br />
          <br />
          <TextField
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            fullWidth={true}
            label="Password"
            variant="outlined"
            type="password"
          />
          <br />
          <br />
          {/* Conditionally render CircularProgress while loading */}
          {loading ? (
            <CircularProgress
              size={35}
              style={{ color: "black", marginLeft: "18px" }}
            />
          ) : (
            <button
              className="button-nav"
              variant="contained"
              disabled={loading} // Disable button during loading
              onClick={handleSignin}
            >
              Sign In
            </button>
          )}
          <br></br>
          <br></br>
          <div>
            <h3 style={{ fontWeight: "600" }}>
              New here? Click here to register a new account.
            </h3>
            <br />
            <button className="button-nav" onClick={() => navigate("/signup")}>
              Sign Up
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Signin;
