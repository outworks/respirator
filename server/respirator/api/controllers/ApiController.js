/**
 * MemberController
 *
 * @description :: Server-side logic for managing members
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var crypto = require('crypto');
var moment = require('moment');

module.exports = {
    'weather':function(req,res){
        var type = req.body.type;
        if(!type){
            type = 'index_v';
        }
        var areaid = req.body.areaid;
        var dateString = moment().format('YYYYMMDDHHmm');
        var appid = '7fece56f0f406831';
        var private_key = '0c2ead_SmartWeatherAPI_59571b1';
        var tempurl = 'http://open.weather.com.cn/data/?areaid=' + areaid + '&type=' + type + '&date=' + dateString + '&appid=' + appid.substring(0,6);
        var waiturl = 'http://open.weather.com.cn/data/?areaid=' + areaid + '&type=' + type + '&date=' + dateString + '&appid=' + appid;
        var sign = crypto.createHmac('sha1',private_key).update(waiturl).digest().toString('base64');
        var url = tempurl + '&key=' + encodeURIComponent(sign);
        res.redirect(url);
    },
    'login':function(req,res){
        var username = req.body.username;
        var password = req.body.pwd;
        if(!username || !password){
            res.json({code:0,msg:'输入参数不完整'});
            return;
        }
        var md5 = crypto.createHash('md5');
        md5.update(password);
        var md5password = md5.digest('hex');
        Member.findOne({username:username,password:md5password}).exec(function(error,data){
                if(error){
                    res.json({code:-1,msg:'出错了~'});
                } else {
                    if(data){
                        res.json({code:1,msg:'登录成功',data:data});
                    }else {
                        res.json({code:0,msg:'用户名或密码出错'});
                    }
                }
        });
    },
    'register':function(req,res){
        var username = req.body.username;
        var pwd = req.body.pwd;
        if(!username || !pwd){
            res.json({code:0,msg:'参数不完整'});
        }else{
            Member.findOne({username:username}).exec(function(error,data){
                if(error){
                    res.json({code:-1,msg:'出错了~'});
                } else{
                    if(data){
                        res.json({code:0,msg:'该用户已存在'});
                    }else{
                        var password = req.body.pwd;
                        var md5 = crypto.createHash('md5');
                        md5.update(password);
                        var md5password = md5.digest('hex');
                        var member = {};
                        member.username = username;
                        member.password = md5password;
                        Member.create(member).exec(function(error,data){
                            if(error){
                                res.json({code:-1,msg:'出错了~'});
                            }else{
                                res.json({code:1,msg:'注册成功'});
                            }
                        });
                    }
                }
            });
        }

    },'memberUpdate':function(req,res){
        var mid = req.body.mid;
        if(mid){
            Member.findOne({mid:mid}).exec(function(error,data){
                if(error){
                    res.json({code:-1,msg:'出错了~'});
                } else{
                    if(!data){
                        res.json({code:0,msg:'该用户不存在'});
                    }else{
                        var nickname = req.body.nickname;
                        var sex = req.body.sex;
                        var birthday = req.body.birthday;
                        var age = req.body.age;
                        var weight = req.body.weight;
                        var height = req.body.height;
                        var phone = req.body.phone;
                        var member = data;
                        if(sex){
                            sex = parseInt(sex);
                            if(sex != NaN){
                                member.sex = sex;
                            }
                        }
                        if(birthday){
                            member.birthday = birthday;
                        }
                        if(weight){
                            weight = parseFloat(weight);
                            if(weight != NaN){
                                member.weight = weight;
                            }
                        }
                        if(height){
                            height = parseFloat(height);
                            if(height != NaN){
                                member.height = height;
                            }
                        }
                        if(nickname){
                            member.nickname = nickname;
                        }
                        if(phone){
                            member.phone = phone;
                        }
                        if(age){
                            member.age = age;
                        }
                        Member.update({'mid':mid},member).exec(function(error,updated){
                            if(error){
                                res.json({code:-1,msg:'出错了~'});
                            }else{
                                res.json({code:1,msg:'更新成功',data:updated[0]});
                            }
                        });
                    }
                }
            });
        }else{
            res.json({code:0,msg:'参数错误'});
        }
    },'dataCommit':function(req,res){
        console.log('开始执行');
        var mid = req.body.mid;
        var pef = req.body.pef;
        var fev1 = req.body.fev1;
        var fvc = req.body.fvc;
        var level = req.body.level;
        var inputType = req.body.inputType;
        var otherType = req.body.otherType;
        var flag = true;
        var _data = {};
        if(!pef || !fev1 || !fvc || !inputType){
            flag = false;
        }
        if(flag){
            pef = parseInt(pef);
            if(pef != NaN){
                _data.pef = pef;
            }else{
                flag = false;
            }
        }
        if(flag){
            fev1 = parseFloat(fev1);
            if(fev1 != NaN){
                _data.fev1 = fev1;
            }else{
                flag = false;
            }
        }
        if(flag){
            fvc = parseFloat(fvc);
            if(fvc != NaN){
                _data.fvc = fvc;
            }else{
                flag = false;
            }
        }
        if(flag){
            inputType = parseInt(inputType);
            if(inputType != NaN){
                _data.inputType = inputType;
            }else{
                flag = false;
            }
        }
        if(flag && otherType){
            otherType = parseInt(otherType);
            if(otherType != NaN){
                _data.otherType = otherType;
            }else{
                flag = false;
            }
        }
        if(flag && level){
            level = parseInt(level);
            if(level != NaN){
                _data.level = level;
            }else{
                level = undefined;
            }
        }
        if(flag){
            Member.findOne({mid:mid}).exec(function(error,data){
                if(error){
                    res.json({code:-1,msg:'用户未找到~'});
                } else{
                    if(!data){
                        res.json({code:0,msg:'该用户不存在'});
                    }else{
                        if(!data.dataComplete()){
                            res.json({code:0,msg:'用户信息未完善'});
                        }else{
                            _data.mid = mid;
                            _data.username = data.username;
                            if(!level){
                                var defaultPef =  data.defaultPef();
                                level = Monidata.LEVELMath(defaultPef,pef);
                                _data.level = level;
                            }
                            var moment = require('moment');
                            var date = moment().format('YYYY-MM-DD');
                            DateMonidata.findOne({mid:mid,saveDate:date}).exec(function(error,datemonidata){
                                if(error){
                                    res.json({code:-1,msg:'当日数据查找出错了~'});
                                }else{
                                    if(!datemonidata){
                                        var dateData = {};
                                        dateData.mid = mid;
                                        dateData.username = data.username;
                                        DateMonidata.create(dateData).exec(function(error,_datemonidata){
                                            if(error){
                                                res.json({code:-1,msg:'当日数据创建出错了~'});
                                            }else{
                                                _data.dateOwner = _datemonidata.id;
                                                Monidata.create(_data).exec(function(error,monidata){
                                                    if(error){
                                                        res.json({code:-1,msg:'单条数据创建失败~'});
                                                    }else{
                                                        res.json({code:1,msg:'保存成功',data:monidata});
                                                    }
                                                });
                                            }
                                        });
                                    }else{
                                        _data.dateOwner = datemonidata.id;
                                        Monidata.create(_data).exec(function(error,monidata){
                                            if(error){
                                                res.json({code:-1,msg:'单条数据创建出错了~'});
                                            }else{
                                                res.json({code:1,msg:'保存成功',data:monidata});
                                            }
                                        });
                                    }
                                }
                            });
                        }

                    }
                }
            });
        }else{
            res.json({code:0,msg:'参数错误'});
        }
    },'dateDatas':function(req,res){
        var mid = req.body.mid;
        var inputType = req.body.inputType;
        var pageIndex = req.body.page;
        if(!pageIndex){
            pageIndex = 1;
        }else{
            pageIndex = parseInt(pageIndex);
        }
        var pagesize = req.body.pagesize;
        if(!pagesize){
            pagesize = 7;
        }else{
            pagesize = parseInt(pagesize);
        }
        var skipIndex = (pageIndex -1) * pagesize;
        var query = {sort:'id DESC',skip:skipIndex,limit:pagesize};
        if(mid){
            query.where = { mid: mid };
        }
        if(inputType){
            DateMonidata.find(query).populate('dataDetails',{inputType: inputType}).exec(function (err, list) {
                if(err){
                    res.json({code:-1,msg:'出错了~'});
                }else{
                    res.json({code:1,data:list});
                }
            });
        }else{
            DateMonidata.find(query).populate('dataDetails').exec(function (err, list) {
                if(err){
                    res.json({code:-1,msg:'出错了~'});
                }else{
                    res.json({code:1,data:list});
                }
            });
        }

    }


};

