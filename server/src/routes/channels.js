const channelModel = require('../models/channels')
const userUtil = require('../../../shared/user-util')

/**
 * Makes api calls on behalf of browser, to circumvent cors
 */

async function postSuggestion(channelId, text, user){

    let channel = await channelModel.getChannel(channelId)
    let userId = user.id
    console.log(user)
    return new Promise(async resolve=>{
        let suggestion = {
            text,
            userId,
            createdAt: new Date(),
            isApproved: !channel.requireApproval,
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
        let channelId = req.params.id
        let channelName = req.query.channelName
        let channel = await channelModel.getChannel(channelId, channelName)
        res.json(channel)
    })

    app.post('/api/channels/:id/suggestions',async (req, res) => {
        let channelId = req.params.id
        let { text, user } = req.body
        let response = await postSuggestion(channelId, text, user)
        if(response.success)
            res.status(201).send(response)
        else
            res.status(400).end()
    })
}