'use strict'

const root = document.getElementById('app')
const KEYS = { stats: 'relax.stats', history: 'relax.drawHistory', achievements: 'relax.achSeen', sound: 'relax.soundOn' }
const PAGE_INFO = {
  home: { title: '木鱼修行', subtitle: '敲掉一点烦恼，攒下一点好心情。', icon: '🐟' },
  bubble: { title: '捏泡泡纸', subtitle: '啪、啪、啪，把紧绷的情绪一点点放掉。', icon: '🫧' },
  whack: { title: '锤爆烦恼', subtitle: '烦恼冒头就锤它！看看 30 秒能拿多少分。', icon: '🔨' },
  fortune: { title: '今日求签', subtitle: '给今天一点轻松的小仪式，结果仅供娱乐。', icon: '🏮' },
  mine: { title: '我的档案', subtitle: '看看你积累的解压值、成就与求签记录。', icon: '🌱' }
}
const TIPS = [
  { emoji: '🌬️', text: '深呼吸 4 秒，慢慢呼气 6 秒，重复 5 次。' },
  { emoji: '🧘', text: '起来伸个懒腰，喝口水，看看窗外。' },
  { emoji: '📝', text: '把烦恼写下来，给自己几分钟整理思绪。' },
  { emoji: '🎵', text: '听一首喜欢的歌，跟着节奏轻轻晃一晃。' },
  { emoji: '💥', text: '去「捏泡泡纸」玩一局，把注意力放回当下。' },
  { emoji: '🔨', text: '有气没处撒？来「锤爆烦恼」试试手速。' },
  { emoji: '🐱', text: '看看可爱的小动物，给大脑一点休息。' },
  { emoji: '☁️', text: '把手机放远一点，发会儿呆也很好。' },
  { emoji: '😊', text: '今天不用事事完美，慢慢来就很好。' },
  { emoji: '🍵', text: '泡杯喜欢的饮品，慢慢喝，暂时停一停。' },
  { emoji: '🍚', text: '记得按时吃饭。好好照顾自己也是正事。' }
]
const SKINS = [
  { min: 0, level: 1, emoji: '🐟', name: '小木鱼' },
  { min: 10, level: 2, emoji: '🐠', name: '彩虹小鱼' },
  { min: 50, level: 3, emoji: '🐡', name: '气鼓鼓河豚' },
  { min: 100, level: 4, emoji: '🐳', name: '深渊巨鲸' },
  { min: 300, level: 5, emoji: '🐉', name: '功德神龙' }
]
const LEVELS = [
  { name: '入门解压师', min: 0 }, { name: '见习解压师', min: 20 }, { name: '解压达人', min: 60 },
  { name: '解压大师', min: 150 }, { name: '解压宗师', min: 300 }, { name: '人形木鱼', min: 600 }
]
const FORTUNES = [
  { level: 5, name: '大吉', text: '诸事顺遂，想做的事今天都能成。', emoji: '🌟', gua: '地天泰' },
  { level: 5, name: '大吉', text: '好运爆棚，去做一件你一直想做的小事吧。', emoji: '🎉', gua: '火天大有' },
  { level: 4, name: '中吉', text: '好运正在路上，保持好心情，稳稳向前。', emoji: '😄', gua: '地山谦' },
  { level: 4, name: '中吉', text: '今天适合表达想法，也适合认真听听自己。', emoji: '💪', gua: '风雷益' },
  { level: 3, name: '小吉', text: '小确幸就在身边，抬头看看周围吧。', emoji: '🍀', gua: '泽山咸' },
  { level: 3, name: '小吉', text: '今天留一点时间给喜欢的事情。', emoji: '🐱', gua: '山雷颐' },
  { level: 2, name: '末吉', text: '平平淡淡才是真，早点休息也不错。', emoji: '🌙', gua: '水地比' },
  { level: 2, name: '末吉', text: '无事发生，也是平稳的一天。', emoji: '☁️', gua: '雷火丰' },
  { level: 1, name: '小凶', text: '今天别太勉强自己，早点休息，明天再继续。', emoji: '😴', gua: '坎为水' },
  { level: 1, name: '小凶', text: '遇到小阻碍也没关系，慢慢来就好。', emoji: '🧋', gua: '艮为山' }
]
const ACHIEVEMENTS = [
  { id: 'fish1', emoji: '🐟', name: '初入空门', desc: '敲响木鱼 1 次', check: s => s.meritTotal >= 1 },
  { id: 'fish10', emoji: '🐠', name: '小鱼初长成', desc: '木鱼进化到 Lv.2', check: s => s.meritTotal >= 10 },
  { id: 'fish50', emoji: '🐡', name: '气鼓鼓', desc: '木鱼进化到 Lv.3', check: s => s.meritTotal >= 50 },
  { id: 'fish100', emoji: '🐳', name: '深渊巨鲸', desc: '木鱼进化到 Lv.4', check: s => s.meritTotal >= 100 },
  { id: 'fish300', emoji: '🐉', name: '功德神龙', desc: '木鱼进化到 Lv.5', check: s => s.meritTotal >= 300 },
  { id: 'bubble10', emoji: '💥', name: '泡泡初体验', desc: '累计捏爆 10 个泡泡', check: s => s.bubblesTotal >= 10 },
  { id: 'bubbleS', emoji: '🏆', name: '泡泡大师', desc: '捏泡单局 S 级', check: s => s.bubbleBestRating === 'S' },
  { id: 'whack20', emoji: '🔨', name: '锤子抡起来', desc: '累计锤中 20 次烦恼', check: s => (s.whackTotal || 0) >= 20 },
  { id: 'whackS', emoji: '👑', name: '锤神降临', desc: '锤烦恼单局 S 级', check: s => (s.whackBestScore || 0) >= 35 },
  { id: 'draw1', emoji: '🏮', name: '诚心求签', desc: '求第一支签', check: s => s.drawsTotal >= 1 },
  { id: 'draw5', emoji: '📿', name: '签签虔虔', desc: '累计求签 5 次', check: s => s.drawsTotal >= 5 },
  { id: 'lv20', emoji: '🧘', name: '解压新星', desc: '解压值达到 20', check: s => totalRelax(s) >= 20 },
  { id: 'lv150', emoji: '🧘‍♂️', name: '解压大师', desc: '解压值达到 150', check: s => totalRelax(s) >= 150 },
  { id: 'lv600', emoji: '😌', name: '人形木鱼', desc: '解压值达到 600', check: s => totalRelax(s) >= 600 }
]

let activePage = 'home'
let homeTip = pick(TIPS)
let soundEnabled = localStorage.getItem(KEYS.sound) !== 'false'
let toastTimer = null
let bubbleGame = null
let whackGame = { state: 'idle', score: 0, combo: 0, best: 0, timeLeft: 30, holes: [], result: null }
let whackInterval = null
let whackLoopTimer = null
let whackTimers = []
let fortuneAnimation = 'idle'
let drawingTimers = []

function pick(items) { return items[Math.floor(Math.random() * items.length)] }
function todayStr() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}
function defaultStats() {
  return { meritTotal: 0, meritToday: 0, meritDate: todayStr(), bubblesTotal: 0, drawsTotal: 0, drawDate: '', bubbleBestScore: 0, bubbleBestTime: 0, bubbleBestRating: '', whackTotal: 0, whackBestScore: 0 }
}
function loadJson(key, fallback) {
  try { const v = JSON.parse(localStorage.getItem(key)); return v == null ? fallback : v } catch (_) { return fallback }
}
function saveJson(key, value) { localStorage.setItem(key, JSON.stringify(value)) }
function getStats() {
  const s = Object.assign(defaultStats(), loadJson(KEYS.stats, {}))
  if (s.meritDate !== todayStr()) { s.meritDate = todayStr(); s.meritToday = 0; saveJson(KEYS.stats, s) }
  return s
}
function saveStats(s) { saveJson(KEYS.stats, s); return s }
function changeStats(callback) { const s = getStats(); callback(s); saveStats(s); return s }
function totalRelax(s) { return (s.meritTotal || 0) + (s.bubblesTotal || 0) + (s.drawsTotal || 0) + (s.whackTotal || 0) }
function getLevel(s) {
  const total = totalRelax(s)
  let current = LEVELS[0], next = null
  for (let i = 0; i < LEVELS.length; i++) if (total >= LEVELS[i].min) { current = LEVELS[i]; next = LEVELS[i + 1] || null }
  return { total, name: current.name, percent: next ? Math.min(100, Math.round((total - current.min) / (next.min - current.min) * 100)) : 100, nextName: next ? next.name : '已达最高', need: next ? next.min - total : 0 }
}
function getSkin(merit) {
  let current = SKINS[0], next = null
  for (let i = 0; i < SKINS.length; i++) if (merit >= SKINS[i].min) { current = SKINS[i]; next = SKINS[i + 1] || null }
  const percent = next ? Math.min(100, Math.round((merit - current.min) / (next.min - current.min) * 100)) : 100
  return { skin: current, next, need: next ? next.min - merit : 0, percent }
}
function escapeHtml(value) {
  return String(value == null ? '' : value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))
}
function fmtTime(ts) {
  const d = new Date(ts)
  const p = n => String(n).padStart(2, '0')
  return `${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`
}
function playSound(name) {
  if (!soundEnabled) return
  const volumes = { knock1: .85, knock2: .85, knock3: .9, knock4: .9, knock5: .95, pop: .6, egg: .8, rattle: .7, land: .8, win: .9, whack: .85 }
  const audio = new Audio(`../sounds/${name}.wav`)
  audio.volume = volumes[name] || .75
  audio.play().catch(() => {})
}
function getHistory() { return loadJson(KEYS.history, []) }
function getAchievements(s) { return ACHIEVEMENTS.map(a => ({ ...a, unlocked: a.check(s) })) }
function getSeenAchievements() { return loadJson(KEYS.achievements, []) }
function markSeen(ids) { const seen = getSeenAchievements(); ids.forEach(id => { if (!seen.includes(id)) seen.push(id) }); saveJson(KEYS.achievements, seen) }
function showToast(message) {
  const old = document.querySelector('.toast'); if (old) old.remove()
  const el = document.createElement('div'); el.className = 'toast'; el.textContent = message; document.body.appendChild(el)
  clearTimeout(toastTimer); toastTimer = setTimeout(() => el.remove(), 2400)
}
function headerMarkup() {
  const info = PAGE_INFO[activePage]
  const now = new Date()
  return `<header class="topbar"><div><div class="top-title">${info.icon} ${info.title}</div><div class="top-sub">${info.subtitle}</div></div><div class="top-right"><span class="status-dot"></span><span>本地保存 · 无需登录</span><span class="pill">${now.toLocaleDateString('zh-CN', { month: 'long', day: 'numeric', weekday: 'short' })}</span></div></header>`
}
function navMarkup() {
  const items = [ ['home','🐟','木鱼修行'], ['bubble','🫧','捏泡泡'], ['whack','🔨','锤烦恼'], ['fortune','🏮','今日求签'], ['mine','🌱','我的档案'] ]
  return `<aside class="sidebar"><div class="brand"><div class="brand-mark">🌿</div><div><div class="brand-title">解压研究所</div><div class="brand-sub">RELAX LAB · DESKTOP</div></div></div><div class="nav-label">放松一下</div><nav class="nav">${items.map(([id,icon,label]) => `<button class="nav-item ${activePage === id ? 'active' : ''}" data-page="${id}"><span class="nav-icon">${icon}</span><span>${label}</span></button>`).join('')}</nav><div class="sidebar-bottom"><div class="mini-note"><strong>☁️ 给自己一点空间</strong>不必每件事都马上完成。停下来呼吸一下，也是一种进步。</div><div class="sidebar-foot">解压研究所 v1.0.0 · 桌面版</div></div></aside>`
}
function render() {
  // Stop stale audio-independent game loops only when their own page is closed by navigation handler.
  const pageContent = activePage === 'home' ? renderHome() : activePage === 'bubble' ? renderBubble() : activePage === 'whack' ? renderWhack() : activePage === 'fortune' ? renderFortune() : renderMine()
  root.innerHTML = `<div class="app">${navMarkup()}<main class="main">${headerMarkup()}<section class="content"><div class="content-inner">${pageContent}</div></section></main></div>`
}
function renderHome() {
  const s = getStats(), skinInfo = getSkin(s.meritTotal), skin = skinInfo.skin, lvl = getLevel(s)
  return `<div class="tip-card"><div class="tip-emoji">${homeTip.emoji}</div><div style="flex:1"><div class="tip-label">今日解压小贴士 · 点右侧换一条</div><div class="tip-text">${homeTip.text}</div></div><button class="text-btn" data-action="refresh-tip">换一条 ↻</button></div>
    <div class="home-layout"><section class="card fish-card"><div class="card-title"><span>敲敲木鱼，积累功德</span><span class="pill">LV.${skin.level}</span></div><div class="fish-stage"><div class="fish-halo"><button class="fish-button" data-action="knock" aria-label="敲木鱼">${skin.emoji}</button></div></div><div class="fish-prompt">点击木鱼，功德 +1 · 连续敲击试试连击</div><div id="combo-note" class="combo-text">${s.meritToday ? `今日已经敲了 ${s.meritToday} 下 🙏` : '来敲第一下吧 🙏'}</div><div class="stats-grid" style="margin-top:20px"><div class="stat-tile"><div class="stat-number">${s.meritToday}</div><div class="stat-label">今日功德</div></div><div class="stat-tile"><div class="stat-number">${s.meritTotal}</div><div class="stat-label">累计功德</div></div></div></section>
    <div class="grid" style="align-content:start"><section class="card evolution-card"><div class="eyebrow" style="color:#e7e1ff">WOODEN FISH EVOLUTION</div><div class="evolution-title">木鱼等级 Lv.${skin.level} · ${skin.emoji} ${skin.name}</div><div class="evolution-sub">${skinInfo.next ? `再敲 ${skinInfo.need} 下，进化为 ${skinInfo.next.emoji} ${skinInfo.next.name}` : '最终形态已解锁，功德无量！'}</div><div class="progress-track"><div class="progress-fill" style="width:${skinInfo.percent}%"></div></div><div class="progress-note">进化进度 ${skinInfo.percent}%</div><div class="skin-track">${SKINS.map(k => `<div class="skin-step ${s.meritTotal >= k.min ? 'done' : ''} ${skin.level === k.level ? 'current' : ''}"><span class="emoji">${k.emoji}</span><span class="label">${k.min === 0 ? '起点' : k.min}</span></div>`).join('')}</div></section>
    <section class="card"><div class="card-title">🌱 解压成长</div><div class="card-sub">你的所有小游戏记录会汇总成解压值。</div><div style="display:flex;align-items:center;justify-content:space-between;margin-top:18px"><div><div class="stat-number">${lvl.total}</div><div class="stat-label">当前解压值</div></div><span class="pill">${lvl.name}</span></div><div class="progress-track" style="background:#eeeaf8;margin-top:15px"><div class="progress-fill" style="width:${lvl.percent}%;background:var(--purple)"></div></div><div class="tiny-label">${lvl.nextName === '已达最高' ? '已达最高等级，太棒了！' : `距离「${lvl.nextName}」还差 ${lvl.need} 点`}</div></section></div></div>`
}
function newBubbleRound() {
  const eggSet = new Set()
  while (eggSet.size < 4) eggSet.add(Math.floor(Math.random() * 40))
  return { bubbles: Array.from({ length: 40 }, (_, id) => ({ id, color: Math.floor(Math.random() * 3), egg: eggSet.has(id), popped: false, burst: pick(['💥','💥','✨','💫']) })), popped: 0, score: 0, combo: 0, lastPop: 0, startTime: 0, elapsedMs: 0, elapsedText: '0.0', finished: false, result: null, praise: '' }
}
function bubbleElapsed() { return bubbleGame && bubbleGame.startTime ? Math.max(0, Date.now() - bubbleGame.startTime) : 0 }
function renderBubble() {
  if (!bubbleGame) bubbleGame = newBubbleRound()
  const g = bubbleGame, s = getStats(), elapsed = g.finished ? g.elapsedText : (g.startTime ? (bubbleElapsed() / 1000).toFixed(1) : '0.0')
  return `<div class="section-head"><div><div class="eyebrow">TINY SATISFACTION</div><h1 class="page-heading">捏泡泡纸</h1><p class="page-desc">40 颗泡泡，藏着 4 个彩蛋。找到彩蛋额外加分，试试刷新自己的最佳记录。</p></div><button class="secondary-btn" data-action="reset-bubble">↻ 换一张新的</button></div>
    <section class="card bubble-head-card"><div class="bubble-stats"><div class="bubble-stat"><strong id="bubble-score">${g.score}</strong><span>本局得分</span></div><div class="bubble-stat"><strong id="bubble-elapsed">${elapsed}</strong><span>用时（秒）</span></div><div class="bubble-stat"><strong>${g.popped}<span style="font-size:14px"> / 40</span></strong><span>已捏爆</span></div></div><span class="pill">🏆 最佳 ${s.bubbleBestScore || 0} 分</span><div class="bubble-progress"><span style="width:${g.popped / 40 * 100}%"></span></div></section>
    <section class="card bubble-card"><div class="card-title"><span>🫧 点一下，捏爆一颗</span><span class="tiny-label">金色描边 = 彩蛋 +10</span></div><div class="bubble-grid" style="margin-top:18px">${g.bubbles.map(b => `<button class="bubble c${b.color} ${b.egg ? 'egg' : ''} ${b.popped ? 'popped' : ''}" data-pop="${b.id}" ${b.popped || g.finished ? 'disabled' : ''} aria-label="泡泡 ${b.id + 1}">${b.popped ? b.burst : (b.egg ? '✨' : '')}</button>`).join('')}</div><div class="bubble-info"><span>${g.finished ? '本局已结束，继续保持好心情。' : (g.praise || '连续快速点击可以触发连击提示。')}</span><span>${g.combo >= 3 && !g.finished ? `🔥 ${g.combo} 连击` : (g.popped === 0 ? '准备好了吗？' : `完成度 ${Math.round(g.popped / 40 * 100)}%`)}</span></div></section>
    ${g.finished && g.result ? `<section class="game-result"><div class="result-emoji">🎆</div><div class="result-title">全部捏爆啦！</div><div class="result-score">${g.score} 分</div><div class="rating">${g.result.rating} · ${g.result.title}</div><div class="page-desc">用时 ${g.elapsedText} 秒 · 历史最佳 ${s.bubbleBestScore || g.score} 分${g.result.isNewBest ? ' · 🏆 新纪录！' : ''}</div><div class="result-buttons"><button class="primary-btn" data-action="reset-bubble">再来一张</button></div></section>` : ''}`
}
function renderWhack() {
  const s = getStats(); whackGame.best = s.whackBestScore || 0
  if (whackGame.state === 'idle') return `<div class="section-head"><div><div class="eyebrow">QUICK REACTION</div><h1 class="page-heading">锤爆烦恼</h1><p class="page-desc">烦恼一冒头就锤下去！30 秒挑战手速，幸运小草莓可额外加 5 分。</p></div><span class="pill">最高 ${whackGame.best} 分</span></div><section class="card whack-start"><div class="hero">🔨</div><h2>准备好清空烦恼了吗？</h2><p>点击开始后，💼 工作、📝 作业、🧾 账单等烦恼会随机冒出来。锤中普通目标 +1 分，🍀 幸运目标 +5 分。</p><div class="target-row"><span class="target-tag">💼 +1</span><span class="target-tag">📝 +1</span><span class="target-tag">🧾 +1</span><span class="target-tag">😤 +1</span><span class="target-tag">🦟 +1</span><span class="target-tag">💤 +1</span><span class="target-tag bonus">🍀 +5</span></div><button class="primary-btn" data-action="start-whack">开始锤！</button></section>`
  const g = whackGame
  return `<div class="section-head"><div><div class="eyebrow">QUICK REACTION</div><h1 class="page-heading">锤爆烦恼</h1><p class="page-desc">看准目标，出现就点！空洞也可以点，但会错过节奏。</p></div><button class="secondary-btn" data-action="quit-whack">退出本局</button></div><section class="card whack-top"><div><div class="card-title">🔨 清除烦恼中 ${g.combo >= 3 ? `<span class="pill">🔥 连击 x${g.combo}</span>` : ''}</div><div class="card-sub">30 秒挑战 · 每锤中一次会累计解压值</div></div><div class="whack-score"><div><strong id="whack-score">${g.score}</strong><span>本局得分</span></div><div><strong id="whack-time">${g.timeLeft}</strong><span>剩余秒数</span></div><div><strong>${g.best}</strong><span>历史最高</span></div></div><div class="time-bar"><span id="whack-time-bar" style="width:${g.timeLeft / 30 * 100}%"></span></div></section><section class="whack-field">${g.holes.map((h,i) => `<button class="whack-cell ${h.hit ? 'hit' : ''} ${h.bonus ? 'bonus' : ''}" data-hole="${i}" aria-label="第 ${i + 1} 个洞"><span class="hole-shadow"></span><span class="mole ${h.up ? 'up' : ''}">${h.up ? h.emoji : ''}</span></button>`).join('')}</section><div class="whack-hint">🎯 金色幸运草 +5 分 · 目标出现时间会越来越短</div>${g.state === 'over' && g.result ? `<section class="game-result"><div class="result-emoji">${g.result.emoji}</div><div class="result-title">${g.result.title}</div><div class="result-score">${g.result.score} 分</div><div class="rating">${g.result.rating} 级</div><div class="page-desc">历史最高 ${g.result.best} 分 ${g.result.isNewBest ? '· 🏆 新纪录！' : ''}</div><div class="result-buttons"><button class="primary-btn" data-action="start-whack">再来一局</button></div></section>` : ''}`
}
function renderFortune() {
  const stats = getStats(), history = getHistory(), drawnToday = stats.drawDate === todayStr()
  let state = fortuneAnimation, fortune = null
  if (state !== 'shaking' && state !== 'falling') {
    if (drawnToday && history.length) { state = 'result'; fortune = history[0] } else { state = 'idle' }
  }
  const title = state === 'shaking' ? '签筒摇晃中...' : state === 'falling' ? '签掉出来了！' : state === 'result' ? '今日签文' : '今日求一签'
  const stage = state === 'result' && fortune ? `<div class="fortune-result"><div style="font-size:40px">${fortune.emoji || '🏮'}</div><div class="fortune-scroll"><div class="fortune-label">第 ${fortune.num || '—'} 签 · ${fortune.gua || '—'} 卦</div><div class="fortune-name">${fortune.name}</div><div class="fortune-text">${fortune.text}</div></div><div class="page-desc" style="margin-top:18px">${drawnToday ? '🕯️ 今日一签已求，明日再来' : ''}</div></div>` : `<div class="taiji ${state === 'shaking' ? 'spinning' : ''}">☯</div><div class="fortune-title">${title}</div><div class="fortune-sub">${state === 'idle' ? '心诚则灵 · 每日仅可求一签' : state === 'shaking' ? '心诚则灵 · 静候天意' : '啪嗒一声，落在签台上'}</div><div class="tube-wrap ${state === 'shaking' ? 'shaking' : state === 'falling' ? 'falling' : ''}"><div class="stick s1"></div><div class="stick s2"></div><div class="stick s3"></div><div class="stick s4"></div><div class="stick s5"></div><div class="tube"></div></div>${state === 'idle' ? `<button class="primary-btn" data-action="draw-fortune">摇签问问今日</button>` : `<div class="pill">请稍候…</div>`}`
  return `<div class="section-head"><div><div class="eyebrow">A LITTLE DAILY RITUAL</div><h1 class="page-heading">今日求签</h1><p class="page-desc">抽到的签文是随机的小提示，仅供娱乐，不代表真实预测或人生决定。</p></div><span class="pill">${drawnToday ? '今日已求签' : '每日一次'}</span></div><div class="fortune-layout"><section class="card fortune-stage"><div class="lanterns"><span>🏮</span><span>🏮</span></div><div class="fortune-main">${stage}</div></section><section class="card"><div class="card-title">📜 签文记录 <span class="pill">最近 ${Math.min(history.length, 10)} 条</span></div><div class="card-sub">每次求签会保存在本机，可随时回看。</div><div class="fortune-history">${history.length ? history.slice(0,10).map(h => `<div class="history-item"><div class="history-badge">${escapeHtml(h.name)}</div><div class="history-text">${escapeHtml(h.text)}</div><div class="history-time">${fmtTime(h.time)} · ${escapeHtml(h.gua || '—')}</div></div>`).join('') : `<div class="empty-state">🏮<br>还没有求过签<br>试试左边的签筒吧</div>`}</div></section></div>`
}
function renderMine() {
  const s = getStats(), lvl = getLevel(s), history = getHistory().slice(0,10), achievements = getAchievements(s)
  const unlocked = achievements.filter(a => a.unlocked).length
  return `<div class="section-head"><div><div class="eyebrow">YOUR RELAX JOURNEY</div><h1 class="page-heading">我的档案</h1><p class="page-desc">所有数据默认保存在当前电脑，不会自动上传到网络。</p></div><span class="pill">${unlocked}/${achievements.length} 成就</span></div><section class="card profile-level"><div class="level-top"><div><div class="eyebrow" style="color:#e5e0ff">CURRENT LEVEL</div><div class="level-name">${lvl.name}</div></div><div class="level-total">解压值 ${lvl.total}</div></div><div class="progress-track"><div class="progress-fill" style="width:${lvl.percent}%"></div></div><div class="progress-note">${lvl.nextName === '已达最高' ? '已达最高等级，你是解压之王 👑' : `距「${lvl.nextName}」还差 ${lvl.need} 点解压值`}</div></section><div class="stats-grid" style="margin-bottom:16px"><div class="stat-tile"><div class="stat-number">${s.meritToday}</div><div class="stat-label">今日功德</div></div><div class="stat-tile"><div class="stat-number">${s.meritTotal}</div><div class="stat-label">累计功德</div></div><div class="stat-tile"><div class="stat-number">${s.bubblesTotal}</div><div class="stat-label">累计捏爆泡泡</div></div><div class="stat-tile"><div class="stat-number">${s.drawsTotal}</div><div class="stat-label">求签次数</div></div><div class="stat-tile"><div class="stat-number">${s.whackTotal || 0}</div><div class="stat-label">累计锤中烦恼</div></div><div class="stat-tile"><div class="stat-number">${s.whackBestScore || 0}</div><div class="stat-label">锤烦恼最佳分</div></div></div><section class="card" style="margin-bottom:16px"><div class="card-title">🏆 成就墙 <span class="pill">已解锁 ${unlocked}/${achievements.length}</span></div><div class="card-sub">完成小游戏可以解锁更多徽章。</div><div class="achievement-grid">${achievements.map(a => `<div class="achievement ${a.unlocked ? '' : 'locked'}"><div class="achievement-emoji">${a.unlocked ? a.emoji : '🔒'}</div><div class="achievement-name">${a.unlocked ? a.name : '？？？'}</div><div class="achievement-desc">${a.desc}</div></div>`).join('')}</div></section><section class="card" style="margin-bottom:16px"><div class="card-title">🏮 最近求签</div><div class="fortune-history">${history.length ? history.map(h => `<div class="history-item"><div class="history-badge">${escapeHtml(h.name)}</div><div class="history-text">${escapeHtml(h.text)}</div><div class="history-time">${fmtTime(h.time)}</div></div>`).join('') : '<div class="empty-state">暂无求签记录，去「今日求签」看看吧。</div>'}</div></section><section class="card"><div class="card-title">⚙️ 设置</div><div class="settings-row"><div><strong>🔊 音效</strong><div class="card-sub">控制木鱼、泡泡、锤击和求签音效。</div></div><input id="sound-toggle" class="toggle" type="checkbox" ${soundEnabled ? 'checked' : ''} aria-label="开启音效"></div><div class="divider"></div><div class="settings-row"><div><strong>重置本机数据</strong><div class="card-sub">清空功德、记录、最佳成绩和成就进度。</div></div><button class="danger-btn" data-action="reset-data">重置数据</button></div></section><div class="footer-note">解压研究所 v1.0.0 · 愿你今天也有一点好心情。</div>`
}

function knockFish() {
  const s = changeStats(x => { x.meritTotal = (x.meritTotal || 0) + 1; x.meritToday = (x.meritToday || 0) + 1; x.meritDate = todayStr() })
  const skin = getSkin(s.meritTotal).skin
  playSound(`knock${skin.level}`)
  render()
}
function refreshTip() { homeTip = pick(TIPS); render() }
function resetBubble() {
  if (bubbleInterval) clearInterval(bubbleInterval)
  bubbleInterval = null
  bubbleGame = newBubbleRound()
  render()
}
let bubbleInterval = null
function popBubble(id) {
  if (!bubbleGame || bubbleGame.finished) return
  const b = bubbleGame.bubbles[Number(id)]
  if (!b || b.popped) return
  b.popped = true
  bubbleGame.popped += 1
  const now = Date.now()
  if (!bubbleGame.startTime) {
    bubbleGame.startTime = now
    bubbleInterval = setInterval(() => {
      if (!bubbleGame || bubbleGame.finished || !bubbleGame.startTime) return
      const el = document.getElementById('bubble-elapsed')
      if (el) el.textContent = ((Date.now() - bubbleGame.startTime) / 1000).toFixed(1)
    }, 100)
  }
  bubbleGame.combo = now - bubbleGame.lastPop < 800 ? bubbleGame.combo + 1 : 1
  bubbleGame.lastPop = now
  bubbleGame.score += b.egg ? 10 : 1
  bubbleGame.praise = b.egg ? '✨ 找到彩蛋！+10 分' : (bubbleGame.combo === 5 || bubbleGame.combo === 10 ? `🔥 连击 x${bubbleGame.combo}，手速惊人！` : ({10:'手感不错，继续捏！',20:'压力正在消失…',30:'马上捏完啦！'}[bubbleGame.popped] || '继续保持这个节奏！'))
  changeStats(s => { s.bubblesTotal = (s.bubblesTotal || 0) + 1 })
  playSound(b.egg ? 'egg' : 'pop')
  if (bubbleGame.popped >= 40) finishBubbleRound()
  render()
  const p = bubbleGame.praise
  if (p) setTimeout(() => { if (activePage === 'bubble' && bubbleGame && bubbleGame.praise === p && !bubbleGame.finished) { bubbleGame.praise = ''; const el = document.querySelector('.bubble-info span'); if (el) el.textContent = '连续快速点击可以触发连击提示。' } }, 1400)
}
function finishBubbleRound() {
  if (!bubbleGame || bubbleGame.finished) return
  if (bubbleInterval) clearInterval(bubbleInterval)
  bubbleInterval = null
  const elapsed = bubbleGame.startTime ? Date.now() - bubbleGame.startTime : 0
  const elapsedText = (elapsed / 1000).toFixed(1)
  let rating = 'C', title = '轻松捏泡', bonus = 10
  if (elapsed < 8000) { rating = 'S'; title = '泡泡杀手'; bonus = 50 }
  else if (elapsed < 12000) { rating = 'A'; title = '解压大师'; bonus = 30 }
  else if (elapsed < 18000) { rating = 'B'; title = '解压达人'; bonus = 20 }
  bubbleGame.score += bonus
  const wasNewBest = bubbleGame.score > (getStats().bubbleBestScore || 0)
  const s = changeStats(stats => {
    if (bubbleGame.score > (stats.bubbleBestScore || 0)) stats.bubbleBestScore = bubbleGame.score
    if (!stats.bubbleBestTime || elapsed < stats.bubbleBestTime) stats.bubbleBestTime = elapsed
    const rank = { S:4, A:3, B:2, C:1 }
    if ((rank[rating] || 0) > (rank[stats.bubbleBestRating] || 0)) stats.bubbleBestRating = rating
  })
  bubbleGame.finished = true
  bubbleGame.elapsedMs = elapsed
  bubbleGame.elapsedText = elapsedText
  bubbleGame.result = { rating, title, bonus, bestScore: s.bubbleBestScore, bestTime: s.bubbleBestTime, isNewBest: wasNewBest }
  playSound('win')
}
function stopWhackTimers() {
  clearInterval(whackInterval); clearTimeout(whackLoopTimer)
  whackInterval = null; whackLoopTimer = null
  whackTimers.forEach(t => clearTimeout(t)); whackTimers = []
}
function startWhack() {
  stopWhackTimers()
  whackGame = { state:'playing', score:0, combo:0, best:getStats().whackBestScore || 0, startTime:Date.now(), timeLeft:30, holes:Array.from({length:9},()=>({up:false,hit:false,emoji:'',bonus:false})), result:null }
  render()
  whackInterval = setInterval(() => {
    if (whackGame.state !== 'playing') return
    const left = Math.max(0, 30000 - (Date.now() - whackGame.startTime))
    whackGame.timeLeft = Math.ceil(left / 1000)
    const timeEl = document.getElementById('whack-time')
    const barEl = document.getElementById('whack-time-bar')
    if (timeEl) timeEl.textContent = String(whackGame.timeLeft)
    if (barEl) barEl.style.width = `${left / 300}%`
    if (left <= 0) endWhack()
  }, 100)
  spawnWhack()
}
function spawnWhack() {
  if (whackGame.state !== 'playing') return
  const idle = whackGame.holes.map((h,i)=>({h,i})).filter(x=>!x.h.up)
  if (idle.length) {
    const { h, i } = pick(idle)
    h.up = true; h.hit = false; h.bonus = Math.random() < .12
    h.emoji = h.bonus ? '🍀' : pick(['💼','📝','🧾','😤','🦟','💤'])
    render()
    const stay = 650 + Math.random() * 400
    whackTimers.push(setTimeout(() => {
      if (whackGame.state !== 'playing') return
      const cur = whackGame.holes[i]
      if (cur && cur.up && !cur.hit) { cur.up = false; whackGame.combo = 0; render() }
    }, stay))
  }
  const progress = (Date.now() - whackGame.startTime) / 30000
  whackLoopTimer = setTimeout(spawnWhack, 600 - 260 * progress)
}
function hitWhack(id) {
  if (whackGame.state !== 'playing') return
  const hole = whackGame.holes[Number(id)]
  if (!hole || !hole.up || hole.hit) return
  hole.hit = true
  const gain = hole.bonus ? 5 : 1
  whackGame.score += gain; whackGame.combo += 1; hole.up = false
  changeStats(s => { s.whackTotal = (s.whackTotal || 0) + 1 })
  playSound(hole.bonus ? 'egg' : 'whack')
  render()
}
function endWhack() {
  if (whackGame.state !== 'playing') return
  stopWhackTimers()
  const score = whackGame.score
  let rating = 'C', title = '锤了个寂寞', emoji = '🥱'
  if (score >= 35) { rating='S'; title='锤神降临'; emoji='👑' }
  else if (score >= 25) { rating='A'; title='烦恼克星'; emoji='💪' }
  else if (score >= 15) { rating='B'; title='小锤初成'; emoji='😤' }
  let isNewBest = false
  const s = changeStats(stats => { isNewBest = score > (stats.whackBestScore || 0); if (isNewBest) stats.whackBestScore = score })
  whackGame.holes.forEach(h => { h.up = false })
  whackGame.state = 'over'; whackGame.timeLeft = 0; whackGame.best = s.whackBestScore || 0
  whackGame.result = { score, rating, title, emoji, isNewBest, best: whackGame.best }
  playSound('win')
  render()
}
function quitWhack() { stopWhackTimers(); whackGame.state = 'idle'; render() }
function drawFortune() {
  const s = getStats()
  if (s.drawDate === todayStr()) { showToast('今日已经求过签啦，明天再来'); return }
  if (fortuneAnimation === 'shaking' || fortuneAnimation === 'falling') return
  fortuneAnimation = 'shaking'; render(); playSound('rattle')
  drawingTimers.forEach(clearTimeout); drawingTimers = []
  drawingTimers.push(setTimeout(() => { fortuneAnimation = 'falling'; if (activePage === 'fortune') render(); playSound('land') }, 900))
  drawingTimers.push(setTimeout(() => {
    const f = { ...pick(FORTUNES), num:1 + Math.floor(Math.random()*100), time:Date.now() }
    const history = getHistory(); history.unshift(f); saveJson(KEYS.history, history.slice(0,30))
    changeStats(stats => { stats.drawsTotal = (stats.drawsTotal || 0) + 1; stats.drawDate = todayStr() })
    fortuneAnimation = 'result'; playSound('egg'); if (activePage === 'fortune') render()
  }, 1900))
}
function resetAllData() {
  localStorage.removeItem(KEYS.stats); localStorage.removeItem(KEYS.history); localStorage.removeItem(KEYS.achievements)
  bubbleGame = newBubbleRound(); quitWhack(); fortuneAnimation = 'idle'
  showToast('本机数据已清空'); render()
}

root.addEventListener('click', (event) => {
  const nav = event.target.closest('[data-page]')
  if (nav) {
    const nextPage = nav.getAttribute('data-page')
    if (activePage === 'whack' && nextPage !== 'whack' && whackGame.state === 'playing') quitWhack()
    if (activePage !== nextPage && activePage === 'fortune') { drawingTimers.forEach(clearTimeout); drawingTimers = []; if (fortuneAnimation === 'shaking' || fortuneAnimation === 'falling') fortuneAnimation = 'idle' }
    activePage = nextPage
    if (activePage === 'bubble' && !bubbleGame) bubbleGame = newBubbleRound()
    render()
    return
  }
  const pop = event.target.closest('[data-pop]')
  if (pop) { popBubble(pop.getAttribute('data-pop')); return }
  const hole = event.target.closest('[data-hole]')
  if (hole) { hitWhack(hole.getAttribute('data-hole')); return }
  const button = event.target.closest('[data-action]')
  if (!button) return
  const action = button.getAttribute('data-action')
  if (action === 'refresh-tip') refreshTip()
  else if (action === 'knock') knockFish()
  else if (action === 'reset-bubble') resetBubble()
  else if (action === 'start-whack') startWhack()
  else if (action === 'quit-whack') quitWhack()
  else if (action === 'draw-fortune') drawFortune()
  else if (action === 'reset-data') {
    if (window.confirm('确定清空本机的功德、游戏纪录、求签历史和成就吗？此操作无法撤销。')) resetAllData()
  }
})
root.addEventListener('change', (event) => {
  if (event.target && event.target.id === 'sound-toggle') {
    soundEnabled = event.target.checked
    localStorage.setItem(KEYS.sound, soundEnabled ? 'true' : 'false')
    showToast(soundEnabled ? '音效已开启' : '音效已关闭')
  }
})

render()
