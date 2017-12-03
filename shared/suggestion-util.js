var moment = require('moment')

// 1 day
const MIN_MINUTES_BETWEEN_POSTS = 1440

const LIST_APPROVED = 'approved'
const LIST_PENDING = 'pending'
const LIST_USER = 'user'
const STATUS_PENDING = 'PENDING'
const STATUS_APPROVED = 'APPROVED'
const STATUS_DELETED = 'DELETED'
var self = module.exports = {
	//3 types of lists displayed in app
	LIST_APPROVED,
	LIST_PENDING,
	LIST_USER,
	LIST_TYPES:[LIST_APPROVED, LIST_PENDING, LIST_USER],
	STATUS_PENDING,
	STATUS_APPROVED,
	STATUS_DELETED,
	STATUS_TYPES:[STATUS_PENDING,STATUS_APPROVED,STATUS_DELETED],
	//potential status of a suggestion
	isAllowedToSuggest: function(lastSuggestDate){
		let currentDate = moment();
		let diff = currentDate.diff(lastSuggestDate, 'minutes')
		return diff > self.MIN_MINUTES_BETWEEN_POSTS
	}
}
