const { sequelize, Sequelize : { QueryTypes } } = require('./index');
/**
* 이력서 Model
*
*/
const resume = {
	/**
	* 이력서 저장
	*
	* @param Object params - req.body
	*/
	update : async function (params) {
		console.log(params);
		try {
			/** basicInfo 처리 S */
			const sql = `UPDATE basicinfo SET
										resumeTitle = :resumeTitle,
										name = :name,
										birthDate = :birthDate,
										landline = :landline,
										cellPhone = :cellPhone,
										gender = :gender,
										email = :email,
										address = :address,
										workType = :workType,
										salary = :salary,
										workLocation = :workLocation,
										workKeyword = :workKeyword,
										benefit = :benefit,
										handicapLevel = :handicapLevel,
										military = :military`;
			let replacements = {
				resumeTitle : params.resumeTitle,
				name : params.name,
				birthDate : params.birthDate,
				landline : params.landline,
				cellPhone : params.cellPhone,
				gender : params.gender,
				email : params.email,
				address : params.address,
				workType : params.workType,
				salary : params.salary,
				workLocation : params.workLocation,
				workKeyword : params.workKeyword,
				benefit : params.benefit || "",
				handicapLevel : params.handicapLevel,
				military : params.military,
			};
			
			let result = await sequelize.query(sql, {
				replacements,
				type : QueryTypes.INSERT,
			});
			console.log(result);
			/** basicInfo 처리 E */
			return true;
		} catch (err) {
			console.error(err);
			return false;
		}
	},
};

module.exports = resume;