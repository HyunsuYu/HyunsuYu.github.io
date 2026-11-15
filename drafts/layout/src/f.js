        (function () {
            const YEARS = ['2026', '2025', '2024', '2023', '2021', '2020', 'UNDATED'];
            const NOTES = { '2023': '2021.07 – 2023.04 공군 복무', '2021': '복무 중 블로그 연구 · MIT OCW · 논문 리뷰' };
            const count = (list, cats) => list.filter(r => cats.includes(r.cat)).length;
            document.getElementById('f-years').innerHTML = YEARS.map(y => {
                const recs = sortedRecords(RECORDS.filter(r => recYear(r) === y));
                const works = WORKS.filter(w => w.year === y);
                const cnt = [['WORKS', works.length], ['AWARDS', count(recs, ['AWARD'])], ['PAPERS · BOOK', count(recs, ['PUB'])],
                             ['EXHIBITS', count(recs, ['EXHIBIT'])], ['OTHER', recs.length - count(recs, ['AWARD', 'PUB', 'EXHIBIT'])]]
                    .filter(c => c[1] > 0).map(([k, v]) => `<span><b>${k}</b>${String(v).padStart(2, '0')}</span>`).join('');
                const rows = recs.map(r => `<div class="f-rec"><span class="d">${r.d && r.d.length > 4 ? r.d.slice(5) : '—'}</span>` +
                    `<span class="t"><span class="tag-${r.hl ? 'inv' : 'line'}">${RECORD_SHORT[r.cat]}</span></span>` +
                    `<span><strong>${r.t}</strong>${r.s ? ` <span class="s">— ${r.s}</span>` : ''} ${recLinksHtml(r)}</span></div>`).join('');
                return `<div class="f-band" id="y${y}">
                    <div class="f-year"><div class="f-y${y === 'UNDATED' ? ' small' : ''}">${y === 'UNDATED' ? 'ETC.' : y}</div><div class="f-cnt">${cnt}</div>${NOTES[y] ? `<div class="f-note">${NOTES[y]}</div>` : ''}</div>
                    <div class="f-body">
                        ${works.length ? `<div class="c-grid c-grid-3">${works.map(w => tileHtml(w)).join('')}</div>` : ''}
                        ${rows ? `<div class="f-recs" data-label="RECORD · ${recs.length}">${rows}</div>` : ''}
                    </div>
                </div>`;
            }).join('');

            /* sidebar follows the year on screen */
            const links = [...document.querySelectorAll('nav a[href^="#"]')];
            const targets = links.map(a => document.querySelector(a.getAttribute('href')));
            function spy() {
                let idx = 0;
                targets.forEach((t, k) => { if (t && t.getBoundingClientRect().top < window.innerHeight * 0.3) idx = k; });
                links.forEach((a, k) => a.classList.toggle('active', k === idx));
            }
            window.addEventListener('scroll', spy, { passive: true });
            spy();
        })();
