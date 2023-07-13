import { main, renderLogin } from '/Common/index.js';
await main();
await renderLogin();

const id = document.querySelector('.form__id');
const pw = document.querySelector('.form__pw');
const submitBtn = document.querySelector('.form__submit');

try {
	if (
		document.cookie
			.split(';')
			.find(row => row.startsWith('userToken'))
			.split('=')[1]
	) {
		window.location.href = '/';
	}
} catch (e) {
	console.error('토큰 없음');
}

const setCookie = (userToken, token, days) => {
	const expires = new Date();
	expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
	const cookieString = `${userToken}=${token}; expires=${expires.toUTCString()}; path=/`;
	document.cookie = cookieString;
};

const login = e => {
	e.preventDefault();

	console.log(id.value);
	console.log(pw.value);

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
			console.log('res', res);
			if (res.ok) {
				alert(`성공적으로 로그인 되었습니다.`);
				window.location.href = '/';

				return res.json();
				// 로그인 페이지 이동
			} else {
				throw new Error('로그인 실패');
			}
		})
		.catch(err => {
			alert(err);
		})
		.then(json => setCookie('userToken', json.Authorization, 1))
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
