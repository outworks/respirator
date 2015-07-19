/**
 * MemberController
 *
 * @description :: Server-side logic for managing members
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var crypto = require('crypto');
var md5 = crypto.createHash('md5');

module.exports = {
    'index':function(req,res){
        res.view("member/list");
    },
    'list':function(req,res){
        var q = req.param('sSearch');
        var sEcho = req.param('sEcho');
        var iDisplayLength = req.param('iDisplayLength');
        var iDisplayStart = req.param('iDisplayStart');
        if(!iDisplayStart){
            iDisplayStart = 0;
        }
        if(!iDisplayLength){
            iDisplayLength = 10;
        }
        var query = {sort:'id DESC',skip:iDisplayStart,limit:iDisplayLength};
        var totalQuery = {};
        if(q){
            query.or = [{ username: {'contains':q} },
                { nickname: {'contains':q} }];
            totalQuery.or = [{ username: {'contains':q} },
                { nickname: {'contains':q} }];
        }
        Member.count(totalQuery).exec(function(err,count){
            if(err){
                res.next();
            }else{
                Member.find(query).exec(function (err, list) {
                    console.log(list);
                    if(err){
                        res.next();
                    }else{
                        res.json({"sEcho":sEcho,"iTotalDisplayRecords":count,"iDisplayLength":iDisplayLength,"aaData":list})
                    }
                });
            }
        });
    }
};

