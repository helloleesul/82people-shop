import { main } from '/Common/index.js';
await main();

const email = document.querySelector('.form-email');
const userName = document.querySelector('.form-name');
const pw = document.querySelector('.form-pw');
const pwCheck = document.querySelector('.form-pwCheck');
const form = document.querySelector('form');
const emailOverlapCheck = document.querySelector('.signup-email > button');

const signupEvent = e => {
	e.preventDefault();

	if (pw.value !== pwCheck.value) {
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
					window.location.href = '/login';
				} else {
					throw new Error('회원가입 실패');
				}
			})
			.catch(err => {
				alert(err);
			});
	}
};

const searchedEmail = () => {
	fetch(`/api/users/signup/${email.value}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then(res => {
			if (res.ok) {
				alert(`사용 가능한 이메일입니다.`);
			} else {
				throw new Error('중복된 이메일입니다.');
			}
		})
		.catch(err => {
			alert(err);
		});
};

form.addEventListener('submit', signupEvent); // 가입하기 버튼을 클릭하였을때 handleSubmit 함수가 동작
emailOverlapCheck.addEventListener('click', searchedEmail); // 가입하기 버튼을 클릭하였을때 handleSubmit 함수가 동작
