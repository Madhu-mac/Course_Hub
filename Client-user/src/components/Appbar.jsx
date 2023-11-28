import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { userState } from "../store/atoms/user";
// import { userEmailState } from "../store/selectors/userEmailState";
// import { userLoggedInState } from "../store/selectors/userIsLoggedIn";
import Typography from "@mui/material/Typography";
import { userEmailState } from "../store/selectors/userEmailState";


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
          overflow: "auto",
          marginTop: "8px"
          // background: "rgba(255, 255, 255, 0.5)"
        }}
      > 
        <div
          style={{ display:"flex", flexDirection:"row", justifyContent: "center", alignItems:"center", marginLeft: 10, cursor: "pointer"  }}
          onClick={() => {
            navigate("/");
          }}
        >
          <Typography 
             style={{ color: "white" ,fontFamily: 'Kaushan Script'}}
            onClick={() => {
              navigate("/");
            }}
            variant={"h6"}
          >
            CourseHub
          </Typography> 
        </div>
        <div style={{ display: "flex"  }}>
          <div style={{ marginRight: 10, display: "flex" }}>
            <div style={{ marginRight: 10 }}>
              <button
                className="button-nav"
                style={{ width: "120px"}}
                onClick={() => {
                  navigate("/courses");
                }}
              >
                All courses
              </button>
            </div>
            <div style={{ marginRight: 10 }}>
              <button style={{ width: "200px"}}
                className="button-nav"
                onClick={() => {
                  navigate("/courses/purchased");
                }}
              >
                Purchased Courses
              </button>
            </div>
            <div style={{ marginRight: 10 }}>
              <button
                variant={"contained"}
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
          marginLeft: '20px',
          marginRight: '20px',
          marginTop: "8px"
        }}
      >
        <div>
          <Typography
             style={{ color: "white" ,fontFamily: 'Kaushan Script', cursor:"pointer"}}
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
