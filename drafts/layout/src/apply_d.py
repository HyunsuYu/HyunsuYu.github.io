#!/usr/bin/env python3
"""Apply Draft D (hub screens) to the live index.html in place."""
import os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.dirname(HERE)
TARGET = sys.argv[1]

src = open(TARGET, encoding='utf-8').read()
read = lambda n: open(os.path.join(HERE, n), encoding='utf-8').read()

def must_sub(s, old, new, count=1):
    assert old in s, 'pattern not found: ' + old[:80]
    return s.replace(old, new, count)

# --- 1. sidebar nav -> screen switcher
nav = '''<nav>
            <ul>
                <li><a href="javascript:showScreen('profile')">[1] PROFILE</a></li>
                <li><a href="javascript:showScreen('works')">[2] WORKS</a></li>
                <li><a href="javascript:showScreen('records')">[3] RECORDS</a></li>
                <li><a href="javascript:showScreen('contact')">[4] SKILLS · CONTACT</a></li>
            </ul>
        </nav>'''
src, n = re.subn(r'<nav>.*?</nav>', lambda _: nav, src, count=1, flags=re.S)
assert n == 1

# --- 2. main content
m_open = src.index('    <main>')
m_close = src.index('    </main>') + len('    </main>')
main = src[m_open:m_close]
section = lambda sid: re.search(r'<section id="%s".*?</section>' % sid, main, re.S).group(0)
tpl = read('d_main.html')
tpl = re.sub(r'\{\{SECTION:(\w+)\}\}', lambda m: section(m.group(1)), tpl)
src = src[:m_open] + '    <main>\n' + tpl + '\n    </main>' + src[m_close:]

# --- 3. CSS (shared components without the draft badge, tiles, hub)
shared = read('shared.css')
shared = re.sub(r'\s*\.draft-badge[^{]*\{[^}]*\}', '', shared)
shared = shared.replace('/* ====== DRAFT SHARED COMPONENTS (NieR-style, same palette) ====== */', '/* ====== HUB LAYOUT : shared components ====== */')
css = shared + read('tiles.css').replace('(the Draft C card the user picked)', '') + read('d.css').replace('DRAFT D : HUB (screens instead of one long scroll)', 'HUB SCREENS')
i = src.index('    </style>')
src = src[:i] + css + src[i:]

# --- 4. print: detail pages follow work tiles; print view shows every screen
src = must_sub(src, "root.querySelectorAll('#featured .project-card, #projects .project-card').forEach(card => {",
               "root.querySelectorAll('#scr-works .c-tile[onclick*=\"openModal\"]').forEach(card => {")
src = must_sub(src, "            const mainClone = document.querySelector('main').cloneNode(true);\n",
               "            const mainClone = document.querySelector('main').cloneNode(true);\n"
               "            if (typeof preparePrintScreens === 'function') preparePrintScreens(mainClone);\n")
print_css = '''.d-screen{ display:block !important; }
#scr-works .c-grid{ display:block !important; }
#scr-works .works-group{ break-before:page; }
#scr-works .works-group:first-of-type{ break-before:auto; }
#scr-works .c-tile{ display:grid !important; grid-template-columns:40% 1fr; grid-template-rows:auto 1fr; break-before:page; break-inside:avoid; margin:0; transform:none !important; box-shadow:none !important; }
#scr-works .c-grid > .c-tile:first-child{ break-before:auto; }
#scr-works .c-tile .c-head{ grid-column:1 / -1; }
#scr-works .c-tile .c-thumb{ aspect-ratio:16 / 9; min-height:0; border-bottom:none; border-right:1px solid #4b483f; }
#scr-works .c-text-tile{ display:block !important; break-before:auto; margin-top:14px; }
.c-thumb img{ filter:none !important; }
.rec-row{ break-inside:avoid; }
.sub-title{ break-after:avoid; }
.pagedjs_page{ background:#dad4bb; }'''
src = must_sub(src, ".pagedjs_page{ background:#dad4bb; }", print_css)

# --- 5. data + hub script after the main script
scripts = ''.join('    <script>\n' + open(os.path.join(DATA, f), encoding='utf-8').read() + '\n    </script>\n'
                  for f in ['records.js', 'works.js']) + '    <script>\n' + read('d.js') + '\n    </script>\n'
j = src.rindex('</body>')
src = src[:j] + scripts + src[j:]

open(TARGET, 'w', encoding='utf-8').write(src)
print('applied Draft D ->', TARGET)
