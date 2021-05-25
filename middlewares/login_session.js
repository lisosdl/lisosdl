const { alert } = require('../lib/common');
/**
* 로그인 여부 체크 후 추가 처리 미들웨어
*
*/

module.exports.loginSession = (req, res, next) => {
	req.isLogin = res.isLogin = res.locals.isLogin = false;
	if (req.session.memId) {
		req.isLogin = res.isLogin = res.locals.isLogin = true;
	} else {
		if (req.url.indexOf("/admin") != -1) {
			alert("접근 권한이 없습니다.", res, "/");
			
			return res.redirect("/");
		}
	}
	next();
};