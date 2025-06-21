const { model } = require("mongoose")
const multer = require("multer")

const storage = multer.diskStorage({
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    },
    destination:"./uploads"
})

const upload = multer({
    storage:storage,
    //fileFilter:()//loginc
    //limits:{}bytes...
}).single("file")//profilePic, policy....

const uploadFile =async(req,res)=>{

    upload(req,res,(err)=>{
        if(err){
            res.status(500).json({
                message:err
            })   
        }
        else{
            //file path datbase...
            console.log(req.body)
            res.status(201).json({
                message:"file uploaded successfully!!!",
                data:req.file
            })
        }

    })


}

module.exports= {
    uploadFile
}

