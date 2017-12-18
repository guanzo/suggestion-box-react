/* eslint no-undef:0 */

var expect = require("chai").expect;
var channelModel = require('./channels')
var suggestionModel = require('./suggestions')
var ObjectID = require('mongodb').ObjectID

var testUrl = 'mongodb://localhost:27017/suggestionboxtest'

var db = require('../db.js')

describe('database',async ()=>{
    let channels,
		channelId = -1,
		channelName = 'guanzo'
	let user = {
		userId: -1,
		opaqueId: -1
	}	

    before(async ()=>{
        await db.connect(testUrl)
        channels = db.get().collection('channels')
		await channels.remove({})
	})

	
	describe('channelModel',()=>{
		describe("getChannel", ()=>{
			it("returns new channel doc",async ()=>{
				let channel = await channelModel.getChannel(channelId, channelName)
				expect(channel).to.be.an('object');
			})
		})
	})

	describe('suggestionModel',()=>{
		let suggestionOid = new ObjectID()
		describe("addSuggestion", ()=>{
			it('adds a suggestion',async ()=>{
				let suggestion = {
					id: suggestionOid,
					text:'test',
					emoteReactions:[],
				}
				let result = await suggestionModel.addSuggestion(channelId, suggestion)
				
				expect(result.modifiedCount).to.equal(1)
			})
		});

		describe("addEmote", ()=>{
			let emoteId = -1
	
			it("inserts new emote by user",async ()=>{
				let result = await suggestionModel.addEmote(channelId, suggestionOid, emoteId, user)
				expect(result.modifiedCount).to.equal(1)
				
			})
			it("does not allow user to emote multiple times per suggestion ",async ()=>{
				let result = await suggestionModel.addEmote(channelId, suggestionOid, emoteId, user)
				expect(result.modifiedCount).to.equal(0)
			})
		});

	})
    

    after(async ()=>{
        await db.close()
    })
})