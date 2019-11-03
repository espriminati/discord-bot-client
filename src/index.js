console.log("Just like the official Discord app, I feel like I need to put this here.");
console.log("Please don't paste any scripts that you don't know here.");
console.log("Same goes with the index.js at the root directory of Discord Bot Client.");
console.log("They can leak your bots token, which will give them access to your bot, and they can even delete any server, if the bot is the administrator on.");
console.log("You have been warned. Please use this window carefully.");
console.log("I do not own any responsibility that actions you get using the Developer Console or editing index.js file.");

//PLEASE DO NOT EDIT THIS FILE UNLESS YOU KNOW WHAT YOU'RE DOING.

var electron = require("electron"); 
var {ipcRenderer} = require("electron"); 
var messageInput = document.getElementById('send-message-form');
var ipcRen = electron.ipcRenderer;
var servers = document.getElementById('servers');
var channels = document.getElementById('channels');
var messages = document.getElementById('messages');
var users = document.getElementById('users');
var currentChannelName = document.getElementById('current-channel');
var currentServerName = document.getElementById('server-name');
var usernameElement = document.getElementById('username');
var currentChannelID = "0";

function login(){
	ipcRenderer.send("login", document.getElementById("token").value);
}

//#region 
ipcRen.on('ready', function(event) {
	document.getElementById("login").style.display = "none";
	alert("You are now logged in. This client sometimes don't send messages immediately. If the message is not sent after 10 seconds, try sending it again.")
});
ipcRen.on('addServer', function(event, name, picture, id) {
	addServer(name, picture, id);
});
ipcRen.on('clearServers', function(event) {
	clearServers(); 
});
ipcRen.on('addChannel', function(event, name, id) {
	addChannel(name, id);
});
ipcRen.on('clearChannels', function(event) {
	clearChannels();
});
ipcRen.on('addMessage', function(event, username, message, id) {
	addMessage(username, message, id);
});
ipcRen.on('clearMessages', function(event) {
	clearMessages(); 
});
ipcRen.on('addUser', function(event, name, status) {
	addUser(name, status);
});
ipcRen.on('clearUsers', function(event) {
	clearUsers(); 
});
ipcRen.on('setChannel', function(event, name, desc) {
	setChannel(name, desc); 
});
ipcRen.on('setServer', function(event, name) {
	setServer(name); 
});
ipcRen.on('setUser', function(event, username, number) {
	setUser(username, number); 
});
ipcRen.on('clearInput', function(event) {
	clearInput();
});
//#endregion
function changeServer(id){
	ipcRenderer.send("changeServer", id);
}
function changeChannel(id){
	currentChannelID = id.toString();
	setChannel(document.getElementById(id.toString()).innerHTML);
}
function addServer(name, picture, id){
	var li = document.createElement("LI");
	var i = document.createElement("IMG");  
	i.setAttribute("src", picture);
	i.setAttribute("alt", name);
	i.setAttribute("onclick", `changeServer('${id}')`);
	i.style.width = "60px";
	i.style.height = "60px";
	i.style.display = "block";
	i.style.clip = "ellipse(60px, 60px, 60px, 60px);"
	li.style.padding = "0px";
	li.appendChild(i);
	servers.appendChild(li);
}
function clearServers(){ 
	while (servers.firstChild) {
    	servers.removeChild(servers.firstChild);
  	}
}
function addChannel(name, _id){
	var li = document.createElement("LI");
	li.innerHTML = `<button id="${_id}" onClick='changeChannel("${_id}")'>${name}</a>`;
	channels.appendChild(li);
}
function clearChannels(){ 
	while (channels.firstChild) {
    	channels.removeChild(channels.firstChild);
  	}
}
function addMessage(username, message, channelID){
	if (channelID == currentChannelID){
		var li = document.createElement("LI");  
		li.innerHTML = "<b>" + username + "</b>	" + message + "";
		messages.appendChild(li);
	}
}
function clearMessages(){ 
	while (messages.firstChild) {
    	messages.removeChild(messages.firstChild);
  	}
}
function addUser(username, status){
	var li = document.createElement("LI");  
	li.innerHTML = username + "<br>"+status;
	users.appendChild(li);
}
function clearUsers(){ 
	while (users.firstChild) {
    	users.removeChild(users.firstChild);
  	}
}
function setChannel(name){
	currentChannelName.innerHTML = "<h3>" + name + "</h3>";
	messageInput.setAttribute("placeholder", "Message #" + name);
	clearMessages();
}
function setServer(name){
	currentServerName.innerHTML = name;
}
function setUser(name, number){
	usernameElement.innerHTML = name + "<br><span class='user-numbers'>#" + number + "</span>";
}
function sendMessage(channelID, message){
	ipcRenderer.send("sendMessage", channelID, message);
}
messageInput.addEventListener('keyup', function onEvent(e) {
    if (e.keyCode === 13) {
		sendMessage(currentChannelID, messageInput.value);
    }
});
function clearInput(){
	messageInput.value = "";
}