import { atom, read, update } from 'claude-code'
import type { Register } from 'claude-code'

import type { Mood } from '../types'

const mood = atom({ plugin: 'pixel-pal', key: 'mood' } as const, 'idle' as Mood)

const CSS = `
.pal{transform-box:fill-box;transform-origin:50% 100%}
.pal *{transform-box:fill-box;transform-origin:center}
.o{fill:#D97757}.d{fill:#b85c3c}.k{fill:#1d1a17}.w{fill:#f4ecdc}
.prop,.zzz,.q,.spark,.bolt,.hi,.minis,.globe,.wand,.bang,.brush,.pencil,.clip,.clk,.plug{opacity:0}
.eye{animation:blink 4.5s infinite}
.legl,.legr,.arml,.armr,.pal,.eyes{animation-duration:.5s;animation-iteration-count:infinite}
.body{animation:bob 2.4s ease-in-out infinite}
@keyframes bob{50%{transform:translateY(-4px)}}
@keyframes blink{0%,92%,100%{transform:scaleY(1)}95%{transform:scaleY(.1)}}


/* dodge: cursor over the zone -> run left, stay away until the cursor leaves */
.dodge{transition:transform .45s cubic-bezier(.2,.8,.2,1)}
.zone{fill:transparent;pointer-events:all}
.zone:hover~.dodge{transform:translate(-300px,0)}
.zone:hover~.dodge .legl{animation:step .15s infinite}.zone:hover~.dodge .legr{animation:step .15s infinite reverse}

/* idle: a 36s routine - stand, stroll left, nap, stroll back, stretch, hop */
.m-idle .pal{animation:wander 36s ease-in-out infinite}
.m-idle .legl{animation:step .5s infinite}.m-idle .legr{animation:step .5s infinite reverse}
.m-idle .eyes{animation:nap 36s infinite}
.m-idle .zzz{animation:zzz 36s infinite}
.m-idle .arml{animation:stretchL 36s infinite}.m-idle .armr{animation:stretchR 36s infinite}
@keyframes wander{
 0%,8%{transform:translate(0,0) scaleX(1)}
 20%{transform:translate(-260px,0) scaleX(1)}
 21%{transform:translate(-260px,0) scaleX(-1)}
 22%,48%{transform:translate(-260px,0) scaleX(1)}
 60%{transform:translate(0,0) scaleX(1)}
 70%,76%{transform:translate(0,0) scaleX(1)}
 78%{transform:translate(0,-34px)}80%{transform:translate(0,0)}82%{transform:translate(0,-34px)}84%{transform:translate(0,0)}
 100%{transform:translate(0,0)}}
@keyframes step{50%{transform:translateY(-5px)}}
@keyframes nap{0%,24%{transform:scaleY(1)}26%,46%{transform:scaleY(.08)}48%,100%{transform:scaleY(1)}}
@keyframes zzz{0%,25%{opacity:0}28%,44%{opacity:1;transform:translateY(-14px)}46%,100%{opacity:0}}
@keyframes stretchL{0%,62%{transform:rotate(0)}66%,72%{transform:rotate(-150deg)}76%,100%{transform:rotate(0)}}
@keyframes stretchR{0%,62%{transform:rotate(0)}66%,72%{transform:rotate(150deg)}76%,100%{transform:rotate(0)}}

.m-think .q{opacity:1;animation:pulse 1.2s infinite}
.m-think .pal{animation:tilt 2s ease-in-out infinite}
@keyframes pulse{50%{transform:translateY(-8px);opacity:.5}}
@keyframes tilt{50%{transform:rotate(-6deg)}}

.m-type .kb{opacity:1}.m-type .arml{animation:tap .18s infinite}.m-type .armr{animation:tap .18s infinite reverse}
@keyframes tap{50%{transform:translateY(8px)}}

.m-read .book{opacity:1}.m-read .eyes{animation:scan 1.6s infinite}
@keyframes scan{0%,100%{transform:translateX(-6px)}50%{transform:translateX(6px)}}

.m-search .glass{opacity:1;animation:sweep 1.8s ease-in-out infinite}
@keyframes sweep{0%,100%{transform:translate(-34px,0) rotate(-10deg)}50%{transform:translate(34px,-10px) rotate(10deg)}}

.m-run .bolt{opacity:1;animation:flash .3s infinite}.m-run .pal{animation:shake .12s infinite}
@keyframes flash{50%{opacity:.2}}@keyframes shake{50%{transform:translateX(3px)}}

.m-cheer .spark{opacity:1;animation:pop .5s infinite}
.m-cheer .pal{animation:jump .6s ease-out infinite}.m-cheer .arml{transform:rotate(-140deg)}.m-cheer .armr{transform:rotate(140deg)}
@keyframes jump{40%{transform:translateY(-50px)}}@keyframes pop{50%{transform:scale(1.4)}}
.m-wave .hi{opacity:1;animation:pulse 1s infinite}.m-wave .arml{animation:wave .4s infinite}
@keyframes wave{0%,100%{transform:rotate(-125deg)}50%{transform:rotate(-65deg)}}

.m-team .minis{opacity:1;animation:hop .5s infinite alternate}
@keyframes hop{to{transform:translateY(-12px)}}

.m-web .globe{opacity:1}.m-web .globe .spin{animation:spin 2s linear infinite}
@keyframes spin{to{transform:scaleX(.2)}}

.m-magic .wand{opacity:1;animation:flick .5s infinite alternate}.m-magic .spark{opacity:1;animation:pop .5s infinite}
@keyframes flick{from{transform:rotate(-20deg)}to{transform:rotate(25deg)}}

.m-ask .bang{opacity:1;animation:pulse .8s infinite}.m-ask .armr{animation:wave .5s infinite;transform:scaleX(1)}

.m-paint .brush{opacity:1;animation:stroke .6s ease-in-out infinite alternate}
@keyframes stroke{from{transform:translate(-20px,0) rotate(-15deg)}to{transform:translate(20px,-10px) rotate(15deg)}}

.m-pencil .pencil{opacity:1;animation:scribble .15s infinite alternate}
@keyframes scribble{from{transform:translate(-6px,2px)}to{transform:translate(6px,-2px)}}

.m-plan .clip{opacity:1}.m-plan .eyes{animation:scan 2s infinite}

.m-clock .clk{opacity:1}.m-clock .clk .hand{animation:spin2 3s linear infinite;transform-origin:50% 100%}
@keyframes spin2{to{transform:rotate(360deg)}}

.m-plug .plug{opacity:1;animation:zap .4s infinite alternate}
@keyframes zap{from{transform:translateX(-14px)}to{transform:translateX(0)}}

`


// name: [emoji, motion, seconds, extra css for the pal]
const PROPS: Record<string, [string, string, number, string]> = {
  folder: ['📂', 'hop', 0.5, ''],
  notebook: ['📓', 'swing', 0.8, ''],
  radar: ['📡', 'swing', 1.2, ''],
  stop: ['🛑', 'pulse', 0.5, '.m-stop .pal{animation:shake .12s infinite alternate}'],
  branch: ['🌿', 'swing', 1, ''],
  bell: ['🔔', 'swing', 0.25, ''],
  mail: ['✉️', 'fly', 1.2, ''],
  db: ['🗄️', 'hop', 0.6, ''],
  browse: ['🖱️', 'slide', 0.9, ''],
  phone: ['📱', 'swing', 0.7, ''],
  film: ['🎬', 'swing', 0.6, ''],
  music: ['🎵', 'hop', 0.4, '.m-music .pal{animation:tilt 1s ease-in-out infinite}'],
  mic: ['🎤', 'hop', 0.5, ''],
  git: ['🔀', 'spin', 2, ''],
  box: ['📦', 'hop', 0.5, ''],
  flask: ['🧪', 'swing', 0.5, ''],
  heart: ['❤️', 'pulse', 0.5, '.m-heart .pal{animation:jump .8s ease-out infinite}'],
  wrench: ['🔧', 'swing', 0.35, ''],
  ponder: ['🤔', 'pulse', 1.2, '.m-ponder .pal{animation:tilt 2.4s ease-in-out infinite}'],
  bow: ['🙇', 'hop', 1, '.m-bow .pal{animation:bowdown 1.6s ease-in-out infinite}@keyframes bowdown{50%{transform:rotate(28deg)}}'],
  sweat: ['💦', 'hop', 0.7, '.m-sweat .pal{animation:shake .5s infinite alternate}'],
  sleepy: ['😴', 'hop', 1.4, '.m-sleepy .eyes{animation:none;transform:scaleY(.08)}.m-sleepy .pal{animation:tilt 3s ease-in-out infinite}'],
  oops: ['💥', 'pulse', 0.4, '.m-oops .pal{animation:shake .08s infinite alternate}'],
  coffee: ['☕', 'hop', 0.6, ''],
}

const GEN_CSS =
  `@keyframes a-hop{to{transform:translateY(-12px)}}@keyframes a-swing{from{transform:rotate(-20deg)}to{transform:rotate(20deg)}}` +
  `@keyframes a-pulse{50%{transform:scale(1.3)}}@keyframes a-slide{from{transform:translateX(-16px)}to{transform:translateX(8px)}}` +
  `@keyframes a-spin{to{transform:rotate(360deg)}}@keyframes a-fly{from{transform:translate(-30px,20px)}to{transform:translate(20px,-30px)}}` +
  `.pp{opacity:0}` +
  Object.entries(PROPS)
    .map(([n, [, a, d, x]]) => `.m-${n} .p-${n}{opacity:1;animation:a-${a} ${d}s ease-in-out infinite alternate}${x}`)
    .join('') +
  // idle extras on the 36s routine: a whistle early, a coffee late
  `.m-idle .p-whistle{animation:whistle 36s infinite}@keyframes whistle{0%,1%{opacity:0}3%,7%{opacity:1;transform:translateY(-10px)}9%,100%{opacity:0}}` +
  `.m-idle .p-coffee{animation:coffee 36s infinite}@keyframes coffee{0%,85%{opacity:0}87%,97%{opacity:1;transform:translateY(-6px)}99%,100%{opacity:0}}`

const GEN_SVG =
  Object.entries(PROPS)
    .map(([n, [e]]) => `<g class="pp p-${n}"><text x="140" y="75" font-size="38">${e}</text></g>`)
    .join('') + `<g class="pp p-whistle"><text x="130" y="40" font-size="34">♪</text></g>`

const scene = (m: Mood) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="800 190 400 150" preserveAspectRatio="xMaxYMax meet" class="m-${m}">
<style>${CSS}${GEN_CSS}</style>
<rect class="zone" x="1040" y="190" width="160" height="150"/>
<g class="dodge"><g transform="translate(1130 233) scale(0.25)">
 <g class="pal">
  <g class="body">
   <rect class="o" x="0" y="40" width="130" height="90" rx="8"/>
   <rect class="o" x="-14" y="40" width="14" height="40" rx="4"/>
   <rect class="o" x="130" y="40" width="14" height="40" rx="4"/>
   <g class="arml" style="transform-origin:0 50%"><rect class="d" x="-40" y="64" width="40" height="16" rx="5"/></g>
   <g class="armr" style="transform-origin:100% 50%"><rect class="d" x="130" y="64" width="40" height="16" rx="5"/></g>
   <g class="eyes"><g class="eye"><rect class="k" x="32" y="62" width="14" height="26" rx="3"/></g><g class="eye"><rect class="k" x="84" y="62" width="14" height="26" rx="3"/></g></g>
   <g class="legl"><rect class="d" x="22" y="130" width="18" height="30" rx="4"/></g>
   <g class="legr"><rect class="d" x="56" y="130" width="18" height="30" rx="4"/></g>
   <g class="legl"><rect class="d" x="90" y="130" width="18" height="30" rx="4"/></g>
  </g>
  <text class="q" x="60" y="20" font-size="40" font-family="sans-serif" fill="#D97757">?</text>
  <text class="zzz" x="110" y="30" font-size="30" font-family="sans-serif" fill="#D97757">z Z z</text>
  <g class="prop kb"><rect class="k" x="10" y="150" width="110" height="14" rx="3"/></g>
  <g class="prop book"><rect class="w" x="30" y="100" width="70" height="46" rx="3"/><rect class="d" x="64" y="100" width="3" height="46"/></g>
  <g class="prop glass"><circle cx="150" cy="90" r="20" fill="none" stroke="#D97757" stroke-width="6"/><rect class="d" x="162" y="104" width="30" height="8" rx="3" transform="rotate(45 162 104)"/></g>
  <text class="hi" x="40" y="20" font-size="34" font-family="sans-serif" fill="#D97757">hi!</text>
  <g class="minis"><rect class="d" x="-70" y="130" width="26" height="30" rx="4"/><rect class="d" x="180" y="130" width="26" height="30" rx="4"/></g>
  <g class="globe"><g transform="translate(150 80)"><circle r="22" fill="#4a7fa8"/><g class="spin"><ellipse rx="22" ry="22" fill="none" stroke="#f4ecdc" stroke-width="3"/><path d="M-22 0H22M0 -22V22" stroke="#f4ecdc" stroke-width="3"/></g></g></g>
  <g class="wand"><g transform="translate(150 70)"><rect class="k" x="0" y="-4" width="46" height="8" rx="3"/><text x="40" y="-8" font-size="22">★</text></g></g>
  <text class="bang" x="60" y="10" font-size="40" font-family="sans-serif" fill="#D97757">?!</text>
  <g class="brush"><g transform="translate(150 90)"><rect class="k" x="0" y="-3" width="40" height="6" rx="2"/><circle cx="-4" cy="0" r="8" fill="#d33"/></g></g>
  <g class="pencil"><g transform="translate(130 110)"><rect fill="#e8c34a" x="0" y="-3" width="36" height="7" rx="2"/><path d="M0 -3L-8 1L0 4Z" fill="#f4ecdc"/></g></g>
  <g class="clip"><rect class="w" x="34" y="100" width="62" height="52" rx="4"/><path d="M42 114H88M42 126H88M42 138H72" stroke="#1d1a17" stroke-width="3"/></g>
  <g class="clk"><g transform="translate(150 70)"><circle r="22" class="w"/><circle r="22" fill="none" stroke="#1d1a17" stroke-width="3"/><rect class="hand k" x="-1.5" y="-18" width="3" height="18"/></g></g>
  <g class="plug"><g transform="translate(150 100)"><rect class="k" x="0" y="-8" width="22" height="16" rx="3"/><rect class="k" x="22" y="-5" width="10" height="3"/><rect class="k" x="22" y="2" width="10" height="3"/></g></g>
  ${GEN_SVG}
  <text class="bolt" x="-30" y="40" font-size="44">⚡</text><text class="bolt" x="140" y="40" font-size="44">⚡</text>
  <text class="spark" x="-20" y="20" font-size="40">✨</text><text class="spark" x="130" y="10" font-size="40">✨</text>
 </g>
</g>
</g>
</svg>`

const mcpMood = (t: string): Mood =>
  /Browser|chrome|computer/i.test(t) ? 'browse'
  : /Simulator/i.test(t) ? 'phone'
  : /vidiq|d46da524|hyperframes|video/i.test(t) ? 'film'
  : /Sound|Recording|audio|45168f29/i.test(t) ? 'music'
  : /transcript|48e0ab49/i.test(t) ? 'mic'
  : 'plug'

const bashMood = (c: string): Mood =>
  /\bgit\b/.test(c) ? 'git'
  : /\b(npm|pnpm|yarn|pip3?|brew|install)\b/.test(c) ? 'box'
  : /\b(test|pytest|jest|vitest|validate|tsc)\b/.test(c) ? 'flask'
  : 'run'

const moodFor = (e: { tool: string; command?: string }): Mood => {
  const tool = e.tool
  return tool === 'Edit' ? 'pencil'
    : tool === 'Write' ? 'type'
    : tool === 'NotebookEdit' ? 'notebook'
    : tool === 'Read' ? 'read'
    : tool === 'WebFetch' || tool === 'WebSearch' ? 'web'
    : tool === 'Glob' ? 'folder'
    : tool === 'Grep' || tool === 'ToolSearch' ? 'search'
    : tool === 'Bash' ? bashMood(e.command ?? '')
    : tool === 'Monitor' ? 'radar'
    : tool === 'Agent' ? 'team'
    : tool === 'Skill' ? 'magic'
    : tool === 'AskUserQuestion' ? 'ask'
    : tool === 'Artifact' ? 'paint'
    : tool === 'ArtifactData' || tool === 'ArtifactComments' ? 'db'
    : tool === 'EnterPlanMode' || tool === 'ExitPlanMode' ? 'plan'
    : tool === 'TaskStop' || tool === 'CronDelete' ? 'stop'
    : /^(Cron.*|ScheduleWakeup)$/.test(tool) ? 'clock'
    : /Worktree$/.test(tool) ? 'branch'
    : tool === 'PushNotification' ? 'bell'
    : /^(SendMessage|SendToProject.*)$/.test(tool) ? 'mail'
    : tool.startsWith('mcp__') ? mcpMood(tool)
    : 'think'
}

const promptMood = (t: string): Mood =>
  /\b(thanks|thank you|thx|cheers)\b/i.test(t) ? 'heart'
  : /\b(bug|error|broken|fix|fail\w*|crash\w*)\b/i.test(t) ? 'wrench'
  : /\bplease\b/i.test(t) ? 'bow'
  : /\?\s*$/.test(t) ? 'ponder'
  : 'think'

let startedAt = 0

let timer: { cancel: () => void } | undefined

// Show a mood for 5 seconds, then fall back to idle unless a newer action replaced it.
async function setMood($: any, m: Mood) {
  timer?.cancel()
  await update($, mood, () => m)
  timer = $.clock.after(5000, () => {
    void update($, mood, () => 'idle')
  })
}

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    const hour = new Date(await $.clock.now()).getHours()
    await setMood($, hour >= 23 || hour < 5 ? 'sleepy' : 'wave')
    return next(e)
  })

  on('prompt.submit', async ($, e, next) => {
    startedAt = await $.clock.now()
    await setMood($, promptMood((e as { text: string }).text))
    return next(e)
  })

  on('tool.call', async ($, e, next) => {
    await setMood($, moodFor(e as { tool: string; command?: string }))
    return next(e)
  })

  on('turn.complete', async ($, e, next) => {
    const reason = (e as { reason?: string }).reason
    const seconds = (await $.clock.now() - startedAt) / 1000
    await setMood(
      $,
      reason === 'error' || reason === 'refusal' ? 'oops'
        : reason === 'aborted' ? 'stop'
        : seconds > 120 ? 'sweat'
        : 'cheer',
    )
    return next(e)
  })

  // lives in the main window's prompt band, so side panes can't cover it
  on('ui.render', { component: 'AbovePrompt' }, async ($, e, next) => {
    if (e.surface !== 'desktop' && e.surface !== 'mobile') return next(e)
    const { Box, Svg } = $.ui.resolve(e)
    return (
      <Box justifyContent="flex-end">
        <Svg source={scene(await read($, mood))} alt="A little Claude character" width={300} height={112} isInteractive />
      </Box>
    )
  })
}
