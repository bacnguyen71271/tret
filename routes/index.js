var fs = require('fs');
module.exports = {
    getHomePage: (req, res) => {
        if(req.session.username !== undefined){
            let query = "SELECT * FROM `user` WHERE `userid`='"+req.session.username+"' LIMIT 1";
            var name = "";
            var useridd = "";
            var avatar = "/media/default-avatar.png";
            var covers = "/media/default-cover.png";
            var token = "";
            var notifi = new Array();
            var notifyCount = 0;

            
            db.query(query, (err, result) => {
                if(!err){
                    
                    let notifiCount = "SELECT * FROM `notification` WHERE `id_user` = '"+req.session.username+"' AND status='0'";

                    db.query(notifiCount,(err,result2)=>{
                        if(!err){
                            notifyCount = result2.length;
                            let notify = "SELECT * FROM `notification`WHERE `id_user` = '"+req.session.username+"' LIMIT 10"
                            db.query(notify,(err,ressu)=>{
                                if(!err){
                                    name = result[0]['firstname']+ " "+ result[0]['lastname'];
                                    if(result[0]['username'] !== null){
                                        useridd = result[0]['username'];
                                    }else{
                                        useridd = result[0]['userid'];
                                    }
                                    
                                    if(name.length>16){
                                        name = name.substr(0,16)+"...";
                                    }

                                    if(fs.existsSync('./public/media/'+ result[0]['userid']+"/avatar.jpg")){
                                        avatar = "/media/"+result[0]['userid']+"/avatar.jpg";
                                    }
                                    if(fs.existsSync('./public/media/'+ result[0]['userid']+"/cover.jpg")){
                                        covers = "/media/"+result[0]['userid']+"/cover.jpg";
                                    }

                                    if(req.session.token !== undefined){
                                        token = req.session.token;
                                    }

                                    if(ressu.length >0 ){
                                        for(var j=0;j<ressu.length;j++){
                                            if(ressu[j]['link'].indexOf('wallet_') !== -1){
                                                var date = new Date(ressu[j]['timer'] * 1);
                                                let time = date.getHours() +":"+ date.getMinutes() +":"+ date.getSeconds()+", "+date.getDay()+", THG "+date.getMonth() +", "+ date.getFullYear()
                                                let content = "";
                                                let viewed = "";
                                                let content_value = ressu[j]['content'].split('_');
                                                if(content_value[0] == 'IN'){
                                                    let value = 0;
                                                    if(content_value[1] == "TRET"){
                                                        value = (content_value[2]/100000000).toFixed(2);
                                                    }else{
                                                        value = (content_value[2]/1000000000000000000).toFixed(6);
                                                    }
                                                    content += res.__('notifi_trans_1') + "<p>" +value+" "+content_value[1]+"</p>"
                                                }
                                                if(ressu[j]['status'] == 0){
                                                    viewed = "unview";
                                                }
                                                else{
                                                    viewed = "";
                                                }
                                                notifi[j]={
                                                    id:ressu[j]['id_notification'],
                                                    avatar: "/media/avatartret.jpg",
                                                    link: "/transaction/"+ressu[j]['link'].split('_')[1],
                                                    content: content,
                                                    time: time,
                                                    viewed: viewed
                                                }
                                            }
                                        }
                                    }

                                    res.render('index.ejs', { 
                                        title: 'Home'+' Tourist Review' ,
                                        namess: name,
                                        userid: useridd,
                                        avatar: avatar,
                                        cover: covers,
                                        token: token,
                                        notifi :notifi,
                                        notificount: notifyCount
                                    });

                                }
                            })
                        }
                    })
                }
                
            });
        }else{
            let query = "SELECT * FROM `country` WHERE 1";
            db.query(query, (err, result) => {
                res.render('leadingpage.ejs', { 
                    country:result
                });
            });
        }
    },
};

