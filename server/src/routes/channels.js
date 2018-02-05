const channelModel = require('../models/channels')
const { ROLE_BROADCASTER } = require('../../../shared/user-util')

module.exports = (app) => {
    app.get('/api/channels/:id',async (req, res) => {
        let channelId = req.params.id
        let channelName = req.query.channelName
        let channel = await channelModel.getChannel(channelId, channelName)
        res.json(channel)
	})
	
    app.put('/api/channels/:channelId',async (req, res) => {
		let { channelId } = req.params
		let settings = req.body
		let user = req.user
		if(user.id !== channelId)
			return res.sendStatus(403)
		
		await channelModel.updateSettings(channelId, settings)
		res.sendStatus(201)
	})
}
