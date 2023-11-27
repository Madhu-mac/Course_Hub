import {Button, TextField , Card, Typography} from '@mui/material/';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState   } from 'recoil';
import { userState } from '../store/atoms/user';

function Signup(){
  const [email , setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const setUser = useSetRecoilState(userState);

  return <div>
   
  <div style={{
    paddingTop : 100,
    marginBottom: 10,
    display: "flex",
    justifyContent: "center"
  }}>
    <Typography variant='h6'> Welcome to CourseHub! Signup below</Typography>
  </div>
      <div style={{display: "flex",  justifyContent: 'center'}}>
      <Card variant="outlined" sx={{width : 300 , p: 4}}>
            <TextField 
                onChange={(e) =>{
                  setEmail(e.target.value)
                }}
                fullWidth 
                label="Email" 
                variant="outlined" />
            <br/><br/>
            <TextField 
                onChange={(e) =>{
                  setPassword(e.target.value)
                }}
                fullWidth 
                label="Password" 
                variant="outlined"
                type = {"password"}/>
            <br/><br/>
            <Button 
                sx={{bgcolor:"#053B50",":hover":{
                  bgcolor:"#115469"
                  }}}
                variant={"contained"}
                onClick={async() =>{
                  const res = await axios.post("http://localhost:3000/admin/signup", {
                    username: email,
                    password: password
                  });
                    const data = res.data;

                    localStorage.setItem("token", data.token)
                    // window.location ="/"
                    setUser({userEmail: email, isLoading: false})
                    navigate("/courses")
                }}
            >Sign up</Button>
       </Card>
       </div>
    </div>

}

export default Signup;