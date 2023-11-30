import { Avatar, Button, IconButton, Tooltip, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isUserLoading } from "../store/selectors/isUserLoading";
import { userEmailState } from "../store/selectors/userEmail";
import { userState } from "../store/atoms/user";
import "/src/App.css";

function Appbar() {
  const navigate = useNavigate();
  const userLoading = useRecoilValue(isUserLoading);
  const userEmail = useRecoilValue(userEmailState);
  const setUser = useSetRecoilState(userState);

  // if (userLoading) {
  //   return (
  //     <div>
  //       <Loading />
  //     </div>
  //   );
  // }

  if (userEmail) {
    console.log(userEmail, "useremail");
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: 4,
          zIndex: 1,
          marginTop: "8px",
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
                style={{ width: "100px" }}
                onClick={() => {
                  navigate("/addcourse");
                }}
              >
                Add Course
              </button>
            </div>
            <div style={{ marginRight: 10 }}>
              <button
                className="button-nav"
                style={{ width: "80px" }}
                onClick={() => {
                  navigate("/courses");
                }}
              >
                Courses
              </button>
            </div>
            <div style={{ marginRight: 10 }}>
              <button
                variant={"contained"}
                className="button-btn"
                style={{width:"90px",height:"35px"}}
                onClick={() => {
                  localStorage.setItem("token", null);
                  localStorage.setItem("userEmail", null); // Clear userEmail as well
                  setUser({
                    isLoading: false,
                    userEmail: null,
                  });
                  navigate("/"); // Redirect to the home page or any desired route
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
                      marginLeft:"-10px"
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

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "10px",
        zIndex: 1,
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
              navigate("/signup");
            }}
          >
            Signup
          </button>
        </div>
        <div>
          <button
            className="button-nav"
            onClick={() => {
              navigate("/signin");
            }}
          >
            Signin
          </button>
        </div>
      </div>
    </div>
  );
}

export default Appbar;
