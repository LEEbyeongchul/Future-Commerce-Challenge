// snap to buy · editable PowerPoint version of slides/deck.html
// Usage: node tools/make_pptx.js   (needs: npm install pptxgenjs, run from repo root or anywhere)
// Output: slides/snap-to-buy_발표자료.pptx
const path = require('path');
const pptxgen = require('pptxgenjs');

const ROOT = path.resolve(__dirname, '..');
const IMG = n => path.join(ROOT, 'slides', 'img', n + '.png');
const OUT = path.join(ROOT, 'slides', 'snap-to-buy_발표자료.pptx');

// Monochrome system from the references (Zara · StyleHint · Pinterest)
const INK = '111111', BODY = '333333', MUTE = '8D8D8D', LINE = 'E6E6E6', SOFT = 'F3F2EF', ACC = 'C8452C', W = 'FFFFFF';
const KO = 'Malgun Gothic';      // ships with Windows / Office
const SERIF = 'Cambria';          // logo and closing line

const pres = new pptxgen();
pres.layout = 'LAYOUT_WIDE';      // 13.333 x 7.5 in
pres.title = 'snap to buy · 발표 자료';
pres.author = 'snap to buy team';
pres.theme = { headFontFace: KO, bodyFontFace: KO };

const M = 0.83;                   // side margin
const CW = 13.333 - 2 * M;        // content width

// ---------- layouts ----------
pres.defineSlideMaster({
  title: 'LIGHT', background: { color: W },
  objects: [
    { text: { text: 'snap to buy', options: { x: 10.4, y: 0.28, w: 2.1, h: 0.35, fontFace: SERIF, italic: true, fontSize: 14, color: INK, align: 'right', margin: 0, isTextBox: true } } },
    { placeholder: { options: { name: 'label', type: 'body', x: M, y: 0.3, w: 8.5, h: 0.3, fontSize: 9, color: INK, charSpacing: 3, margin: 0, valign: 'middle' }, text: 'LABEL' } },
    { placeholder: { options: { name: 'title', type: 'title', x: M, y: 0.82, w: CW, h: 1.0, fontSize: 32, bold: true, color: INK, margin: 0, valign: 'top', align: 'left' }, text: 'Title' } },
  ],
  slideNumber: { x: 12.1, y: 7.02, w: 0.4, h: 0.25, fontSize: 9, color: MUTE, align: 'right' },
});
pres.defineSlideMaster({
  title: 'DARK', background: { color: INK },
  objects: [],
  slideNumber: { x: 12.1, y: 7.02, w: 0.4, h: 0.25, fontSize: 9, color: '888888', align: 'right' },
});

const T = (s, text, o) => s.addText(text, Object.assign({ fontFace: KO, color: BODY, fontSize: 14, margin: 0, isTextBox: true, valign: 'top' }, o));
const hr = (s, x, y, w, color = INK, h = 0.012) => s.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill: { color }, line: { color, width: 0 } });
const phone = (s, name, x, y, w, alt) => {
  const h = w * 1.96;
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: x - 0.05, y: y - 0.05, w: w + 0.1, h: h + 0.1, rectRadius: 0.18, fill: { color: INK }, line: { color: INK } });
  s.addImage({ path: IMG(name), x, y, w, h, altText: alt });
  return y + h;
};
const footer = (s, txt, dark) => T(s, txt, { x: M, y: 7.02, w: 9, h: 0.25, fontSize: 9, color: dark ? '888888' : MUTE, charSpacing: 2 });

// ---------- 1 cover ----------
{
  const s = pres.addSlide({ masterName: 'DARK' }); s.background = { color: W };
  T(s, 'FUTURE COMMERCE CHALLENGE 2026', { x: M, y: 0.3, w: 6, h: 0.3, fontSize: 9, color: INK, charSpacing: 3 });
  T(s, 'TRACK A · FUTURE SHOPPING EXPERIENCE', { x: 7.5, y: 0.3, w: 5, h: 0.3, fontSize: 9, color: MUTE, charSpacing: 3, align: 'right' });
  T(s, [{ text: 'snap to ', options: { italic: false } }, { text: 'buy', options: { italic: true } }], { x: M, y: 1.55, w: 6.3, h: 1.5, fontFace: SERIF, fontSize: 80, color: INK });
  T(s, [{ text: '저장만 해두던 룩을,', options: { breakLine: true } }, { text: '오늘 주문하는 옷', options: { bold: true, color: INK } }, { text: '으로.' }], { x: M, y: 3.2, w: 6, h: 1.0, fontSize: 24, color: INK });
  T(s, '모은 룩으로 내 취향을 배우고, 원본을 찾아, 사이즈와 예산에 맞춰 대신 사주는 패션 쇼핑 에이전트', { x: M, y: 4.35, w: 5.4, h: 0.7, fontSize: 13, color: '555555' });
  T(s, '#룩모으기   #내감성   #원본찾기   #대신사기', { x: M, y: 5.25, w: 6, h: 0.35, fontSize: 13, color: INK, underline: { style: 'sng' } });
  // masonry-style collage (Pinterest)
  const col = [[['home', 2.55], ['analyze', 1.95], ['budget', 1.2]], [['breakdown', 1.6], ['upload', 2.75], ['taste', 1.35]], [['pay', 2.2], ['swap', 3.5]]];
  col.forEach((c, i) => { let y = 0.75; c.forEach(([n, h]) => { s.addImage({ path: IMG(n), x: 7.1 + i * 1.88, y, w: 1.78, h, sizing: { type: 'cover', w: 1.78, h }, altText: 'mockup ' + n }); y += h + 0.1; }); });
  footer(s, 'DEMO · leebyeongchul.github.io/Future-Commerce-Challenge/mockup');
  s.addNotes('제 갤러리에는 사지 못한 룩 사진이 몇백 장 있습니다. snap to buy는 이 사진들로 제 취향을 배우고, 다음에 본 룩을 제 감성대로, 사이즈와 예산에 맞춰 대신 사줍니다.');
}

// ---------- 2 problem ----------
{
  const s = pres.addSlide({ masterName: 'LIGHT' });
  s.addText('PROBLEM', { placeholder: 'label' });
  s.addText([{ text: '제 갤러리에는 ', options: {} }, { text: '사지 못한 룩 사진만', options: { bold: false } }, { text: ' 쌓여 있습니다', options: {} }], { placeholder: 'title' });
  T(s, [{ text: '핀터레스트에 저장하고, 인스타 룩을 캡처합니다. 사고 싶은데, ' }, { text: '사는 과정이 너무 깁니다.', options: { bold: true, color: INK } }], { x: M, y: 2.05, w: 6, h: 0.8, fontSize: 16 });
  T(s, '“이 옷 어디 거예요?”', { x: M, y: 4.3, w: 6, h: 0.7, fontSize: 30, color: INK });
  T(s, '인기 룩 게시물마다 달리는 댓글', { x: M, y: 5.0, w: 6, h: 0.3, fontSize: 11, color: MUTE });
  const pains = [['01', '어디 거예요?', '댓글을 뒤지고, 아이템을 하나씩 따로 검색한다'], ['02', '결제가 흩어짐', '한 룩의 옷이 여러 쇼핑몰에 있어 결제를 반복한다'], ['03', '사이즈 불안', '브랜드마다, 남녀마다 사이즈가 달라 반품이 잦다'], ['04', '예산 초과', '사진 속 룩은 비싸고, 내 감성의 대체품 찾기는 또 일이다']];
  hr(s, 7.4, 2.15, 5.1);
  pains.forEach(([n, h, d], i) => { const y = 2.3 + i * 1.12; T(s, n, { x: 7.4, y, w: 0.6, h: 0.3, fontSize: 10, color: INK, charSpacing: 3 }); T(s, h, { x: 8.1, y: y - 0.05, w: 4.4, h: 0.4, fontSize: 18, bold: true, color: INK }); T(s, d, { x: 8.1, y: y + 0.4, w: 4.4, h: 0.4, fontSize: 13 }); hr(s, 7.4, y + 0.97, 5.1, LINE); });
  footer(s, 'SNAP TO BUY');
}

// ---------- 3 solution ----------
{
  const s = pres.addSlide({ masterName: 'LIGHT' });
  s.addText('SOLUTION', { placeholder: 'label' });
  s.addText('사진은 모으기만 하세요. 나머지는 에이전트가', { placeholder: 'title' });
  const steps = [['upload', '01', '룩 모으기', '갤러리 사진 한 번에 업로드, 핀·인스타 공유'], ['breakdown', '02', '원본 찾기', '출처 링크 → 국내 → 해외, 원본 우선'], ['budget', '03', '내 감성으로 맞춤', '모은 룩 취향 기준 후보, 사이즈·아이템별 예산'], ['pay', '04', '승인 한 번', '총액 보고 승인하면 쇼핑몰 여러 곳에 대신 주문'], ['swap', '05', '계속 지켜보기', '가격 하락·품절 임박, 원본으로 바꾸기']];
  steps.forEach(([img, n, h, d], i) => { const x = M + i * 2.36, w = 1.95; const bottom = phone(s, img, x, 1.85, w, h); T(s, n, { x, y: bottom + 0.15, w, h: 0.25, fontSize: 10, color: INK, charSpacing: 3 }); T(s, h, { x, y: bottom + 0.38, w: 2.2, h: 0.35, fontSize: 15, bold: true, color: INK }); T(s, d, { x, y: bottom + 0.72, w: 2.2, h: 0.55, fontSize: 11 }); });
  footer(s, 'MOCKUP · PRODUCTS AND PRICES ARE FICTIONAL');
}

// ---------- 4 core taste ----------
{
  const s = pres.addSlide({ masterName: 'LIGHT' });
  s.addText('CORE · TASTE FROM COLLECTED LOOKS', { placeholder: 'label' });
  s.addText('모은 룩이 가장 정직한 취향 데이터', { placeholder: 'title' });
  T(s, [{ text: '비슷한 옷을 보여주는 곳은 많습니다. 저희는 사용자가 ' }, { text: '몇 년째 모아온 룩', options: { bold: true, color: INK } }, { text: '으로 감성을 배워서, ' }, { text: '"비슷한 옷"이 아니라 "내 감성의 옷"', options: { bold: true, color: INK } }, { text: '을 고릅니다.' }], { x: M, y: 1.95, w: 6.4, h: 1.0, fontSize: 16 });
  hr(s, M, 3.2, 6.4);
  [['아무도 안 쓰던 데이터', '갤러리 캡처는 내 휴대폰에만 있다'], ['가장 솔직한 신호', '좋아요는 가볍지만, 캡처는 "진짜 갖고 싶다"'], ['첫날부터 분석', '구매 기록 없이 한 번 업로드로 시작']].forEach(([a, b], i) => { const y = 3.32 + i * 0.6; T(s, a, { x: M, y, w: 2.3, h: 0.4, fontSize: 14, bold: true, color: INK }); T(s, b, { x: M + 2.4, y, w: 4, h: 0.4, fontSize: 14 }); hr(s, M, y + 0.5, 6.4, LINE); });
  T(s, '모은 룩 → 패션 사진 거르기 → 룩 분해 → 임베딩·속성(기장·실루엣·색·소재) → 내 취향 벡터 → 구매·반품·리뷰로 보정', { x: M, y: 5.3, w: 6.4, h: 0.6, fontSize: 11, color: MUTE });
  phone(s, 'taste', 7.85, 1.95, 1.75, '저장한 룩으로 본 내 취향');
  T(s, 'MY TASTE', { x: 7.85, y: 5.55, w: 2, h: 0.25, fontSize: 9, color: INK, charSpacing: 3 });
  T(s, '크롭 기장 78% · 와이드 71% · 아이보리·베이지 64%', { x: 7.85, y: 5.8, w: 2.1, h: 0.6, fontSize: 11 });
  phone(s, 'budget', 10.55, 1.95, 1.75, '근거가 보이는 추천');
  T(s, 'WHY THIS ONE', { x: 10.55, y: 5.55, w: 2, h: 0.25, fontSize: 9, color: INK, charSpacing: 3 });
  T(s, '취향 92% · "저장 룩 41장과 비슷"', { x: 10.55, y: 5.8, w: 2.1, h: 0.6, fontSize: 11 });
  footer(s, 'SNAP TO BUY');
}

// ---------- 5 why agent ----------
{
  const s = pres.addSlide({ masterName: 'LIGHT' });
  s.addText('WHY AN AGENT', { placeholder: 'label' });
  s.addText('추천 앱은 보여주고 끝. 에이전트는 대신 끝낸다', { placeholder: 'title' });
  const cmp = [['추천 앱', '비슷한 옷을 보여주고 끝'], ['검색', '찾기까지, 맞추고 사는 건 사람 몫']];
  cmp.forEach(([a, b], i) => { T(s, a, { x: M, y: 1.95 + i * 0.42, w: 1.6, h: 0.35, fontSize: 12, bold: true, color: MUTE }); T(s, b, { x: M + 1.7, y: 1.95 + i * 0.42, w: 5, h: 0.35, fontSize: 13 }); });
  s.addShape(pres.shapes.RECTANGLE, { x: M, y: 2.8, w: 6.8, h: 0.45, fill: { color: INK }, line: { color: INK } });
  T(s, [{ text: 'snap to buy    ', options: { bold: true } }, { text: '찾기 → 맞추기 → 대신 사기 → 지켜보기' }], { x: M + 0.15, y: 2.85, w: 6.6, h: 0.35, fontSize: 13, color: W, valign: 'middle' });
  hr(s, M, 3.65, CW);
  const st = [['01', '룩 분해', '판단'], ['02', '원본 찾기', '판단'], ['03', '내 감성 후보', '판단'], ['04', '사이즈·예산', '판단'], ['05', '대신 주문', '행동 · Minds'], ['06', '계속 지켜보기', '행동 · Minds'], ['07', '예외 처리', '행동']];
  st.forEach(([n, h, t], i) => { const x = M + i * (CW / 7); T(s, n, { x, y: 3.78, w: 1.5, h: 0.25, fontSize: 9, color: INK, charSpacing: 3 }); T(s, h, { x, y: 4.03, w: 1.6, h: 0.35, fontSize: 14, bold: true, color: INK }); const act = t.startsWith('행동'); s.addText(t, { x, y: 4.45, w: act ? 1.15 : 0.55, h: 0.26, fontFace: KO, fontSize: 9, color: act ? W : INK, fill: act ? { color: INK } : undefined, line: { color: INK, width: 0.75 }, align: 'center', valign: 'middle', margin: 0, isTextBox: true }); });
  const r = [['연결된 여러 단계', '니트를 바꾸면 남은 예산과 데님 후보가 함께 바뀐다'], ['보여주지 않고 행동', '여러 쇼핑몰에 대신 주문한다. 한도 안에서, 승인 후에만'], ['앱을 꺼도 일한다', '가격 하락·품절 임박을 며칠씩 지켜보고 알리거나 산다'], ['막히면 스스로 푼다', '품절·결제 실패에도 대체 후보를 찾고, 필요할 때만 묻는다']];
  r.forEach(([h, d], i) => { const x = M + i * (CW / 4), w = CW / 4 - 0.3; hr(s, x, 5.2, w); T(s, h, { x, y: 5.33, w, h: 0.4, fontSize: 16, bold: true, color: INK }); T(s, d, { x, y: 5.78, w, h: 0.7, fontSize: 12 }); });
  footer(s, 'MODELS COMPUTE · THE AGENT DECIDES WHEN AND ACTS');
}

// ---------- 6 how it works ----------
{
  const s = pres.addSlide({ masterName: 'LIGHT' });
  s.addText('HOW IT WORKS · USER · AI · COMMERCE · PAYMENT', { placeholder: 'label' });
  s.addText('AI에게 어디까지 맡기고, 누가 승인하나', { placeholder: 'title' });
  const cols = [
    ['01 · 신원 · 권한', '누가 쓰고, 어디까지', ['핀·인스타로 룩을 모으는 20–30대', '맡기는 일: 찾기 · 맞추기 · 주문 · 감시', '위임장: 한도 · 허용 쇼핑몰 · 15분 (AIR)', '쇼핑몰엔 "L 사이즈 적합: 네"만']],
    ['02 · AI 에이전트', 'AI가 대신 하는 일', ['룩 분해, 옷장에 있는 건 제외', '원본 찾기: 출처 링크 → 국내 → 해외', '모은 룩 취향으로 대체 후보', '사이즈 · 아이템별 예산 조합', '가격 하락·품절 임박 감시 (Minds)']],
    ['03 · 커머스', '상품과 주문 처리', ['MVP는 상품 DB 없이 외부 검색으로', '결제 직전 재고 · 가격 재확인', '쇼핑몰별로 나눠 주문', '원본이 싸지면 반품 + 원본 구매 제안', '제휴가 늘면 상품 피드로 검색 색인']],
    ['04 · 결제', '누가 승인하나', ['사용자가 총액을 보고 "밀어서 결제"', '한 번에 · 골라서 · 장바구니만 · 가격 내려가면', '범위 밖 주문은 코드 규칙이 차단', '국내 카드·PG, 돈을 직접 받지 않음']],
  ];
  cols.forEach(([lab, h, items], i) => { const x = M + i * (CW / 4), w = CW / 4 - 0.3; const pay = i === 3; hr(s, x, 1.95, w, pay ? ACC : INK, pay ? 0.025 : 0.012); T(s, lab, { x, y: 2.07, w, h: 0.28, fontSize: 10, color: pay ? ACC : INK, bold: true }); T(s, h, { x, y: 2.38, w, h: 0.4, fontSize: 18, bold: true, color: INK });
    T(s, items.map((t, k) => ({ text: t, options: { breakLine: k < items.length - 1, bold: (pay && k === 0) || (i === 0 && k === 2) || (i === 2 && k === 0) || (i === 1 && k === 2), color: ((pay && k === 0) || (i === 0 && k === 2) || (i === 2 && k === 0) || (i === 1 && k === 2)) ? INK : BODY } })), { x, y: 2.9, w, h: 2.6, fontSize: 13, paraSpaceAfter: 9 }); });
  s.addShape(pres.shapes.RECTANGLE, { x: M, y: 5.85, w: CW, h: 0.55, fill: { color: W }, line: { color: INK, width: 0.75 } });
  T(s, [{ text: '예시  ', options: { bold: true, color: MUTE } }, { text: '핀 공유 → 룩 분해 → ' }, { text: '모은 룩 취향', options: { bold: true, color: INK } }, { text: '으로 15만 원 안 조합 → 총액 승인 → 쇼핑몰 3곳 주문 → 남은 아이템 감시' }], { x: M + 0.2, y: 5.92, w: CW - 0.4, h: 0.4, fontSize: 13, valign: 'middle' });
  footer(s, 'SNAP TO BUY');
}

// ---------- 7 architecture ----------
{
  const s = pres.addSlide({ masterName: 'LIGHT' });
  s.addText('ARCHITECTURE', { placeholder: 'label' });
  s.addText('결정은 snap to buy, 실행은 Minds, 권한은 AIR', { placeholder: 'title' });
  s.addShape(pres.shapes.RECTANGLE, { x: M, y: 1.85, w: CW, h: 0.42, fill: { color: W }, line: { color: LINE, width: 0.75 } });
  T(s, [{ text: 'Agent Registry   ', options: { bold: true, color: INK } }, { text: '쇼핑몰 구매 에이전트를 A2A 프로토콜로 찾고 일을 맡긴다' }], { x: M + 0.15, y: 1.9, w: CW - 0.3, h: 0.32, fontSize: 12, valign: 'middle' });
  const boxes = [
    { w: 1.85, lab: '01 USER', h: '사용자', d: '룩 모으기 (업로드 · 핀 · 인스타)\n결제 수단 연결\n총액 보고 승인', dark: false },
    { w: 3.0, lab: '02 SNAP TO BUY · GOOGLE CLOUD', h: '오케스트레이터 에이전트', d: 'Cloud Run · ADK · Gemini\n룩 분해 · 원본 검색(출처→국내→해외)\n모은 룩 취향 · 사이즈·예산 조합', dark: true },
    { w: 1.85, lab: '03 TRUST', h: 'AIR', d: '위임장 (한도·쇼핑몰·15분)\n에이전트 신원 검증\n"L 사이즈 적합: 네"', acc: true },
    { w: 1.85, lab: '04 EXECUTION', h: 'Minds', d: '구매 에이전트: 재고·가격 재확인\n감시 에이전트: 가격·품절·재입고' },
    { w: 1.85, lab: '05 EXTERNAL', h: '쇼핑몰 · PG', d: '검색 API · 공식 API\n(제휴 후 UCP 피드)\n국내 카드 결제' },
  ];
  let x = M; const y = 2.55, H = 2.45;
  boxes.forEach((b, i) => {
    s.addShape(pres.shapes.RECTANGLE, { x, y, w: b.w, h: H, fill: { color: b.dark ? INK : W }, line: { color: b.acc ? ACC : INK, width: 0.75 } });
    T(s, b.lab, { x: x + 0.15, y: y + 0.15, w: b.w - 0.3, h: 0.25, fontSize: 8, color: b.dark ? 'AAAAAA' : (b.acc ? ACC : INK), charSpacing: 2 });
    T(s, b.h, { x: x + 0.15, y: y + 0.45, w: b.w - 0.3, h: 0.4, fontSize: 16, bold: true, color: b.dark ? W : INK });
    T(s, b.d, { x: x + 0.15, y: y + 0.95, w: b.w - 0.3, h: 1.4, fontSize: 11, color: b.dark ? 'DDDDDD' : BODY, paraSpaceAfter: 4 });
    x += b.w;
    if (i < boxes.length - 1) { T(s, '→', { x, y: y + H / 2 - 0.2, w: 0.38, h: 0.4, fontSize: 18, color: INK, align: 'center' }); x += 0.38; }
  });
  hr(s, M, 5.35, CW);
  const steps = [['01', '룩 모으기', '사용자'], ['02', '룩 분해 · 원본', 'snap to buy'], ['03', '취향·사이즈·예산', 'snap to buy'], ['04', '총액 승인', '사용자'], ['05', '위임장·신원 검증', 'AIR'], ['06', '주문 · 결제', 'Minds'], ['07', '남은 아이템 감시', 'Minds']];
  steps.forEach(([n, h, who], i) => { const sx = M + i * (CW / 7); T(s, n, { x: sx, y: 5.45, w: 1.6, h: 0.22, fontSize: 9, color: INK, charSpacing: 3 }); T(s, h, { x: sx, y: 5.68, w: 1.6, h: 0.32, fontSize: 12, color: INK }); const f = who === 'Minds'; s.addText(who, { x: sx, y: 6.05, w: 1.0, h: 0.24, fontFace: KO, fontSize: 8, color: f ? W : INK, fill: f ? { color: INK } : undefined, line: { color: INK, width: 0.75 }, align: 'center', valign: 'middle', margin: 0, isTextBox: true }); });
  footer(s, 'REDRAWN FROM THE GOOGLE CLOUD SESSION · SHOPS ARE EXAMPLES');
}

// ---------- 8 business & roadmap ----------
{
  const s = pres.addSlide({ masterName: 'LIGHT' });
  s.addText('BUSINESS · ROADMAP', { placeholder: 'label' });
  s.addText('사용자는 무료, 수익은 판매로 · 찾기에서 대신 사기로', { placeholder: 'title' });
  const half = CW / 2 - 0.35;
  hr(s, M, 1.95, half);
  [['A', '제휴 수수료', '구매 1건당. 사이즈 추천으로 반품이 줄어 판매자도 이득'], ['B', '크리에이터 제휴', '인플루언서가 룩 아이템을 등록하면 원본 보장, 수수료 공유'], ['C', '추천 상품 광고', '"광고" 표시로 한 줄만, 원본을 가리지 않음'], ['D', '트렌드 리포트', '많이 모이고 팔리는 룩을 익명 통계로 브랜드에 제공']].forEach(([k, h, d], i) => { const y = 2.08 + i * 1.05; T(s, k, { x: M, y, w: 0.4, h: 0.3, fontSize: 10, color: INK, charSpacing: 3 }); T(s, h, { x: M + 0.55, y: y - 0.04, w: half - 0.55, h: 0.38, fontSize: 17, bold: true, color: INK }); T(s, d, { x: M + 0.55, y: y + 0.38, w: half - 0.55, h: 0.4, fontSize: 13 }); hr(s, M, y + 0.9, half, LINE); });
  const rx = M + CW / 2 + 0.35;
  hr(s, rx, 1.95, half);
  [['P1 · NOW', '찾기', '룩 모으기 · 외부 검색으로 원본과 내 감성 후보 · 구매 링크와 장바구니', INK], ['P2', '맞춤', '성별 사이즈표 · 실측 비교 · 아이템별 예산 · 모은 룩과 리뷰로 취향 학습', INK], ['P3 · WITH PARTNERS', '대신 사기', '제휴 피드로 검색 색인 · AIR 위임장 결제 · Minds 감시와 자동 구매', ACC]].forEach(([k, h, d, c], i) => { const y = 2.08 + i * 1.25; T(s, k, { x: rx, y, w: half, h: 0.25, fontSize: 9, color: c, charSpacing: 3 }); T(s, h, { x: rx, y: y + 0.28, w: half, h: 0.38, fontSize: 17, bold: true, color: INK }); T(s, d, { x: rx, y: y + 0.68, w: half, h: 0.4, fontSize: 13 }); hr(s, rx, y + 1.13, half, i === 2 ? ACC : LINE, i === 2 ? 0.025 : 0.012); });
  T(s, '결제사와 구글이 에이전트 결제 표준을 만들고 있고, Minds × VISA 실증이 소개됐다(파트너 세션). 국내 적용은 확인 중.', { x: rx, y: 5.95, w: half, h: 0.55, fontSize: 11, color: MUTE });
  footer(s, 'SNAP TO BUY');
}

// ---------- 9 closing ----------
{
  const s = pres.addSlide({ masterName: 'DARK' });
  T(s, 'THANK YOU', { x: M, y: 0.3, w: 4, h: 0.3, fontSize: 9, color: W, charSpacing: 3 });
  T(s, [{ text: 'see it.', options: { breakLine: true } }, { text: 'snap it. ' }, { text: 'wear it.', options: { italic: true } }], { x: M, y: 1.6, w: 11, h: 2.6, fontFace: SERIF, fontSize: 80, color: W });
  T(s, [{ text: '추천 앱은 보여주고 끝나지만, ' }, { text: 'snap to buy는 내 감성대로 대신 끝냅니다.', options: { bold: true, color: W } }], { x: M, y: 4.55, w: 11, h: 0.5, fontSize: 20, color: 'DDDDDD' });
  T(s, 'leebyeongchul.github.io/Future-Commerce-Challenge/mockup', { x: M, y: 7.02, w: 6, h: 0.25, fontSize: 9, color: '888888', charSpacing: 2, hyperlink: { url: 'https://leebyeongchul.github.io/Future-Commerce-Challenge/mockup/' } });
  T(s, 'github.com/LEEbyeongchul/Future-Commerce-Challenge', { x: 6.6, y: 7.02, w: 5.4, h: 0.25, fontSize: 9, color: '888888', charSpacing: 2, align: 'right', hyperlink: { url: 'https://github.com/LEEbyeongchul/Future-Commerce-Challenge' } });
}

pres.writeFile({ fileName: OUT }).then(f => console.log('wrote', f));
