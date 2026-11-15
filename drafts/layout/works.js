/* Work tiles shared by Drafts D / E / F (Draft C tile design). */
const WORK_FIELDS = { GFX: 'GRAPHICS · ENGINE', TOOLS: 'TOOLS · RESEARCH · WRITING', GAME: 'GAMES' };

const WORKS = [
    { id: 'meshshader', field: 'GFX', year: '2026', unit: 'UNIT 01', label: 'GRADUATION THESIS · 2026', wide: true,
      img: 'assets/thumbs/drive/1EL1vqrbs96enisJCK_u-FXedV5mr6EcS.jpg', title: 'DX12 Meshlet × IA Hybrid Rendering', star: true,
      meta: 'SOLE RESEARCH / 1ST AUTHOR · 2025.12–2026.11', line: 'IA · Mesh Shader 경로를 메시 그룹별로 런타임 선택해 같은 프레임에서 혼합.',
      stat: '> GPU Scene −15.83% vs IA · −3.01% vs MS', tags: [['inv', 'THESIS'], ['line', 'DX12'], ['line', 'MESH SHADER'], ['line', 'K-MEANS']] },
    { id: 'mapgen', field: 'GFX', year: '2026', unit: 'UNIT 02', label: 'PAPER · 2026',
      img: 'assets/thumbs/papers/mapgen-paper-3d.jpg', title: 'Massive Map Generation', star: true,
      meta: 'SOLO DEV · 2023.07–2024.06', stat: '> 270M tiles · 51.26 FPS host', tags: [['inv', 'KMMS PAPER'], ['line', 'PARALLEL'], ['line', 'IPC']] },
    { id: 'visualwave', field: 'TOOLS', year: '2026', unit: 'UNIT 03', label: 'PAPER · 2026',
      img: 'assets/thumbs/papers/vw-godot-demo.jpg', title: 'Visual Wave', star: true,
      meta: 'SOLE RESEARCH · 2025.05–', stat: '> 대사 1자당 30.0B → 4.7B', tags: [['inv', 'KMMS PAPER'], ['line', 'DSL'], ['line', 'LSP']] },
    { id: 'book', field: 'TOOLS', year: '2026', unit: 'UNIT 04', label: 'BOOK · 2026', top: true,
      img: 'assets/thumbs/drive/1hL3dtbTbEqQsb75rJ8j2BDkalzJNm7Td.jpg', title: 'More Deeper C++',
      meta: 'WRITER / INSTRUCTOR · 2026.07.30', stat: '> 222p · ISBN · 8 stores', tags: [['inv', 'PUBLISHED'], ['line', 'PAID COURSE']] },
    { id: 'hearts', field: 'GAME', year: '2025', unit: 'G-01', label: 'PUZZLE / VN',
      img: 'assets/thumbs/drive/1ePXQdvfpJ-jz0Ko8x81mW4Go-GG6Lcbv.jpg', title: '마음을 담아', star: true,
      meta: 'PROGRAMMER · TEAM 5', tags: [['inv', '★ 최우수상'], ['line', 'G-STAR']] },
    { id: 'alcoholfree', field: 'GAME', year: '2025', unit: 'G-02', label: 'VISUAL NOVEL',
      img: 'https://hyunsuyu.github.io/ALCOHOL-FREE/src/%EC%95%95%EC%83%9D%ED%8A%B8%20%EC%BB%B7%EC%94%AC.png',
      fallback: 'assets/thumbs/drive/1gaCl93bfKaSHVaSoRmW0L_XcZ1P5kwGa.jpg', title: 'ALCOHOL FREE', star: true,
      meta: 'PROGRAMMER · TEAM 7', tags: [['inv', '★ 우수상'], ['inv', '장려상'], ['line', 'STOVE']] },
    { id: 'rgbline', field: 'GAME', year: '2025', unit: 'G-03', label: 'RHYTHM',
      img: 'assets/thumbs/drive/1AQPQjfcLk8uUyBBZdREkdSsu9lpCmZwS.jpg', title: 'RGB Line',
      meta: 'LEAD PROGRAMMER · TEAM 4', tags: [['inv', '장려상'], ['line', 'G-STAR']] },
    { id: 'fins', field: 'GAME', year: '2026', unit: 'G-04', label: 'ACTION · JAM',
      img: 'assets/thumbs/fins/surface.jpg', title: 'FINS',
      meta: 'PROGRAMMER · TEAM 5', tags: [['line', 'GAME JAM · 3 DAYS']] }
];

const BLOG_TILE = `<div class="c-tile c-text-tile" data-field="TOOLS">
    <div class="c-head"><span>LOG</span><span>SINCE 2020</span></div>
    <div class="c-info">
        <h3>Technical Blog · 6+ Years</h3>
        <ul class="c-list">
            <li>Graphics &amp; Shader (Metaball, Fluid Sim)</li>
            <li>Optimization (NUMA, SIMD, Cache)</li>
            <li>AI &amp; Game Intelligence</li>
            <li>Computer Architecture</li>
        </ul>
        <p class="mono"><a href="https://medium.com/@lioie6478" target="_blank">[MEDIUM]</a> <a href="https://medium.com/more-deeper-c-programming-language" target="_blank">[PUBLICATION]</a> <a href="javascript:openModal('cs_course')">[COURSE]</a></p>
    </div>
</div>`;

function workById(id) { return WORKS.find(w => w.id === id); }

function tileHtml(w, opt) {
    opt = opt || {};
    const wide = w.wide && !opt.noWide;
    const img = w.fallback
        ? `<img src="${w.img}" onerror="this.onerror=null;this.src='${w.fallback}'" alt="" loading="lazy">`
        : `<img src="${w.img}" alt="" loading="lazy">`;
    return `<article class="c-tile${wide ? ' c-wide' : ''}" data-field="${w.field}" onclick="openModal('${w.id}')">
        <div class="c-head"><span>${w.unit}</span><span>${w.label}</span></div>
        <div class="c-thumb${w.top ? ' c-thumb-top' : ''}">${img}</div>
        <div class="c-info">
            <h3>${w.title}${w.star ? ' ⭐' : ''}</h3>
            <p class="c-meta">${w.meta}</p>
            ${wide && w.line ? `<p class="c-line">${w.line}</p>` : ''}
            ${w.stat ? `<p class="c-stat">${w.stat.replace('>', '&gt;')}</p>` : ''}
            <div class="c-tags">${w.tags.map(([k, t]) => `<span class="tag-${k}">${t}</span>`).join('')}</div>
        </div>
    </article>`;
}

/* The Draft C works layout: three field groups, 3 / 3 / 4 columns. */
function worksGroupsHtml() {
    const g = f => WORKS.filter(w => w.field === f).map(w => tileHtml(w)).join('');
    return `<div class="works-group" data-field="GFX"><h3 class="sub-title">${WORK_FIELDS.GFX}</h3><div class="c-grid c-grid-3">${g('GFX')}</div></div>
        <div class="works-group" data-field="TOOLS"><h3 class="sub-title">${WORK_FIELDS.TOOLS}</h3><div class="c-grid c-grid-3">${g('TOOLS')}${BLOG_TILE}</div></div>
        <div class="works-group" data-field="GAME"><h3 class="sub-title">${WORK_FIELDS.GAME}</h3><div class="c-grid c-grid-4">${g('GAME')}</div></div>`;
}
