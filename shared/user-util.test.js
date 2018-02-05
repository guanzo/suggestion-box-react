const chai = require('chai')
const userUtil = require('./user-util')
const expect = chai.expect
const moment = require('moment')

describe('user-util',()=>{
	it('has MIN_MINUTES_BETWEEN_POSTS equal to one day',()=>{
		expect(userUtil.MIN_MINUTES_BETWEEN_POSTS).to.equal(1440)
	})
	it('returns false if 24 hours hasn\'t passed',()=>{
		let lastSuggestDate = moment().subtract(1,'hours')
		expect(userUtil.isAllowedToSuggest(lastSuggestDate)).to.be.false
	})
	it('returns true if 24 hours has passed',()=>{
		let lastSuggestDate = moment().subtract(25,'hours')
		expect(userUtil.isAllowedToSuggest(lastSuggestDate)).to.be.true
	})
}) 