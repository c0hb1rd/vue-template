
export const validateInput = {
	isWscnEmail: function(str) {
		const reg = /^[a-z0-9](?:[-_.+]?[a-z0-9]+)*@qq\.com$/i;
		return reg.test(str.trim());
	},
	validateURL: function(textval) {
		const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
		return urlregex.test(textval);
	},
	validateLowerCase: function(str) {
		const reg = /^[a-z]+$/;
		return reg.test(str);
	},
	validateUpperCase: function(str) {
		const reg = /^[A-Z]+$/;
		return reg.test(str);
	},
	validatAlphabets: function(str) {
		const reg = /^[A-Za-z]+$/;
		return reg.test(str);
	}
};
export const validateLogin = {
	validatePass: function (rule, value, callback) {
		if (value.length < 6) {
			callback(new Error('密码不能小于6位'));
		} else {
			callback();
		}
	}
};

