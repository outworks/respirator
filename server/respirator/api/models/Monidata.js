/**
* Monidata.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var moment = require('moment');
module.exports = {

  attributes: {
      pef:{
          type:'integer'
      },
      fev1:{
          type:'float'
      },
      fvc:{
          type:'integer'
      },
      mid:{
          type:'integer'
      },
      level:{
          type:'integer'
      },
      username:{
          type:'string'
      },saveTime:{
          type:'string'
      },dateOwner:{
          model:'DateMonidata'
      },toJSON: function() {
          var obj = this.toObject();
          if(obj.fev1){
              var fev1 = obj.fev1;
              obj.fev1 = this.changeTwoDecimal(obj.fev1);
          }
          delete obj.updatedAt;
          delete obj.createdAt;
          delete obj.id;
          delete obj.dateOwner;
          return obj;
      },changeTwoDecimal:function (x){
          var f_x = parseFloat(x);
          if (isNaN(f_x))
          {
              return false;
          }
          var f_x = Math.round(x*100)/100;
          return f_x;
      }
  },
    beforeCreate: function (values, cb) {
        values.saveTime = moment().format('YYYY-MM-DD HH:mm');
        //calling cb() with an argument returns an error. Useful for canceling the entire operation if some criteria fails.
        cb();
    },LEVELMath:function(compareLevel,level){
        var resultLevel = 0;
        var per = level * 100 / compareLevel;
        if(per > 80){
            resultLevel = 1;//良好
        }else if(per >= 60){
            resultLevel = 2;//普通
        }else{
            resultLevel = 3;//危险
        }
        return resultLevel;
    }
};

