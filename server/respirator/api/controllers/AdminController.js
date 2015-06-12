/**
 * AdminController
 *
 * @description :: Server-side logic for managing admins
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    'login':function(req,res){
        Admin.findOne({username:req.body.username,password:req.body.pwd}).exec(function(error,data){
            if(error){
                console.log(error);
                var result = {};
                result.success = false;
                result.msg = "登录失败";
                res.json(result);
            }else{
                if(data){
                    var result = {};
                    result.success = true;
                    result.msg = "登录成功";
                    req.session.authenticated = true;
                    res.json(result);
                }else{
                    var result = {};
                    result.success = false;
                    result.msg = "用户名或密码错误";
                    res.json(result);
                }

            }
        });
    },
    'index':function(req,res){
        res.view('index');
    }
};

