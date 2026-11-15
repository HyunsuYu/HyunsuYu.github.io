        (function () {
            const BOXES = [
                ['AWARDS', ['AWARD']],
                ['PUBLICATIONS', ['PUB']],
                ['EXHIBITIONS', ['EXHIBIT']],
                ['TALKS · ORGANIZING', ['TALK']],
                ['SCHOLARSHIPS · CERTS', ['SCHOLAR', 'CERT']],
                ['MEDIA COVERAGE', ['MEDIA']]
            ];
            document.getElementById('c-boxes').innerHTML = BOXES.map(([label, cats]) => {
                const list = sortedRecords(RECORDS.filter(r => cats.includes(r.cat)));
                return `<div class="c-box" data-label="${label}" data-count="${list.length}">` + list.map(r =>
                    `<div class="c-box-row"><span class="d">${r.d || '—'}</span><span>${r.hl ? '★ ' : ''}<strong>${r.t}</strong>` +
                    `${r.s ? ` <span class="s">— ${r.s}</span>` : ''} ${recLinksHtml(r)}</span></div>`).join('') + `</div>`;
            }).join('');
        })();
