import { Button, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isUserLoading } from "../../store/selectors/isUserLoading";
import { userEmailState } from "../../store/selectors/userEmail";

function Landing (){
   const navigate = useNavigate()
   const userEmail = useRecoilValue(userEmailState);
   const userLoading = useRecoilValue(isUserLoading);
    return <div >
      <Grid container style= {{padding: "5vw"}}>
        <Grid item xs ={12} md = {6} lg ={6}>
          <div style={{marginTop: 100}}>
            <Typography variant= {"h2"} style={{ color: "white" }}>
              Course Hub Admin
            </Typography>
            <Typography variant="h5" style={{ color: "white" }}>
                A place where you own your Skills
            </Typography>
            {!userLoading && !userEmail && <div style={{display: "flex", marginTop: 20}}>
                        <div style={{marginRight: 10}}>
                            <Button
                              sx={{bgcolor:"#053B50",":hover":{
                                bgcolor:"#115469"
                                }}}
                                size={"large"}
                                variant={"contained"}
                                onClick={() => {
                                    navigate("/signup")
                                }}
                            >Admin</Button>
                        </div>
                        <div>
                            <Button
                            sx={{bgcolor:"#053B50",":hover":{
                              bgcolor:"#115469"
                              }}}
                                size={"large"}
                                variant={"contained"}
                                onClick={() => {
                                    navigate("/register")
                                }}
                            >User</Button>
                        </div>
                    </div>}
          </div>
        </Grid>
        <Grid item xs={12} md ={6} lg ={6} style={{marginTop: 20}}>
          <img src ={"https://images.yourstory.com/cs/wordpress/2013/08/coursehub.jpg"} width={"100%"} />
        </Grid>
      </Grid>
    </div>



}

export default Landing;