const SIGN_REGEXP = /([yMdhsm])(\1*)/g;
const DEFAULT_PATTERN = 'yyyy-MM-dd';
const padding = (s, len) => {
    len = len - (s + '').length;
    for (let i = 0; i < len; i++) {
        s = '0' + s;
    }
    return s;
};

String.prototype.format = function () {
    let str = this;
    for (let i = 0; i < arguments.length; i++) {
        let reg = new RegExp("\\{" + i + "\\}", "gm");
        str = str.replace(reg, arguments[i]);
    }
    return str;
};

export const formatDatetime = {
	format: function (date, pattern) {
		pattern = pattern || DEFAULT_PATTERN;
		return pattern.replace(SIGN_REGEXP, function ($0) {
			switch ($0.charAt(0)) {
				case 'y': return padding(date.getFullYear(), $0.length);
				case 'M': return padding(date.getMonth() + 1, $0.length);
				case 'd': return padding(date.getDate(), $0.length);
				case 'w': return date.getDay() + 1;
				case 'h': return padding(date.getHours(), $0.length);
				case 'm': return padding(date.getMinutes(), $0.length);
				case 's': return padding(date.getSeconds(), $0.length);
			}
		});
	},
	parse: function (dateString, pattern) {
		let matchs1 = pattern.match(SIGN_REGEXP);
		let matchs2 = dateString.match(/(\d)+/g);
		if (matchs1.length === matchs2.length) {
			let _date = new Date(1970, 0, 1);
			for (let i = 0; i < matchs1.length; i++) {
				let _int = parseInt(matchs2[i]);
				let sign = matchs1[i];
				switch (sign.charAt(0)) {
					case 'y': _date.setFullYear(_int); break;
					case 'M': _date.setMonth(_int - 1); break;
					case 'd': _date.setDate(_int); break;
					case 'h': _date.setHours(_int); break;
					case 'm': _date.setMinutes(_int); break;
					case 's': _date.setSeconds(_int); break;
				}
			}
			return _date;
		}
		return null;
	},

	format1: function(time) {
		time = +time * 1000;
		const d = new Date(time);
		const now = Date.now();

		const diff = (now - d) / 1000;

		if (diff < 30) {
			return '刚刚'
		} else if (diff < 3600) {
			return Math.ceil(diff / 60) + '分钟前'
		} else if (diff < 3600 * 24) {
			return Math.ceil(diff / 3600) + '小时前'
		} else if (diff < 3600 * 24 * 2) {
			return '1天前'
		} else {
			return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
		}
	}
};

export const formatStamp = (timestamp) => {
    if (timestamp === undefined || !timestamp) {
        return "无";
    } else if (timestamp.hasOwnProperty('create_time')) {
        timestamp = timestamp['create_time']
    } else if (timestamp.hasOwnProperty('last_time')) {
        timestamp = timestamp['last_time']
    } else if (timestamp.hasOwnProperty('update_time')) {
        timestamp = timestamp['update_time']
    }

    let date = new Date(timestamp);

    // return formatDatetime.format(date, 'yyyy-MM-dd hh:mm:ss');
    return formatDatetime.format(date, 'yyyy-MM-dd hh:mm');
};

export const dateShortcuts = [{
	text: '最近一周',
	onClick(picker) {
		const end = new Date();
		const start = new Date();
		start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
		picker.$emit('pick', [start, end]);
	}
}, {
	text: '最近一个月',
	onClick(picker) {
		const end = new Date();
		const start = new Date();
		start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
		picker.$emit('pick', [start, end]);
	}
}, {
	text: '最近三个月',
	onClick(picker) {
		const end = new Date();
		const start = new Date();
		start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
		picker.$emit('pick', [start, end]);
	}
}];

