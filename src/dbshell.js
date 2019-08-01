db.snippets.updateOne(
  {
    "text.subsections": {$elemMatch: {id: "5227e010-5825-11e9-8565-ad52d0bb74d6"}
  }},
  {{$set: {"text.subsections.$.verbiage": "Hey, this is my new verbiage."}}}
)

db.snippets.updateOne(
  {
    _id: ObjectId("5cb27b5e7b039e5714dcd662")
  },
  {$set: {"text[0].verbiage": "Hey, I'm the new verbiage."}}
)


 _id: ObjectId('5cb27b5e7b039e5714dcd662'),

 db.snippets.updateOne(
  {
    "text.subsections": {$elemMatch: {id: "5227e010-5825-11e9-8565-ad52d0bb74d6"}
  }}, {$set: {tenant: "Logical Onramp"}})

   db.snippets.findOne(
  {
    "text.subsections": {$elemMatch: {id: "5227e010-5825-11e9-8565-ad52d0bb74d6"}
  }}).pretty()

  db.snippets.updateOne(
  {
    "text.subsections": {$elemMatch: {id: "5227e010-5825-11e9-8565-ad52d0bb74d6"}
  }}, {$set: {"text[0].subsections.$.verbiage": "Logical Onramp verbiage"}})

    db.snippets.updateOne(
  {
    "text.subsections": {$elemMatch: {id: "5227e010-5825-11e9-8565-ad52d0bb74d6"}
  }}, {$set: {"text[0].verbiage": "Logical Onramp verbiage"}})