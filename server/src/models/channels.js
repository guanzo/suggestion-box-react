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
                .catch(err=>{
                    console.log(err)
                })
	},
	async updateSettings(channelId, requireApproval, allowModAdmin ){
        var channels = db.get().collection('channels')
		return channels
			.updateOne({ channelId },  { $set: { requireApproval, allowModAdmin } } )
			.catch(err=>{
				console.log(err)
			})
	}
}


function addChannel(channelId,channelName){
    var channel = {
        channelId,
        suggestions:[],
        requireApproval: false,
        allowModAdmin: true
    }
    //keep updating channelName in case it gets changed
    var channels = db.get().collection('channels')
    return channels.updateOne(
        {channelId},
        { $set:{ channelName }, $setOnInsert: channel }, 
        { upsert: true }
    )
}
