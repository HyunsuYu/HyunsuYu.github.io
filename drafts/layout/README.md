# Layout drafts (2026.11)

메인 페이지 정보 구조 개편 때 만든 시안 모음입니다. **D안이 실제 사이트(`/index.html`)에 적용**됐고, 나머지는 나중에 다시 쓸 수 있게 남겨 둔 스냅샷입니다.

- 보기: `https://hyunsuyu.github.io/drafts/layout/` (검색 노출 방지를 위해 모든 페이지에 `noindex`)
- 모든 시안은 적용 직전 사이트(`src/base-index.html`)의 내용·모달·projectDB를 그대로 사용합니다.

| 파일 | 내용 |
|---|---|
| `current.html` | 적용 직전 사이트 스냅샷 (비교 기준) |
| `draft-a.html`, `draft-a-archive.html` | A · 요약 + 별도 아카이브 표 |
| `draft-b.html` | B · 사이드바 + 탭 / 아코디언 / 기록 필터 |
| `draft-c.html` | C · 이미지 우선 그리드 (이 시안의 타일 디자인이 D·E·F의 공통 부품) |
| `draft-d.html` | D · 허브 화면 전환 (PROFILE / WORKS / RECORDS / CONTACT) — **적용됨** |
| `draft-e.html` | E · 벤토 타일 대시보드 |
| `draft-f.html` | F · 연도별 크로니클 |
| `records.js` | 수상·전시·논문·장학·자격·타임라인 기록 데이터 (시안 공용) |
| `works.js` | 작업물 타일 데이터와 타일 HTML 생성 함수 |

## 다시 빌드하기

```bash
python3 drafts/layout/src/build.py      # src/base-index.html + 템플릿으로 draft-*.html 재생성
```

- `src/*_main.html` — 시안별 `<main>` 템플릿 (`{{SECTION:id}}`로 원본 섹션 재사용)
- `src/*.css`, `src/*.js` — 시안별 스타일·스크립트 (`shared.css`, `tiles.css`는 공용)
- `src/apply_d.py` — D안을 사이트 `index.html`에 적용할 때 쓴 스크립트

시안 HTML은 `<base href="../../">`로 사이트 루트의 `assets/`를 그대로 씁니다.
