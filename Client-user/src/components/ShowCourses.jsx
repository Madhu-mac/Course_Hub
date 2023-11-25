import React, { useEffect, useState } from "react";
import { Card, Skeleton, Typography } from "@mui/material";
import "../index.css";
import { atom, useRecoilState } from "recoil";
import axios from "axios";
import CourseCard from "./CourseCard";
import "./courseStyle.css"


const coursesState = atom({
  key: "coursesState",
  default: [],
});

function ShowCourses() {
   const [courses, setCourses] = useRecoilState(coursesState);
   const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://localhost:3000/users/courses/", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setCourses(res.data.courses);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  return (<div>
    <Typography
          variant="h4"
          component="div"
          style={{
            padding: "10px",
            borderRadius: "4px",
            fontWeight: "bold",
            color: "#101460",
            textAlign: "center",
            marginTop: "70px",
            marginLeft: "210px",
          }}
        >
          All Courses
        </Typography>
    {/* <Card
      // style={{
      //   margin: 10,
      //   width: 1000,
      //   minHeight: 100,
      // }}
    >     */}
       <div className="all-courses">
          {isLoading ? (
            <div style={{ display: "flex", gap: "20px" }}>
              <Skeleton variant="rectangular" width={345} height={400} />
              <Skeleton variant="rectangular" width={345} height={400} />
              <Skeleton variant="rectangular" width={345} height={400} />
            </div>
          ) : (
            <>
              {courses.length > 0
                ? courses.map((course) => (
                    <CourseCard key={course._id} course={course} />
                  ))
                : "Oops! No course is currently offered. Return later!"}
            </>
          )}
        </div>
    {/* </Card> */}
  </div>
  );
}

export default ShowCourses;
