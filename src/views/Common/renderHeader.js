function renderHeader() {
	const header = document.querySelector('header');

	// 로그인 했을때 헤더

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

		const { name, role } = parseJwt(token);

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
                <a href="/products/category/?category=birthDay">생일</a>
              </li>
              <li>
                <a href="/products/category/?category=newYear">새해</a>
              </li>
              <li>
                <a href="/products/category/?category=Christmas">크리스마스</a>
              </li>
              <li>
                <a href="/products/category/?category=Halloween">할로윈</a>
              </li>
              <li>
                <a href="/products/category/?category=partySet">파티세트</a>
              </li>
            </ul>
          </nav>
          <div class="menu-group">
            <div>
              <span>🥳 <span style="color:#ff5675; font-weight:600;">${name}님</span></span>
            </div>
            <div>
              <span style="cursor:pointer;" id="logout" onclick="(function(){
                document.cookie = 'userToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                window.location.href = '/login';
              }) ()">로그아웃</span>
            </div>
            <div>
<a ${
			role === 'customer' ? '' : 'style="display:none;"'
		} href="/myPage/orders">주문내역</a>
            </div>
            <!-- 로그인 상태일 경우 마이페이지 노출-->
            <div>
              <a href="${
								role === 'customer' ? '/mypage' : '/admin'
							}">마이페이지</a>
            </div>
            <div>
              <a ${
								role === 'customer' ? '' : 'style="display:none;"'
							} href="/cart" >
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" fill="#999" viewBox="0 0 576 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="badges">
      <div class="badge">
        <a href="/products/category/?category=Christmas">
          <img src="https://partyhae.com/web/product/extra/big/201712/13952_shop1_317692.jpg" alt="badge">
          <div>🥇 인기상품 🥇</div>
        </a>
      </div>
      <div class="badge">
        <a href="/products/category/?category=birthDay">
          <img src="https://partyhae.com/web/product/big/20200227/82d5c7f017b86f7fbd292db365db84b6.jpg" alt="badge">
          <div class="new-title">🤡 신규상품 🤡</div>
        </a>
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
            <a href="/products/category/?category=birthDay">생일</a>
          </li>
          <li>
            <a href="/products/category/?category=newYear">새해</a>
          </li>
          <li>
            <a href="/products/category/?category=Christmas">크리스마스</a>
          </li>
          <li>
            <a href="/products/category/?category=Halloween">할로윈</a>
          </li>
          <li>
            <a href="/products/category/?category=partySet">파티세트</a>
          </li>
            </ul>
          </nav>
          <div class="menu-group">
            <div>
              <a href="/login">로그인 / 회원가입</a>
            </div>
            <div>
              <a href="/guest/orders">주문내역</a>
            </div>
            <div>
              <a href="/cart">
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" fill="#999" viewBox="0 0 576 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="badges">
      <div class="badge">
        <a href="/products/category/?category=Christmas">
          <img src="https://partyhae.com/web/product/extra/big/201712/13952_shop1_317692.jpg" alt="badge">
          <div>🥇 인기상품 🥇</div>
        </a>
      </div>
      <div class="badge">
        <a href="/products/category/?category=birthDay">
          <img src="https://partyhae.com/web/product/big/20200227/82d5c7f017b86f7fbd292db365db84b6.jpg" alt="badge">
          <div class="new-title">🤡 신규상품 🤡</div>
        </a>
      </div>
    </div>
      `;
	}
}

export { renderHeader };
