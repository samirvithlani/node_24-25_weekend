//match and group sort
aggrgation
db.employees.aggregate([{$sort:{firstName:1}}])
db.employees.aggregate([{$match:{gender:"male"}},{$sort:{salary:-1}}])

$project:
db.students.aggregate([{$project:{name:1,department:1}}])

reneame
db.students.aggregate([{$project:{name:1,studentAddress:"$address"}}])
db.products.aggregate([{$project:{name:1,total:{$multiply:["$price","$stock"]}}}])

db.students.aggregate([{$unwind:"$marks"},{$project:{name:1,total:{$add:"$marks"}}}])
db.products.aggregate([{$project: {name: 1,averageRating: { $avg: "$reviews.rating" }}}])

#exclude
db.products.aggregate([{$project:{_id:0,reviews:0}}])+++++
condition
db.employees.aggregate([{$project:{name:1,status:{$cond:{
    if:{$gte:["$salary",5000]},
    then:"good",
    else:"average"
}}}}])

products

Show only name and price.
Exclude the _id and reviews fields.
Rename the stock field to availableStock.
Create a new field discountedPrice using price and discount.
Use $cond to show highRating only if rating ≥ 4.5, else say "Below Standard".
Project only the warehouse value from the nested location.
Count how many tags the product has using $size.
Show only the first tag from the tags array.
Concatenate name and category to create a display name like "Desk (Furniture)".
Multiply stock and price to show the total stock value.
Show the rating of the first review only.
Create a boolean field isWellStocked that is true if stock > 10.
Calculate how many days old the product is using the createdAt date.
Rename brand to manufacturer and category to type.
Show stockStatus as "In Stock" or "Out of Stock" using $cond.


db.products.aggregate([{$project:{name:1,firstReview:{$arrayElemAt:["$reviews",0]}}}])
db.products.aggregate([{$project:{averageRating: { $avg: "$reviews.rating" }}}])

db.products.aggregate([
  {
    $addFields: {
      status: "active"
    }
  },
  {
    $project: {
      price: 0
    }
  }
])











  
