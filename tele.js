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
  
});
});
bot.sendMessage(msg.chat.id,"image is uploading");
});

}












if(msg.text.toString().toLowerCase().includes("/start")){
bot.sendMessage(msg.chat.id,msg.from.first_name+" you can know the different feautures of this bot by clicking different suggestions on your keyboard",{"reply_markup": {
    "keyboard": [["Bye","Movie Info","Corona"],["My Images","Upload Images","Thank You"]]
    }});
}
else if(msg.text.toString().toLowerCase().includes("my images")){

db.students.find({folder:"gallery"}, function (err, docs) { 


bot.sendMessage(msg.chat.id,docs[0].photo,{"reply_markup": {
    "keyboard": [["Bye","Movie Info","Corona"],["My Images","Upload Images","Thank You"]]
    }});  



});

}
else if(msg.text.toString().toLowerCase().includes("corona in")){
  const chatId = msg.chat.id;

var l=msg.text.split(" ");
var m=l[l.length-1].trim();

 request("https://coronavirus-19-api.herokuapp.com/countries/", function (error, response, body) {
	if(error){
		 bot.sendMessage(msg.chat.id, "SOME THING IS WRONG!!");
	}
	else{

var res=JSON.parse(body);

res=res.filter(p => (p.country.toLowerCase()==m.toLowerCase()));
res=res[0];




bot.sendPhoto(msg.chat.id,"https://img.etimg.com/thumb/width-300,height-300,imgsize-224027,resizemode-1,msid-81666439/industry/healthcare/biotech/healthcare/india-detects-novel-coronavirus-variant.jpg",{caption : 'Country: '+res.country+'\n'+'Total Cases: '+res.cases+'\n'+'Active Cases: '+res.active+'\n'+'Deaths: '+res.deaths});

       }
});

} 
else if(msg.text.toString().toLowerCase().includes("corona")){

bot.sendPhoto(msg.chat.id,"https://img.etimg.com/thumb/width-300,height-300,imgsize-224027,resizemode-1,msid-81666439/industry/healthcare/biotech/healthcare/india-detects-novel-coronavirus-variant.jpg",{caption : "To use this feature,you need to use the phrase \n'Corona in Countryname' without quotes"});

}  
else if(msg.text.toString().toLowerCase().includes("bye")) {
    bot.sendMessage(msg.chat.id, "Hope to see you around again , Bye "+msg.from.first_name,{"reply_markup": {
    "keyboard": [["Bye","Movie Info","Corona"],["My Images","Upload Images","Thank You"]]
    }});
} 
else if (msg.text.toString().toLowerCase().includes("thank you")) {
    bot.sendMessage(msg.chat.id, "Your welcome,its my pleasure assisting you",{"reply_markup": {
    "keyboard": [["Bye","Movie Info","Corona"],["My Images","Upload Images","Thank You"]]
    }});
}
else if(msg.text.toString().toLowerCase().includes("movie info")){

bot.sendPhoto(msg.chat.id,"https://i.pinimg.com/400x/aa/f7/05/aaf705e06726ce3881288ae4be3ac5fe.jpg",{caption : "If you want to know any movie information,you have to use this phrase in your sentence 'Movie MoveTitle'"},{"reply_markup": {"keyboard": [["Bye","Movie Info","Corona"],["My Images","Upload Images","Thank You"]]
    }});

	
	
}
else if(msg.text.toString().toLowerCase().includes("upload images")){
bot.sendMessage(msg.chat.id,"You can upload your images directly using the camera icon,and later you can retrive this images by clicking 'My Images' on your keyboard",{"reply_markup": {
    "keyboard": [["Bye","Movie Info","Corona"],["My Images","Upload Images","Thank You"]]
    }});
}

else if(msg.text.toString().toLowerCase().includes("movie")){

var title=msg.text.split("movie")[1];

request("https://www.omdbapi.com/?t=+"+title+"&apikey=6637725e", function (error, response, body) {
	if(error){
		 bot.sendMessage(msg.chat.id, "SOME THING IS WRONG!!");
	}
	else{

bot.sendMessage(msg.chat.id,"Title: "+JSON.parse(body).Title+"\n"+"Genre: "+JSON.parse(body).Genre+"\n"+"Director: "+JSON.parse(body).Director+"\n"+"Writer: "+JSON.parse(body).Writer+"\n"+"Actors: "+JSON.parse(body).Actors+"\n"+"ImdbRating: "+JSON.parse(body).imdbRating+"\n"+"Plot: "+JSON.parse(body).Plot+"\n"+"Awards: "+JSON.parse(body).Awards,{"reply_markup": {
    "keyboard": [["Bye","Movie Info","Corona"],["My Images","Upload Images","Thank You"]]
    }});
bot.sendPhoto(msg.chat.id,JSON.parse(body).Poster);

 
}
});

}
else{

	bot.sendMessage(msg.chat.id,"Some thing went wrong plz use your keyboard suggestions kindly",{"reply_markup": {
    "keyboard": [["Bye","Movie Info","Corona"],["My Images","Upload Images","Thank You"]]
    }});
}










});








 
	
