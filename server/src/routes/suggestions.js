const channelModel = require('../models/channels')
const suggestionModel = require('../models/suggestions')
//const userUtil = require('../../../shared/user-util')
const { STATUS_PENDING, STATUS_APPROVED } = require('../../../shared/suggestion-util')
const ObjectID = require('mongodb').ObjectID

async function addSuggestion(channelId, data){
    let channel = await channelModel.getChannel(channelId)
    let status = channel.requireApproval ? STATUS_PENDING : STATUS_APPROVED
    let suggestion = createSuggestionObj(data, status)

    return new Promise(async resolve=>{
 
        let result = await suggestionModel.addSuggestion(channelId, suggestion)

        //conform to "get" endpoint response
        suggestion.hasUpvoted = true;
        suggestion.votesLength = 1;
        delete suggestion.votes

        let response = {
            success: result.modifiedCount === 1,
            suggestion
        }
        resolve(response)
    })
}

/**
 * 
 * @param {Object} data
 *  -text: String
 *  -postAnonymously: Boolean
 *  -user: Object
 */
function createSuggestionObj({ text, postAnonymously, user }, status){
    //reddit style, auto upvote own post
    let initialVote = { id: user.id, opaqueId: user.opaqueId }
    return {
        id: new ObjectID(),
        text,
        postAnonymously,
        user,
        status,
        votes: [initialVote],
        createdAt: new Date(),
    }
}

module.exports = (app) => {
    
    app.get('/api/channels/:id/suggestions',async (req, res) => {
        let channelId = req.params.id
        let offset = parseInt(req.query.offset)
        let limit = parseInt(req.query.limit)
        
        //TODO status: approved or pending
        let status = req.query.status ? req.query.status : STATUS_APPROVED
        let { user_id, opaque_user_id } = req.decoded
        let user = {
            id: user_id,
            opaqueId: opaque_user_id
        }

        let suggestions = await suggestionModel.getSuggestions(channelId, user, status, offset, limit)
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
            suggestionModel.generate()
        })
    }
}
