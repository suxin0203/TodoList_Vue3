import request from '../utils/request'

export function getSliders( ){
	return request({
		url:'http://testapi.xuexiluxian.cn/api/slider/getSliders',

	})
}