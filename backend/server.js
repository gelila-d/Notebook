import express from "express";
const app = express();

app.get("/api/notes",(req,res)=>{
    res.status(200).send("you got 5 notes");
});

app.post("/api/notes",(req,res)=>{
    res.status(201).json({message:"post created successfully"});
});

app.put("/api/notes/:id",(req,res)=>{
    res.status(200).json({message:"post created successfully"});
});

app.delete("/api/notes/:id",(req,res)=>{
    res.status(200).json({message:"post deleted successfully"});
});

app.listen(5002,()=>{
    console.log("server started on port: 5002");
});