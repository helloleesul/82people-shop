function renderHeader() {
	const header = document.querySelector('header');

	// 로그인 했을때 헤더
	if (true) {
		header.innerHTML = `
    <div class="header-container">
      <div class="header-group">
        <div class="logo">
          <a href="#">
            <span>82</span>People
          </a>
        </div>
        <nav>
          <ul>
            <li>
              <a href="#">생일</a>
            </li>
            <li>
              <a href="#">새해</a>
            </li>
            <li>
              <a href="#">크리스마스</a>
            </li>
            <li>
              <a href="#">할로윈</a>
            </li>
            <li>
              <a href="#">파티세트</a>
            </li>
          </ul>
        </nav>
        <div class="menu-group">
          <div>
            <a href="#">00님</a>
          </div>
          <div>
            <a href="#">주문내역</a>
          </div>
          <!-- 로그인 상태일 경우 마이페이지 노출-->
          <div>
            <a href="/myPage">마이페이지</a>
          </div>
          <div>
            <a href="#">
              <i class="fa-sharp fa-solid fa-cart-shopping"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
    `;
	}
	// 로그아웃 했을때 헤더
	else {
		header.innerHTML = `
    <div class="header-container">
      <div class="header-group">
        <div class="logo">
          <a href="#">
            <span>82</span>People
          </a>
        </div>
        <nav>
          <ul>
            <li>
              <a href="#">생일</a>
            </li>
            <li>
              <a href="#">새해</a>
            </li>
            <li>
              <a href="#">크리스마스</a>
            </li>
            <li>
              <a href="#">할로윈</a>
            </li>
            <li>
              <a href="#">파티세트</a>
            </li>
          </ul>
        </nav>
        <div class="menu-group">
          <div>
            <a href="#">로그인</a>
          </div>
          <div>
            <a href="#">주문내역</a>
          </div>
          <div>
            <a href="#">
              <i class="fa-sharp fa-solid fa-cart-shopping"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
    `;
	}
}

export { renderHeader };
