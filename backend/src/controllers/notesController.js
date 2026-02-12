 import Note from "../models/Note.js"
 export const getAllNotes= async (req,res)=>{
    try
    {  const notes = await Note.find().sort({createdAt:-1});
        res.status(200).send(notes);}
        catch(error){
            console.error("error in getAllNotes controller", error);
            res.status(500).json({message:"Internal server error"})
        }
}



export const getNoteById= async (req,res)=>{
     try
   { 
  const note= await Note.findById(req.params.id);
  if(!note) return res.status(404).json({message:"note not found"});
    
    res.status(201).json(note);}

    catch(error){
            console.error("error in getNoteById controller", error);
            res.status(500).json({message:"Internal server error"})
        }
}

 export const createNote= async(req,res)=>{
    try
    {   const {title,content}= req.body;
        const note= new Note ({title:title, content:content});
         const savedNote = await note.save();
        res.status(201).json(savedNote);
} 
 catch(error){
            console.error("error in createNotes controller", error);
            res.status(500).json({message:"Internal server error"})
        }

}

export const updateNote = async(req,res)=>{
    try
   { const {title,content}= req.body;
   const updatedNote = await Note.findByIdAndUpdate(
    req.params.id,
    {title:title,content:content},
    {new:true,})

    if(!updatedNote) return res.status(404).json({message:"note not found"})
    
    res.status(201).json(updatedNote);}

    catch(error){
            console.error("error in createNotes controller", error);
            res.status(500).json({message:"Internal server error"})
        }
}  



export const deleteNote= async (req,res)=>{
     try
   { 
  const deletedNote= await Note.findByIdAndDelete(req.params.id);
  if(!deletedNote) return res.status(404).json({message:"note not found"});
    
    res.status(201).json({message:"note deleted successfully"});}

    catch(error){
            console.error("error in deleteNote controller", error);
            res.status(500).json({message:"Internal server error"})
        }
}