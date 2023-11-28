import { Button, TextField, Card, Typography } from "@mui/material/";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userState } from "../store/atoms/user";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userState);

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
             style={{ color: "white" ,fontFamily: "cursive", cursor:"pointer"}}>
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
          <button
            className="button-nav"
            variant="contained"
            onClick={async () => {
              const res = await axios.post(
                "http://localhost:3000/admin/signup",
                {
                  username: email,
                  password: password,
                }
              );
              const data = res.data;

              localStorage.setItem("token", data.token);
              // window.location ="/"
              setUser({ userEmail: email, isLoading: false });
              navigate("/courses");
            }}
          >
            Sign up
          </button>
          <br></br>
          <br></br>
          <div>
            <h3 style={{ fontWeight: "600" }}>
              Already a user! login here..
            </h3>
            <br />
            <button className="button-nav" onClick={() => navigate("/signin")}>
              Signin
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Signup;
