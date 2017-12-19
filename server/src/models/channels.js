var db = require('../db.js')
/* const userUtil = require('../../../shared/user-util')
const { STATUS_APPROVED } = require('../../../shared/suggestion-util') */


module.exports = {
    /**
     * current vote is first element in "voteHistory". should always return a value
     * handles creation of channel if not exists
     */
    async getChannel(channelId, channelName){
        var channels = db.get().collection('channels')
        channels.createIndex({ channelId: 1 })
        
        //ensure channel document exists
        await addChannel(channelId, channelName);
        return channels
                .findOne({ channelId }, { _id: 0, suggestions: 0 })
				.catch(console.error)
	},
	async updateSettings(channelId, requireApproval, allowModAdmin, rules ){
        var channels = db.get().collection('channels')
		return channels
			.updateOne({ channelId },  { $set: { requireApproval, allowModAdmin, rules } } )
			.catch(console.error)
	}
}


function addChannel(channelId,channelName){
    var channel = {
        channelId,
        suggestions:[],
        requireApproval: false,
        allowModAdmin: true
	}
	let update = {
		$setOnInsert: channel
	}
    //keep updating channelName in case it gets changed
	if(channelName)
		Object.assign(update, { $set:{ channelName }})
		
    var channels = db.get().collection('channels')
    return channels.updateOne(
        {channelId},
        update, 
        { upsert: true }
    )
	.catch(console.error)
}
