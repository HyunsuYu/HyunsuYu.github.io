        const D_SCREENS = ['profile', 'works', 'records', 'contact'];
        const D_LABEL = { profile: 'PROFILE', works: 'WORKS', records: 'RECORDS', contact: 'SKILLS & CONTACT' };
        function showScreen(name) {
            if (!D_SCREENS.includes(name)) name = 'profile';
            D_SCREENS.forEach(s => document.getElementById('scr-' + s).classList.toggle('active', s === name));
            document.querySelectorAll('nav a').forEach(a => a.classList.toggle('active', a.dataset.screen === name));
            document.getElementById('d-crumb').textContent = 'SYSTEM / ' + D_LABEL[name];
            try { history.replaceState(null, '', location.pathname + location.search + '#' + name); } catch (e) { }
            window.scrollTo(0, 0);
        }
        (function () {
            document.querySelectorAll('nav a').forEach(a => {
                const m = a.getAttribute('href').match(/showScreen\('(\w+)'\)/);
                if (m) a.dataset.screen = m[1];
            });

            /* profile */
            document.getElementById('d-spot').innerHTML = tileHtml(workById('meshshader')) + tileHtml(workById('mapgen'));
            const latest = sortedRecords(RECORDS.filter(r => r.hl)).slice(0, 5);
            document.getElementById('d-latest').innerHTML = latest.map(r =>
                `<div class="rec-row"><span class="rec-date">${r.d || '—'}</span><span class="rec-cat"><span class="tag-inv">${RECORD_SHORT[r.cat]}</span></span>` +
                `<span><span class="rec-title">${r.t}</span>${r.s ? ` <span class="rec-sub">— ${r.s}</span>` : ''}</span></div>`).join('');

            /* works */
            document.getElementById('d-works').innerHTML = worksGroupsHtml();
            const chips = [...document.querySelectorAll('#d-work-chips .chip')];
            chips.forEach(c => c.addEventListener('click', () => {
                chips.forEach(x => x.classList.toggle('active', x === c));
                document.querySelectorAll('#d-works .works-group').forEach(g => g.hidden = !(c.dataset.f === 'ALL' || g.dataset.field === c.dataset.f));
            }));

            /* records: category / list / detail */
            const CATS = ['HL', 'AWARD', 'PUB', 'EXHIBIT', 'TALK', 'RECOG', 'MEDIA', 'SCHOLAR', 'CERT', 'MILESTONE'];
            const catEl = document.getElementById('d-cats'), listEl = document.getElementById('d-list'), detEl = document.getElementById('d-detail');
            let curList = [];
            catEl.innerHTML = CATS.map(c => `<button class="d-cat" data-cat="${c}"><span>${c === 'HL' ? '★ HIGHLIGHTS' : RECORD_CATS[c]}</span><span>${String(recCount(c)).padStart(2, '0')}</span></button>`).join('');
            function pickCat(c) {
                catEl.querySelectorAll('.d-cat').forEach(b => b.classList.toggle('active', b.dataset.cat === c));
                curList = sortedRecords(recFilter(c));
                listEl.innerHTML = curList.map((r, i) => `<button class="d-item" data-i="${i}"><span class="dd">${r.d || '—'}</span><span><strong>${r.t}</strong></span></button>`).join('');
                listEl.querySelectorAll('.d-item').forEach(b => b.addEventListener('click', () => pickItem(+b.dataset.i)));
                listEl.scrollTop = 0;
                pickItem(0);
            }
            function pickItem(i) {
                listEl.querySelectorAll('.d-item').forEach(b => b.classList.toggle('active', +b.dataset.i === i));
                const r = curList[i];
                if (!r) { detEl.innerHTML = '<p class="d-empty">NO DATA</p>'; return; }
                const rel = (r.l || []).filter(l => l[0] === 'm').map(l => workById(l[1])).filter(Boolean)[0];
                detEl.innerHTML = `<div class="c-head"><span>${RECORD_CATS[r.cat]}</span><span>REC ${String(i + 1).padStart(2, '0')} / ${String(curList.length).padStart(2, '0')}</span></div>
                    <div class="d-dbody">
                        <span class="mono">${r.d || 'UNDATED'}${r.hl ? ' · ★ HIGHLIGHT' : ''}</span>
                        <div class="d-dtitle">${r.t}</div>
                        ${r.s ? `<div class="d-dsub">${r.s}</div>` : ''}
                        ${r.l ? `<div class="d-dlinks">${recLinksHtml(r)}</div>` : ''}
                        ${rel ? `<h3 class="sub-title">Related Work</h3><div class="d-related">${tileHtml(rel, { noWide: true })}</div>` : ''}
                    </div>`;
            }
            catEl.querySelectorAll('.d-cat').forEach(b => b.addEventListener('click', () => pickCat(b.dataset.cat)));
            pickCat('HL');

            /* keyboard 1-4 */
            window.addEventListener('keydown', e => {
                if (document.getElementById('modal-overlay').style.display === 'flex') return;
                if (e.target.closest && e.target.closest('input, textarea')) return;
                const k = parseInt(e.key, 10);
                if (k >= 1 && k <= 4) showScreen(D_SCREENS[k - 1]);
            });
            window.addEventListener('hashchange', () => showScreen(location.hash.slice(1)));
            showScreen(location.hash.slice(1));
        })();
        /* PDF view: show every screen, drop interactive chrome, flatten records into a static list */
        function preparePrintScreens(root) {
            root.querySelectorAll('.d-bar, #d-work-chips, .d-go').forEach(e => e.remove());
            root.querySelectorAll('img[loading]').forEach(img => img.removeAttribute('loading')); // lazy images never load off-screen in the print view
            ['d-spot', 'd-latest'].forEach(id => {
                const el = root.querySelector('#' + id);
                if (!el) return;
                const t = el.previousElementSibling;
                if (t && t.classList.contains('sub-title')) t.remove();
                el.remove();
            });
            root.querySelectorAll('.works-group').forEach(g => { g.hidden = false; });
            root.querySelectorAll('.d-screen').forEach(s => { s.classList.remove('active'); s.style.display = 'block'; });
            const md = root.querySelector('.d-md');
            if (md) {
                const wrap = document.createElement('div');
                wrap.innerHTML = ['AWARD', 'PUB', 'EXHIBIT', 'TALK', 'RECOG', 'MEDIA', 'SCHOLAR', 'CERT', 'MILESTONE'].map(c =>
                    `<h3 class="sub-title">${RECORD_CATS[c]}</h3>` + sortedRecords(recFilter(c)).map(r =>
                        `<div class="rec-row"><span class="rec-date">${r.d || '—'}</span><span class="rec-cat"><span class="tag-${r.hl ? 'inv' : 'line'}">${RECORD_SHORT[r.cat]}</span></span>` +
                        `<span><span class="rec-title">${r.t}</span>${r.s ? ` <span class="rec-sub">— ${r.s}</span>` : ''} ${recLinksHtml(r)}</span></div>`).join('')).join('');
                md.replaceWith(wrap);
            }
        }
