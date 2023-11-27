import { Card, Typography, TextField, Button, Grid } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { courseState } from "../store/atoms/course";
import {
  courseDescription,
  courseImage,
  coursePrice,
  courseTitle,
  isCourseLoading,
} from "../store/selectors/course";
import { Loading } from "./Loading";

function Course() {

  let { courseId } = useParams();
  const setCourse = useSetRecoilState(courseState);
  const courseLoading = useRecoilValue(isCourseLoading);

  useEffect(() => {
    axios
      .get("http://localhost:3000/admin/course/" + courseId, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setCourse({ isLoading: false, course: res.data.course });
      });
  }, []);
  if (courseLoading) {
    return <Loading />;
  }

  return (
    <div>
      <GrayTopper />
      <Grid container>
        <Grid item lg={8} md={12} sm={12}>
          <UpdateCard />
        </Grid>
        <Grid item lg={4} md={12} sm={12}>
          <CourseCard />
        </Grid>
      </Grid>
    </div>
  );
}

function GrayTopper() {
  const title = useRecoilValue(courseTitle);
  return (
    <div
      style={{
        height: 250,
        background: "#212121",
        top: 0,
        width: "100vw",
        zIndex: 0,
        marginBottom: -250,
      }}
    >
      <div
        style={{
          height: 250,
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div>
          <Typography
            style={{ color: "white", fontWeight: 600 }}
            variant="h3"
            textAlign={"center"}
          >
            {title}
          </Typography>
        </div>
      </div>
    </div>
  );
}
function UpdateCard() {
  const [courseDetails, setCourse] = useRecoilState(courseState);

  const [title, setTitle] = useState(courseDetails.course.title);
  const [description, setDescription] = useState(
    courseDetails.course.description
  );
  const [image, setImage] = useState(courseDetails.course.imageLink);
  const [price, setPrice] = useState(courseDetails.course.price);
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card variant="outlined" sx={{ maxWidth: 600, p: 4, marginTop: 20 }}>
          <div style={{ padding: 20 }}> </div>
          <Typography>Update course details</Typography>
          <TextField
            value={title}
            style={{ marginBottom: 10 }}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            fullWidth
            label="title"
            variant="outlined"
          />
          <br />
          <br />
          <TextField
            value={description}
            style={{ marginBottom: 10 }}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            fullWidth
            label="Description"
            variant="outlined"
          />
          <br />
          <br />
          <TextField
            value={image}
            style={{ marginBottom: 10 }}
            onChange={(e) => {
              setImage(e.target.value);
            }}
            fullWidth
            label="Image link"
            variant="outlined"
          />
          <TextField
            value={price}
            style={{ marginBottom: 10 }}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            fullWidth
            label="price"
            variant="outlined"
          />
          <Button
            sx={{
              bgcolor: "#053B50",
              ":hover": {
                bgcolor: "#115469",
              },
            }}
            variant={"contained"}
            onClick={async () => {
              axios.put(
                "http://localhost:3000/admin/courses/" +
                  courseDetails.course._id,
                {
                  title: title,
                  description: description,
                  imageLink: image,
                  published: true,
                  price,
                },
                {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token"),
                  },
                }
              );
              let updatedCourse = {
                _id: courseDetails.course._id,
                title: title,
                description: description,
                imageLink: image,
                price,
              };
              setCourse({ course: updatedCourse, isLoading: false });
            }}
          >
            Update course
          </Button>
         <Delcourse/>
        </Card>
      </div>
    </div>
  );
}

function Delcourse() {
  const navigate = useNavigate();
  const [courseDetails, setCourse] = useRecoilState(courseState);

  return <Button
    sx={{
      bgcolor: "#053B50",
      ":hover": {
        bgcolor: "#115469",
      },
    }}
    style={{marginLeft: "10px"}}
    variant={"contained"}
    onClick={async () => {
      try {
        const response = await axios.delete(
          "http://localhost:3000/admin/courses/" + courseDetails.course._id,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        if (response.status === 200) {
          alert("Course deleted successfully");
          navigate("/courses");
          setCourse({ course: null, isLoading: false });
        } else {
          console.error("Course deletion failed");
        }
      } catch (error) {
        console.error("Error deleting course:", error);
      }
    }}
  >
    Delete Course
  </Button>;
}

function CourseCard() {
  const title = useRecoilValue(courseTitle);
  const imageLink = useRecoilValue(courseImage);
  const description = useRecoilValue(courseDescription);
  const price = useRecoilValue(coursePrice);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card
        style={{
          margin: 10,
          width: 300,
          minHeight: 100,
          borderRadius: 20,
          marginRight: 50,
          paddingBottom: 15,
          zIndex: 2,
        }}
      >
        <img src={imageLink} style={{ width: 350 }}></img>
        <div style={{ marginLeft: 10 }}>
          <Typography textAlign={"center"} variant="h6">
            {title}
          </Typography>
          <Typography textAlign={"center"} variant="subtitle2">
            {description}
          </Typography>
          <Typography variant="subtitle2" style={{ color: "grey" }}>
            Price
          </Typography>
          <Typography variant="subtitle1">
            <b> Rs {price}</b>
          </Typography>
        </div>
      </Card>
    </div>
  );
}

export default Course;
