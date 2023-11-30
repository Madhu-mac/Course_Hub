import { TextField } from "@mui/material";
import { Card } from "@mui/material";
import axios from "axios";
import { useState } from "react";

function Addcourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState(0);
  const [isMouseOver, setIsMoueOver] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        minHeight: 50,
        paddingTop: 50,
        minWidth: "100%",
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Card
          className="cardstyle"
          variant="outlined"
          sx={{ minWidth: 300, height: 330 }}
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            fontFamily: "Arial, sans-serif",
            boxShadow: isMouseOver ? "0 0 50px #601b99" : "0 0 10px #601b99",
          }}
          onMouseOver={() => setIsMoueOver(true)}
          onMouseLeave={() => setIsMoueOver(false)}
        >
          <TextField
            style={{ marginBottom: 10 }}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            fullWidth
            label="Title"
            variant="outlined"
          />
          <br />
          <TextField
            style={{ marginBottom: 10 }}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            fullWidth
            label="Description"
            variant="outlined"
          />
          <br />
          <TextField
            style={{ marginBottom: 10 }}
            onChange={(e) => {
              setImage(e.target.value);
            }}
            fullWidth
            label="Image link"
            variant="outlined"
          />
          <TextField
            style={{ marginBottom: 10 }}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            fullWidth
            label="Price"
            variant="outlined"
          />

          <button
            className="button-nav"
            style={{
              display: "flex",
              justifyContent: "center",
              marginLeft: "33%",
              width: "120px"
            }}
            sx={{ bgcolor: "#053B50" }}
          
            onClick={async () => {
              try {
                await axios.post(
                  "https://coursehub-7s37.onrender.com/admin/courses",
                  {
                    title: title,
                    description: description,
                    imageLink: image,
                    published: true,
                    price: price,
                  },
                  {
                    headers: {
                      Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                  }
                );

                alert("Added course!");
              } catch (error) {
                console.error("Error adding course:", error);
                alert("An error occurred while adding the course.");
              }
            }}
          >
            Add Course
          </button>
        </Card>
      </div>
    </div>
  );
}
export default Addcourse;
