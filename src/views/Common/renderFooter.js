function renderFooter() {
	const footer = document.querySelector('footer');
	footer.innerHTML = `
  <div class="footer-container">
    <ul class="footer-top">
      <li>
        <a href="">이용약관</a>
      </li>
      <li>
        <a href="">개인정보처리방침</a>
      </li>
      <li>
        <a href="">이용안내</a>
      </li>
      <li>
        <a href="">고객지원</a>
      </li>
    </ul>
    <div class="footer-bottom">
      <p>
        상호: 주식회사 팔이피플 ㅣ 전화 : 070-1234-5678 ㅣ 이메일 : 82People@82People.io ㅣ 사업자등록번호 000-00-00000
        <br>
        FrontEnd : 이슬, 박상혁, 양우석 ㅣ BackEnd : 최재혁, 이해솔 ㅣ 대표번호 : 02-0000-0000 ㅣ 개인정보보호책임자 : 양우석
        <br>
        주소 : 서울 성동구 성수동 00 - 000동 ㅣ 통신판매업 신고번호: 제 2023-서울성남-00000호 ㅣ 대표이사 : 최재혁
      </p>
      <p>
        COPYRIGHT ⓒ 82People ALL RIGHTS RESERVED.
      </p>
    </div>
</div>
  `;
}

export { renderFooter };
