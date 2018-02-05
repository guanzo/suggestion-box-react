//THIS FILE CANNOT CONTAIN ES6 CODE b/c of create-react-app .............
//NO const, let, function shorthand, object property shorthand, etc.


module.exports = {
	//3 types of lists displayed in app
	LIST_APPROVED:			'approved',
	LIST_PENDING:			'pending',
	LIST_USER:				'user',
	SORT_VOTES:				'votesLength',
	SORT_NEW:				'createdAt',
	SORT_BROADCASTER_VOTES: 'broadcasterUpvoted',
	STATUS_PENDING:			'PENDING',
	STATUS_APPROVED:		'APPROVED',
	STATUS_DELETED:			'DELETED',
	//user submitted a post before post cooldown was complete. 
	//can occur if user is on page && streamer changes cooldown
	STATUS_DENIED:			'DENIED',
}
