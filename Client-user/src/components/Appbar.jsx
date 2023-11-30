import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { userState } from "../store/atoms/user";
// import { userEmailState } from "../store/selectors/userEmailState";
// import { userLoggedInState } from "../store/selectors/userIsLoggedIn";
import Typography from "@mui/material/Typography";
import { userEmailState } from "../store/selectors/userEmailState";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";

export default function Appbar() {
  // const userLoading = useRecoilValue(userLoggedInState)
  const userEmail = useRecoilValue(userEmailState);
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
          marginTop: "8px",
          // background: "rgba(255, 255, 255, 0.5)"
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: 10,
            cursor: "pointer",
          }}
          onClick={() => {
            navigate("/");
          }}
        >
          <Typography
            style={{ color: "white", fontFamily: "Kaushan Script" }}
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
              <button
                className="button-nav"
                style={{ width: "90px" }}
                onClick={() => {
                  navigate("/courses");
                }}
              >
                All courses
              </button>
            </div>
            <div style={{ marginRight: 10 }}>
              <button
                style={{ width: "150px" }}
                className="button-nav"
                onClick={() => {
                  navigate("/courses/purchased");
                }}
              >
                Purchased Courses
              </button>
            </div>

            <div>
              <button
                variant={"contained"}
                style={{width:"90px",height:"35px"}}
                className="button-btn"
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
                Logout
              </button>
            </div>
            <div
              style={{
                marginRight: "10px",
                marginTop: "-5px",
                marginLeft: "-5px",
              }}
            >
               <Tooltip
                componentsProps={{
                  tooltip: {
                    sx: {
                      bgcolor: "common.black",
                      "& .MuiTooltip-arrow": {
                        color: "purple",
                      },
                      fontSize: "15px",
                      border: "2px solid #601b99",
                      padding: "5px",
                    },
                  },
                }}
                style={{ padding: "7px" }}
                title={userEmail}
              >
                <IconButton>
                  <Avatar
                    style={{
                      color: "purple",
                      backgroundColor: "whitesmoke",
                      width: "35px",
                      height: "35px",
                      marginLeft:"-5px"
                    }}
                    src="/broken-image.jpg"
                  />
                </IconButton>
              </Tooltip>
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
          marginLeft: "20px",
          marginRight: "20px",
          marginTop: "8px",
        }}
      >
        <div>
          <Typography
            style={{
              color: "white",
              fontFamily: "Kaushan Script",
              cursor: "pointer",
            }}
            onClick={() => {
              navigate("/");
            }}
            variant="h5"
          >
            CourseHub
          </Typography>
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ marginRight: 10 }}>
            <button
              className="button-nav"
              onClick={() => {
                navigate("/register");
              }}
            >
              Signup
            </button>
          </div>
          <div>
            <button
              className="button-nav"
              onClick={() => {
                navigate("/login");
              }}
            >
              Signin
            </button>
          </div>
        </div>
      </div>
    );
  }
}
