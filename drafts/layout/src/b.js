        (function () {
            /* --- Featured tabs --- */
            const tabs = [...document.querySelectorAll('#b-feat-tabs .b-tab')];
            const panels = [...document.querySelectorAll('#b-feat-panels .project-card')];
            let cur = 0;
            function show(i) {
                cur = (i + panels.length) % panels.length;
                tabs.forEach((t, k) => t.classList.toggle('active', k === cur));
                panels.forEach((p, k) => p.classList.toggle('active', k === cur));
                document.getElementById('b-pos').textContent = String(cur + 1).padStart(2, '0') + ' / ' + String(panels.length).padStart(2, '0');
            }
            tabs.forEach((t, k) => t.addEventListener('click', () => show(k)));
            document.getElementById('b-prev').addEventListener('click', () => show(cur - 1));
            document.getElementById('b-next').addEventListener('click', () => show(cur + 1));
            show(0);

            /* --- Games accordion --- */
            document.querySelectorAll('#b-games .project-card').forEach((card, k) => {
                const m = (card.getAttribute('onclick') || '').match(/openModal\('([^']+)'\)/);
                card.removeAttribute('onclick');
                const metas = [...card.querySelectorAll('.project-meta p')].map(p => p.textContent.replace(/^\w+:\s*/, '').trim());
                const header = card.querySelector('.project-header');
                const sum = document.createElement('span');
                sum.className = 'b-sum';
                sum.textContent = metas.join(' · ');
                header.insertBefore(sum, header.lastElementChild);
                header.addEventListener('click', () => card.classList.toggle('open'));
                if (m) {
                    const a = document.createElement('a');
                    a.href = `javascript:openModal('${m[1]}')`;
                    a.className = 'b-open';
                    a.textContent = '[ACCESS DATA LOG >>]';
                    card.querySelector('.project-content').appendChild(a);
                }
                if (k === 0) card.classList.add('open');
            });

            /* --- Record log --- */
            const log = document.getElementById('b-log');
            const LIMIT = 12;
            function render(cat, expanded) {
                const list = sortedRecords(recFilter(cat));
                const shown = expanded ? list : list.slice(0, cat === 'HL' ? list.length : LIMIT);
                const years = [];
                shown.forEach(r => {
                    const y = recYear(r);
                    if (!years.length || years[years.length - 1].y !== y) years.push({ y, rows: [] });
                    years[years.length - 1].rows.push(r);
                });
                log.innerHTML = years.map(g => `<div class="history-item"><span class="history-year">${g.y}</span>` +
                    g.rows.map(r => `<p><strong>${r.d && r.d.length > 4 ? r.d.slice(5) : '—'}</strong>` +
                        `<span class="b-cat${r.hl ? ' hl' : ''}">${RECORD_SHORT[r.cat]}</span>` +
                        `<span><strong>${r.t}</strong>${r.s ? ` <span class="b-sub">— ${r.s}</span>` : ''} ${recLinksHtml(r)}</span></p>`).join('') +
                    `</div>`).join('') || '<p class="b-empty">NO DATA</p>';
                if (shown.length < list.length) {
                    const b = document.createElement('button');
                    b.className = 'b-more';
                    b.textContent = `[+] SHOW ALL ${list.length} ENTRIES`;
                    b.addEventListener('click', () => render(cat, true));
                    log.appendChild(b);
                }
            }
            buildChips(document.getElementById('b-chips'),
                ['HL', 'ALL', 'AWARD', 'EXHIBIT', 'PUB', 'TALK', 'RECOG', 'MEDIA', 'SCHOLAR', 'CERT', 'MILESTONE'], 'HL', c => render(c, false));
            render('HL', false);

            /* --- Scroll spy + sync bar --- */
            const links = [...document.querySelectorAll('nav a[href^="#"]')];
            const secs = links.map(a => document.querySelector(a.getAttribute('href')));
            const n = document.getElementById('b-sync-n'), fill = document.getElementById('b-sync-fill');
            function spy() {
                let idx = 0;
                secs.forEach((s, k) => { if (s && s.getBoundingClientRect().top < window.innerHeight * 0.35) idx = k; });
                if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) idx = secs.length - 1;
                links.forEach((a, k) => a.classList.toggle('active', k === idx));
                const pct = Math.round(100 * window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight));
                n.textContent = String(pct).padStart(3, '0');
                fill.style.width = pct + '%';
            }
            window.addEventListener('scroll', spy, { passive: true });
            spy();
        })();
