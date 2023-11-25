import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { userState } from "../store/atoms/user";
// import { userEmailState } from "../store/selectors/userEmailState";
// import { userLoggedInState } from "../store/selectors/userIsLoggedIn";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { userEmailState } from "../store/selectors/userEmailState";
import Logo from "../../public/Logo.png"
export default function Appbar() {
  // const userLoading = useRecoilValue(userLoggedInState)
   const userEmail =useRecoilValue(userEmailState)
  // const setUser = useRecoilState(userState)
  const [user, setUser] = useRecoilState(userState);
  const navigate = useNavigate();

  // if(userLoading){
  //   return<div>
  //     <h1>loading</h1>
  //   </div>
  // }

  if (userEmail || user.Email) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: 4,
          zIndex: 1,
        }}
      >
        <div
          style={{ display:"flex", flexDirection:"row", justifyContent: "center", alignItems:"center", marginLeft: 10, cursor: "pointer" }}
          onClick={() => {
            navigate("/");
          }}
        ><img src={Logo} alt="logo" 
        style={{ width: 100, height: 100 }} />
          <Typography
            sx={{}}
            onClick={() => {
              navigate("/");
            }}
            variant={"h6"}
          >
            CourseHub
          </Typography>
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ marginRight: 10, display: "flex" }}>
            <div style={{ marginRight: 10 }}>
              <Button
                sx={{
                  bgcolor: "#053B50",
                  ":hover": {
                    bgcolor: "#115469",
                  },
                }}
                onClick={() => {
                  navigate("/courses");
                }}
              >
                All courses
              </Button>
            </div>
            <div style={{ marginRight: 10 }}>
              <Button
                sx={{ bgcolor: "#053B50" }}
                onClick={() => {
                  navigate("/courses/purchased");
                }}
              >
                Purchased Courses
              </Button>
            </div>
            <div style={{ marginRight: 10 }}>
              <Button
                variant={"contained"}
                sx={{ bgcolor: "#053B50" }}
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("isLoggedIn");
                  localStorage.removeItem("email");
                  setUser({
                    email: "",
                    password: "",
                    username: "",
                    isLoggedIn: false,
                  });
                  navigate("/");
                }}
              >
                {" "}
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!userEmail) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px",
          zIndex: 1,
          overflow: "auto",
        }}
      >
        <div>
          <Typography
            sx={{}}
            onClick={() => {
              navigate("/");
            }}
            variant="h6"
          >
            CourseHub
          </Typography>
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ marginRight: 10 }}>
            <Button
              variant={"contained"}
              sx={{
                bgcolor: "#053B50",
                ":hover": {
                  bgcolor: "#115469",
                },
              }}
              onClick={() => {
                navigate("/register");
              }}
            >
              Signup
            </Button>
          </div>
          <div>
            <Button
              variant={"contained"}
              sx={{
                bgcolor: "#053B50",
                ":hover": {
                  bgcolor: "#115469",
                },
              }}
              onClick={() => {
                navigate("/login");
              }}
            >
              Signin
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
