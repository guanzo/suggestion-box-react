var db = require('../db.js')
var ObjectID = require('mongodb').ObjectID
const Chance = require('chance')
const moment = require('moment')

const { STATUS_APPROVED, STATUS_PENDING } = require('../../../shared/suggestion-util')

module.exports = {
	
    //test only
    generate(){
        var chance = new Chance();
        var channels = db.get().collection('channels')
        let numSuggestions = chance.integer({min: 30, max: 50}) 
    
        let suggestions = []
        for(let i=0;i<numSuggestions;i++)
            suggestions.push(generateSuggestion())
        channels.updateOne({ channelId: '23435553' }, { $set: { suggestions } })
    }
}


function generateSuggestion(){
    var chance = new Chance();
	let userId = chance.integer({min: 1000000, max: 5000000})
	let status = Math.random() > .5 ? STATUS_APPROVED: STATUS_PENDING
	
	let votes = []
	let numVotes = (status === STATUS_APPROVED) 
					? chance.integer({min: 1, max: 50}) 
					: 1
	for(let i=0;i<numVotes;i++){
		let userId = chance.integer({min: 1000, max: 9999}) 
		votes.push({ userId })
	}
	let emoteReactions = []
	let emotes = [425618,114836,28087,22639,360,354,245,88,25,41,33,]
	let numEmotes = (status === STATUS_APPROVED) 
					? chance.integer({min: 20, max: 50}) 
					: 0
	for(let i=0;i<numEmotes;i++){
		let emoteId = chance.pickone(emotes)
		let userId = chance.integer({min: 1000, max: 9999}) 
		emoteReactions.push({ emoteId, user:{ userId, opaqueId: userId } })
	}
	
    return {
        id: new ObjectID(),
        "text": chance.sentence({ words: 5 }),
        "postAnonymously": chance.bool(),
        createdAt: moment().subtract(chance.integer({min:0,max:500}),'days').toDate(),
        status,
		votes,
		emoteReactions,
        "user": {
            "id":  userId,
            "opaqueId": 'U'+userId,
            "name": chance.name(),
            "profileImg": chance.avatar(),
            "role": "viewer"
        }
    }
    
}
