#!/usr/bin/env python3
"""Build the three layout drafts from the live index.html (repo is only read)."""
import os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.dirname(HERE)
REPO = os.path.join(HERE, 'base-index.html')  # site snapshot the drafts were built from (pre-Draft-D)

src = open(REPO, encoding='utf-8').read()

def read(name):
    return open(os.path.join(HERE, name), encoding='utf-8').read()

m_open = src.index('    <main>')
m_close = src.index('    </main>') + len('    </main>')
prefix, main, suffix = src[:m_open], src[m_open:m_close], src[m_close:]

def section(sid):
    m = re.search(r'<section id="%s".*?</section>' % sid, main, re.S)
    if not m:
        sys.exit('section not found: ' + sid)
    return m.group(0)

def articles(sid):
    return re.findall(r'<article.*?</article>', section(sid), re.S)

def fill(tpl):
    tpl = re.sub(r'\{\{SECTION:(\w+)\}\}', lambda m: section(m.group(1)), tpl)
    tpl = re.sub(r'\{\{ARTICLES:(\w+)\}\}', lambda m: '\n'.join(articles(m.group(1))), tpl)
    if '{{TIMELINE_INNER}}' in tpl:
        inner = re.sub(r'^<section[^>]*>\s*<h2.*?</h2>', '', section('timeline'), flags=re.S).rsplit('</section>', 1)[0]
        tpl = tpl.replace('{{TIMELINE_INNER}}', inner)
    return tpl

def nav_html(items, href_prefix=''):
    lis = '\n'.join(f'                <li><a href="{href_prefix}#{i}">{label}</a></li>' if '.html' not in i and not i.startswith('javascript:')
                    else f'                <li><a href="{i}">{label}</a></li>' for i, label in items)
    return f'<nav>\n            <ul>\n{lis}\n            </ul>\n        </nav>'

SELF = 'drafts/layout/'

def archive_paths(html):
    """Pages live in drafts/layout/ but use the site's assets: resolve relative URLs from the
    site root, point draft-to-draft links back into this folder, and keep them out of search."""
    html = html.replace('<head>', '<head>\n    <base href="../../">\n    <meta name="robots" content="noindex, nofollow">', 1)
    html = re.sub(r'href="((?:draft-[a-z-]+|current|index)\.html(?:#[^"]*)?)"', lambda m: 'href="' + SELF + m.group(1) + '"', html)
    return html

def build(out_name, label, nav_items, main_tpl, css_files, js_files, nav_prefix='', extra_aside=''):
    page_prefix = re.sub(r'<nav>.*?</nav>', lambda _: nav_html(nav_items, nav_prefix), prefix, count=1, flags=re.S)
    if extra_aside:
        page_prefix = page_prefix.replace('        </nav>\n', '        </nav>\n' + extra_aside, 1)
    page_prefix = re.sub(r'<title>(.*?)</title>', lambda m: f'<title>[{label}] {m.group(1)}</title>', page_prefix, count=1)
    css = read('shared.css') + ''.join(read(c) for c in css_files) + '\n        .pdf-btn { display: none; }\n'
    i = page_prefix.index('    </style>')
    page_prefix = page_prefix[:i] + css + page_prefix[i:]
    page_prefix = page_prefix.replace('<body>', '<body>\n    <div class="draft-badge">' + label +
                                      ' <a href="index.html">[ALL DRAFTS]</a></div>', 1)
    new_main = '    <main>\n' + fill(read(main_tpl)) + '\n    </main>'
    data = ['records.js'] + (['works.js'] if 'tiles.css' in css_files else [])
    scripts = ''.join('\n    <script>\n' + open(os.path.join(OUT, d), encoding='utf-8').read() + '\n    </script>\n' for d in data) + ''.join(
        '    <script>\n' + read(j) + '\n    </script>\n' for j in js_files)
    page_suffix = suffix[::-1].replace('</body>'[::-1], (scripts + '</body>')[::-1], 1)[::-1]
    with open(os.path.join(OUT, out_name), 'w', encoding='utf-8') as f:
        f.write(archive_paths(page_prefix + new_main + page_suffix))
    print('wrote', out_name)

NAV_A = [('about', '00. ABOUT ME'), ('featured', '01. FEATURED'), ('projects', '02. GAMES'),
         ('records', '03. SELECTED RECORDS'), ('research', '04. RESEARCH'), ('skills', '05. SKILLS'),
         ('contact', '06. CONTACT'), ('draft-a-archive.html', '>> FULL ARCHIVE')]
build('draft-a.html', 'DRAFT A · SUMMARY + ARCHIVE', NAV_A, 'a_main.html', ['a.css'], ['a.js'])

NAV_A_ARC = [('draft-a.html#about', '00. ABOUT ME'), ('draft-a.html#featured', '01. FEATURED'),
             ('draft-a.html#projects', '02. GAMES'), ('draft-a.html#records', '03. SELECTED RECORDS'),
             ('draft-a.html#research', '04. RESEARCH'), ('draft-a-archive.html', '[■] FULL ARCHIVE')]
build('draft-a-archive.html', 'DRAFT A · ARCHIVE PAGE', NAV_A_ARC, 'a_archive_main.html', ['a.css'], ['a_archive.js'])

NAV_B = [('about', '00. ABOUT ME'), ('featured', '01. FEATURED'), ('projects', '02. GAMES'),
         ('research', '03. RESEARCH'), ('record', '04. RECORD'), ('skills', '05. SKILLS'), ('contact', '06. CONTACT')]
SYNC = ('        <div class="b-sync mono"><div>SCROLL SYNC <span id="b-sync-n">000</span>%</div>'
        '<div class="b-sync-bar"><div id="b-sync-fill"></div></div></div>\n')
build('draft-b.html', 'DRAFT B · SIDEBAR + TABS/FILTER', NAV_B, 'b_main.html', ['b.css'], ['b.js'], extra_aside=SYNC)

NAV_C = [('about', '00. ABOUT ME'), ('works', '01. WORKS'), ('records', '02. RECORDS'),
         ('skills', '03. SKILLS'), ('contact', '04. CONTACT')]
build('draft-c.html', 'DRAFT C · IMAGE-FIRST GRID', NAV_C, 'c_main.html', ['c.css'], ['c.js'])

NAV_D = [("javascript:showScreen('profile')", '[1] PROFILE'), ("javascript:showScreen('works')", '[2] WORKS'),
         ("javascript:showScreen('records')", '[3] RECORDS'), ("javascript:showScreen('contact')", '[4] SKILLS · CONTACT')]
build('draft-d.html', 'DRAFT D · HUB SCREENS', NAV_D, 'd_main.html', ['tiles.css', 'd.css'], ['d.js'])

NAV_E = [('overview', '00. OVERVIEW'), ('works', '01. WORKS'), ('honors', '02. HONORS'), ('publications', '03. PUBLICATIONS'),
         ('activity', '04. ACTIVITY'), ('timeline-y', '05. TIMELINE'), ('skills', '06. SKILLS'), ('contact', '07. CONTACT')]
build('draft-e.html', 'DRAFT E · BENTO TILES', NAV_E, 'e_main.html', ['tiles.css', 'e.css'], ['e.js'])

NAV_F = [('about', '00. ABOUT ME'), ('y2026', '2026'), ('y2025', '2025'), ('y2024', '2024'), ('y2023', '2023'),
         ('y2021', '2021'), ('y2020', '2020'), ('yUNDATED', 'ETC.'), ('skills', 'SKILLS'), ('contact', 'CONTACT')]
build('draft-f.html', 'DRAFT F · CHRONICLE', NAV_F, 'f_main.html', ['tiles.css', 'f.css'], ['f.js'])
