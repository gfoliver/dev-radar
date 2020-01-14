const { Router } = require('express')
const DevController = require('./controllers/DevController')
const SearchController = require('./controllers/SearchController')

const routes = Router()

// Create devs
routes.post('/devs', DevController.store)

// Fetch all devs
routes.get('/devs', DevController.index)

// Delete devs
routes.post('/devs/delete', DevController.destroy)

// Search devs
routes.get('/search', SearchController.index)

module.exports = routes