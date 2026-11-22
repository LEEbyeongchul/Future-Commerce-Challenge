# 인수인계 · snap to buy

다른 컴퓨터(팀원)에서 이 프로젝트를 바로 이어받기 위한 문서다. **처음 이어받는 사람과 AI 도우미 모두 이 파일부터 읽는다.**

마지막 정리: 2026-11-22 (Future Commerce Challenge 당일)

---

## 1. 지금 상태 한눈에

| 항목 | 상태 | 위치 |
| --- | --- | --- |
| 발표 자료 (9장, 3분용) | 완성 | `slides/deck.html` · `slides/snap-to-buy_발표자료.pdf` |
| 클릭형 목업 | 완성·배포 | `mockup/index.html` · https://leebyeongchul.github.io/Future-Commerce-Challenge/mockup/ |
| 기획서 | 최신 | `docs/기획서.md` · `docs/snap-to-buy_기획서.pdf` |
| 제출용 소개 3–5문장 | 완성 | `docs/제출용_소개.md` |
| 기술 가이드 · 쟁점 정리 · 참고 저장소 분석 · 발표 전 반영안 | 최신 | `docs/` |
| 당일 체크리스트 (멘토 질문 포함) | 최신 | `docs/내일_체크리스트.md` |
| 단독 슬라이드 (왜 에이전트 · 아키텍처) | 최신 | `slides/*.png` · `slides/*.pdf` |

**제출 마감: 11/22 17:00 · 구글폼** — 팀명, 트랙(A), 대표자 연락처, 아이디어 소개(`docs/제출용_소개.md`), 발표 자료 파일 또는 URL.
발표 자료 URL: https://leebyeongchul.github.io/Future-Commerce-Challenge/slides/deck.html

## 2. 서비스 핵심 (바꾸면 안 되는 결정)

1. **핵심 = 모은 룩.** 갤러리 룩 사진 여러 장 업로드, 핀터레스트·인스타 **공유하기**로 모은 룩이 취향 분석의 주 데이터. (갤러리 자동 스캔이 아님)
2. **원본 우선.** 출처 링크 → 국내 쇼핑 검색 API → 구글 이미지 검색 API. 못 찾으면 솔직하게 알리고, **모은 룩 취향** 기준 대체 후보.
3. **MVP는 상품 DB 없음.** 외부 검색으로 그때그때. 저장하는 건 사용자 취향 데이터. 제휴가 늘면 상품 피드로 검색 색인.
4. **결제 5단계.** 의도 정리(snap to buy) → 위임장(AIR: 한도·허용 쇼핑몰·15분) → 재고·가격 재확인(Minds) → 검증(AIR) → 결제(Minds → 카드사). 국내는 카드·PG, 우리가 돈을 직접 받지 않음.
5. **역할 분담.** 무엇을 살지는 snap to buy, 대신 실행·감시는 Minds, 권한·신원은 AIR.
6. **결제 방식 4가지.** 한 번에 · 골라서 · 장바구니에만 · 가격 내려가면 사기(품절 임박 규칙 포함). 원본이 싸지면 "원본으로 바꾸기"(반품 도움).
7. **핵심 문장.** "추천 앱은 보여주고 끝나지만, snap to buy는 내 감성대로 대신 끝낸다."

## 3. 지켜야 할 것

- **메타 Muse 언급하지 않기.** "범용 AI 에이전트"로 표현.
- **실제 쇼핑몰 이름을 제휴처럼 쓰지 않기.** 목업 브랜드·가격·리뷰는 전부 가상. "쇼핑몰 A·B·C"로 표기.
- **Minds 결제는 "실증 사례·계획"으로 말하기.** 공식 사이트 기준 지갑 결제는 "앞으로의 방향". Minds × VISA는 파트너 세션 소개 사례.
- **파트너 세션 사진(KakaoTalk_*.jpg)과 운영 슬라이드 HTML은 깃에 올리지 않기.** 대외비 표시가 있음.
- **다른 팀 저장소 코드 복사 금지.** 아이디어·구조만 참고. 코드 재사용은 MIT인 OmniShopAgent만 가능(출처 표시).

## 4. 폴더 구조

```
README.md            프로젝트 소개 + 문서 목록
HANDOVER.md          이 문서
mockup/index.html    클릭형 목업 (HTML 하나, 빌드 불필요)
slides/
  deck.html          3분 발표 자료 (9장, 1920x1080) → PDF로 출력
  snap-to-buy_발표자료.pdf
  img/               덱에 쓰는 목업 캡처 (build로 재생성)
  왜_에이전트인가.*   아키텍처.*   단독 슬라이드 (html 원본 · png · pdf)
docs/
  기획서.md · snap-to-buy_기획서.html(PDF 디자인 원본) · .pdf
  제출용_소개.md · 기술_가이드 · 쟁점_정리 · 참고_저장소_분석 · 발표전_반영안 (md + pdf)
  내일_체크리스트.md
tools/
  build.ps1          PDF·PNG 전부 다시 만들기
  md2html.js         Markdown → 인쇄용 HTML 변환
```

## 5. 수정하는 법

| 고칠 것 | 파일 | 다시 만들기 |
| --- | --- | --- |
| 발표 자료 문구·디자인 | `slides/deck.html` | `tools\build.ps1 -Only deck` |
| 목업 화면·데이터 | `mockup/index.html` (아래 참고) | 덱 캡처도 바꾸려면 `-Only shots,deck` |
| 기획서 PDF | `docs/snap-to-buy_기획서.html` (7페이지 고정, 넘치지 않게 주의) | `-Only docs` |
| Markdown 문서 | `docs/*.md` | `-Only docs` |
| 단독 슬라이드 | `slides/왜_에이전트인가.html`, `slides/아키텍처.html` | `-Only slides` |

**빌드 실행 (PowerShell):**
```
powershell -ExecutionPolicy Bypass -File tools\build.ps1
```
필요: Microsoft Edge 또는 Chrome, Node.js. 결과물은 같은 위치에 덮어쓴다.

**목업 구조 메모 (`mockup/index.html`)**
- 상품 데이터: `const ITEMS` (니트·데님·로퍼, 원본 `orig`, 대체 후보 `alts`), 광고 `ADS`, 저장 룩 유사 장수 `SIM`
- 화면 6개: `<section class="screen" data-s="0~5">`, 이동 함수 `go(n)`
- 패널: 마이페이지 `#mypage`, 업로드 `#upP`, 공유 안내 `#shP`, 상품 상세 `#detail`
- 결제 방식: `PAY`, 렌더 `renderCheckout()`; 예산 조합 `autoPick()`; 성별 사이즈표 `SZT`
- **바로가기 주소(캡처·시연용):** `index.html#s=3&scroll=150`, `#p=mypage`, `#p=upload`, `#s=4&pay=wait`, `#s=5&pay=all`
- 키보드: ← → 이동, R 처음부터, Esc 패널 닫기

## 6. 배포 · 깃

- `main`에 푸시하면 GitHub Pages가 1분 안에 자동 배포 (`/mockup/`, `/slides/deck.html`).
- 커밋 전 `git status`로 KakaoTalk 사진·운영 슬라이드 HTML이 안 들어가는지 확인.

```
git add -A -- . ":!KakaoTalk_*" ":!Future_Commerce_Challenge_*"
git commit -m "..."
git push origin main
```

## 7. AI 도우미(Claude Code 등)로 이어서 작업할 때

이 폴더를 열고 첫 메시지로:
> "HANDOVER.md를 먼저 읽고, 지금 상태를 이어받아 줘. 3번 '지켜야 할 것'은 꼭 지켜줘."

자주 할 요청 예시:
- "발표 자료 6번 슬라이드 문구를 ○○로 바꾸고 PDF 다시 만들어 줘"
- "목업에서 ○○ 화면에 ○○ 추가하고, 덱 캡처까지 다시 만들어 줘"
- "기획서 md와 PDF를 같이 업데이트해 줘"

## 8. 남은 일

- [ ] 17:00 전 구글폼 제출 (발표 자료 URL은 시크릿 창에서 열리는지 확인)
- [ ] 멘토에게 Minds 연동 질문 3개 확인 (`docs/내일_체크리스트.md`)
- [ ] 발표 첫 문장은 본인 이야기로: "제 갤러리에는 사지 못한 룩 사진만 쌓여 있습니다"
- [ ] 가능하면 직접 룩 하나를 사보며 걸린 시간 측정 → 발표 근거 숫자로
