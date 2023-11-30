import Card from "@mui/material/Card";
import PropTypes from "prop-types";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function CourseCard(props) {
  const navigate = useNavigate();
  const [isMouseOver, setIsMoueOver] = useState(false);
  return (
    <div>
      <Card
        className="cardstyle"
        variant="outlined"
        sx={{ minWidth: 80, width: 240, height: 245 }}
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          fontFamily: "Arial, sans-serif",
          boxShadow: isMouseOver ? "0 0 50px #601b99" : "0 0 10px #601b99",
        }}
        onMouseOver={() => setIsMoueOver(true)}
        onMouseLeave={() => setIsMoueOver(false)}
        onClick={() => {
          navigate(`/courses/${props.course._id}`);
        }}
      >
        <div>
          <CardMedia
            sx={{
              height: 120,
              width: 80,
              minWidth: "100%",
              borderRadius: "20px",
            }}
            image={props.course.imageLink}
            title={props.course.title}
          />
          <CardContent
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              style={{
                fontSize: "18px",
                fontWeight: "700",
                color: isMouseOver && "#601b99",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                "-webkit-line-clamp": 2, // Set the maximum number of lines to 2
                "-webkit-box-orient": "vertical",
              }}
            >
              {props.course.title}
            </Typography>
            <Typography
              gutterBottom
              variant="p"
              component="div"
              style={{
                fontWeight: "50",
                fontFamily: "inherit",
                display: "-webkit-box",
                fontSize: "12px",
                WebkitLineClamp: 1,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
                color: isMouseOver && "#601b99",
              }}
            >
              {props.course.description}
            </Typography>
            <br />
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              style={{
                fontWeight: "900",
                color: isMouseOver && "#601b99",
                fontSize: "15px",
              }}
            >
              ${props.course.price}
            </Typography>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}

CourseCard.propTypes = {
  course: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    imageLink: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default CourseCard;
