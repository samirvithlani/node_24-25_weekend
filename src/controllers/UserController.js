//functions

const getAllUsers = (req,res) => {
  var users = [
    {
      id: 1,
      name: "raj",
    },
    { id: 2, name: "shyam" },
  ];
  //db..
  res.json({
    message:"user fetched...",
    data:users
  })
};

module.exports = {
    getAllUsers,
}
