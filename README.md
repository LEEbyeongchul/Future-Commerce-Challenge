# snap to buy (가칭)

> 저장만 해두던 룩을, 오늘 주문하는 옷으로.

**▶ 발표 자료:** https://leebyeongchul.github.io/Future-Commerce-Challenge/slides/deck.html ([PDF](slides/snap-to-buy_발표자료.pdf) · [PPT](slides/snap-to-buy_발표자료.pptx))
**▶ 목업 체험:** https://leebyeongchul.github.io/Future-Commerce-Challenge/mockup/
**▶ 이어서 작업하려면:** [HANDOVER.md](HANDOVER.md)부터 읽기

**Future Commerce Challenge 2026** · Track A. Future Shopping Experience · 2026.11.22 Google Startup Campus Seoul

> 데모 범위: 목업의 브랜드·상품·가격·리뷰·쇼핑몰 이름은 모두 가상 예시입니다. 실제 AI 모델이나 결제와 연결되지 않은, 사용 경험을 보여주는 화면 시연입니다.

갤러리에 쌓아둔 룩 사진과 핀터레스트·인스타 게시물을 모으면, snap to buy가 그 **모은 룩으로 내 취향을 배웁니다.** 새 룩을 보내면 **원본을 먼저 찾고**, 없으면 **내 감성에 맞는 후보**를 사이즈와 예산에 맞춰 골라, **승인 한 번으로** 여러 쇼핑몰 주문을 대신 끝냅니다. 결제는 AIR 위임장 범위 안에서 Minds가 실행하고, 사지 않은 아이템은 가격과 재고를 계속 지켜봅니다.

## 서비스 흐름

```
룩 모으기 → 룩 분해·원본 찾기 → 내 감성 후보·사이즈·예산 → 총액 승인 → 대신 주문 → 계속 지켜보기
 (사용자)      (snap to buy)          (snap to buy)           (사용자)    (AIR·Minds)    (Minds)
```

## 문서

| 문서 | 설명 |
| --- | --- |
| [발표 자료](slides/deck.html) ([PDF](slides/snap-to-buy_발표자료.pdf) · [PPT](slides/snap-to-buy_발표자료.pptx)) | 3분 발표용 9장. PPT는 파워포인트에서 바로 수정 가능 |
| [제출용 소개](docs/제출용_소개.md) | 구글폼에 넣을 3–5문장 |
| [기획서 (Markdown)](docs/기획서.md) · [PDF](docs/snap-to-buy_기획서.pdf) | 문제, 흐름, 기능, 차별점, 아키텍처, 결제, 수익, 로드맵, 예상 질문 |
| [목업](https://leebyeongchul.github.io/Future-Commerce-Challenge/mockup/) ([소스](mockup/index.html)) | 클릭형 목업 |
| [기술 가이드](docs/기술_가이드.pdf) ([md](docs/기술_가이드.md)) | 용어, 아키텍처, 취향 분석 파이프라인, 모델과 알고리즘 |
| [쟁점 정리](docs/쟁점_정리.pdf) ([md](docs/쟁점_정리.md)) | 쟁점별 해결법과 한계 |
| [참고 저장소 분석](docs/참고_저장소_분석.pdf) ([md](docs/참고_저장소_분석.md)) | 공개 쇼핑 에이전트 저장소에서 참고할 점 |
| [발표 전 반영안](docs/발표전_반영안.pdf) ([md](docs/발표전_반영안.md)) | 데모 범위 고지, 결제 흐름, 역할 분담, 예상 질문 보강 |
| [당일 체크리스트](docs/내일_체크리스트.md) | 오리엔테이션·멘토 질문, 일정, 예상 질문 답변 |
| [슬라이드: 왜 에이전트인가](slides/왜_에이전트인가.png) · [아키텍처](slides/아키텍처.png) | 단독 슬라이드 (PNG · PDF) |
| [인수인계](HANDOVER.md) | 현재 상태, 결정 사항, 수정·빌드 방법 |

## AI 도구 활용

기획 정리, 문서 작성, 목업·발표 자료 코드 작성에 AI 코딩 도구(Claude Code)를 사용했습니다.
