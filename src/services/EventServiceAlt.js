// import axios from 'axios'
const axios = require('axios')

const apiClient = axios.create({
  baseURL: `http://localhost:3000/api`,
  withCredentials: false, // This is the default
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getSnippets() {
    return apiClient.get('/snippets')
  },

  getSnippet(id) {
    return apiClient.get('/snippets/' + id)
  },

  getClause(id) {
    ;``
    return apiClient.get('/snippets/' + id, {
      id: '4f88a420-5825-11e9-8565-ad52d0bb74d6'
    })
  },

  postSnippet(snippet) {
    return apiClient.post('/snippets', snippet)
  },

  putSnippet(snippet, id) {
    console.log('EventServiceAlt')
    console.log(snippet)
    console.log(id)
    return apiClient.put('/snippets/' + id, { text: snippet })
  },

  getFeeders() {
    return apiClient.get('/feeders')
  },
  getFeeder(id) {
    return apiClient.get('/feeders/' + id)
  },

  register(newUser) {
    return apiClient.post('/register', newUser)
  },
  authenticateUser(user) {
    return apiClient.post('/auth', user)
  }
}
