const channelModel = require('../models/channels')
const suggestionModel = require('../models/suggestions')
const suggestionGenerator = require('../models/suggestions-generate')
const { 
	STATUS_PENDING, STATUS_APPROVED, LIST_PENDING, LIST_USER 
} = require('../../../shared/suggestion-util')
const { isAllowedToSuggest, ROLE_MODERATOR, ROLE_BROADCASTER } = require('../../../shared/user-util')

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
 * @param {Object} data
 *  -text: String
 *  -postAnonymously: Boolean
 *  -user: Object
 *  -status: String
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
		emoteReactions:[],
        createdAt: new Date(),
    }
}

module.exports = (app) => {
    app.get('/api/channels/:channelId/suggestions',async (req, res) => {
		let { channelId } = req.params,
			{ listType, sortBy } = req.query,
			offset = parseInt(req.query.offset),
			limit = parseInt(req.query.limit),
			user = req.user;
		let suggestions = await suggestionModel.getSuggestions(channelId, user, listType, offset, limit,sortBy)
        res.send(suggestions)
	})

    app.post('/api/channels/:channelId/suggestions',async (req, res, next) => {
		let { channelId } = req.params,
			user = req.user,
			offset = 0,
			limit = 1;
		let suggestions = await suggestionModel.getSuggestions(channelId, user, LIST_USER, offset, limit,'createdAt')

		if(suggestions.length === 0)
			return next()

		let channel = await channelModel.getChannel(channelId)
		let lastSuggestionDate = suggestions[0].createdAt
		if(isAllowedToSuggest(lastSuggestionDate, channel.postCooldownMinutes)) 
			next()
		else 
			res.status(403).send('You must wait 24 hours between posts')
	},async (req, res) => {
        let { channelId } = req.params
        let data = req.body
        let response = await addSuggestion(channelId, data)
        if(response.success)
            res.status(201).send(response)
        else
            res.sendStatus(400)
	})
	//voteType: 'upvote' or 'downvote'
    app.put('/api/channels/:channelId/suggestions/:suggestionId/votes',async (req, res) => {
		let { channelId, suggestionId } = req.params,
			{ voteType } = req.body,
			user = req.user;
		let response = await suggestionModel[voteType](channelId, suggestionId,user)
		let status = response.modifiedCount === 1 ? 200 : 400
		res.status(status).end()
	})
	
    app.put('/api/channels/:channelId/suggestions/:suggestionId/emotes',async (req, res) => {
		let { channelId, suggestionId } = req.params,
			{ emoteId } = req.body,
			user = req.user;
		let result = await suggestionModel.addEmote(channelId, suggestionId, emoteId, user)
		let status = result.modifiedCount === 1 ? 200 : 400
		res.status(status).end() 
	})
	
	app.put('/api/channels/:channelId/suggestions/:suggestionId',async (req, res, next) => {
		let { channelId } = req.params
		let user = req.user
		if( ![ROLE_BROADCASTER,ROLE_MODERATOR].includes(user.role) )
			return res.sendStatus(403)

		if(user.role === ROLE_MODERATOR){
			let channel = await channelModel.getChannel(channelId)
			if( !channel.allowModAdmin )
				return res.sendStatus(403)
		}
		next()
	},async (req, res) => {
		let { channelId, suggestionId } = req.params
		let { updateFields } = req.body
		let response = await suggestionModel.updateSuggestion(channelId, suggestionId, updateFields)
		let { modifiedCount, matchedCount } = response
		let status = (modifiedCount === 1 || matchedCount === 1 ) ? 200 : 400
        res.sendStatus(status)
	})

	app.post('/api/channels/23435553/suggestions/test',(req,res) => {

		if(parseInt(req.user.id) !== 23435553)
			return res.sendStatus(403)

		suggestionGenerator.generate()
		res.sendStatus(200)
	})
}
