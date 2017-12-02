const channelModel = require('../models/channels')
const userUtil = require('../../../shared/user-util')

async function addSuggestion(channelId, data){
    let channel = await channelModel.getChannel(channelId)
    
    return new Promise(async resolve=>{
        let suggestion = {
            createdAt: new Date(),
            isApproved: !channel.requireApproval,
            votes: [],
            ...data,
        }
 
        let result = await channelModel.addSuggestion(channelId, suggestion)
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

    app.get('/api/channels/:id/suggestions',async (req, res) => {
        let channelId = req.params.id
        let offset = parseInt(req.query.offset)
        let limit = parseInt(req.query.limit)
        let suggestions = await channelModel.getSuggestions(channelId, offset, limit)
        res.send(suggestions)
    })

    app.post('/api/channels/:id/suggestions',async (req, res) => {
        let channelId = req.params.id
        let data = req.body
        let response = await addSuggestion(channelId, data)
        if(response.success)
            res.status(201).send(response)
        else
            res.status(400).end()
    })
    
    if(process.env.NODE_ENV === 'development'){
        app.post('/api/channels/23435553/suggestions/test',async () => {
            channelModel.generate()
        })
    }
}
