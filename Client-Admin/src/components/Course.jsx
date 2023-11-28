import { Card, Typography, TextField, Button, Grid, CircularProgress, CardMedia } from "@mui/material";
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
      .get(`http://localhost:3000/admin/courses/${courseId}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        // console.log(res.data)
        setCourse({ isLoading: false, course: res.data.course });
      });
  }, []);
  if (courseLoading) {
    return <div>
      <Loading /> 
    </div>
    
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
    
        <div>
          <Typography
            style={{ color: "white", fontWeight: 600 , margin: "20px" , marginBottom: "40px"}}
            variant="h3"
            textAlign={"center"}
          >
            {title}
          </Typography>
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
  const [isMouseOver, setIsMouseOver] = useState(false);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card 
          className= "cardstyle" 
          variant="outlined" 
          sx={{ minWidth: 600,}}
          style={{
          display: "flex",
          zIndex: 1,
          marginBottom: "40px",
          flexDirection: "column",
          fontFamily: "Arial, sans-serif",  
          boxShadow: isMouseOver ? "0 0 50px #601b99" : "0 0 10px #601b99",
        }}
        onMouseOver={() => setIsMouseOver(true)}
        onMouseLeave={() => setIsMouseOver(false)}
        >
          <Typography variant="h6"
          >Update course details</Typography>
          <br></br>
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
           <br />
          <br />
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
          <div>
          <button
            className="button-nav"
            variant="contained"
            style={{ width: "150px"}}
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
          </button>
          <Delcourse />
          </div>
        </Card>
      </div>
    </div>
  );
}

function Delcourse() {
  const navigate = useNavigate();
  const [courseDetails, setCourse] = useRecoilState(courseState);

  return (
    <button
       className="button-nav"
      style={{ marginLeft: "10px" , width: "150px"}}
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
    </button>
  );
}

function CourseCard() {
  const title = useRecoilValue(courseTitle);
  const imageLink = useRecoilValue(courseImage);
  const description = useRecoilValue(courseDescription);
  const price = useRecoilValue(coursePrice);
  
  // console.log(imageLink, "imagelink")
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card
        className="cardstyle"
        
      >
        <div style={{ marginLeft: 10 , zIndex: 2, }}>
          <Typography textAlign={"center"} variant="h6">
            {title}
          </Typography>
          <Typography textAlign={"center"} variant="subtitle2">
            {description}
          </Typography>
          <img src={imageLink} style={{ width: 350 }} />
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
