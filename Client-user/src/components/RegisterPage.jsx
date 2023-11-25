import { Button, TextField, Card, Typography } from '@mui/material/';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { userState } from '../../src/store/atoms/user';

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userState);

  const handleSignUp = async () => {
    try {
      const res = await axios.post("http://localhost:3000/users/signup", {
        username: email,
        password: password,
      });

      const data = res.data;
      localStorage.setItem("token", data.token);

      // Update Recoil state with the user information
      setUser({
        Email: email,
        username: email.split('@')[0].toUpperCase(),
        isLoggedIn: true,
      });

      // Navigate to the courses page
      navigate("/courses");
    } catch (error) {
      console.error("Error during signup:", error);
      // Handle errors as needed
    }
  };

  return (
    <div>
      <div
        style={{
          paddingTop: 100,
          marginBottom: 10,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6">
          Welcome to CourseHub! Signup below
        </Typography>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card variant="outlined" sx={{ width: 300, p: 4 }}>
          <TextField
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
          <Button
            sx={{
              bgcolor: "#053B50",
              ":hover": {
                bgcolor: "#115469",
              },
            }}
            variant={"contained"}
            onClick={handleSignUp}
          >
            Sign up
          </Button>
        </Card>
      </div>
    </div>
  );
}

export default RegisterPage;
