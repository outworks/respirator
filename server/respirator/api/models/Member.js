/**
 * Member.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */
var moment = require('moment');

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
            type:'integer'
        },birthday:{
            type:'string'
        },sex:{
            type:'integer'
        },height:{
            type:'float'
        },weight:{
            type:'float'
        },dataComplete:function(){
            if((!(this.birthday || (this.age && this.age>0)) || !this.height || !this.weight)){
                return false;
            }
            return true;
        },ageMath:function(){
            if(this.age && this.age>0){
                return this.age;
            }
            var returnAge;
            var strBirthdayArr = this.birthday.split("-");
            var birthYear = parseInt(strBirthdayArr[0]);
            var birthMonth = parseInt(strBirthdayArr[1]);
            var birthDay = parseInt(strBirthdayArr[2]);
            var d = new Date();
            var nowYear = d.getFullYear();
            var nowMonth = d.getMonth() + 1;
            var nowDay = d.getDate();
            if(nowYear == birthYear)
            {
                returnAge = 0;//同年 则为0岁
            }
            else
            {
                var ageDiff = nowYear - birthYear ; //年之差
                if(ageDiff > 0)
                {
                    if(nowMonth == birthMonth)
                    {
                        var dayDiff = nowDay - birthDay;//日之差
                        if(dayDiff < 0)
                        {
                            returnAge = ageDiff - 1;
                        }
                        else
                        {
                            returnAge = ageDiff ;
                        }
                    }
                    else
                    {
                        var monthDiff = nowMonth - birthMonth;//月之差
                        if(monthDiff < -6)
                        {
                            returnAge = ageDiff - 1;
                        }
                        else if(monthDiff > 6)
                        {
                            returnAge = ageDiff + 1 ;
                        }else{
                            returnAge = ageDiff;
                        }
                    }
                }
                else
                {
                    returnAge = -1;//返回-1 表示出生日期输入错误 晚于今天
                }
            }
            return returnAge;
        },
        toJSON: function() {
            var obj = this.toObject();
            delete obj.updatedAt;
            delete obj.createdAt;
            delete obj.password;
            delete obj.id;
            obj.infoFlag = this.dataComplete()?1:0;
            obj.defPef = this.defaultPef();
            return obj;
        },defaultPef: function() {
            if(!this.dataComplete()){
                return -1.0;
            }
            var age = this.ageMath();
            var PEF = 0;
            if(age <= 12){
                if(this.sex == 0){
                    PEF =   9.35*age +2.03*this.height +0.81*this.weigth - 130.5;
                }else if(this.sex == 1){
                    PEF =   7.37*age +1.68*this.height +1.28*this.weight - 98.87;
                }
            }else{
                if(this.sex == 0){
                    PEF = 3.89*this.height - 2.95*age + 43.59;
                }else if(this.sex == 1){
                    PEF =   4.10*this.height - 1.61*age - 173.55;
                }
            }
            return this.changeTwoDecimal(PEF);
        },changeTwoDecimal:function (x){
            var f_x = parseFloat(x);
            if (isNaN(f_x))
            {
                return false;
            }
            var f_x = Math.round(x*100)/100;
            return f_x;
        }
    }
};

