import { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress, Skeleton, Typography } from "@mui/material";
import "./courseStyle.css";
import CourseCard from "./CourseCard";

function PurchasedCourses() {
  const [purCourses, setPurchasedCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios.get("https://coursehub-7s37.onrender.com/users/purchasedCourses", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        setPurchasedCourses(res.data.purchasedCourses);
        console.log("data.purchasedCourses", res.data.purchasedCourses);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      <Typography
        variant="h4"
        component="div"
        style={{
          flexGrow: 1,
          padding: "10px",
          borderRadius: "4px",
          fontWeight: "600",
          color: "whitesmoke",
          textAlign: "center",
          marginTop: "70px",
        }}
      >
        Purchased Courses
      </Typography>
      <div className="all-courses">
        {isLoading ? (
           <div style={{ display: "flex", justifyContent: "center", marginTop: "200px" }}>
           <CircularProgress  color="secondary"/>
         </div>
        ) : (
          <>
            {purCourses.length > 0
              ? purCourses.map((course) => (
                  <CourseCard key={course._id} course={course} />
                ))
              : <h2 style={{color:"white"}}>No course has yet been bought!</h2>}
          </>
        )}
      </div>
    </div>
  );
}

export default PurchasedCourses;