const mailer  = require("nodemailer")


const mailSend = async(to,subject,text)=>{

    const transporter = mailer.createTransport({
        service:"gmail",
        auth:{
            user:"pythonforsamir@gmail.com",
            pass:"jelk cwdj zysb bamj"
        }
    })

    const mailOptions = {
        from:"pythonforsamir@gmail.com",
        to:to,
        subject:subject,
        //text:text
        html:`<html><h1>${text}</h1></html>`
    }

    const mailResponse = await transporter.sendMail(mailOptions)
    console.log(mailResponse)
    
}

//mailSend("samir.vithlani83955@gmail.com","welcome","hi welcome samir..")
module.exports={
    mailSend
}