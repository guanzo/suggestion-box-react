var db = require('../db.js')
var ObjectID = require('mongodb').ObjectID
const userUtil = require('../../../shared/user-util')
const { STATUS_APPROVED } = require('../../../shared/suggestion-util')
const Chance = require('chance')


module.exports = {
    //send vote count, don't send votes itself
    getSuggestions(channelId, user, status, offset, limit){
        var channels = db.get().collection('channels')
        return channels.aggregate([
            { $match:       { channelId } },
            { $unwind:      '$suggestions' },
            { $match:       { 'suggestions.status': status } },
            { $replaceRoot: { newRoot: '$suggestions' } },
            { $addFields: { 
                votesLength: { "$size": "$votes" } ,
                //check if user has upvoted post with either real id or opaque id
                hasUpvoted: { 
                        $and: [
                            {$in : [ user.id, "$votes.id" ]},
                            {$in : [ user.opaqueId, "$votes.opaqueId" ]}
                        ]
                    }
                }
            },
			{ $project :    { votes: 0 } },
            { $sort:        { votesLength: -1 } },
            { $skip:        offset },
            { $limit:       limit },
        ])
        .toArray()

    },
    addSuggestion(channelId, suggestion){
        var channels = db.get().collection('channels')
        return channels.updateOne(
            { channelId },
            { 
                $push: { 
                    //prepend to array
                    suggestions: suggestion
                }
            }
        )
    },
    //test only
    async generate(){
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
    let numVotes = chance.integer({min: 0, max: 2000}) 
    let votes = []
    for(let i=0;i<numVotes;i++){
        let userId = chance.integer({min: 1000, max: 9999}) 
        votes.push({ userId })
    }

    return {
        id: new ObjectID(),
        "text": chance.sentence({ length: 100 }),
        "postAnonymously": chance.bool(),
        createdAt: new Date(),
        status: STATUS_APPROVED,
        votes,
        "user": {
            "id": "23435553",
            "opaqueId": "U23435553",
            "name": chance.name(),
            "profileImg": chance.avatar(),
            "role": "broadcaster"
        }
    }
    
}
