//console.log("user file loaded...")
var userName = "ram"
var userAge= 25
// module.exports = userName
// module.exports = userAge

const test = (x)=>{
    console.log("test function",x)
    return x*x
}

module.exports={
    userName,userAge,test
}