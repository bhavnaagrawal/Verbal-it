document.addEventListener("DOMContentLoaded",function(){
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'en-US';
recognition.interimResults = false;

  var socket = io();
  const outputYou = document.querySelector('.output-you');
  const outputBot = document.querySelector('.output-bot');

  function synthVoice(text) {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance();
  utterance.text = text;
  synth.speak(utterance);
}

var button = document.querySelector("img");
button.addEventListener("click", function(){
  recognition.start();
});
recognition.addEventListener('result', (e) => {
  let last = e.results.length - 1;
  let text = e.results[last][0].transcript;
  outputYou.textContent = text;
	socket.emit('chat message', text);
});

  socket.on('bot reply', function(replyText) {
    outputBot.textContent = replyText;
  synthVoice(replyText);
});

recognition.addEventListener('speechend', () => {
  recognition.stop();
});

});