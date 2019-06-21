const express = require('express')
const router = express.Router()
const controller = require('./snippets-controller.js')
const { Snippet } = require('../../model/snippet')
// const db = require('./index.js')

// router.post('/snippet', (req, res) => {
//   res.send('post a snippet')
// })

router.get('/snippets', async (req, res) => {
  await Snippet.find({}, (error, snippets) => {
    if (error) {
      return res.status(500).json()
    }
    return res.status(200).json({ snippets })
  })
  //.populate('contributor', 'username', 'user')
})

router.get('/snippets/:id', async (req, res) => {
  // res.send('get a snippet')

  const snippet = await Snippet.findById(req.params.id)
  if (!snippet) return res.status(404).send('Snippet not found')
  res.send(snippet)
})

router.put('/snippets/:id', async (req, res) => {
  console.log('router.put')
  console.log(req.body)
  const snippet = await Snippet.findByIdAndUpdate(
    req.params.id,
    {
      text: req.body.text
    },
    { new: true }
  )
  if (!snippet) return res.status(404).send('Snippet not found')
  const result = await snippet.save()
  res.send(result)
})

router.post('/snippets', async (req, res) => {
  const snippet = new Snippet({
    text: req.body.text,
    tenant: req.body.tenant,
    landlord: req.body.landlord,
    property: req.body.property
  })
  const result = await snippet.save()
  //.insertOne({ text: req.body, createdAt: new Date() })
  // res.status(201).send(snippet)
  console.log(result)
  res.send(result)
})

router.delete('/snippet', (req, res) => {
  res.send('delete a snippet')
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
