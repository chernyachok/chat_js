$(document).ready(function(){
	var message = $('#message');
	message.focus();
	var socket = io.connect('http://localhost:8000');
	var canPublish = true;
	var handle = $('#handle');
	var btn = $('#send');
	var output = $('#output');
	var feedback = $('#feedback');

	btn.on('click', function(){
		var date = Date.now();

		if(handle.val() == "" || message.val()== ""){
			$('#test').html("<label style='color:red'>Please, enter your message</label>");
			setTimeout(function(){
				$('#test').html('');
			}, 2000);
		}else{
			socket.emit('chat', {
			message: message.val(),
			handle: handle.val(),
			date: date
		});
		}
	});

message.on('keypress', function(){
	if(canPublish){
		socket.emit('typing', handle.val());
	}

	canPublish = false;
	setTimeout(function(){
		canPublish = true;
	},1000);

});

	socket.on('chat', function(data){
		message.val('').focus();
		feedback.html('');
		let length = 5;
		for(var i =0; i<length; i++){
			if(i==length-1){
				$('#position'+i).html('<p><strong>'+data.nick+ ':</strong>'+ data.message+'</p>');
				document.querySelector('#position'+i).className = 'blink_me';
				setTimeout(function(){document.querySelector('#position'+i).className=''},1000);
				break;
			}
			$('#position'+i).html($('#position'+(i+1)).html());
		}

	});
	socket.on('typing', function(data){
		feedback.html('<p><em>'+data+' is typing...</p></em>');
	});
});
