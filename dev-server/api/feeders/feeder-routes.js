const express = require('express')
const router = express.Router()
// const controller = require('./feeder-controller.js/index.js')
const { Feeder } = require('../../model/feeder')
// const db = require('./index.js')

// router.post('/feeder', (req, res) => {
//   res.send('post a feeder')
// })

router.get('/feeders', async (req, res) => {
  await Feeder.find({}, (error, feeders) => {
    if (error) {
      return res.status(500).json()
    }
    return res.status(200).json({ feeders })
  })
  //.populate('contributor', 'username', 'user')
})

router.get('/feeders/:id', async (req, res) => {
  // res.send('get a feeder')

  const feeder = await Feeder.findById(req.params.id)
  if (!feeder) return res.status(404).send('Feeder not found')
  res.send(feeder)
})

router.put('/feeders/:id', async (req, res) => {
  console.log('router.put')
  console.log(req.body)
  const feeder = await Feeder.findByIdAndUpdate(
    req.params.id,
    {
      text: req.body.verbiage
    },
    { new: true }
  )
  if (!feeder) return res.status(404).send('Feeder not found')
  const result = await feeder.save()
  res.send(result)
})

router.post('/feeders', async (req, res) => {
  const feeder = new Feeder({
    verbiage: req.body.verbiage,
    intent: req.body.intent
  })
  const result = await feeder.save()
  //.insertOne({ text: req.body, createdAt: new Date() })
  // res.status(201).send(feeder)
  console.log(result)
  res.send(result)
})

router.delete('/feeder', (req, res) => {
  res.send('delete a feeder')
})

// async function loadLisCollection() {
//   const client = await connectToDb()
//   return client.db('lismart').collection('posts')
// }

module.exports = router

// router.post('/', [auth, validate(validateGenre)], async (req, res) => {
//   const genre = new Genre({ name: req.body.name })
//   await genre.save()
//   res.send(genre)
// })
