import { Box, Button, Card, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Skeleton from "@mui/material/Skeleton";
import CardContent from "@mui/material/CardContent";
import { CardActionArea } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import DownloadIcon from "@mui/icons-material/Download";
import ClosedCaptionIcon from "@mui/icons-material/ClosedCaption";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
import "./courseStyle.css";

function Courses() {
  const [course, setCourse] = useState({});
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const [isPurchased, setIsPurchased] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const courseResponse = await axios.get(
          `http://localhost:3000/users/courses/${id}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );

        setCourse(courseResponse.data.course);

        const purchasedCoursesResponse = await axios.get(
          "http://localhost:3000/users/purchasedCourses",
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );

        setPurchasedCourses(purchasedCoursesResponse.data.purchasedCourses);

        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const isCoursePurchased = purchasedCourses.some((item) => item._id === id);
    setIsPurchased(isCoursePurchased);
  }, [id, purchasedCourses]);

  const handleBuyNow = async () => {
    try {
      setIsLoading(true);

      const response = await axios.post(
        `http://localhost:3000/users/courses/${id}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      toast.success(response.data.message);

      setPurchasedCourses([...purchasedCourses, response.data.purchasedCourse]);
      setIsPurchased(true);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "200px",
        }}
      >
        <Box sx={{ width: 300 }}>
          <Skeleton />
          <Skeleton animation="wave" />
          <Skeleton animation={false} />
        </Box>
      </div>
    );
  }

  return (
    <div className="single-course">
      <div className="text-container">
        <div>
          <img
            src={course?.imageLink}
            alt={course?.imageLink}
            width={"200px"}
            style={{ borderRadius: "20px" }}
          />
        </div>
        <div>
          <h1 className="course-title">{course?.title}</h1>
        </div>
        <br></br>
        <div>
          <h3 className="course-des">{course?.description}</h3>
        </div>

        <div>
          {!isPurchased ? (
            <button className="button-btn"
              style={{width: "180px"}}
              onClick={handleBuyNow}
            >
              BUY NOW @${course?.price}
            </button>
          ) : (
            <div>
              <Button
                variant="contained"
                style={{
                  backgroundColor: "green",
                  padding: "10px 20px",
                  fontWeight: "700",
                  fontSize: "1rem",
                  borderRadius: "50px",
                }}
              >
                Purchased
              </Button>
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#101460",
                  padding: "10px 20px",
                  fontWeight: "700",
                  fontSize: "1rem",
                  borderRadius: "50px",
                  marginLeft: "20px",
                }}
              >
                View Content
              </Button>
            </div>
          )}
        </div>
        
      </div>
      <div>
      <Card 
      className= "cardstyle" 
      variant="outlined"
          sx={{ width: "350px" }}
          style={{
            backgroundColor: "#601b99",
            color: "white",
            borderRadius: "10px",
            paddingRight: "6px",
            display: "flex",
            padding: "8px",
          }}
        >
          <CardActionArea>
            <CardContent style={{ textAlign: "center" }}>
              <Typography gutterBottom variant="h4" component="div" back>
                Course Overview
              </Typography>
              <br />
              <Box
                sx={{
                  bgcolor: "background.paper",
                  color: "black",
                  borderRadius: "20px",
                  padding: "20px 5px",
                }}
              >
                <nav aria-label="main mailbox folders">
                  <List style={{ padding: "10px" }}>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <SignalCellularAltIcon />
                        </ListItemIcon>
                        <ListItemText primary="Beginner to Pro" />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <OndemandVideoIcon />
                        </ListItemIcon>
                        <ListItemText primary="20+ Hours of HD video" />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <FormatListBulletedIcon />
                        </ListItemIcon>
                        <ListItemText primary="150+ Lessons" />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <DownloadIcon />
                        </ListItemIcon>
                        <ListItemText primary="Downloadable content" />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <ClosedCaptionIcon />
                        </ListItemIcon>
                        <ListItemText primary="English captions" />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <MilitaryTechIcon />
                        </ListItemIcon>
                        <ListItemText primary="Certificate of completion" />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <AllInclusiveIcon />
                        </ListItemIcon>
                        <ListItemText primary="Lifetime access" />
                      </ListItemButton>
                    </ListItem>
                  </List>
                </nav>
              </Box>
            </CardContent>
          </CardActionArea>
        </Card>
        </div>
    </div> 
   
  );
}

export default Courses;
