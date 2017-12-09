import userUtil from './user-util'

describe('user-util',()=>{
	expect(userUtil.MIN_MINUTES_BETWEEN_POSTS).toEqual(1440)
})