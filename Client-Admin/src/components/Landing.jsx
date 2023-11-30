import { Button, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isUserLoading } from "../store/selectors/isUserLoading";
import { userEmailState } from "../store/selectors/userEmail";
import { motion } from "framer-motion";

function Landing() {
  const navigate = useNavigate();
  const userEmail = useRecoilValue(userEmailState);
  const userLoading = useRecoilValue(isUserLoading);
  return (
    <div>
      <Grid container style={{ padding: "5vw" }}>
        <Grid item xs={12} md={6} lg={6}>
          <div style={{ marginTop: 100 }}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5 }}
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: { opacity: 1, x: 0 },
              }}
            >
              <Typography variant={"h4"} style={{ color: "white"}} >
                CourseHub Admin
              </Typography>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5 }}
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: { opacity: 1, x: 0 },
              }}
            >
              <Typography variant="h6" style={{ color: "white",fontSize:"15px"}}>
              A place where you streamline course management
              </Typography>
            </motion.div>
            {!userLoading && !userEmail && (
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5 }}
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <div style={{ display: "flex", marginTop: 20 }}>
                  <div>
                    <button
                      className="button-btn"
                      onClick={() => {
                        navigate("/signup");
                      }}
                    >
                      Signup
                    </button>
                  </div>
                  <div>
                    <button
                      className="button-btn"
                      onClick={() => {
                        navigate("/signin");
                      }}
                    >
                      Sign In
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </Grid>
        <Grid item xs={12} md={6} lg={6} style={{ marginTop: 20 }}>
        <motion.div
          initial="hidden"
          whileInView="visible"            
          viewport={{ once: true, amount: 0.5 }}
           transition={{ duration: 0.5}}
           variants={{
            hidden: { opacity: 0, x: 80 },
            visible: { opacity: 1, x: 0 },
          }}  
          >
          <img 
           className="landingpic"
            src={
              "https://www.creativefabrica.com/wp-content/uploads/2023/05/12/Man-Sitting-On-Chair-In-Front-Of-Computer-Side-Portrait-69523548-1.png"
            }
            width={"75%"}
          />
          </motion.div>
        </Grid>
      </Grid>
    </div>
  );
}

export default Landing;
