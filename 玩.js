// 终端里玩一句：node 玩.js 字 [问过以后的第二个字]
// 跑的是 index.html 里同一段程序，只是把网页换成打印。
const fs = require('fs'), path = require('path');
const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
const js = html.match(/<script>([\s\S]*)<\/script>/)[1];
const words = process.argv.slice(2);
const out = [];
function el(id) {
  return { id, style: {}, set innerHTML(v) { if (id === 'story') out.length = 0; }, get innerHTML() { return ''; },
    appendChild(p) { out.push(p); console.log((p.className && p.className.startsWith('end') ? '\n—— ' : '') + p.textContent + '\n'); },
    addEventListener() {}, focus() {}, value: '', set onclick(f) { if (id === 'go') global.__go = f; } };
}
const els = {};
global.document = { getElementById: id => (els[id] = els[id] || el(id)), createElement: () => ({ textContent: '', className: '' }), body: { scrollHeight: 0 } };
global.window = { scrollTo() {} };
global.localStorage = { getItem() { return '[]'; }, setItem() {} };
eval(js);
for (const w of words) { console.log('> ' + w + '\n'); els['in'].value = w; global.__go(); }
