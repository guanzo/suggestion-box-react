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
		let { requireApproval, allowModAdmin, rules } = req.body
		let user = req.user
		if(user.id !== channelId)
			return res.sendStatus(403)
		
		await channelModel.updateSettings(channelId, requireApproval, allowModAdmin, rules)
		res.sendStatus(201)
	})

	//version 0.1.0 compatability
    app.put('/api/channels/:channelId/settings',async (req, res) => {
		let { channelId } = req.params
		let { requireApproval, allowModAdmin } = req.body
		let user = req.user
		if(user.id !== channelId)
			return res.sendStatus(403)
		
		await channelModel.updateSettings(channelId, requireApproval, allowModAdmin)
		res.sendStatus(201)
	})
}
