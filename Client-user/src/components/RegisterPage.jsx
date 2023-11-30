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
import { userState } from "../../src/store/atoms/user";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Track loading state
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userState);

  const handleSignUp = async () => {
    try {
      setLoading(true); // Set loading to true during signup

      const res = await axios.post(
        "https://coursehub-7s37.onrender.com/users/signup",
        {
          username: email,
          password: password,
        }
      );

      const data = res.data;

      // Update Recoil state with the user information
      setUser({
        Email: email,
        username: email.split("@")[0].toUpperCase(),
        isLoggedIn: true,
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("email", email);
      localStorage.setItem("isLoggedIn", true);

      // Navigate to the courses page
      navigate("/courses");
    } catch (error) {
      console.error("Error during signup:", error);
      // Handle errors as needed
    } finally {
      setLoading(false); // Reset loading state after signup, whether success or error
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
          sx={{ width: "250px", height: "250px" }}
        >
          <TextField
            style={{ color: "white", borderColor: "white" }}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            fullWidth
            label="Email"
            variant="outlined"
          />
          <br />
          <br />
          <TextField
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            fullWidth
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
              onClick={handleSignUp}
            >
              Sign up
            </button>
          )}
          <br></br>
          <br></br>
          <div>
            <h3 style={{ fontWeight: "600" }}>Already a user! login here..</h3>
            <br />
            <button className="button-nav" onClick={() => navigate("/login")}>
              Signin
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default RegisterPage;
