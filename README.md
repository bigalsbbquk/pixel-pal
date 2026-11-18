# pixel-pal

A small animated character that lives on the main screen of the Claude desktop app, bottom-right, behind the conversation. Instead of sitting still it blinks, strolls, naps, stretches, hops and sips coffee while idle, and reacts to what Claude is doing.

It has 40 actions. Each plays for 5 seconds, then it goes back to idle unless something new happens.

## What triggers what

| Trigger | Actions |
| --- | --- |
| Writing and editing | typing (Write), pencil (Edit), notebook (NotebookEdit) |
| Reading and searching | book (Read), magnifier (Grep, ToolSearch), folder (Glob), globe (web search/fetch) |
| Shell | running (Bash), git, package install, tests and validation |
| Agents and skills | helper minions (Agent), wand (Skill), question (AskUserQuestion), painting (Artifact), plan mode, clock (cron/wakeups), radar (Monitor), worktree, bell, mail, artifact data |
| Connector tools | browser, iOS simulator, video, audio, transcription, plug (any other MCP tool) |
| Your prompt | heart ("thanks"), wrench ("bug", "fix", "error"), bow ("please"), pondering (ends with "?"), thinking (anything else) |
| Turn result | cheer (done), sweat (over 2 minutes), oops (error or refusal), stop (interrupted) |
| Session start | wave, or sleepy between 11pm and 5am |

## Install

In a terminal Claude Code session:

```
/plugin install pixel-pal --marketplace bigalsbbquk/pixel-pal
```

Answer `y` to add the marketplace, then pick a scope. The character is drawn by the desktop app only; terminals and editors draw nothing.

## Tweaking

Everything is in `hooks/register.tsx`. The size and position are the `translate(... ) scale(...)` on the main character group; the 5-second hold is the `after(5000, ...)` timer.

## License

MIT
