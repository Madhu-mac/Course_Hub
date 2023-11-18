import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Signup from "./assets/components/Signup";
import Signin from "./assets/components/Signin";
import Appbar from "./assets/components/Appbar";
import Addcourse from "./assets/components/Addcourse";
import Courses from "./assets/components/Courses";
import Course from "./assets/components/Course";
import Landing from "./assets/components/Landing";
import { RecoilRoot, useSetRecoilState } from "recoil";
import { userState } from "./store/atoms/user";
import "./assets/components/LandingPage.css";


function App() {
  return (
    <RecoilRoot> 
      <div 
        style={{ height: "100vh", width: "100vw", backgroundColor: "#64CCC5" }}
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
      const response = await axios.get("http://localhost:3000/admin/me", {
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
