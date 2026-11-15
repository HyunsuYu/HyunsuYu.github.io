        (function () {
            document.getElementById('e-works').innerHTML = worksGroupsHtml();

            const modalOf = r => ((r.l || []).find(l => l[0] === 'm') || [])[1];
            const rowsHtml = list => list.map(r => `<div class="e-row"><span class="d">${r.d || '—'}</span><span>${r.hl ? '★ ' : ''}<strong>${r.t}</strong>${r.s ? ` <span class="s">— ${r.s}</span>` : ''} ${recLinksHtml(r)}</span></div>`).join('');

            /* award tiles: "Event — Rank" + work name */
            document.getElementById('e-awards').innerHTML = sortedRecords(RECORDS.filter(r => r.cat === 'AWARD')).map(r => {
                const [event, rank] = r.t.split(' — ');
                const m = modalOf(r);
                return `<div class="c-tile e-award${m ? '' : ' c-text-tile'}"${m ? ` onclick="openModal('${m}')"` : ''}>
                    <div class="c-head"><span>AWARD${r.hl ? ' · ★' : ''}</span><span>${r.d}</span></div>
                    <div class="c-info"><div class="e-rank${rank.length > 12 ? ' long' : ''}">${rank}</div><div class="e-work">${r.s || ''}</div><p class="c-meta">${event}</p></div>
                </div>`;
            }).join('');

            document.getElementById('e-recog').innerHTML = sortedRecords(RECORDS.filter(r => r.cat === 'RECOG')).map(r => {
                const [co, what] = r.t.split(' — ');
                return `<div class="c-tile e-award" onclick="openModal('${modalOf(r)}')">
                    <div class="c-head"><span>INDUSTRY</span><span>${r.d}</span></div>
                    <div class="c-info"><div class="e-rank long">${co.toUpperCase()}</div><div class="e-work">${what}</div><p class="c-meta">${r.s}</p></div>
                </div>`;
            }).join('');

            /* publication tiles */
            const PUB_IMG = {
                meshshader: 'assets/thumbs/papers/thesis-fig1-architecture.jpg',
                mapgen: 'assets/thumbs/papers/mapgen-fig1-framework.jpg',
                visualwave: 'assets/thumbs/papers/vw-framework.jpg',
                book: 'assets/thumbs/drive/1hL3dtbTbEqQsb75rJ8j2BDkalzJNm7Td.jpg'
            };
            const PUB_KIND = { meshshader: 'THESIS', mapgen: 'KMMS PAPER', visualwave: 'KMMS PAPER', book: 'BOOK' };
            document.getElementById('e-pubs').innerHTML = sortedRecords(RECORDS.filter(r => r.cat === 'PUB')).map(r => {
                const m = modalOf(r);
                const ext = (r.l || []).filter(l => l[0] === 'u').map(l => `<a href="${l[1]}" target="_blank" onclick="event.stopPropagation()">[${l[2]}]</a>`).join(' ');
                return `<article class="c-tile e-pub" onclick="openModal('${m}')">
                    <div class="c-head"><span>${PUB_KIND[m]}</span><span>${r.d}</span></div>
                    <div class="c-thumb${m === 'book' ? ' c-thumb-top' : ''}"><img src="${PUB_IMG[m]}" alt="" loading="lazy"></div>
                    <div class="c-info"><h3>${r.t}</h3><p class="c-meta">${r.s}</p><div class="c-tags">${ext}</div></div>
                </article>`;
            }).join('');

            /* activity list tiles */
            const ACT = [['EXHIBITIONS', ['EXHIBIT']], ['TALKS · ORGANIZING', ['TALK']], ['MEDIA COVERAGE', ['MEDIA']], ['SCHOLARSHIPS · CERTS', ['SCHOLAR', 'CERT']]];
            document.getElementById('e-activity').innerHTML = ACT.map(([label, cats]) => {
                const list = sortedRecords(RECORDS.filter(r => cats.includes(r.cat)));
                return `<div class="c-tile c-text-tile"><div class="c-head"><span>${label}</span><span>${String(list.length).padStart(2, '0')}</span></div><div class="c-info">${rowsHtml(list)}</div></div>`;
            }).join('');

            /* year tiles (milestones only) */
            const ms = sortedRecords(RECORDS.filter(r => r.cat === 'MILESTONE'));
            const years = [...new Set(ms.map(recYear))];
            document.getElementById('e-years').innerHTML = years.map(y => {
                const list = ms.filter(r => recYear(r) === y).map(r => Object.assign({}, r, { d: r.d.length > 4 ? r.d.slice(5) : '—' }));
                return `<div class="c-tile c-text-tile e-year"><div class="c-head"><span>YEAR</span><span>${String(list.length).padStart(2, '0')} ENTRIES</span></div>
                    <div class="c-info"><div class="e-num">${y}</div>${rowsHtml(list)}</div></div>`;
            }).join('');
        })();
