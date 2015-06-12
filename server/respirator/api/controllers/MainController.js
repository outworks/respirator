/**
 * AdminController
 *
 * @description :: Server-side logic for managing admins
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    'login':function(req,res){
        res.view('login',{layout: 'none'});
    }
};

