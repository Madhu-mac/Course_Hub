import { Button, Card, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/admin/courses/",
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );

        const data = response.data;
        console.log(data);
        setCourses(data.courses);
        console.log(courses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
    >
      {courses.map((course) => (
        <Course key={course._id} course={course} />
      ))}
    </div>
  );
}
function Course({ course }) {
  const navigate = useNavigate();

  return (
    <div>
      <Card
        style={{
          margin: 10,
          width: 300,
          minHeight: 100,
        }}
      >
        <Typography textAlign={"center"} variant="h6">
          {course.title}
        </Typography>
        <Typography textAlign={"center"} variant="subtitle1">
          {course.description}
        </Typography>
        <img src={course.imageLink} style={{ width: 300 }} />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            sx={{
              bgcolor: "#053B50",
              ":hover": {
                bgcolor: "#115469",
              },
            }}
            variant={"contained"}
            size="large"
            onClick={() => {
              navigate("/course/" + course._id);
            }}
          >
            Edit
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default Courses;
