import { Button, TextField, Card, Typography, CircularProgress } from "@mui/material/";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userState } from "../store/atoms/user";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Track loading state
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userState);

  const handleSignup = async () => {
    try {
      setLoading(true); // Set loading to true during signup
      const res = await axios.post("https://coursehub-7s37.onrender.com/admin/signup", {
        username: email,
        password: password,
      });

      const data = res.data;
      localStorage.setItem("token", data.token);
      localStorage.setItem("userEmail", email);
      localStorage.setItem("isLoading", true);
      setUser({ userEmail: email, isLoading: true });
      navigate("/courses");
    } catch (error) {
      console.error("Error during signup:", error);
    } finally {
      setLoading(false); // Reset loading state after signup, whether success or error
    }
  };

  return (
    <div>
      <div
        style={{
          paddingTop: 150,
          marginBottom: 10,
          display: "flex",
          justifyContent: "center",
          color: "white",
        }}
      >
        <Typography
          variant="h5"
          style={{ color: "white", fontFamily: "cursive", cursor: "pointer" }}
        >
          Welcome to CourseHub. Signup Below..
        </Typography>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card className="cardstyle" variant="outlined">
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
            <CircularProgress size={35} style={{ color: "black", marginLeft: "18px"}} />
          ) : (
            <button
              className="button-nav"
              variant="contained"
              disabled={loading} // Disable button during loading
              onClick={handleSignup}
            >
              Sign up
            </button>
          )}
          <br></br>
          <br></br>
          <div>
            <h3 style={{ fontWeight: "600" }}>
              Already a user! login here..
            </h3>
            <br />
            <button
              className="button-nav"
              disabled={loading} // Disable button during loading
              onClick={() => navigate("/signin")}
            >
              Signin
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Signup;
