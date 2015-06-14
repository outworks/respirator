/**
 * MonidataController
 *
 * @description :: Server-side logic for managing monidatas
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    'index':function(req,res){
        res.view("monidata/list");
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
            iDisplayLength = 20;
        }
        var query = {skip:iDisplayStart,limit:iDisplayLength};

        if(q){
            query.or = [{ username: {'contains':q} }];
        }
        Monidata.count(query).exec(function(err,count){
            if(err){
                res.next();
            }else{
                Monidata.find(query).exec(function (err, list) {
                    console.log(list);
                    if(err){
                        res.next();
                    }else{
                        res.json({"sEcho":sEcho,"iTotalRecords":count,"iTotalDisplayRecords":iDisplayLength,"aaData":list})
                    }
                });
            }
        });
    }
};
