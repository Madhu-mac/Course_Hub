import { TextField} from "@mui/material";
import {Button} from "@mui/material";
import {Card }from "@mui/material";
import axios from "axios";
import { useState } from "react";

function Addcourse(){
  const [title, setTitle] =useState("");
  const [description, setDescription] =useState("");
  const [image, setImage] =useState("");
  const [price, setPrice] =useState(0)

  return <div style={{display: "flex",  justifyContent: 'center', minHeight: 50, paddingTop: 50}}>
    <div style={{display: "flex",  justifyContent: 'center'}}>
    <Card variant="outlined" sx={{width : 300 , p: 4, mt: 2}}>
    <TextField 
    style={{marginBottom: 10}}
      onChange={(e) =>{
         setTitle(e.target.value)
      }}
      fullWidth 
      label="Title" 
      variant="outlined" />
    <br/>
    <TextField 
        style={{marginBottom: 10}}
        onChange={(e) =>{
          setDescription(e.target.value)
        }}
        fullWidth 
        label="Description" 
        variant="outlined"
        />
      <br/>
      <TextField 
          style={{marginBottom: 10}}
          onChange={(e) =>{
          setImage(e.target.value)
        }}
        fullWidth 
        label="Image link" 
        variant="outlined"
        />
        <TextField 
        style={{marginBottom: 10}}
        onChange={(e) =>{
          setPrice(e.target.value)
        }}
        fullWidth 
        label="Price" 
        variant="outlined"
        />
        
      <Button style={{marginBottom: 10}}
       sx={{bgcolor:"#053B50"}}
               variant={"contained"}
               onClick={async () => {
                try {
                  await axios.post("http://localhost:3000/admin/courses", {
                    title: title,
                    description: description,
                    imageLink: image,
                    published: true,
                    price: price
                  }, {
                    headers: {
                      "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                  });
              
                  alert("Added course!");
                } catch (error) {
                  console.error("Error adding course:", error);
                  alert("An error occurred while adding the course.");
                }
              }}
            >Add Course</Button>
            </Card></div>
</div>


}
export default Addcourse;