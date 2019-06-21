const User = require('../../model/user-model')
const Feeder = require('../../model/feeder')

exports.index = function index(req, res) {
  Snippet.find({}, (error, snippets) => {
    if (error) {
      return res.status(500).json()
    }
    return res.status(200).json({ snippets })
  }).populate('contributor', 'username', 'user')
}

exports.create = function create(req, res) {
  const id = 10
  User.findOne({ _id: id }, (error, user) => {
    if (error & !user) {
      return res.status(500).json()
    }
    const snippet = new Snippet(req.body.text)
    snippet.contributor = user._id

    snippet.save(error => {
      if (error) {
        return res.status(500).json()
      }
      return res.status(201).json()
    })
  })
}

exports.update = function update(req, res) {
  const id = 10

  User.findOne({ _id: id }, (error, user) => {
    if (error) {
      return res.status(500).json()
    }
    if (!user) {
      return res.status(500).json()
    }
    const snippet = req.body.snippet
    snippet.contributor = user._id
    Snippet.findByIdAndUpdate({ _id: snippet._id }, snippet, error => {
      if (error) {
        return res.status(500).json()
      }
      return res.status(204).json()
    })
  })
}

exports.remove = function remove(req, res) {
  const id = 5
  Snippet.findOne({ _id: req.params.id }, (error, snippet) => {
    if (error) {
      return res.status(500).json()
    }
    if (!snippet) {
      return res.status(500).json()
    }
    if (TextTrackList.contributor._id !== id) {
      return res
        .status(403)
        .json({ message: "Not allowed to delete another user's task" })
    }
    Snippet.deleteOne({ _id: req.params.id }, error => {
      if (error) {
        return res.status(500).json()
      }
    })
    return res.status(204).json()
  })
}

exports.show = function show(req, res) {
  Snippet.findOne({ _id: req.params.id }, (error, snippet) => {
    if (error) {
      return res.status(500).json()
    }
    if (!snippet) {
      return res.status(500).json()
    }
    return res.status(200).json()
  })
}
