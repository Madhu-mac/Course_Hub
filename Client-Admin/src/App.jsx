import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Appbar from "./components/Appbar";
import Addcourse from "./components/Addcourse";
import Courses from "./components/Courses";
import Course from "./components/Course";
import Landing from "./components/Landing";
import { RecoilRoot, useSetRecoilState } from "recoil";
import { userState } from "./store/atoms/user";
import "./components/LandingPage.css";
import backgroundImg from "../public/Background.svg"

function App() {
  return (
    <RecoilRoot> 
      <div 
        style={{
          backgroundImage: `url(${backgroundImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          alignItems: "center",
          backgroundColor: "black",
          overflow: "auto"
        }}
      >
        <Router>
          <Appbar />
          <InitUser />
          <Routes>
            <Route path="/courses" element={<Courses />} />
            <Route path="/course/:courseId" element={<Course />} />
            <Route path="/addcourse" element={<Addcourse />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Landing />} />
          </Routes>
        </Router>
      </div>
    </RecoilRoot>
  );
}

function InitUser() {
  const setUser = useSetRecoilState(userState);
  const init = async () => {
    try {
      const response = await axios.get("https://coursehub-7s37.onrender.com/admin/me", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      if (response.data.username) {
        setUser({
          isLoading: false,
          userEmail: response.data.username,
        });
      } else {
        setUser({
          isLoading: false,
          userEmail: null,
        });
      }
    } catch (e) {
      setUser({
        isLoading: false,
        userEmail: null,
      });
    }
  };

  useEffect(() => {
    init();
  }, []);

  return <></>;
}

export default App;
