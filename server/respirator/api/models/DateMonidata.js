/**
* Monidata.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var moment = require('moment');
module.exports = {

  attributes: {
      mid:{
          type:'integer'
      },
      username:{
          type:'string'
      },saveDate:{
          type:'string',
          unique:true
      },dataDetails:{
          collection: 'Monidata',
          via: 'dateOwner'
      },toJSON: function() {
          var obj = this.toObject();
          delete obj.updatedAt;
          delete obj.createdAt;
          delete obj.id;
          return obj;
      }
  },
    beforeCreate: function (values, cb) {
        values.saveDate = moment().format('YYYY-MM-DD');
        //calling cb() with an argument returns an error. Useful for canceling the entire operation if some criteria fails.
        cb();
    }
};

