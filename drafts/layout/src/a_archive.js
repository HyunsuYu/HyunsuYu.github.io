        (function () {
            const body = document.getElementById('arc-body');
            function render(cat) {
                let lastYear = null;
                body.innerHTML = sortedRecords(recFilter(cat)).map(r => {
                    const y = recYear(r);
                    const first = y !== lastYear; lastYear = y;
                    return `<tr class="${first ? 'arc-yr-start' : ''}">
                        <td class="arc-year">${first ? y : ''}</td>
                        <td class="arc-date">${r.d && r.d.length > 4 ? r.d.slice(5) : '—'}</td>
                        <td class="arc-type"><span class="tag-${r.hl ? 'inv' : 'line'}">${RECORD_SHORT[r.cat]}</span></td>
                        <td class="arc-rec"><strong>${r.hl ? '★ ' : ''}${r.t}</strong>${r.s ? `<span>${r.s}</span>` : ''}</td>
                        <td class="arc-link">${recLinksHtml(r)}</td></tr>`;
                }).join('');
            }
            buildChips(document.getElementById('arc-chips'),
                ['ALL', 'HL', 'AWARD', 'EXHIBIT', 'PUB', 'TALK', 'RECOG', 'MEDIA', 'SCHOLAR', 'CERT', 'MILESTONE'], 'ALL', render);
            render('ALL');
        })();
