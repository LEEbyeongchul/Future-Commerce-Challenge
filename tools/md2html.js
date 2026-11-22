// minimal markdown -> styled print HTML. usage: node md2html.js in.md out.html "kicker"
const fs = require('fs');
const [,, inp, out, kicker] = process.argv;
const src = fs.readFileSync(inp, 'utf8').replace(/\r\n/g, '\n');
const esc = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const inline = s => esc(s)
  .replace(/`([^`]+)`/g, '<code>$1</code>')
  .replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>')
  .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

const lines = src.split('\n');
let html = '', i = 0, title = '';
const cells = l => l.trim().replace(/^\||\|$/g,'').split('|').map(c=>c.trim());
while (i < lines.length) {
  let l = lines[i];
  if (/^```/.test(l)) {
    const wrap = /^```markdown/.test(l); const buf = []; i++;
    while (i < lines.length && !/^```/.test(lines[i])) buf.push(lines[i++]);
    i++; html += `<pre${wrap ? ' class="wrap"' : ''}>${esc(buf.join('\n'))}</pre>\n`; continue;
  }
  let m;
  if ((m = l.match(/^(#{1,4}) (.*)/))) {
    const n = m[1].length;
    if (n === 1 && !title) { title = m[2]; i++; continue; }
    const t = inline(m[2]).replace(/^(\d+(?:-\d+)?\.)\s*/, '<span class="no">$1</span> ');
    html += `<h${n}>${t}</h${n}>\n`; i++; continue;
  }
  if (/^---\s*$/.test(l)) { html += '<hr>\n'; i++; continue; }
  if (/^\|/.test(l)) {
    const rows = [];
    while (i < lines.length && /^\|/.test(lines[i])) rows.push(lines[i++]);
    const head = cells(rows[0]), aligns = cells(rows[1]).map(a => /^:.*:$/.test(a) ? 'c' : '');
    html += '<table><thead><tr>' + head.map((c,k)=>`<th class="${aligns[k]}">${inline(c)}</th>`).join('') + '</tr></thead><tbody>';
    for (const r of rows.slice(2)) html += '<tr>' + cells(r).map((c,k)=>`<td class="${aligns[k]}">${inline(c)}</td>`).join('') + '</tr>';
    html += '</tbody></table>\n'; continue;
  }
  if (/^> /.test(l)) {
    const buf = [];
    while (i < lines.length && /^> ?/.test(lines[i])) buf.push(lines[i++].replace(/^> ?/, ''));
    html += `<blockquote>${buf.map(inline).join('<br>')}</blockquote>\n`; continue;
  }
  if (/^\s*([-*]|\d+\.) /.test(l)) {
    const ordered = /^\s*\d+\./.test(l);
    html += ordered ? '<ol>' : '<ul>';
    while (i < lines.length && /^\s*([-*]|\d+\.) /.test(lines[i])) {
      const raw = lines[i++], sub = /^\s{2,}/.test(raw);
      let t = raw.replace(/^\s*([-*]|\d+\.) /, '');
      let cls = sub ? 'sub' : '';
      if (/^\[ \] /.test(t)) { t = t.slice(4); cls += ' task'; }
      html += `<li class="${cls}">${inline(t)}</li>`;
    }
    html += ordered ? '</ol>\n' : '</ul>\n'; continue;
  }
  if (l.trim() === '') { i++; continue; }
  const buf = [];
  while (i < lines.length && lines[i].trim() !== '' && !/^(#|```|\||> |---|\s*([-*]|\d+\.) )/.test(lines[i])) buf.push(lines[i++]);
  html += `<p>${inline(buf.join(' '))}</p>\n`;
}

const page = `<!doctype html><html lang="ko"><head><meta charset="utf-8"><title>${esc(title)}</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css">
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&family=Nanum+Gothic+Coding&display=swap" rel="stylesheet">
<style>
@page{size:A4;margin:16mm 16mm 16mm}
:root{--paper:#F1EDE4;--ink:#161513;--mute:#77726A;--line:#CFC8BA;--accent:#C8452C}
*{box-sizing:border-box}
html{background:var(--paper)}
body{margin:0;font-family:"Pretendard",sans-serif;color:var(--ink);font-size:9.2pt;line-height:1.62;letter-spacing:-0.01em;word-break:keep-all;-webkit-print-color-adjust:exact;print-color-adjust:exact;background:var(--paper)}
.cover{border-bottom:0.8pt solid var(--ink);padding:2mm 0 7mm;margin-bottom:6mm}
.cover .k{font-family:"JetBrains Mono",monospace;font-size:7pt;letter-spacing:.12em;text-transform:uppercase;color:var(--mute)}
.cover h1{font-size:26pt;letter-spacing:-0.04em;line-height:1.15;margin:3mm 0 0;font-weight:800}
.cover h1 i{font-family:"Instrument Serif",serif;font-weight:400;color:var(--accent)}
h2{font-size:15pt;letter-spacing:-0.035em;margin:9mm 0 3mm;padding-top:4mm;border-top:0.6pt solid var(--ink);break-after:avoid}
h2 .no{font-family:"Instrument Serif",serif;font-style:italic;font-weight:400;color:var(--accent);font-size:19pt;margin-right:1mm}
h3{font-size:11pt;letter-spacing:-0.02em;margin:6mm 0 2mm;break-after:avoid}
h3 .no{color:var(--accent);font-weight:700;margin-right:1mm}
h4{font-size:9.6pt;margin:4mm 0 1.5mm;break-after:avoid}
p{margin:0 0 2.5mm}
b{font-weight:700}
a{color:var(--accent);text-decoration:none}
code{font-family:"JetBrains Mono","Nanum Gothic Coding",monospace;font-size:8pt;background:#E6E0D3;padding:0 1.2mm;border-radius:1mm}
hr{border:0;margin:2mm 0}
table{width:100%;border-collapse:collapse;margin:2mm 0 4mm;font-size:8.4pt;break-inside:auto}
tr{break-inside:avoid}
th{text-align:left;font-family:"JetBrains Mono","Pretendard",monospace;font-weight:500;font-size:6.8pt;letter-spacing:.04em;color:var(--mute);padding:0 2.5mm 1.8mm 0;border-bottom:0.6pt solid var(--ink)}
td{padding:2.1mm 2.5mm 2.1mm 0;border-bottom:0.4pt solid var(--line);vertical-align:top}
td:first-child{font-weight:600}
.c{text-align:center}
ul,ol{margin:0 0 3mm;padding-left:5mm}
li{margin:0.8mm 0}
li.sub{margin-left:5mm;list-style:circle}
li.task{list-style:none;position:relative}
li.task:before{content:"";position:absolute;left:-5mm;top:1.3mm;width:2.6mm;height:2.6mm;border:0.6pt solid var(--ink)}
blockquote{margin:2mm 0 4mm;padding:3mm 4mm;background:var(--ink);color:var(--paper);font-size:9.4pt;line-height:1.55}
blockquote b{color:#F0B8A8}
pre.wrap{white-space:pre-wrap;font-size:7.6pt;break-inside:auto}
pre{font-family:"Nanum Gothic Coding",monospace;font-size:7pt;line-height:1.38;background:#FBF9F4;box-shadow:0 0 0 0.5pt var(--line);padding:3.5mm 4mm;margin:2mm 0 4mm;white-space:pre;overflow:hidden;break-inside:avoid}
</style></head><body>
<div class="cover"><div class="k">${esc(kicker||'')}</div><h1>${esc(title).replace('snap to buy','snap to <i>buy</i>')}</h1></div>
${html}
<script>
document.fonts.ready.then(()=>{document.querySelectorAll('pre:not(.wrap)').forEach(p=>{let s=7;while(p.scrollWidth>p.clientWidth&&s>4.6){s-=0.2;p.style.fontSize=s+'pt';}});});
</script>
</body></html>`;
fs.writeFileSync(out, page);
console.log('ok', out);
