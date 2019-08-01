db.persons
  .aggregate([
    { $match: { gender: 'female' } },
    {
      $group: { _id: { state: '$location.state' }, totalPersons: { $sum: 1 } }
    },
    { $sort: { totalPersons: 1 } }
  ])
  .pretty()

db.persons.aggregate([
  { $match: { 'dob.age': { $gt: 50 } } },
  {
    $group: {
      _id: { gender: '$gender' },
      totalPersons: { $sum: 1 },
      avgAge: { $avg: '$dob.age' }
    }
  },
  { $sort: { totalPersons: 1 } }
])

db.persons.aggregate([
  {
    $project: {
      _id: 0,
      location: {
        $concat: [
          { $concat: [ {$toUpper: {$substrCP: ['$location.city',0,1]}}, 
            {$substrCP: ['$location.city', 1, {$subtract: [{$strLenCP: '$location.city'}, 1] }]}]},
          ', ',
          { $concat: [ {$toUpper: {$substrCP: ['$location.state',0,1]}}, 
            {$substrCP: ['$location.state', 1, {$subtract: [{$strLenCP: '$location.state'}, 1] }]}]}
        ]
      },
      geo: { type: "Point", coordinates: [
        {$toDouble: "$location.coordinates.longitude"},
        {$toDouble: "$location.coordinates.latitude" } 
      ]},
      birthdate: {
        $dateFromString: {dateString: "$dob.date"}
      },
      age: "$dob.age"
    }
  }
])


db.friends.aggregate([
  {$project: { _id: 0, name: 1, numScores: { $size: "$examScore"} }}
])

db.friends.aggregate([
{ $unwind: "$hobbies"},
{ $group: { _id: { age: "$age" }, allHobbies: { $addToSet: "$hobbies" }, allNames: { $push: "$name"}}}
])

db.friends.aggregate([
{ $group: { _id: { examScores: { $filter: {input: "$examScore", as: "sc", cond: { $gt: ["$$sc.score", 60]}}}}}},
{ $project: {name: 1}}
])

db.friends.aggregate([


])
,
,
      geo: { type: "Point", coordinates: [
        {"$location.coordinates.longitude"},
        {"$location.coordinates.latitude" }
      ]}
      fullName: { $concat: ['$name.first', ' ', '$name.last'] }
      {$strLenCP: '$location.city'} - 1

db.runCommand({collMod: "users",
      validator: {
        required: ["username", "first", "last", "email", "password"],
        properties: {
          username: {
            bsonType: "string",
            description: "must be a string and is required"
          },
          first: {
            bsonType: "string",
            description: "must be a string and is required"
          },
          last: {
            bsonType: "string",
            description: "must be a string and is required"
          },
          email: {
            bsonType: "string",
            description: "must be a string and is required"
          },
          password: {
            bsonType: "string",
            description: "must be a string and is required"
          }
        }
      }
})
 for (i = 5; i < 8; i++) {
    db.users.insertOne({
    username: "Yuko" + i, 
    first: "yuko" + i, 
    last: "Nakashima", 
    email: i + "yuko@gmail.com", 
    password: "123456"
  })
 }