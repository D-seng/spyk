const mongoose = require('mongoose')
const local = 'mongodb://localhost/lx'
const atlas =
  'mongodb+srv://darren-user:minori123@cluster1-yxsma.mongodb.net/test?retryWrites=true'

module.exports = function connectToDb() {
mongoose
    .connect(atlas, { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err))
}

//mongodb://localhost/vidly
//   mongoose.connect(process.env.DB_URL, { useNewUrlParser: true }, error => {
//'mongodb://localhost/lismart'
//mongodb://localhost/lx
