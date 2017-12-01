const channelModel = require('../models/channels')

/**
 * Makes api calls on behalf of browser, to circumvent cors
 */

function postSuggestion(channelId, text, userId){
    return new Promise(async resolve=>{
        let suggestion = {
            text,
            userId,
            createdAt: new Date(),
            votes: []
        }
 
        let result = await channelModel.postSuggestion(channelId, suggestion)
        let response = {
            success: result.modifiedCount === 1,
            suggestion
        }
        resolve(response)
    })
}

module.exports = (app) => {
    
    app.get('/api/channels/:id',async (req, res) => {
        let data = {
            channelId: req.params.id,
            channelName: req.query.channelName
        }
        let channel = await channelModel.getChannel(data)
        res.json(channel)
    })

    app.post('/api/channels/:id/suggestions',async (req, res) => {
        let channelId = req.params.id
        let { text, userId } = req.body
        let response = await postSuggestion(channelId, text, userId)
        if(response.success)
            res.status(201).send(response)
        else
            res.status(400).end()
    })
}