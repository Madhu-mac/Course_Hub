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
      localStorage.setItem('email', email);
      localStorage.setItem('isLoggedIn', true);

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
          paddingTop: 150,
          marginBottom: 10,
          display: "flex",
          justifyContent: "center",
          color: 'white'
        }}
      >
        <Typography variant="h6"
        style={{ color: "white" ,fontFamily: "cursive", cursor:"pointer"}}>
          Welcome to CourseHub. Signup Below..
        </Typography>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card 
        className= "cardstyle" 
        variant="outlined" 
       >
          <TextField
          style={{ color: "white" , borderColor: "white" }}
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
            className='button-nav'
            variant="contained"
            onClick={handleSignUp}
          >
            Sign up
          </button>
          <br></br><br></br>
          <div>
            <h3 style={{ fontWeight: "600" }}>
             Already a user! login here..
            </h3>
            <br />
            <button
              className="button-nav"
              onClick={() => navigate("/login")}
            >
              Signin
            </button>
            </div>
        </Card>
      </div>
    </div>
  );
}

export default RegisterPage;
