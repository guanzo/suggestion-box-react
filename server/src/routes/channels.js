const model = require('../models/channels')

/**
 * Makes api calls on behalf of browser, to circumvent cors
 */


module.exports = (app) => {
    
    app.get('/api/channels/:id',async (req, res) => {
        let data = {
            channelId: req.params.id,
            channelName: req.query.channelName
        }
        let channel = await model.getChannel(data)
        res.json(channel)
    })

}