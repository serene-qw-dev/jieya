'use strict'

const root = document.getElementById('app')
const KEYS = { stats: 'relax.stats', history: 'relax.drawHistory', achievements: 'relax.achSeen', sound: 'relax.soundOn', theme: 'relax.theme', soundVolume: 'relax.soundVolume', ambienceVolume: 'relax.ambienceVolume', infiniteBubbles: 'relax.infiniteBubbles', moods: 'relax.moods' }
const PAGE_INFO = {
  home: { title: '木鱼修行', subtitle: '敲掉一点烦恼，攒下一点好心情。', icon: '🐟' },
  bubble: { title: '捏泡泡纸', subtitle: '啪、啪、啪，把紧绷的情绪一点点放掉。', icon: '🫧' },
  whack: { title: '锤爆烦恼', subtitle: '烦恼冒头就锤它！看看 30 秒能拿多少分。', icon: '🔨' },
  fortune: { title: '今日求签', subtitle: '给今天一点轻松的小仪式，结果仅供娱乐。', icon: '🏮' },
  mine: { title: '我的档案', subtitle: '看看你积累的解压值、成就与求签记录。', icon: '🌱' },
  relax: { title: '白噪音小屋', subtitle: '给自己一个安静的角落，听雨、听海、听森林。', icon: '🌧️' },
  sand: { title: '沙子绘画', subtitle: '用一粒粒彩砂画下此刻的心情，不需要画得完美。', icon: '🏖️' },
  infinite: { title: '无限捏泡泡', subtitle: '没有倒计时、没有输赢，想捏多久就捏多久。', icon: '🫧' },
  mood: { title: '每日心情', subtitle: '简单记下今天的感受，慢慢看见自己的变化。', icon: '🌈' }
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
let lastRenderedPage = null
let homeTip = pick(TIPS)
let soundEnabled = localStorage.getItem(KEYS.sound) !== 'false'
let currentTheme = localStorage.getItem(KEYS.theme) || 'lavender'
let soundVolume = Number(localStorage.getItem(KEYS.soundVolume) ?? 70)
let ambienceVolume = Number(localStorage.getItem(KEYS.ambienceVolume) ?? 35)
let ambienceType = 'none'
let audioContext = null
let ambienceNodes = []
let ambientOutput = null
let infinitePopCount = Number(localStorage.getItem(KEYS.infiniteBubbles) || 0)
let selectedMoodDate = todayStr()
let moodMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1)
let moodDraft = { mood: '', note: '' }
let sandCanvas = null
let sandCtx = null
let sandDrawing = false
let sandColor = '#f0b45d'
let sandSize = 16
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
  if (!soundEnabled || soundVolume <= 0) return
  const volumes = { knock1: .85, knock2: .85, knock3: .9, knock4: .9, knock5: .95, pop: .6, egg: .8, rattle: .7, land: .8, win: .9, whack: .85 }
  const audio = new Audio(`../sounds/${name}.wav`)
  audio.volume = Math.max(0, Math.min(1, (volumes[name] || .75) * soundVolume / 100))
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
  const ambienceLabel = ambienceType === 'none' ? '' : ` · ${({rain:'雨声',ocean:'海浪',forest:'森林'})[ambienceType] || ''}播放中`
  return `<header class="topbar"><div><div class="top-title">${info.icon} ${info.title}</div><div class="top-sub">${info.subtitle}</div></div><div class="top-right"><span class="status-dot"></span><span>本地保存 · 无需登录${ambienceLabel}</span><span class="pill">${now.toLocaleDateString('zh-CN', { month: 'long', day: 'numeric', weekday: 'short' })}</span></div></header>`
}
function navMarkup() {
  const items = [ ['home','🐟','木鱼修行'], ['bubble','🫧','捏泡泡'], ['infinite','🫧','无限泡泡'], ['sand','🏖️','沙子绘画'], ['whack','🔨','锤烦恼'], ['relax','🌧️','白噪音小屋'], ['fortune','🏮','今日求签'], ['mood','🌈','每日心情'], ['mine','🌱','我的档案'] ]
  return `<aside class="sidebar"><div class="brand"><div class="brand-mark"><img class="brand-icon-image" src="../assets/icon.png" alt=""></div><div><div class="brand-title">解压研究所</div><div class="brand-sub">RELAX LAB · DESKTOP</div></div></div><div class="nav-label">放松一下</div><nav class="nav">${items.map(([id,icon,label]) => `<button class="nav-item ${activePage === id ? 'active' : ''}" data-page="${id}"><span class="nav-icon">${icon}</span><span>${label}</span></button>`).join('')}</nav><div class="sidebar-bottom"><div class="mini-note"><strong>☁️ 给自己一点空间</strong>不必每件事都马上完成。停下来呼吸一下，也是一种进步。</div><div class="sidebar-foot">解压研究所 v1.1.1 · 桌面版</div></div></aside>`
}
function render() {
  // Replacing root.innerHTML also replaces the scroll container. Preserve scroll
  // for in-page updates, but start at the top when the user navigates to a new page.
  const keepScroll = lastRenderedPage === activePage
  const oldContent = root.querySelector('.content')
  const oldSidebar = root.querySelector('.sidebar')
  const contentScrollTop = keepScroll && oldContent ? oldContent.scrollTop : 0
  const sidebarScrollTop = keepScroll && oldSidebar ? oldSidebar.scrollTop : 0
  const pageContent = activePage === 'home' ? renderHome() : activePage === 'bubble' ? renderBubble() : activePage === 'whack' ? renderWhack() : activePage === 'fortune' ? renderFortune() : activePage === 'mine' ? renderMine() : activePage === 'relax' ? renderRelax() : activePage === 'sand' ? renderSand() : activePage === 'infinite' ? renderInfiniteBubbles() : renderMood()
  root.innerHTML = `<div class="app">${navMarkup()}<main class="main">${headerMarkup()}<section class="content"><div class="content-inner">${pageContent}</div></section></main></div>`
  const newContent = root.querySelector('.content')
  const newSidebar = root.querySelector('.sidebar')
  if (newContent) newContent.scrollTop = contentScrollTop
  if (newSidebar) newSidebar.scrollTop = sidebarScrollTop
  lastRenderedPage = activePage
  document.documentElement.dataset.theme = currentTheme
  if (activePage === 'sand') requestAnimationFrame(initSandCanvas)
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
  return `<div class="section-head"><div><div class="eyebrow">QUICK REACTION</div><h1 class="page-heading">锤爆烦恼</h1><p class="page-desc">看准目标，出现就点！空洞也可以点，但会错过节奏。</p></div><button class="secondary-btn" data-action="quit-whack">退出本局</button></div><section class="card whack-top"><div><div class="card-title">🔨 清除烦恼中 <span id="whack-combo" class="pill" style="${g.combo >= 3 ? '' : 'display:none'}">🔥 连击 x${g.combo}</span></div><div class="card-sub">30 秒挑战 · 每锤中一次会累计解压值</div></div><div class="whack-score"><div><strong id="whack-score">${g.score}</strong><span>本局得分</span></div><div><strong id="whack-time">${g.timeLeft}</strong><span>剩余秒数</span></div><div><strong>${g.best}</strong><span>历史最高</span></div></div><div class="time-bar"><span id="whack-time-bar" style="width:${g.timeLeft / 30 * 100}%"></span></div></section><section class="whack-field">${g.holes.map((h,i) => `<button class="whack-cell ${h.hit ? 'hit' : ''} ${h.bonus ? 'bonus' : ''}" data-hole="${i}" aria-label="第 ${i + 1} 个洞"><span class="hole-shadow"></span><span class="mole ${h.up ? 'up' : ''}">${h.up ? h.emoji : ''}</span></button>`).join('')}</section><div class="whack-hint">🎯 金色幸运草 +5 分 · 目标出现时间会越来越短</div>${g.state === 'over' && g.result ? `<section class="game-result"><div class="result-emoji">${g.result.emoji}</div><div class="result-title">${g.result.title}</div><div class="result-score">${g.result.score} 分</div><div class="rating">${g.result.rating} 级</div><div class="page-desc">历史最高 ${g.result.best} 分 ${g.result.isNewBest ? '· 🏆 新纪录！' : ''}</div><div class="result-buttons"><button class="primary-btn" data-action="start-whack">再来一局</button></div></section>` : ''}`
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
  return `<div class="section-head"><div><div class="eyebrow">YOUR RELAX JOURNEY</div><h1 class="page-heading">我的档案与设置</h1><p class="page-desc">游戏记录、主题和音效设置只保存在当前电脑。</p></div><span class="pill">${unlocked}/${achievements.length} 成就</span></div>
    <section class="card profile-level"><div class="level-top"><div><div class="eyebrow" style="color:#e5e0ff">CURRENT LEVEL</div><div class="level-name">${lvl.name}</div></div><div class="level-total">解压值 ${lvl.total}</div></div><div class="progress-track"><div class="progress-fill" style="width:${lvl.percent}%"></div></div><div class="progress-note">${lvl.nextName === '已达最高' ? '已达最高等级，你是解压之王 👑' : `距「${lvl.nextName}」还差 ${lvl.need} 点解压值`}</div></section>
    <div class="stats-grid" style="margin-bottom:16px"><div class="stat-tile"><div class="stat-number">${s.meritToday}</div><div class="stat-label">今日功德</div></div><div class="stat-tile"><div class="stat-number">${s.meritTotal}</div><div class="stat-label">累计功德</div></div><div class="stat-tile"><div class="stat-number">${s.bubblesTotal}</div><div class="stat-label">累计捏爆泡泡</div></div><div class="stat-tile"><div class="stat-number">${s.drawsTotal}</div><div class="stat-label">求签次数</div></div><div class="stat-tile"><div class="stat-number">${s.whackTotal || 0}</div><div class="stat-label">累计锤中烦恼</div></div><div class="stat-tile"><div class="stat-number">${infinitePopCount}</div><div class="stat-label">无限泡泡次数</div></div></div>
    <section class="card" style="margin-bottom:16px"><div class="card-title">🏆 成就墙 <span class="pill">已解锁 ${unlocked}/${achievements.length}</span></div><div class="card-sub">完成小游戏可以解锁更多徽章。</div><div class="achievement-grid">${achievements.map(a => `<div class="achievement ${a.unlocked ? '' : 'locked'}"><div class="achievement-emoji">${a.unlocked ? a.emoji : '🔒'}</div><div class="achievement-name">${a.unlocked ? a.name : '？？？'}</div><div class="achievement-desc">${a.desc}</div></div>`).join('')}</div></section>
    <section class="card" style="margin-bottom:16px"><div class="card-title">🎨 外观主题</div><div class="card-sub">选择适合当下心情的配色，立即应用到整个软件。</div><div class="theme-grid"><button class="theme-choice ${currentTheme === 'lavender' ? 'selected' : ''}" data-theme-choice="lavender"><span class="theme-swatch swatch-lavender"></span><strong>柔和薰衣草</strong><small>默认 · 温柔舒缓</small></button><button class="theme-choice ${currentTheme === 'ocean' ? 'selected' : ''}" data-theme-choice="ocean"><span class="theme-swatch swatch-ocean"></span><strong>海盐蓝</strong><small>清爽 · 宁静</small></button><button class="theme-choice ${currentTheme === 'forest' ? 'selected' : ''}" data-theme-choice="forest"><span class="theme-swatch swatch-forest"></span><strong>森林绿</strong><small>自然 · 平静</small></button><button class="theme-choice ${currentTheme === 'sunset' ? 'selected' : ''}" data-theme-choice="sunset"><span class="theme-swatch swatch-sunset"></span><strong>日落橘</strong><small>温暖 · 柔和</small></button></div>
      <div class="settings-row"><div><strong>🔊 游戏音效</strong><div class="card-sub">控制木鱼、泡泡、锤击和求签音效。</div></div><input id="sound-toggle" class="toggle" type="checkbox" ${soundEnabled ? 'checked' : ''} aria-label="开启游戏音效"></div><div class="volume-control"><label for="sound-volume">游戏音效音量 <strong id="sound-volume-value">${soundVolume}%</strong></label><input id="sound-volume" type="range" min="0" max="100" step="5" value="${soundVolume}"></div>
      <div class="divider"></div><div class="settings-row"><div><strong>🌧️ 环境音</strong><div class="card-sub">雨声、海浪、森林音效可在「白噪音小屋」设置。</div></div><button class="secondary-btn" data-page="relax">打开白噪音</button></div>
    </section>
    <section class="card" style="margin-bottom:16px"><div class="card-title">🏮 最近求签</div><div class="fortune-history">${history.length ? history.map(h => `<div class="history-item"><div class="history-badge">${escapeHtml(h.name)}</div><div class="history-text">${escapeHtml(h.text)}</div><div class="history-time">${fmtTime(h.time)}</div></div>`).join('') : '<div class="empty-state">暂无求签记录，去「今日求签」看看吧。</div>'}</div></section>
    <section class="card"><div class="card-title">🧰 本地数据管理</div><div class="card-sub">卸载软件不会主动清理这些记录；重置会清空功德、游戏记录、心情日记和成就进度。</div><div class="settings-row"><div><strong>重置本机数据</strong><div class="card-sub">此操作无法撤销。</div></div><button class="danger-btn" data-action="reset-data">重置数据</button></div></section><div class="footer-note">解压研究所 v1.1.1 · 愿你今天也有一点好心情。</div>`
}


const MOODS = [
  { id: 'great', emoji: '🤩', label: '很开心', color: '#ffcf70' },
  { id: 'good', emoji: '😊', label: '还不错', color: '#a9dba9' },
  { id: 'calm', emoji: '😌', label: '很平静', color: '#a8d7e9' },
  { id: 'tired', emoji: '😴', label: '有点累', color: '#c7b7ee' },
  { id: 'down', emoji: '😔', label: '有点低落', color: '#a9b7d7' },
  { id: 'angry', emoji: '😤', label: '有点烦躁', color: '#f2aaa0' }
]
function dateKey(date) { const d = date instanceof Date ? date : new Date(date); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}` }
function shiftDate(date, days) { const d = new Date(date); d.setDate(d.getDate()+days); return d }
function loadMoodDraft(key = selectedMoodDate) {
  const rec = loadJson(KEYS.moods, {})[key]
  moodDraft = rec ? { mood: rec.mood || '', note: rec.note || '' } : { mood: '', note: '' }
}
function renderMood() {
  const all = loadJson(KEYS.moods, {})
  const selected = moodDraft || { mood: '', note: '' }
  const year = moodMonth.getFullYear(), month = moodMonth.getMonth()
  const first = new Date(year, month, 1), offset = (first.getDay() + 6) % 7, daysInMonth = new Date(year, month + 1, 0).getDate()
  const cells = []
  for (let i=0; i<offset; i++) cells.push('<div class="calendar-blank"></div>')
  for (let day=1; day<=daysInMonth; day++) {
    const d = new Date(year, month, day), key = dateKey(d), rec = all[key], isToday = key === todayStr(), isSelected = key === selectedMoodDate
    const mood = rec ? MOODS.find(m=>m.id===rec.mood) : null
    cells.push(`<button class="calendar-day ${isToday?'today':''} ${isSelected?'selected':''} ${rec?'has-entry':''}" data-mood-date="${key}" aria-label="${key}${mood?' '+mood.label:''}"><span>${day}</span><span class="calendar-mood">${mood ? mood.emoji : ''}</span></button>`)
  }
  const selectedDateParts = selectedMoodDate.split('-').map(Number)
  const monday = new Date(selectedDateParts[0], selectedDateParts[1]-1, selectedDateParts[2])
  monday.setDate(monday.getDate() - ((monday.getDay()+6)%7))
  const week = Array.from({length:7}, (_,i)=>dateKey(shiftDate(monday,i)))
  const weekEntries = week.map(k=>({key:k,record:all[k]})).filter(x=>x.record)
  const moodCounts = MOODS.map(m=>({ ...m, count:weekEntries.filter(x=>x.record.mood===m.id).length })).filter(m=>m.count).sort((a,b)=>b.count-a.count)
  const maxCount = Math.max(1, ...moodCounts.map(m=>m.count))
  const weekText = `${week[0].slice(5).replace('-', '/')} - ${week[6].slice(5).replace('-', '/')}`
  return `<div class="section-head"><div><div class="eyebrow">A LITTLE CHECK-IN</div><h1 class="page-heading">每日心情日记</h1><p class="page-desc">不用给每一天打分，只要诚实地留下一点记录。日记只保存在本机。</p></div><span class="pill">已记录 ${Object.keys(all).length} 天</span></div>
    <div class="mood-layout"><section class="card mood-editor"><div class="card-title">🌈 ${selectedMoodDate === todayStr() ? '今天的心情' : `记录 ${selectedMoodDate}`}</div><div class="mood-options">${MOODS.map(m=>`<button class="mood-option ${selected.mood===m.id?'chosen':''}" data-select-mood="${m.id}" style="--mood-color:${m.color}"><span>${m.emoji}</span><strong>${m.label}</strong></button>`).join('')}</div><label class="field-label" for="mood-note">想记下什么？（选填）</label><textarea id="mood-note" class="mood-note" maxlength="500" placeholder="今天发生了什么？有什么想对自己说的……">${escapeHtml(selected.note || '')}</textarea><div class="mood-editor-bottom"><span class="tiny-label">最多 500 字 · 只保存在这台电脑</span><button class="primary-btn" data-action="save-mood">保存这一天</button></div><div class="divider"></div><div class="card-sub">小提醒：心情没有正确答案；觉得累、烦躁或低落，也都可以被认真对待。</div></section>
    <section class="card calendar-card"><div class="calendar-toolbar"><button class="icon-button" data-action="mood-prev-month" aria-label="上个月">‹</button><strong>${year} 年 ${month+1} 月</strong><button class="icon-button" data-action="mood-next-month" aria-label="下个月">›</button></div><div class="calendar-grid calendar-weekdays">${['一','二','三','四','五','六','日'].map(d=>`<span>${d}</span>`).join('')}</div><div class="calendar-grid">${cells.join('')}</div><div class="calendar-legend"><span>● 有记录</span><span>蓝色边框 = 今天</span></div></section></div>
    <section class="card weekly-card"><div class="card-title">📅 本周心情回顾 <span class="pill">${weekText}</span></div><div class="card-sub">本周已有 ${weekEntries.length} 天记录。回顾只是帮助你观察变化，不是评价好坏。</div>${moodCounts.length ? `<div class="mood-bars">${moodCounts.map(m=>`<div class="mood-bar-row"><span class="mood-bar-emoji">${m.emoji}</span><span class="mood-bar-label">${m.label}</span><div class="mood-bar-track"><span style="width:${m.count/maxCount*100}%;background:${m.color}"></span></div><strong>${m.count} 天</strong></div>`).join('')}</div><div class="weekly-note">${weekEntries.length>=5?'这周你留下了不少记录，记得也给自己留一些不需要完成任务的时间。':'每写下一次记录，就更了解自己一点。可以从今天开始慢慢积累。'}</div>` : '<div class="empty-state">这周还没有心情记录。选择上面的心情，写下一句话就可以开始。</div>'}</section>`
}
function renderRelax() {
  const active = ambienceType !== 'none'
  const names = { rain:'细雨落窗', ocean:'缓缓海浪', forest:'林间微风' }
  return `<div class="section-head"><div><div class="eyebrow">AMBIENT CORNER</div><h1 class="page-heading">白噪音小屋</h1><p class="page-desc">无需下载额外音频。雨声、海浪和森林氛围由本地音频引擎生成，可离线使用。</p></div><span class="pill ${active?'ambience-on':''}">${active?'● 正在播放':'○ 已暂停'}</span></div>
    <section class="card relax-hero theme-${currentTheme}"><div class="relax-scene scene-${ambienceType==='none'?'rain':ambienceType}"><div class="scene-orb"></div><div class="scene-landscape"></div><div class="scene-text"><div class="scene-eyebrow">TAKE A BREATH</div><div class="scene-title">${active ? names[ambienceType] : '给自己几分钟'}</div><div class="scene-desc">${active?'不必赶时间，先听一会儿。':'挑一种声音，让思绪慢慢安静下来。'}</div></div><div class="scene-stars">✦　·　✧　　 ✦　　·</div></div>
      <div class="sound-choice-grid">${[['rain','🌧️','窗边细雨','稳定、细密的雨声'],['ocean','🌊','缓缓海浪','低频起伏的海潮声'],['forest','🌲','林间微风','树叶沙沙与轻柔鸟鸣']].map(([id,emoji,title,desc])=>`<button class="sound-choice ${ambienceType===id?'selected':''}" data-ambience="${id}"><span class="sound-choice-icon">${emoji}</span><span class="sound-choice-copy"><strong>${title}</strong><small>${desc}</small></span><span class="sound-check">${ambienceType===id?'✓':'+'}</span></button>`).join('')}</div>
      <div class="ambience-controls"><div><label for="ambience-volume">环境音音量 <strong id="ambience-volume-value">${ambienceVolume}%</strong></label><input id="ambience-volume" type="range" min="0" max="100" step="5" value="${ambienceVolume}"></div><div class="ambience-buttons"><button class="primary-btn" data-action="${active?'stop-ambience':'start-ambience'}">${active?'Ⅱ 暂停环境音':'▶ 开始播放'}</button><button class="secondary-btn" data-action="fullscreen-relax">⛶ 全屏放松</button></div></div></section>
    <div class="grid relax-tips-grid"><section class="card"><div class="card-title">🫧 放空提示</div><p class="page-desc">让肩膀自然放松，试着慢慢吸气，再缓缓呼气。你不需要立刻解决所有事情。</p></section><section class="card"><div class="card-title">🔒 本地与隐私</div><p class="page-desc">环境音在本机合成，不会向服务器发送声音或记录。全屏模式按 Esc 即可退出。</p></section></div>`
}
function renderSand() {
  return `<div class="section-head"><div><div class="eyebrow">SAND ART STUDIO</div><h1 class="page-heading">沙子绘画</h1><p class="page-desc">按住鼠标在画布上移动，让彩砂落下。画得随意也没关系。</p></div><span class="pill">自由创作 · 无评分</span></div><section class="card sand-card"><div class="sand-toolbar"><div class="sand-colors"><span class="tiny-label">彩砂颜色</span>${[['#f0b45d','金砂'],['#f28c8c','珊瑚'],['#8aabef','海蓝'],['#a8ce9b','苔绿'],['#ba9be8','薰衣草'],['#fff0c2','月光']].map(([color,label],i)=>`<button class="sand-color ${i===0?'active':''}" data-sand-color="${color}" style="--sand-color:${color}" title="${label}" aria-label="${label}"></button>`).join('')}</div><div class="sand-size-wrap"><label for="sand-size">颗粒大小 <strong id="sand-size-value">16</strong></label><input id="sand-size" type="range" min="4" max="34" value="16" step="2"></div><div class="sand-actions"><button class="secondary-btn" data-action="sand-clear">清空画布</button><button class="primary-btn" data-action="sand-save">保存为图片</button></div></div><div class="sand-canvas-wrap"><canvas id="sand-canvas" aria-label="彩砂绘画区域"></canvas><div class="sand-canvas-hint" id="sand-hint">按住鼠标或触摸屏幕，开始绘画</div></div><div class="sand-footer"><span>💡 小技巧：慢慢移动会形成细线，快速移动会留下更松散的沙粒。</span><span>作品仅在本机处理</span></div></section>`
}
function renderInfiniteBubbles() {
  const colors = ['c1','c2','c3','c4']
  const bubbles = Array.from({length:48},(_,i)=>`<button class="infinite-bubble ${colors[i%colors.length]}" data-infinite-pop="${i}" aria-label="捏泡泡 ${i+1}" style="--delay:${Math.random()*1.8}s"><span></span></button>`).join('')
  return `<div class="section-head"><div><div class="eyebrow">NO TIMER · JUST POP</div><h1 class="page-heading">无限捏泡泡</h1><p class="page-desc">这里没有计时器和成绩。点掉一个，它就会重新长出来。</p></div><span class="pill">累计捏爆 ${infinitePopCount} 次</span></div><section class="card infinite-card"><div class="infinite-top"><div><div class="infinite-big-count" id="infinite-count">${infinitePopCount}</div><div class="card-sub">你的累计泡泡次数</div></div><div class="infinite-status">🫧 慢慢来，不必赶</div></div><div class="infinite-grid">${bubbles}</div><div class="infinite-bottom"><span>点一下就好，想停随时停。</span><button class="text-btn" data-action="reset-infinite-count">重置本页计数</button></div></section>`
}
function getAudioContext() {
  if (!audioContext) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext
    if (!AudioCtx) throw new Error('当前系统不支持 Web Audio')
    audioContext = new AudioCtx()
  }
  if (audioContext.state === 'suspended') audioContext.resume().catch(()=>{})
  return audioContext
}
function stopAmbience() {
  ambienceNodes.forEach(node=>{ try { if (typeof node.stop === 'function') node.stop() } catch (_) {} try { node.disconnect() } catch (_) {} })
  ambienceNodes = []
  if (ambientOutput) { try { ambientOutput.disconnect() } catch (_) {} ambientOutput = null }
  ambienceType = 'none'
}
function startAmbience(kind) {
  try {
    stopAmbience()
    const ctx = getAudioContext()
    const buffer = ctx.createBuffer(1, ctx.sampleRate * 3, ctx.sampleRate)
    const channel = buffer.getChannelData(0)
    let last = 0
    for (let i=0;i<channel.length;i++) {
      const white = Math.random()*2-1
      last = kind === 'ocean' ? last * .985 + white * .08 : kind === 'forest' ? last * .72 + white * .28 : white
      channel[i] = last
    }
    const source = ctx.createBufferSource(); source.buffer = buffer; source.loop = true
    const filter = ctx.createBiquadFilter()
    const high = ctx.createBiquadFilter()
    const gain = ctx.createGain()
    if (kind === 'rain') { high.type='highpass'; high.frequency.value=520; filter.type='lowpass'; filter.frequency.value=7600; gain.gain.value=.24 }
    else if (kind === 'ocean') { high.type='highpass'; high.frequency.value=65; filter.type='lowpass'; filter.frequency.value=540; gain.gain.value=.75 }
    else { high.type='highpass'; high.frequency.value=900; filter.type='lowpass'; filter.frequency.value=4800; gain.gain.value=.28 }
    source.connect(high); high.connect(filter); filter.connect(gain); gain.connect(ctx.destination)
    ambientOutput = gain
    ambienceNodes.push(source, high, filter, gain)
    if (kind === 'ocean') {
      const lfo=ctx.createOscillator(), lfoGain=ctx.createGain(); lfo.frequency.value=.08; lfoGain.gain.value=.22
      lfo.connect(lfoGain); lfoGain.connect(gain.gain); lfo.start(); ambienceNodes.push(lfo,lfoGain)
    }
    if (kind === 'forest') {
      const osc=ctx.createOscillator(), birdGain=ctx.createGain(), lfo=ctx.createOscillator(), lfoGain=ctx.createGain()
      osc.type='sine'; osc.frequency.value=1950; birdGain.gain.value=.008; lfo.frequency.value=.17; lfoGain.gain.value=.006
      lfo.connect(lfoGain); lfoGain.connect(birdGain.gain); osc.connect(birdGain); birdGain.connect(gain); osc.start(); lfo.start()
      ambienceNodes.push(osc,birdGain,lfo,lfoGain)
    }
    source.start()
    ambienceType = kind
    updateAmbientVolume()
    render()
  } catch (error) { showToast('环境音启动失败：' + (error.message || '音频不可用')) }
}
function updateAmbientVolume() {
  if (ambientOutput && audioContext) ambientOutput.gain.value = (ambienceType === 'ocean' ? .3 : .22) * Math.max(0,Math.min(100,ambienceVolume))/100
}
function updateTheme(theme) {
  currentTheme = ['lavender','ocean','forest','sunset'].includes(theme) ? theme : 'lavender'
  localStorage.setItem(KEYS.theme,currentTheme)
  document.documentElement.dataset.theme=currentTheme
  render()
}
function fullscreenRelax() {
  const old = document.getElementById('relax-overlay'); if (old) old.remove()
  const overlay = document.createElement('div')
  overlay.id='relax-overlay'; overlay.className=`relax-overlay theme-${currentTheme}`
  overlay.innerHTML=`<div class="fullscreen-noise" aria-hidden="true"></div><div class="fullscreen-moon" aria-hidden="true">${ambienceType==='ocean'?'🌙':ambienceType==='forest'?'🌿':'☁️'}</div><div class="fullscreen-copy"><div class="eyebrow">A QUIET MOMENT</div><h1>${ambienceType==='none'?'给自己一点空白':({rain:'听雨，也听听自己',ocean:'让思绪像海浪一样来去',forest:'在林间慢慢呼吸'})[ambienceType]}</h1><p>你可以暂时什么都不做。吸气，呼气，慢慢来。</p><div class="breath-ring"><span>慢慢呼吸</span></div><div class="fullscreen-audio">${ambienceType==='none'?'环境音已关闭':`正在播放：${({rain:'窗边细雨',ocean:'缓缓海浪',forest:'林间微风'})[ambienceType]}`}</div><div class="fullscreen-buttons"><button class="primary-btn" id="fullscreen-toggle-audio">${ambienceType==='none'?'播放雨声':'切换环境音'}</button><button class="secondary-btn" id="fullscreen-exit">退出全屏 · Esc</button></div></div><div class="fullscreen-footer">解压研究所 · 所有声音均在本机生成</div>`
  document.body.appendChild(overlay)
  const exit=()=>{ try { if(document.fullscreenElement) document.exitFullscreen().catch(()=>{}) } catch(_){} overlay.remove(); document.removeEventListener('keydown',escHandler) }
  const escHandler=(e)=>{ if(e.key==='Escape') exit() }
  overlay.querySelector('#fullscreen-exit').addEventListener('click',exit)
  overlay.querySelector('#fullscreen-toggle-audio').addEventListener('click',()=>{
    const next=ambienceType==='none'?'rain':ambienceType==='rain'?'ocean':ambienceType==='ocean'?'forest':'rain'
    startAmbience(next); overlay.remove(); document.removeEventListener('keydown',escHandler); fullscreenRelax()
  })
  document.addEventListener('keydown',escHandler)
  if (overlay.requestFullscreen) overlay.requestFullscreen().catch(()=>{})
}
function initSandCanvas() {
  sandCanvas=document.getElementById('sand-canvas'); if(!sandCanvas) return
  sandCtx=sandCanvas.getContext('2d'); if(!sandCtx) return
  const rect=sandCanvas.getBoundingClientRect(), dpr=Math.max(1,window.devicePixelRatio||1)
  sandCanvas.width=Math.max(1,Math.floor(rect.width*dpr)); sandCanvas.height=Math.max(1,Math.floor(rect.height*dpr))
  sandCtx.setTransform(dpr,0,0,dpr,0,0)
  sandCtx.fillStyle='#efe2c8'; sandCtx.fillRect(0,0,rect.width,rect.height)
  sandCtx.fillStyle='#e6d4b2'; for(let i=0;i<1600;i++){const x=Math.random()*rect.width,y=Math.random()*rect.height,r=Math.random()*1.4;sandCtx.globalAlpha=.07+Math.random()*.15;sandCtx.beginPath();sandCtx.arc(x,y,r,0,Math.PI*2);sandCtx.fill()}; sandCtx.globalAlpha=1
  sandCanvas.addEventListener('pointerdown', sandPointerDown)
  sandCanvas.addEventListener('pointermove', sandPointerMove)
  window.addEventListener('pointerup', sandPointerUp, { once:false })
}
function sandPointerDown(event) { if(!sandCanvas||!sandCtx)return; sandDrawing=true; sandCanvas.setPointerCapture?.(event.pointerId); sandDraw(event); const hint=document.getElementById('sand-hint'); if(hint)hint.classList.add('hidden') }
function sandPointerMove(event) { if(sandDrawing) sandDraw(event) }
function sandPointerUp() { sandDrawing=false }
function sandDraw(event) {
  const rect=sandCanvas.getBoundingClientRect(), x=event.clientX-rect.left, y=event.clientY-rect.top
  const count=Math.max(10,Math.floor(sandSize*1.7))
  for(let i=0;i<count;i++) {
    const angle=Math.random()*Math.PI*2, dist=Math.random()*sandSize
    const px=x+Math.cos(angle)*dist, py=y+Math.sin(angle)*dist, r=.45+Math.random()*1.8
    sandCtx.globalAlpha=.24+Math.random()*.68; sandCtx.fillStyle=Math.random()<.18?'#fff3d5':sandColor
    sandCtx.beginPath(); sandCtx.arc(px,py,r,0,Math.PI*2); sandCtx.fill()
  }
  sandCtx.globalAlpha=1
}
function clearSand() { if(!sandCanvas)return; const rect=sandCanvas.getBoundingClientRect(); sandCtx.fillStyle='#efe2c8'; sandCtx.fillRect(0,0,rect.width,rect.height); for(let i=0;i<1100;i++){sandCtx.globalAlpha=.07+Math.random()*.15;sandCtx.fillStyle='#e6d4b2';sandCtx.beginPath();sandCtx.arc(Math.random()*rect.width,Math.random()*rect.height,Math.random()*1.3,0,Math.PI*2);sandCtx.fill()};sandCtx.globalAlpha=1;const hint=document.getElementById('sand-hint');if(hint)hint.classList.remove('hidden') }
function saveSandImage() { if(!sandCanvas)return; const a=document.createElement('a');a.download=`解压研究所-沙子绘画-${todayStr()}.png`;a.href=sandCanvas.toDataURL('image/png');a.click();showToast('已导出绘画 PNG 图片') }
function saveMood() {
  const noteEl=document.getElementById('mood-note'); if(noteEl)moodDraft.note=noteEl.value.slice(0,500)
  if(!moodDraft.mood) { showToast('先选一个最接近此刻的心情'); return }
  const all=loadJson(KEYS.moods,{}); all[selectedMoodDate]={mood:moodDraft.mood,note:moodDraft.note,updatedAt:Date.now()}; saveJson(KEYS.moods,all)
  showToast('这一天的心情已保存在本机'); render()
}
function selectMoodDate(key) { selectedMoodDate=key; moodMonth=new Date(Number(key.slice(0,4)),Number(key.slice(5,7))-1,1);loadMoodDraft(key);render() }

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
  whackGame = { state:'playing', score:0, combo:0, best:getStats().whackBestScore || 0, startTime:Date.now(), timeLeft:30, holes:Array.from({length:9},()=>({up:false,hit:false,emoji:'',bonus:false,spawnToken:0})),result:null }
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
function updateWhackVisuals() {
  if (activePage !== 'whack' || whackGame.state !== 'playing') return
  // Update only the game controls. Re-rendering the whole app several times a
  // second recreated .content, causing the page to jump and vertical scrolling
  // to feel broken while targets were appearing.
  const field = root.querySelector('.whack-field')
  if (field) {
    field.querySelectorAll('[data-hole]').forEach(cell => {
      const index = Number(cell.getAttribute('data-hole'))
      const hole = whackGame.holes[index]
      if (!hole) return
      cell.classList.toggle('hit', Boolean(hole.hit))
      cell.classList.toggle('bonus', Boolean(hole.bonus))
      const mole = cell.querySelector('.mole')
      if (mole) {
        mole.classList.toggle('up', Boolean(hole.up))
        mole.textContent = (hole.up || hole.hit) ? hole.emoji : ''
      }
    })
  }
  const scoreEl = document.getElementById('whack-score')
  if (scoreEl) scoreEl.textContent = String(whackGame.score)
  const comboEl = document.getElementById('whack-combo')
  if (comboEl) {
    comboEl.textContent = `🔥 连击 x${whackGame.combo}`
    comboEl.style.display = whackGame.combo >= 3 ? '' : 'none'
  }
}
function spawnWhack() {
  if (whackGame.state !== 'playing') return
  const idle = whackGame.holes.map((h,i)=>({h,i})).filter(x=>!x.h.up)
  if (idle.length) {
    const { h, i } = pick(idle)
    h.spawnToken = (h.spawnToken || 0) + 1
    const spawnToken = h.spawnToken
    h.up = true; h.hit = false; h.bonus = Math.random() < .12
    h.emoji = h.bonus ? '🍀' : pick(['💼','📝','🧾','😤','🦟','💤'])
    updateWhackVisuals()
    const stay = 650 + Math.random() * 400
    whackTimers.push(setTimeout(() => {
      if (whackGame.state !== 'playing') return
      const cur = whackGame.holes[i]
      // Ignore this callback if the old target was hit or this hole has since
      // been reused by a newer target.
      if (cur && cur.spawnToken === spawnToken && cur.up && !cur.hit) {
        cur.up = false
        cur.spawnToken += 1
        whackGame.combo = 0
        updateWhackVisuals()
      }
    }, stay))
  }
  const progress = Math.min(1, (Date.now() - whackGame.startTime) / 30000)
  whackLoopTimer = setTimeout(spawnWhack, 600 - 260 * progress)
}
function hitWhack(id) {
  if (whackGame.state !== 'playing') return
  const hole = whackGame.holes[Number(id)]
  if (!hole || !hole.up || hole.hit) return
  hole.hit = true
  hole.spawnToken = (hole.spawnToken || 0) + 1 // invalidate its hide timeout
  const gain = hole.bonus ? 5 : 1
  whackGame.score += gain; whackGame.combo += 1; hole.up = false
  changeStats(s => { s.whackTotal = (s.whackTotal || 0) + 1 })
  playSound(hole.bonus ? 'egg' : 'whack')
  updateWhackVisuals()
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
  localStorage.removeItem(KEYS.stats); localStorage.removeItem(KEYS.history); localStorage.removeItem(KEYS.achievements); localStorage.removeItem(KEYS.moods); localStorage.removeItem(KEYS.infiniteBubbles); infinitePopCount = 0
  bubbleGame = newBubbleRound(); quitWhack(); fortuneAnimation = 'idle'
  showToast('本机数据已清空'); render()
}

root.addEventListener('click', (event) => {
  const themeBtn=event.target.closest('[data-theme-choice]')
  if(themeBtn){updateTheme(themeBtn.getAttribute('data-theme-choice'));showToast('主题已切换');return}
  const ambienceBtn=event.target.closest('[data-ambience]')
  if(ambienceBtn){startAmbience(ambienceBtn.getAttribute('data-ambience'));return}
  const sandColorBtn=event.target.closest('[data-sand-color]')
  if(sandColorBtn){sandColor=sandColorBtn.getAttribute('data-sand-color');document.querySelectorAll('[data-sand-color]').forEach(b=>b.classList.toggle('active',b===sandColorBtn));return}
  const moodBtn=event.target.closest('[data-select-mood]')
  if(moodBtn){moodDraft.mood=moodBtn.getAttribute('data-select-mood');const n=document.getElementById('mood-note');if(n)moodDraft.note=n.value;render();return}
  const moodDate=event.target.closest('[data-mood-date]')
  if(moodDate){selectMoodDate(moodDate.getAttribute('data-mood-date'));return}
  const inf=event.target.closest('[data-infinite-pop]')
  if(inf){
    infinitePopCount+=1;localStorage.setItem(KEYS.infiniteBubbles,String(infinitePopCount));const count=document.getElementById('infinite-count');if(count)count.textContent=String(infinitePopCount)
    inf.classList.add('popped');inf.querySelector('span').textContent=pick(['✦','✧','💫','']);playSound('pop')
    setTimeout(()=>{if(!inf.isConnected)return;inf.classList.remove('popped');inf.querySelector('span').textContent='';inf.style.setProperty('--delay',`${Math.random()*1.8}s`);inf.classList.remove('c1','c2','c3','c4');inf.classList.add(pick(['c1','c2','c3','c4']))},220)
    const status=document.querySelector('.infinite-status');if(status)status.textContent=pick(['🫧 很好，慢慢来','✨ 一颗一颗地放松','🌿 不必赶时间','💜 给自己一点空间']);return
  }
  const nav = event.target.closest('[data-page]')
  if (nav) {
    const nextPage = nav.getAttribute('data-page')
    if (activePage === 'whack' && nextPage !== 'whack' && whackGame.state === 'playing') quitWhack()
    if (activePage !== nextPage && activePage === 'fortune') { drawingTimers.forEach(clearTimeout); drawingTimers = []; if (fortuneAnimation === 'shaking' || fortuneAnimation === 'falling') fortuneAnimation = 'idle' }
    if (activePage !== nextPage && activePage === 'sand') { sandCanvas=null; sandCtx=null; sandDrawing=false }
    if (activePage === 'mood') { const noteEl=document.getElementById('mood-note');if(noteEl)moodDraft.note=noteEl.value.slice(0,500) }
    activePage = nextPage
    if (activePage === 'bubble' && !bubbleGame) bubbleGame = newBubbleRound()
    if (activePage === 'mood') loadMoodDraft(selectedMoodDate)
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
  else if (action === 'start-ambience') startAmbience(ambienceType==='none'?'rain':ambienceType)
  else if (action === 'stop-ambience') { stopAmbience();render();showToast('环境音已暂停') }
  else if (action === 'fullscreen-relax') fullscreenRelax()
  else if (action === 'sand-clear') clearSand()
  else if (action === 'sand-save') saveSandImage()
  else if (action === 'save-mood') saveMood()
  else if (action === 'mood-prev-month' || action === 'mood-next-month') {
    moodMonth=new Date(moodMonth.getFullYear(),moodMonth.getMonth()+(action==='mood-prev-month'?-1:1),1);selectedMoodDate=dateKey(moodMonth);loadMoodDraft(selectedMoodDate);render()
  }
  else if (action === 'reset-infinite-count') { if(window.confirm('确定重置无限捏泡泡的累计次数吗？')){infinitePopCount=0;localStorage.setItem(KEYS.infiniteBubbles,'0');render()} }
  else if (action === 'reset-data') {
    if (window.confirm('确定清空本机的功德、游戏纪录、求签历史、心情日记和成就吗？此操作无法撤销。')) resetAllData()
  }
})
root.addEventListener('change', (event) => {
  const el=event.target
  if (el && el.id === 'sound-toggle') {
    soundEnabled = el.checked
    localStorage.setItem(KEYS.sound, soundEnabled ? 'true' : 'false')
    showToast(soundEnabled ? '游戏音效已开启' : '游戏音效已关闭')
  }
  if(el && el.id==='sand-size'){sandSize=Number(el.value);const out=document.getElementById('sand-size-value');if(out)out.textContent=String(sandSize)}
  if(el && el.id==='mood-note'){moodDraft.note=el.value.slice(0,500)}
})
root.addEventListener('input',(event)=>{
  const el=event.target
  if(el && el.id==='sound-volume'){
    soundVolume=Number(el.value);localStorage.setItem(KEYS.soundVolume,String(soundVolume));const out=document.getElementById('sound-volume-value');if(out)out.textContent=`${soundVolume}%`
  }
  if(el && el.id==='ambience-volume'){
    ambienceVolume=Number(el.value);localStorage.setItem(KEYS.ambienceVolume,String(ambienceVolume));updateAmbientVolume();const out=document.getElementById('ambience-volume-value');if(out)out.textContent=`${ambienceVolume}%`
  }
  if(el && el.id==='sand-size'){
    sandSize=Number(el.value);const out=document.getElementById('sand-size-value');if(out)out.textContent=String(sandSize)
  }
  if(el && el.id==='mood-note') moodDraft.note=el.value.slice(0,500)
})

window.addEventListener('beforeunload',()=>{ try{stopAmbience()}catch(_){} })

document.documentElement.dataset.theme = currentTheme
loadMoodDraft(selectedMoodDate)
render()
