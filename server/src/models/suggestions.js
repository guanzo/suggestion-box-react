var db = require('../db.js')
var ObjectID = require('mongodb').ObjectID
//const userUtil = require('../../../shared/user-util')
const { LIST_APPROVED,LIST_PENDING, LIST_USER, SORT_BROADCASTER_VOTES, SORT_VOTES,
		STATUS_APPROVED, STATUS_PENDING, STATUS_DELETED 
} = require('../../../shared/suggestion-util')
const _ = require('lodash')

function getPipelines(listType, sortBy, channelId, user){
	let matchValue, sortValue;
	if(listType === LIST_APPROVED){
		matchValue = { 'suggestions.status': STATUS_APPROVED }
		sortValue  = { [sortBy]: -1 }
	}else if(listType === LIST_PENDING){
		matchValue = { 'suggestions.status': STATUS_PENDING }
		sortValue  = { 'createdAt' : 1 }//oldest first
	}else if(listType === LIST_USER){
		matchValue = { 
						$or: [
							{ 'suggestions.user.id': user.id }, 
							{ 'suggestions.user.opaqueId': user.opaqueId }
						] 
					} 
		sortValue  = { 'createdAt' : -1 }//newest first
	}
	return {
		matchValue,
		sortValue
	}
}

module.exports = {
	/**
	 * 
	 * @param {*} sortBy 
	 * - approved list: can be sorted in any way
	 * - pending list: oldest first, to keep things fair
	 * - user list:    newest first, to check isAllowedToSuggest
	 */
    getSuggestions(channelId, user, listType, offset, limit, sortBy = 'votesLength'){
		var channels = db.get().collection('channels')
		let { matchValue, sortValue } = getPipelines(listType, sortBy, channelId, user)
		
        return channels.aggregate([
			{ $match: { channelId } },
			//easier to work with documents than array
			{ $unwind: '$suggestions' },
			//approved/pending/user
			{ $match: matchValue },
			//get rid of irrelevent channel data
			{ $replaceRoot: { newRoot: '$suggestions' } },
			//add computed fields
            { $addFields: { 
					votesLength: { $size: "$votes" } ,
					//check if user has upvoted post with either real id or opaque id
					hasUpvoted: { 
						$and: [
							{$in : [ user.id, "$votes.id" ]},
							{$in : [ user.opaqueId, "$votes.opaqueId" ]}
						]
					},
					//map emoteReactions to only return emoteIds
					emoteReactions: '$emoteReactions.emoteId',
					//check if user has emoted post with either real id or opaque id
					hasEmoted: { 
						$and: [
							{$in : [ user.id, "$emoteReactions.user.id" ]},
							{$in : [ user.opaqueId, "$emoteReactions.user.opaqueId" ]}
						]
					},
					broadcasterUpvoted: { $in : [ channelId, "$votes.id" ] }
				},
			},
			//client doesn't need original votes data
			{ $project :	{ votes: 0} },
            { $sort: 		sortValue },
            { $skip:        offset },
            { $limit:       limit },
        ])
        .toArray()

	},
    addSuggestion(channelId, suggestion){
		var channels = db.get().collection('channels')
		let maxLength = 100;
		suggestion.text = suggestion.text.substring(0,maxLength)

        return channels.updateOne(
            { channelId },
            { 
                $push: { 
                    suggestions: suggestion
                }
            }
        )
	},
	/**
	 * 
	 * @param {*} updateFields - object will be assigned into suggestion object
	 */
	updateSuggestion(channelId, suggestionId, updateFields){
		var channels = db.get().collection('channels')

		var setFields = _.mapKeys(updateFields,(val,key)=>{
			return 'suggestions.$.' + key;
		})

        return channels.updateOne(
			{ channelId, "suggestions.id": new ObjectID(suggestionId) },
			{ $set: setFields }
        )
	},
	upvote(channelId,suggestionId,user){
		var channels = db.get().collection('channels')
		user = _.pick(user,'id','opaqueId')
		return channels.updateOne(
			{ channelId, "suggestions.id": new ObjectID(suggestionId) },
			{
				$addToSet:
				{
					"suggestions.$.votes": user
				}
			})
	},//not technically a downvote, it just removes existing upvote
	//checks for real user vote && opaque user vote to be thorough.
	downvote(channelId,suggestionId,user){
		var channels = db.get().collection('channels')
		user = _.pick(user,'id','opaqueId')
		let opaqueUser = { id: null, opaqueId: user.opaqueId }
		return channels.updateOne(
			{ channelId, "suggestions.id": new ObjectID(suggestionId) },
			{
				$pullAll:
				{
					"suggestions.$.votes":[
						user, opaqueUser
					]
				}
		})
	},
	addEmote(channelId, suggestionId, emoteId, user){
		var channels = db.get().collection('channels')
		user = _.pick(user,'id','opaqueId')
		let suggestionOid = new ObjectID(suggestionId)
		let data = {
			emoteId,
			user
		}
		return channels.updateOne(
			{
				channelId, 
				"suggestions":{
					$elemMatch:{
						id: suggestionOid,
						'emoteReactions.user': {$ne: user }
					}
				},
			},
			{
				$push:
				{
					"suggestions.$.emoteReactions": data
				}
			}
		)
	},
	getSuggestionsCount(channelId){
		var channels = db.get().collection('channels')
		return channels.aggregate([
			{ $match:{ channelId } },
			{ $project: { count: { $size: '$suggestions' } } }
		])
	},
}
