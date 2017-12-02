var _ = require('lodash')

var self = module.exports = {
    ROLE_VIEWER:        'viewer',
    ROLE_MODERATOR:     'moderator',
    ROLE_BROADCASTER:   'broadcaster',
    //Not logged in user, NOT ALLOWED TO POST
    isAnonymousUser: function (user){
        return _.isNull(user.id) && user.opaqueId.charAt(0) === 'A'
    },
    //display name in suggestion list is always "Anonymous"
    //b/c i can't retrieve username from opaque id
    isOpaqueUser: function (user){
        return _.isNull(user.id) && user.opaqueId.charAt(0) === 'U'
    },
    //can choose to post anonymously
    isRealUser: function (user){
        return !_.isNull(user.id)
    },
    //can moderate suggestions if broadcaster allows
    isModerator: function (user){
        return user.role === self.ROLE_MODERATOR
    },
    isBroadcaster: function (user){
        return user.role === self.ROLE_BROADCASTER
    }
}