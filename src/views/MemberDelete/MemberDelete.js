window.addEventListener('DOMContentLoaded', () => {
	const emailElement = document.querySelector('.member-email2');
	const inputElement = document.querySelector('.input');
	const checkButton = document.querySelector('.check-button');

	// 이메일 불러오기
	const savedEmail = getEmailFromLocalStorage();
	if (savedEmail) {
		emailElement.textContent = savedEmail;
	}

	// 확인 버튼 클릭 이벤트 처리
	checkButton.addEventListener('click', () => {
		const withdrawalStatement = inputElement.value.trim();

		if (withdrawalStatement === '파티피플에서 탈퇴하겠습니다.') {
			// 탈퇴 신청 처리
			processWithdrawal();
			// 알림창 표시
			alert('탈퇴신청이 정상적으로 처리되었습니다.');
		} else {
			// 알림창 표시
			alert('입력한 문구가 일치하지 않습니다.');
		}
	});

	// 로컬 스토리지에서 이메일 가져오기
	function getEmailFromLocalStorage() {
		return localStorage.getItem('email');
	}

	// 회원 탈퇴 처리
	function processWithdrawal() {
		// 이 부분에 실제로 탈퇴 처리를 위한 코드를 작성해야 합니다.
		// 서버와의 통신, 데이터베이스 업데이트 등을 수행해야 합니다.
		// 아래는 탈퇴 처리를 위한 예시 코드입니다.

		// 탈퇴할 회원의 이메일 가져오기
		const email = emailElement.textContent;

		// 서버로 탈퇴 요청 보내기 (예시: fetch를 사용한 POST 요청)
		fetch('/withdrawal', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email: email }),
		})
			.then(response => response.json())
			.then(data => {
				// 탈퇴 요청에 대한 처리 결과를 받아와서 여기서 추가적인 작업을 수행할 수 있습니다.
				// 예시: 탈퇴 성공 여부에 따라 다른 동작 수행
				if (data.success) {
					// 탈퇴 성공 처리
					showSuccessMessage();
				} else {
					// 탈퇴 실패 처리
					showFailureMessage(data.error);
				}
			})
			.catch(error => {
				// 요청 실패 처리
				console.error('탈퇴 요청에 실패했습니다.', error);
			});
	}

	// 탈퇴 성공 시 메시지 표시
	function showSuccessMessage() {
		// 예시: 탈퇴 성공한 경우에는 페이지를 다른 곳으로 리디렉션하거나, 메시지를 출력하는 등의 동작 수행
		// 여기서는 페이지를 리로드하는 예시를 보여줍니다.
		location.reload();
	}

	// 탈퇴 실패 시 메시지 표시
	function showFailureMessage(error) {
		// 예시: 탈퇴 실패한 경우에는 실패 메시지를 사용자에게 표시
		alert('탈퇴 처리에 실패했습니다. 에러 메시지: ' + error);
	}
});
