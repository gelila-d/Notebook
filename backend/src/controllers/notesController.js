 export const getAllNotes=(req,res)=>{
    res.status(200).send("you just fetched notes");
}

 export const createNote=(req,res)=>{
    res.status(201).json({message:"post created successfully"});
}

export const updateNote =(req,res)=>{
    res.status(201).json({message:"post updated successfully"});
}

export const deleteNote=(req,res)=>{
    res.status(200).json({message:"post deleted successfully"});
}