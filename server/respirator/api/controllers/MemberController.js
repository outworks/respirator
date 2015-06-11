/**
 * MemberController
 *
 * @description :: Server-side logic for managing members
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    'login':function(req,res){
        var result = {};
        result.success = true;
        result.msg = "登录成功";
        res.json(result);
    }

	
};

