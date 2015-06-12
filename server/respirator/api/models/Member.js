/**
* Member.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
	mid:{
	 type:'integer',
         autoIncrement:true
        },username:{
	  type:'string',
	  unique:true
	},nickname:{
	  type:'string',
	  size:24
	},password:{
	  type:'string'
	},email:{
	   type:'email',
	   unique:true
	},phone:{
	   type:'string',
	   size:11
	},age:{
          type:'string'
    }
  }
};

