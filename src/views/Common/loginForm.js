function renderLogin() {
	const loginForm = document.querySelector('#loginForm');
	loginForm.innerHTML = `
    <h1>로그인</h1>
    <div class="signin-card">
      <form>
        <input class="form__id" type="email" placeholder="이메일을 입력하세요." />
        <input class="form__pw" type="password" placeholder="비밀번호를 입력하세요." />
        <button class="form__submit" type="submit">로그인</button>
        <div class="btn-link">
          <a href="/signup" class="outline-btn">회원가입</a>
        </div>
      </form>
    </div>
  `;
}

export { renderLogin };
