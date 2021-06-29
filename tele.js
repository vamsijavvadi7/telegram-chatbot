var unirest = require("unirest");
const TelegramBot = require('node-telegram-bot-api');
var request=require('request');
const token = '1271646664:AAGPhK3l1y-TmoAOuqtxyHR74l71cv3_Ftk';
const bot = new TelegramBot(token, {polling: true});
var mongojs = require("mongojs");
var cstring="mongodb+srv://vamsi:vamsi@cluster0.jrrjq.mongodb.net/vedic?retryWrites=true&w=majority";
var db=mongojs(cstring,['students']);




bot.on('message', (msg) => {
if(msg.photo){


request("https://api.telegram.org/bot"+token+"/getFile?file_id="+msg.photo[msg.photo.length-1].file_id, function (error, response, body) {




db.students.find({folder:"gallery"}, function (err, docs) { 

db.students.findAndModify({
    query: { folder:"gallery"},
    update: { $set: {photo:docs[0].photo+"\n"+"https://api.telegram.org/file/bot1271646664:AAGPhK3l1y-TmoAOuqtxyHR74l71cv3_Ftk/"+JSON.parse(body).result.file_path}},
    new: true
}, function (err, doc, lastErrorObject) {
    // doc.tag === 'maintainer'
});
});
bot.sendMessage(msg.chat.id,"image is uploading");
});

}











if(msg.text.toString().toLowerCase().includes("/start")){
bot.sendMessage(msg.chat.id,msg.from.first_name+" you can know the different feautures of this bot by clicking different suggestions on your keyboard",{"reply_markup": {
    "keyboard": [["Bye","Movie Info","Love Calculator"],["My Images","Upload Images","Thank You"]]
    }});
}



// db.students.find({photo:}, function (err,docs) { 
//      bot.sendMessage(msg.chat.id,docs[0].cardname+"-"+docs[0].cardnumber);
//  console.log(docs[0].cardname+"-"+docs[0].cardnumber);

//  });


   




if(msg.text.toString().toLowerCase().includes("my images")){

db.students.find({folder:"gallery"}, function (err, docs) { 


bot.sendMessage(msg.chat.id,docs[0].photo,{"reply_markup": {
    "keyboard": [["Bye","Movie Info","Love Calculator"],["My Images","Upload Images","Thank You"]]
    }});  
console.log(docs);



});

}
else if(msg.text.toString().toLowerCase().includes("love calculator")){

bot.sendPhoto(msg.chat.id,"https://proprofs-cdn.s3.amazonaws.com/images/Polls/user_images/997042/7457257119.jpg",{caption : "To use this feature,you need to provide the input in the format\n'love between boyname and girlname' without quotes"});

}  
else if(msg.text.toString().toLowerCase().includes("bye")) {
    bot.sendMessage(msg.chat.id, "Hope to see you around again , Bye "+msg.from.first_name,{"reply_markup": {
    "keyboard": [["Bye","Movie Info","Love Calculator"],["My Images","Upload Images","Thank You"]]
    }});
} 
else if (msg.text.toString().toLowerCase().includes("thank you")) {
    bot.sendMessage(msg.chat.id, "Your welcome,its my pleasure assisting you",{"reply_markup": {
    "keyboard": [["Bye","Movie Info","Love Calculator"],["My Images","Upload Images","Thank You"]]
    }});
}
else if(msg.text.toString().toLowerCase().includes("movie info")){
	bot.sendMessage(msg.chat.id, "If you want to know any movie information,you have to type the movetitle after using the word movie separated with a space.\nLike in this format 'Movie MoveTitle'",{"reply_markup": {
    "keyboard": [["Bye","Movie Info","Love Calculator"],["My Images","Upload Images","Thank You"]]
    }});
}
else if(msg.text.toString().toLowerCase().includes("upload images")){
bot.sendMessage(msg.chat.id,"You can upload your images directly using the camera icon,and later you can retrive this images by clicking 'My Images' on your keyboard",{"reply_markup": {
    "keyboard": [["Bye","Movie Info","Love Calculator"],["My Images","Upload Images","Thank You"]]
    }});
}
else if(msg.text.toString().toLowerCase().includes("between")){
  const chatId = msg.chat.id;
var l=msg.text.split("between");
var m=l[1].split(" and ");
var req = unirest("GET", "https://love-calculator.p.rapidapi.com/getPercentage");

req.query({
	"fname": m[0],
	"sname": m[1]
});

req.headers({
	"x-rapidapi-host": "love-calculator.p.rapidapi.com",
	"x-rapidapi-key": "6ade85acc5mshc07d2299a73d89ap1bf08bjsnc8e1476448d8",
	"useQueryString": true
});


req.end(function (res) {
	if (res.error) throw new Error(res.error);
	console.log(res.body.fname+" and "+res.body.sname+" "+" love percentage is "+res.body.percentage+" Advice would be "+res.body.result);


 	bot.sendPhoto(msg.chat.id,"https://proprofs-cdn.s3.amazonaws.com/images/Polls/user_images/997042/7457257119.jpg");
 bot.sendMessage(chatId,res.body.fname+" and "+res.body.sname+" "+" love percentage is "+res.body.percentage+"%"+"\nAdvice would be "+res.body.result,{"reply_markup": {
    "keyboard": [["Bye","Movie Info","Love Calculator"],["My Images","Upload Images","Thank You"]]
    }});



});

}
else if(msg.text.toString().toLowerCase().includes("movie")){

var title=msg.text.split("movie")[1];

request("https://www.omdbapi.com/?t=+"+title+"&apikey=6637725e", function (error, response, body) {
	if(error){
		 bot.sendMessage(msg.chat.id, "SOME THING IS WRONG!!");
	}
	else{

bot.sendMessage(msg.chat.id,"Title: "+JSON.parse(body).Title+"\n"+"Genre: "+JSON.parse(body).Genre+"\n"+"Director: "+JSON.parse(body).Director+"\n"+"Writer: "+JSON.parse(body).Writer+"\n"+"Actors: "+JSON.parse(body).Actors+"\n"+"ImdbRating: "+JSON.parse(body).imdbRating+"\n"+"Plot: "+JSON.parse(body).Plot+"\n"+"Awards: "+JSON.parse(body).Awards,{"reply_markup": {
    "keyboard": [["Bye","Movie Info","Love Calculator"],["My Images","Upload Images","Thank You"]]
    }});
bot.sendPhoto(msg.chat.id,JSON.parse(body).Poster);

 
}
});

}










});








 
	