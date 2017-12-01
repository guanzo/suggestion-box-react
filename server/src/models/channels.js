var db = require('../db.js')
var ObjectID = require('mongodb').ObjectID
//const e = require('../../../shared/constants')

module.exports = {
    /**
     * current vote is first element in "voteHistory". should always return a value
     * handles creation of channel if not exists
     */
    async getChannel({channelId, channelName}){
        var channels = db.get().collection('channels')
        
        //ensure channel document exists
        let result = await addChannel(channelId, channelName);
        return channels
                .findOne({ channelId })
                .catch(err=>{
                    console.log(err)
                })
    },
}

function addChannel(channelId,channelName){
    var channel = {
        channelId,
        suggestions:[],
    }
    //keep updating channelName in case it gets changed
    var channels = db.get().collection('channels')
    return channels.updateOne(
        {channelId},
        { $set:{ channelName }, $setOnInsert: channel }, 
        { upsert: true }
    )
}
