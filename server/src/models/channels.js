var db = require('../db.js')
/* const userUtil = require('../../../shared/user-util')
const { STATUS_APPROVED } = require('../../../shared/suggestion-util') */


module.exports = {
    async getChannel(channelId, channelName){
        var channels = db.get().collection('channels')
        channels.createIndex({ channelId: 1 })

        //ensure channel document exists
        await addChannel(channelId, channelName);
        return channels
                .findOne({ channelId }, { _id: 0, suggestions: 0 })
				.catch(console.error)
	},
	async updateSettings(channelId, settings){
        var channels = db.get().collection('channels')
		return channels
			.updateOne({ channelId },  { $set: settings } )
			.catch(console.error)
	}
}


function addChannel(channelId,channelName){
    var channel = {
        channelId,
        suggestions:[],
        title: 'Suggestion Box',
        filterProfanity: true,
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
