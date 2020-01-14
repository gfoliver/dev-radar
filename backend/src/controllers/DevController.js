const axios = require('axios')
const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray')

module.exports = {
    async index(req, res) {
        try {
            const devs = await Dev.find()
            return res.json(devs)
        }
        catch(error) {
            console.log(error)
            return res.json({"status": false})
        }
    },

    async store(req, res) {
    
        const { github_username, techs, longitude, latitude } = req.body

        let dev = await Dev.findOne({ github_username })

        if (! dev) {
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`)
        
            const { name = login, avatar_url, bio } = apiResponse.data
        
            let techsArray = parseStringAsArray(techs)
        
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }
        
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location
            })
        
            res.json({
                "status": true,
                "message": "Dev registered successfully",
                "dev": dev
            })
        } 
        else {
            res.json({
                "status": false,
                "message": "Dev already registered"
            })
        }
    }
}