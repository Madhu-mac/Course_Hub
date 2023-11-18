import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isUserLoading } from "../../store/selectors/isUserLoading";
import { userEmailState } from "../../store/selectors/userEmail";
import { userState } from "../../store/atoms/user";
import { Loading } from "./Loading";
import "/src/App.css";

function Appbar() {
  const navigate = useNavigate();
  const userLoading = useRecoilValue(isUserLoading);
  const userEmail = useRecoilValue(userEmailState);
  const setUser = useSetRecoilState(userState);

  if (userLoading) {
    return<div>

    </div>
  }

  if (userEmail) {
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
          style={{ marginLeft: 10, cursor: "pointer" }}
          onClick={() => {
            navigate("/");
          }}
        >
          <Typography variant={"h6"}>CourseHub</Typography>
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
                  navigate("/addcourse");
                }}
              >
                Add Course
              </Button>
            </div>
            <div style={{ marginRight: 10 }}>
              <Button
                sx={{ bgcolor: "#053B50" }}
                onClick={() => {
                  navigate("/courses");
                }}
              >
                Courses
              </Button>
            </div>
            <div style={{ marginRight: 10 }}>
              <Button
                variant={"contained"}
                sx={{ bgcolor: "#053B50" }}
                onClick={() => {
                  localStorage.setItem("token", null);
                   window.location ="/"
                  setUser({
                    isLoading: false,
                    userEmail: null,
                  });
                }}
              > Logout
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      padding: "10px",
      zIndex: 1,
      overflow: "auto"

  }}>
      <div>
        <Typography>CourseHub</Typography>
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
              navigate("/signup");
            }}
          >
            {" "}
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
              navigate("/signin");
            }}
          >
            {" "}
            Signin
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Appbar;
