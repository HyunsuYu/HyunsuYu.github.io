/* Shared record data for the three layout drafts.
   d: 'YYYY.MM' | 'YYYY' | '' (undated)   cat: category key   hl: highlight
   l: links -> ['m', modalId, label] (opens modal) | ['u', url, label] (new tab) */
const RECORD_CATS = {
    AWARD:     'AWARD',
    EXHIBIT:   'EXHIBITION',
    PUB:       'PUBLICATION',
    TALK:      'TALK · ORGANIZING',
    RECOG:     'RECOGNITION',
    MEDIA:     'MEDIA',
    SCHOLAR:   'SCHOLARSHIP',
    CERT:      'CERTIFICATION',
    MILESTONE: 'MILESTONE'
};

const RECORD_SHORT = {
    AWARD: 'AWARD', EXHIBIT: 'EXHIBIT', PUB: 'PUBLICATION', TALK: 'TALK·ORG', RECOG: 'INDUSTRY',
    MEDIA: 'MEDIA', SCHOLAR: 'SCHOLAR', CERT: 'CERT', MILESTONE: 'MILESTONE'
};

const RECORDS = [
    // --- AWARDS ---
    { d: '2026.10', cat: 'AWARD', hl: true, t: 'TU Game Challenge 2026 — 우수상 (IEEE Track)', s: 'Ever Check' },
    { d: '2026.10', cat: 'AWARD', t: 'TU Game Challenge 2026 — 장려상', s: 'ALCOHOL FREE', l: [['m', 'alcoholfree', 'ALCOHOL FREE']] },
    { d: '2026.10', cat: 'AWARD', t: 'TU Game Challenge 2026 — 장려상', s: '냥냥대난투' },
    { d: '2026.06', cat: 'AWARD', t: 'B-Contents 경진대회 2026 — 우수상', s: 'DEEP FALL', l: [['m', 'b_contents_competition', 'B-Contents']] },
    { d: '2025.10', cat: 'AWARD', hl: true, t: 'TU Game Challenge 2025 — 최우수상', s: '마음을 담아', l: [['m', 'hearts', '마음을 담아'], ['u', 'https://sway.cloud.microsoft/4PpAiwGK3vnc9XkW?ref=Link', 'TU GC 2025']] },
    { d: '2025.10', cat: 'AWARD', hl: true, t: 'TU Game Challenge 2025 — 최우수상', s: 'Cross Wordle' },
    { d: '2025.10', cat: 'AWARD', t: 'TU Game Challenge 2025 — 우수상', s: 'ALCOHOL FREE', l: [['m', 'alcoholfree', 'ALCOHOL FREE']] },
    { d: '2025.10', cat: 'AWARD', t: 'TU Game Challenge 2025 — 장려상', s: 'RGB Line', l: [['m', 'rgbline', 'RGB Line']] },
    { d: '2025',    cat: 'AWARD', hl: true, t: 'Chair of IEEE Busan Section 2025 — Excellence Award', s: 'Cross Wordle' },

    // --- EXHIBITIONS ---
    { d: '2026.06', cat: 'EXHIBIT', t: 'Build 051 2026' },
    { d: '2026.04', cat: 'EXHIBIT', t: '부산 게임 개발자 컨퍼런스 2026', s: 'ALCOHOL FREE, 마음을 담아', l: [['m', 'busan_game_dev_conf', '부산 게임 개발자 컨퍼런스']] },
    { d: '2025.12', cat: 'EXHIBIT', t: 'Comic World 2025', s: 'Pleedus Partnership Booth (ALCOHOL FREE, 마음을 담아)', l: [['u', 'https://www.tu.ac.kr/gart/sub05_05.do?mode=view&articleNo=144323', 'Comic World 2025']] },
    { d: '2025.12', cat: 'EXHIBIT', t: 'TU RISE ALL FESTA 2025', s: 'ALCOHOL FREE, 마음을 담아', l: [['u', 'https://www.tu.ac.kr/gart/sub05_05.do?mode=view&articleNo=143632&title=RISE+ALL+FESTA+%EC%9E%91%ED%92%88+%EC%B6%9C%ED%92%88+%EB%B0%8F+%EC%A0%84%EC%8B%9C', 'RISE ALL FESTA']] },
    { d: '2025.12', cat: 'EXHIBIT', t: 'BEAVER ROCKS 2025', s: 'ALCOHOL FREE', l: [['u', 'https://beaverrocks.com/BeaverRocks2025-game', 'BEAVER ROCKS']] },
    { d: '2025.11', cat: 'EXHIBIT', hl: true, t: 'G-Star 2025', s: 'ALCOHOL FREE, 마음을 담아, RGB Line, Cross Wordle', l: [['u', 'https://sway.cloud.microsoft/JPasLtlByjTwysGH?ref=email&loc=play', 'G-Star 2025']] },
    { d: '2025.06', cat: 'EXHIBIT', t: 'Build 051 2025', s: 'RGB Line', l: [['u', 'https://build051.org/', 'Build 051']] },

    // --- PUBLICATIONS ---
    { d: '2026.11', cat: 'PUB', hl: true, t: 'DirectX 12 Meshlet과 IA 기반의 하이브리드 렌더링 파이프라인 구현', s: '학사학위 졸업논문 · 제1저자·단독', l: [['u', 'assets/papers/GraduationThesis.pdf', 'THESIS'], ['m', 'meshshader', 'Hybrid Rendering']] },
    { d: '2026.10', cat: 'PUB', hl: true, t: '계층적 임의 보행 기반 대규모 타일맵 생성 알고리즘과 호스트 반응성을 위한 실행 전략', s: '한국멀티미디어학회 추계학술발표대회 제29권 2호 · 포스터 · 제1저자·단독', l: [['u', 'assets/papers/MapGenPaper.pdf', 'PAPER'], ['m', 'mapgen', 'Massive Map Gen']] },
    { d: '2026.10', cat: 'PUB', hl: true, t: '프레임-스테이트 실행 모델 기반 비주얼 노벨 저작 프레임워크', s: '한국멀티미디어학회 추계학술발표대회 제29권 2호 · 포스터 · 제1저자·단독', l: [['u', 'assets/papers/VisualWavePaper.pdf', 'PAPER'], ['m', 'visualwave', 'Visual Wave']] },
    { d: '2026.07', cat: 'PUB', hl: true, t: 'More Deeper C++ Programming Language 출간', s: '기술 서적 · 단독 저자 · 222p · ISBN 979-11-438-1468-5', l: [['u', 'https://www.yes24.com/product/goods/194190987', 'YES24'], ['m', 'book', 'Book']] },

    // --- TALKS / ORGANIZING ---
    { d: '2026',    cat: 'TALK', hl: true, t: 'GAME OVER? 2026 — 운영총괄 (Operations Director)', l: [['u', 'https://game-dev-conference-gameover.github.io/GAMEOVER_Homepage/2026/', 'GAME OVER?']] },
    { d: '2026.05', cat: 'TALK', t: 'Unite Seoul 2026 — 연사 최종 심사 진출', s: 'Massive Map Generation System', l: [['m', 'unite_2026', 'Unite 2026']] },
    { d: '2024.08', cat: 'TALK', t: 'Security-One 포럼 연사', s: 'Row Hammer', l: [['u', 'https://www.facebook.com/seoneforum/?locale=ko_KR', 'Security-One']] },

    // --- INDUSTRY RECOGNITION ---
    { d: '2025.11', cat: 'RECOG', hl: true, t: 'Square Enix — SAITA Tomonori (Former Producer) 피드백', s: 'ALCOHOL FREE, 마음을 담아, RGB Line @ G-Star 2025', l: [['m', 'square_enix', 'Square Enix']] },
    { d: '2025.11', cat: 'RECOG', hl: true, t: 'Toei Company — KATO (Game Advisor) 퍼블리싱 제안', s: 'ALCOHOL FREE, 마음을 담아, RGB Line @ G-Star 2025', l: [['m', 'toei', 'Toei']] },
    { d: '2025.12', cat: 'RECOG', t: 'Pleedus — Exhibition Partnership', s: 'ALCOHOL FREE, 마음을 담아 @ Comic World 2025', l: [['m', 'pleedus', 'Pleedus']] },

    // --- MEDIA ---
    { d: '2026.04', cat: 'MEDIA', t: '제8회 부산 게임개발자 컨퍼런스 참가 및 작품 출품', s: '마음을 담아, ALCOHOL FREE', l: [['u', 'https://www.tu.ac.kr/gart/sub05_05.do?mode=view&articleNo=150666', 'ARTICLE']] },
    { d: '2025',    cat: 'MEDIA', t: '今年のG-Starはどうだったか？ (KATO 기고)', s: '마음을 담아 소개', l: [['u', 'https://sqool.net/report/archive/gstar2025-report.html', 'ARTICLE']] },
    { d: '2025',    cat: 'MEDIA', t: 'TU 게임 챌린지 특별호', s: '마음을 담아, ALCOHOL FREE, RGB Line, Cross Wordle', l: [['u', 'https://sway.cloud.microsoft/4PpAiwGK3vnc9XkW?ref=Link', 'ARTICLE']] },
    { d: '2025',    cat: 'MEDIA', t: "동명대 게임학부 '25-4분기 (G-Star 2025)", l: [['u', 'https://sway.cloud.microsoft/JPasLtlByjTwysGH?ref=email&loc=play', 'ARTICLE']] },
    { d: '2024.09', cat: 'MEDIA', t: 'Microsoft Game Dev Community — Question of the Week', s: '"What was your biggest game development challenge?" 답변 소개', l: [['u', 'https://developer.microsoft.com/en-us/games/articles/2024/09/community-question-of-the-week-9624/#:~:text=a%20learning%20experience.%E2%80%9D-,Hyunsu%20Yu,-%2C%20college%20Game', 'ARTICLE']] },
    { d: '',        cat: 'MEDIA', t: 'The .NET News Daily Issue #313', s: 'C# — Unique behavior when passing array and list objects as parameters', l: [['u', 'https://dotnetnews.co/archive/the-net-news-daily-issue-313/?8utm_source=medium&utm_medium=comment', 'ARTICLE']] },

    // --- SCHOLARSHIPS ---
    { d: '2026.03', cat: 'SCHOLAR', t: '26-1 부산지역인재장학', l: [['m', 'busan_regional_talent_scholarship', '부산지역인재장학']] },
    { d: '2025.12', cat: 'SCHOLAR', t: '25-2 부산지역인재장학', l: [['m', 'busan_regional_talent_scholarship', '부산지역인재장학']] },
    { d: '',        cat: 'SCHOLAR', t: 'SW분야우수인재장학' },

    // --- CERTIFICATIONS ---
    { d: '', cat: 'CERT', t: '프로그래머스 스킬체크 레벨 3' },
    { d: '', cat: 'CERT', t: '리눅스 마스터 2급' },
    { d: '', cat: 'CERT', t: '정보 처리 기능사' },
    { d: '', cat: 'CERT', t: '민간 SW개발보안 대학생 교육(입문과정)' },
    { d: '', cat: 'CERT', t: 'GitHub Foundations' },

    // --- MILESTONES (former timeline) ---
    { d: '2026.10', cat: 'MILESTONE', t: 'FINS 개발 (UPTRANDING Game Jam, 2박 3일)', l: [['m', 'fins', 'FINS']] },
    { d: '2026.08', cat: 'MILESTONE', t: '제1회 UPTRANDING 게임잼' },
    { d: '2026.01', cat: 'MILESTONE', t: '포우포우 위치 (Global Game Jam, 3 days)', l: [['u', 'https://hyunsuyu.github.io/PowPowWitchHome/', '포우포우 위치']] },
    { d: '2026.01', cat: 'MILESTONE', t: 'TU Mach Game Jam (2 days)' },
    { d: '2025.12', cat: 'MILESTONE', t: 'DX12 Meshlet × IA Hybrid Rendering 연구 시작 (졸업논문)', l: [['m', 'meshshader', 'Hybrid Rendering']] },
    { d: '2025.12', cat: 'MILESTONE', t: 'ALCOHOL FREE 완성 (2025.05 ~ 2025.12)', l: [['m', 'alcoholfree', 'ALCOHOL FREE']] },
    { d: '2025.12', cat: 'MILESTONE', t: 'RGB Line 완성 (2024.12 ~ 2025.12)', l: [['m', 'rgbline', 'RGB Line']] },
    { d: '2025.09', cat: 'MILESTONE', t: 'Cross Wordle (교육용 프로젝트, 7 days)' },
    { d: '2025.09', cat: 'MILESTONE', t: 'Still Alive (Club Game Jam, 4 days)' },
    { d: '2025.05', cat: 'MILESTONE', t: '마음을 담아 개발 시작', l: [['m', 'hearts', '마음을 담아']] },
    { d: '2025.01', cat: 'MILESTONE', t: 'UDE-B91 (Global Game Jam, 3 days)', l: [['u', 'https://globalgamejam.org/games/2025/ude-891-9', 'UDE-B91']] },
    { d: '2024.12', cat: 'MILESTONE', t: 'RGB Line 개발 시작' },
    { d: '2024.10', cat: 'MILESTONE', t: 'Computer Science 강의 (2024.10 ~ 2025.02)', l: [['u', 'https://drive.google.com/drive/folders/1nS0rt085X6sCtfV1szX6ia9s4nRWJYEk?usp=sharing', 'COURSE']] },
    { d: '2024.10', cat: 'MILESTONE', t: 'UPTRAND (창업동아리) 합류' },
    { d: '2024.06', cat: 'MILESTONE', t: 'Massive Map Generation System 초기 구현 완료 (2023.07 ~ 2024.06)', l: [['m', 'mapgen', 'Massive Map Gen']] },
    { d: '2023.07', cat: 'MILESTONE', t: 'Massive Map Generation System 구현 시작' },
    { d: '2023.04', cat: 'MILESTONE', t: 'More Deeper C++ 원고 집필 (2023.04 ~ 2023.10)', l: [['m', 'book', 'Book']] },
    { d: '2023.04', cat: 'MILESTONE', t: '공군 전역' },
    { d: '2021.07', cat: 'MILESTONE', t: '공군 입대 — 복무 중 블로그 연구 · MIT OCW · 논문 리뷰, Map Gen 초기 설계' },
    { d: '2021.06', cat: 'MILESTONE', t: 'NATAKER 완성 (1.5 months)', l: [['m', 'nataker', 'NATAKER']] },
    { d: '2020.05', cat: 'MILESTONE', t: 'Technical Blog 시작', l: [['u', 'https://medium.com/@lioie6478', 'BLOG']] }
];

/* ---------- helpers ---------- */
function recLinksHtml(r) {
    return (r.l || []).map(([kind, target, label]) => kind === 'm'
        ? `<a href="javascript:openModal('${target}')" class="timeline-link">[${label}]</a>`
        : `<a href="${target}" target="_blank" class="timeline-link">[${label}]</a>`).join(' ');
}
function recYear(r) { return r.d ? r.d.slice(0, 4) : 'UNDATED'; }
function recSortKey(r) { return r.d ? r.d.padEnd(7, '.00').replace('.', '') : '000000'; }
function sortedRecords(list) { return list.slice().sort((a, b) => recSortKey(b).localeCompare(recSortKey(a))); }
function recCount(cat) { return cat === 'ALL' ? RECORDS.length : cat === 'HL' ? RECORDS.filter(r => r.hl).length : RECORDS.filter(r => r.cat === cat).length; }
function recFilter(cat) { return cat === 'ALL' ? RECORDS : cat === 'HL' ? RECORDS.filter(r => r.hl) : RECORDS.filter(r => r.cat === cat); }

/* Chip bar: [ ALL 63 ] [ ★ 15 ] [ AWARD 9 ] ... ; onPick(cat) */
function buildChips(el, cats, active, onPick) {
    el.innerHTML = cats.map(c => {
        const label = c === 'ALL' ? 'ALL' : c === 'HL' ? '★ HIGHLIGHTS' : RECORD_CATS[c];
        return `<button class="chip${c === active ? ' active' : ''}" data-cat="${c}">${label}<span class="chip-n">${recCount(c)}</span></button>`;
    }).join('');
    el.querySelectorAll('.chip').forEach(b => b.addEventListener('click', () => {
        el.querySelectorAll('.chip').forEach(x => x.classList.toggle('active', x === b));
        onPick(b.dataset.cat);
    }));
}
