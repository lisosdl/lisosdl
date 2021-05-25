const { sequelize, Sequelize : { QeryTypes } } = require('./index');
const bcrypt = require('bcrypt');
/**
* member Model
*
*/
const member = {
	/**
	* 관리자 등록 요청 처리
	*
	* @param String memId 아이디
	* @param String memPw 비밀번호
	*
	* @return Boolean
	*/
	join : async function (memId, memPw) {
		const hash = await bcrypt.hash(memPw, 10);
		
		const sql = "INSERT INTO member (memId, memPw) VALUES (:memId, :memPw)";
		
		const result = await sequelize.query(sql, {
			replacements : { memId, memPw : hash },
			type : QueryTypes.INSERT,
		});
		
		console.log(result);
	},
	/**
	* 로그인
	*
	* @param String memId 아이디
	* @param String memPw 비밀번호
	* @param Object req - Request 객체
	*
	* @return Boolean
	*/
	login : async function (memId, memPw, req) {
		const sql = "SELECT * FROM member WHERE memId = ? AND isAdmin=1";
		const rows = await sequelize.query(sql, {
			replacements : [memId],
			type : QueryTypes.SELECT,
		});
		if (rows.length == 0) {
			return false;
		}
		
		// 회원이 존재하면 비밀번호 일치 여부 체크
		const match = await bcrypt.compare(memPw, reows[0].memPw);
		if (match) {
			req.session.memId = rows[0].memId;
			return true;
		}
		
		return false;
	},
};

module.exports = member;