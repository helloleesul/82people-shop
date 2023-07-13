function renderHeader() {
	const header = document.querySelector('header');
	const url = `localhost:3000`;

	// 로그인 했을때 헤더
	// try {
	let token;
	if (document.cookie) {
		token = document.cookie
			.split(';')
			.find(row => row.startsWith('userToken'))
			.split('=')[1];
	}

	if (token) {
		const parseJwt = token => {
			var base64Url = token.split('.')[1];
			var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
			var jsonPayload = decodeURIComponent(
				atob(base64)
					.split('')
					.map(function (c) {
						return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
					})
					.join('')
			);

			return JSON.parse(jsonPayload);
		};

		const { name } = parseJwt(token);

		header.innerHTML = `
      <div class="header-container">
        <div class="header-group">
          <div class="logo">
            <a href="/">
              <span>82</span>People
            </a>
          </div>
          <nav>
            <ul>
              <li>
                <a href="http://${url}/products/category/?category=birthDay">생일</a>
              </li>
              <li>
                <a href="http://${url}/products/category/?category=newYear">새해</a>
              </li>
              <li>
                <a href="http://${url}/products/category/?category=Christmas">크리스마스</a>
              </li>
              <li>
                <a href="http://${url}/products/category/?category=Halloween">할로윈</a>
              </li>
              <li>
                <a href="http://${url}/products/category/?category=partySet">파티세트</a>
              </li>
            </ul>
          </nav>
          <div class="menu-group">
            <div>
              <span>${name} 님</span>
            </div>
            <div>
              <a href="http://${url}/myPage/orders">주문내역</a>
            </div>
            <!-- 로그인 상태일 경우 마이페이지 노출-->
            <div>
              <a href="http://${url}/myPage">마이페이지</a>
            </div>
            <div>
              <a href="http://${url}/cart">
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
            <a href="/">
              <span>82</span>People
            </a>
          </div>
          <nav>
            <ul>
            <li>
            <a href="http://${url}/products/category/?category=birthDay">생일</a>
          </li>
          <li>
            <a href="http://${url}/products/category/?category=newYear">새해</a>
          </li>
          <li>
            <a href="http://${url}/products/category/?category=Christmas">크리스마스</a>
          </li>
          <li>
            <a href="http://${url}/products/category/?category=Halloween">할로윈</a>
          </li>
          <li>
            <a href="http://${url}/products/category/?category=partySet">파티세트</a>
          </li>
            </ul>
          </nav>
          <div class="menu-group">
            <div>
              <a href="http://${url}/login">로그인</a>
            </div>
            <div>
              <a href="http://${url}/guest/orders">주문내역</a>
            </div>
            <div>
              <a href="http://${url}/cart">
                <i class="fa-sharp fa-solid fa-cart-shopping"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
      `;
	}
	// } catch (e) {}
}

export { renderHeader };
