$(document).ready(function() {
	// 获取点击注册前的页面地址，藏在hash中
	var url = window.location.hash.split('#')[1];
	
	// 检查邮箱是否有误
	$('#register_email').focusout(function() {
		// 不是邮箱格式就提示
		var str = $(this).val();
		checkEmail(str);
	});

	// 点击下一步
	$('#next_step').click(function(event) {
		// 第二个注册页面
		alert('a');
		if ($('#former_step').hasClass('active')) {

			if ($('#register_tages').val() == "") {
				$('#register_tages').next().find('input').attr('placeholder', '别忘记这里.....');
				event.preventDefault();
			} else {
				$.ajax({
					type: "post",
					url: "service/signup",
					data: {		 email: $('#register_email').val(),
								 username: $('#register_userName').val(),
								 gender: $('input[name="register_gender"]').val(),
								 password: $('#register_password').val(),
								 tags: $("#register_tages").val()
					},
					successs: function(data) {
						if (data) {
							$(this).removeClass('active');
							$(this).next().next().addClass('active');
							$('.bubble').eq(2).addClass('active');
							$('.label').eq(2).addClass('active');
							$('.form_s').eq(1).removeClass('active');
							$('.form_s').eq(2).addClass('active');
						} else {
							alert('something wrong happened~');
							location.href = 'register';
						}
					}
				});
			}
 		} else {
 			var flag = true;
 			if (!checkEmail($('#register_email').val()))
 				return;
 			// 第一个注册页面,先判断是否留空
 			$('#form_1').find('input').each(function(index, domEle) {
 				if ($(domEle).val() == "") {
 					$(domEle).attr('placeholder', '别忘记这里.....');
 					flag = false;
 					event.preventDefault();
 				}
 			});
 			// 检查密码
 			if ($('#register_password').val() != $('#register_rePassword').val()) {
 				$('#register_rePassword').val('');
 				$('#register_password').val('').attr('placeholder', '两次密码不一致');
 				flag = false;
 			}
 			if (flag) {
 				$('#former_step').addClass('active');
 				$('.form_s').eq(0).removeClass('active');
 				$('.form_s').eq(1).addClass('active');
 				$('.bubble').eq(1).addClass('active');
				$('.label').eq(1).addClass('active');
 			}

		}
	});

	// 点击上一步
	$('#former_step').click(function(event) {
		$(this).removeClass('active');
		$('.bubble').eq(1).removeClass('active');
		$('.label').eq(1).removeClass('active');
		$('.form_s').eq(1).removeClass('active');
		$('.form_s').eq(0).addClass('active');
	});

	// 跳转回注册前的访问页面
	$('#finish_register').click(function() {
		location.href = url;
	});


	// 添加Tag 
	$('.label_span').click(function() {
		var items = $("input#register_tages").tagsinput('items');
		// 查重
		for (var i = 0; i < items.length; ++i) {
			if (items[i] == $(this).html()) {
				return false;
			}
		}
		$('input#register_tages').tagsinput('add', $(this).html());
		$('input#register_tages').next().find('input').attr('placeholder', '');
	});
});


function isEmail(str) { 
	var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/; 
	return reg.test(str); 
}

function checkEmail(str) {
	if (!isEmail(str)) {
			$('#register_email').val('').attr('placeholder', '邮箱格式不正确')
		} else {
			$.ajax({
				type: "POST",
				data: {'email': str},
				url: 'checkEmail',
				successs: function(data) {
					if (!data) {
						alert('b');
						$('#register_email').val('').attr('placeholder', '邮箱已被注册~');
					} else {
						alert('a');
						return true;
					}
				},
				fail: function(data) {
					alert(data);
				}

			});
		}
		return false;
}