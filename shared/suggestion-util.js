//THIS FILE CANNOT CONTAIN ES6 CODE b/c of create-react-app .............
//NO const, let, function shorthand, object property shorthand, etc.
var moment = require('moment')
// 1 day
var MIN_MINUTES_BETWEEN_POSTS = 1440

module.exports = {
	//3 types of lists displayed in app
	LIST_APPROVED:	'approved',
	LIST_PENDING:	'pending',
	LIST_USER:		'user',
	STATUS_PENDING:	'PENDING',
	STATUS_APPROVED:'APPROVED',
	STATUS_DELETED:	'DELETED',
	//potential status of a suggestion
	isAllowedToSuggest: function(lastSuggestDate){
		var currentDate = moment();
		var diff = currentDate.diff(lastSuggestDate, 'minutes')
		return diff > MIN_MINUTES_BETWEEN_POSTS
	}
}
