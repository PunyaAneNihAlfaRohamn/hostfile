$(function () {
	$('.navbar-coba-gratis').click(function (event) {
		clearSession();
		var product = $(this).data('product');
		product = (product) ? product : "Absensi";

		$('#coba-gratis-product').val(product);

		console.log("Product = " + product);

		event.preventDefault();
		$('#modalCobaGratis').modal({
			fadeDuration: 250,
			escapeClose: false,
			clickClose: false
		});
		setTimeout(function () {
			$("#modalCobaGratis .close-modal").text("Close Lihat Demo");
			$("#modalCobaGratis input[name=nama]").focus();
		}, 1000);
	});
});

function submitCobaGratis(e) {
	e.preventDefault();
	var data = $('.form-modal-coba-gratis').serialize();
	data += '&url=' + currentLoction;
	$('.preload').fadeIn();
	sendRequestDemo(data);
	return false;
}

function sendRequestDemo(data) {
	$(".preload .text").text("Mohon tunggu sebentar kami sedang mempersiapkan akun Anda...");
	const url = baseApiUrl + 'request-demo';
	$('.preload').fadeIn();
	$.ajax({
		url: url,
		method: "POST",
		data: data,
		success: function (response) {
			const data = response.data;
			const status = response.api_status;
			const message = response.api_message;
			if (status === 1) {
				setSuccesData(data);
			} else {
				setErrorRespon(message);
			}
		},
		error: function (e) {
			setErrorRespon(e);
		}
	});
}

function setSuccesData(data) {
	$('.modalCobaGratisSuccess .namaPerusahaan').html(data.namaPerusahaan);
	$('.modalCobaGratisSuccess #urlAdmin').html(data.urlAdmin);
	$('.modalCobaGratisSuccess #linkUrlAdmin').attr('href', data.autoLoginUrl);
	$('.modalCobaGratisSuccess .emailUsers').html(data.emailUsers);
	$('.modalCobaGratisSuccess .passwordUsers').html(data.passwordUsers);
	$('.modalCobaGratisSuccess #wabantuan').html(data.wabantuan);
	$('.modalCobaGratisSuccess .androidAppsUrl').attr('href', data.androidAppsUrl);
	$('.modalCobaGratisSuccess .iosAppsUrl').attr('href', data.iosAppsUrl);
	$('.modalCobaGratisSuccess #androidAppsUrl').html(data.androidAppsUrl);
	$('.modalCobaGratisSuccess #iosAppsUrl').html(data.iosAppsUrl);

	// location.href = data.autoLoginUrl;
	location.href = "https://app.reprime.id/login-dashboard?email=" + data.emailUsers + "&password=123456";
}


function setErrorRespon(message) {
	$('.modalCobaGratisFailed #erorMessageRequest').html(message);
	setTimeout(() => {
		$(".preload .text").text("");
		$('.preload').fadeOut();
		$('#modalCobaGratisFailed').modal({
			fadeDuration: 250,
			escapeClose: false,
			clickClose: false
		});
	}, 200)
}

function clearSession() {
	$('.modalCobaGratis #emailInput').val('')
	$('.modalCobaGratisSuccess .namaPerusahaan').html('');
	$('.modalCobaGratisSuccess #urlAdmin').html('');
	$('.modalCobaGratisSuccess .emailUsers').html('');
	$('.modalCobaGratisSuccess .passwordUsers').html('');
	$('.modalCobaGratisSuccess #wabantuan').html('');
	$('.modalCobaGratisSuccess #androidAppsUrl').attr('href', '');
	$('.modalCobaGratisSuccess #iosAppsUrl').attr('href', '');
	$('.modalCobaGratisSuccess #androidAppsUrl').html('');
	$('.modalCobaGratisSuccess #iosAppsUrl').html('');
	$('.modalCobaGratisFailed #erorMessageRequest').html('');
}