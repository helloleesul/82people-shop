const id = document.querySelector('.form__id');
const pw = document.querySelector('.form__pw');
const submitBtn = document.querySelector('.form__submit');

const login = e => {
	e.preventDefault();

	// console.log(id.value);
	// console.log(pw.value);

	fetch('/api/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			email: id.value,
			password: pw.value,
		}),
	})
		.then(res => {
			if (res.ok) {
				alert(`성공적으로 로그인 되었습니다.`);
				// 로그인 페이지 이동
				console.log(res);
				// window.location.href = '/';
			} else {
				throw new Error('로그인 실패');
			}
		})
		.catch(err => {
			alert(err);
		});

	// axios
	// 	.post('/api/login', {
	// 		email: id.value.trim(),
	// 		password: pw.value.trim(),
	// 	})
	// 	.then(res => {
	// 		if (res.status === 200) {
	// 			localStorage.setItem('userToken', res.data.token);
	// 		}
	// 		window.location.href = '/';
	// 	})
	// 	.catch(err => {
	// 		alert(err.response.data.message);
	// 	});
};

submitBtn.addEventListener('click', login);
