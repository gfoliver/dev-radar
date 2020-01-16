const axios = require('axios')
const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray')
const formatErrorOnConsole = require('../utils/formatErrorOnConsole')

module.exports = {
    async index(req, res) {
        try {
            const devs = await Dev.find()
            return res.json(devs)
        }
        catch(error) {
            formatErrorOnConsole('DevController', 'index', error)
            return res.json({"status": false, "message": "Error fetching devs"})
        }
    },

    async store(req, res) {
    
        const { github_username, techs, longitude, latitude } = req.body

        if (! github_username || ! techs)
            return res.json({
                "status": false,
                "message": "Missing Fields"
            })

        let dev = await Dev.findOne({ github_username })

        if (! dev) {
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`)
                .catch(error => {
                    if (error.response.status == 404) {
                        return res.json({status: false, message: "Github user not found"})
                    }
                })
        
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
        
            return res.json({
                "status": true,
                "message": "Dev registered successfully",
                "dev": dev
            })
        } 
        else {
            return res.json({
                "status": false,
                "message": "Dev already registered"
            })
        }
    },

    async destroy(req, res) {
        const { github_username } = req.body

        const dev = await Dev.findOne({github_username})

        if (! dev)
            return res.json({status: false, message: "User not found"})


        try {
            await Dev.findOneAndDelete({github_username})

            return res.json({status: true, message: "Dev deleted successfully"})
        }
        catch(error) {
            formatErrorOnConsole('DevController', 'destroy', error)
            return res.json({status: false, message: "Error"})
        }
    }
}