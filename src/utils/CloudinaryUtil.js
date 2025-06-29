const cloudinary = require("cloudinary").v2

cloudinary.config({
    cloud_name:"dpjoxqisl",
    api_key:"292199526794599",
    api_secret:"KKZHWhEwjA1Q0zUx4gVfcsvcVRY"
})

const uploadFiletocloud = async(path)=>{

    const cloudinaryres = await cloudinary.uploader.upload(path) //folder...
    return cloudinaryres

}
module.exports = uploadFiletocloud
