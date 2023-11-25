import { Button, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userEmailState } from "../store/selectors/userEmailState";
import { userLoggedInState } from "../store/selectors/userIsLoggedIn";

function LandingPage() {
  const navigate = useNavigate();
  const userEmail = useRecoilValue(userEmailState);
  const userLoding = useRecoilValue(userLoggedInState);

  return (
    <div>
      <Grid container style={{ padding: "5vw" }}>
        <Grid item xs={12} md={6} lg={6}>
          <div style={{ marginTop: 100 }}>
            <Typography variant={"h2"} style={{ color: "white" }}>
              CourseHub User
            </Typography>
            <Typography variant="h5" style={{ color: "white" }}>
              A place where you Upskill yourself
            </Typography>
            {!userEmail && !userLoding && (
              <div style={{ display: "flex",   marginTop: 20 }}>
                  {/* <h1 className="landing-page">
                    A place to where you Learn skills
                  </h1> */}
                <div style={{ marginRight: 10}}>
                  <Button
                    sx={{
                      bgcolor: "#053B50",
                      ":hover": {
                        bgcolor: "#115469",
                      },
                    }}
                    size={"large"}
                    variant={"contained"}
                    onClick={() => {
                      navigate("/register");
                    }}
                  >
                    SignUp
                  </Button>
                  </div>
                  <div>
                  <Button
                    sx={{
                      bgcolor: "#053B50",
                      ":hover": {
                        bgcolor: "#115469",
                        marginLeft: "10px"
                      },
                    }}
                    size={"large"}
                    variant={"contained"}
                    onClick={() => {
                      navigate("/login");
                    }}
                  >
                    Sign In
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Grid>
        <Grid item xs={12} md={6} lg={6} style={{ marginTop: 20 }}>
          <img
            src={
              "https://images.yourstory.com/cs/wordpress/2013/08/coursehub.jpg"
            }
            width={"100%"}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default LandingPage;
