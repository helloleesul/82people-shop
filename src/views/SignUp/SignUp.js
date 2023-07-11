// import axios from 'axios';
const email = document.querySelector('.form-email');
const userName = document.querySelector('.form-name');
const pw = document.querySelector('.form-pw');
const pwCheck = document.querySelector('.form-pwCheck');
const form = document.querySelector('form');

const handleSubmit = e => {
	e.preventDefault();
	if (pw.value !== pwCheck.value) {
		// 비밀번호가 일치하지 않을때?
		alert('비밀번호가 일치하지 않습니다.');
	} else {
		fetch('/api/users/signup', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: email.value,
				name: userName.value, // 이름
				password: pw.value, // 비밀번호
			}),
		})
			.then(res => {
				if (res.ok) {
					alert(`성공적으로 회원가입이 되었습니다.`);
					// 로그인 페이지 이동
					console.log(res);
					window.location.href = '/signIn';
				} else {
					throw new Error('회원가입 실패');
				}
			})
			.catch(err => {
				alert(err);
			});

		// console.log('test');
		// axios({
		// 	method: 'post',
		// 	url: '/api/users/signup', // path
		// 	data: {
		// 		email: email.value, // 아이디
		// 		name: userName.value, // 이름
		// 		password: pw.value, // 비밀번호
		// 	},
		// }).then(res => {
		// 	if (res.status === 201) {
		// 		alert(`성공적으로 회원가입이 되었습니다.`);
		// 		// 로그인 페이지 이동
		// 		window.location.href = '/signIn';
		// 	}
		// });
		// .catch(err => {
		// 	alert(err);
		// });
	}
};
form.addEventListener('submit', handleSubmit); // 가입하기 버튼을 클릭하였을때 handleSubmit 함수가 동작
