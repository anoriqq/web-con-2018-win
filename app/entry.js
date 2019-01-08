'use strict';
import $ from 'jquery';
var socket = io();
$('form').submit(function(e){
  if($('#m').val() !== ''){
    e.preventDefault();
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
  }
  return false;
});
socket.on('chat message', function(msgObj){
  $('#messages').prepend($('<li>').prepend($(`<div class="color-box" style="background:${msgObj.color}"></div><p>${msgObj.msg}</p>`)));
});
