const channelModel = require('../models/channels')
const { ROLE_BROADCASTER } = require('../../../shared/user-util')

module.exports = (app) => {
    app.get('/api/channels/:id',async (req, res) => {
        let channelId = req.params.id
        let channelName = req.query.channelName
        let channel = await channelModel.getChannel(channelId, channelName)
        res.json(channel)
	})
	
    app.put('/api/channels/:channelId/settings',async (req, res) => {
		let { channelId } = req.params
		let { requireApproval, allowModAdmin } = req.body
		let user = req.user
		if(user.id !== channelId || user.role !== ROLE_BROADCASTER)
			return res.sendStatus(403)
		
		let result = await channelModel.updateSettings(channelId, requireApproval, allowModAdmin)
		let status = result.modifiedCount === 1 ? 201 : 400
		res.sendStatus(status)
	})
}
