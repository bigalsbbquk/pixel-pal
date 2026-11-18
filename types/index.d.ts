export type Mood = 'idle' | 'think' | 'type' | 'read' | 'search' | 'run' | 'cheer' | 'wave' | 'team' | 'web' | 'magic' | 'ask' | 'paint' | 'pencil' | 'plan' | 'clock' | 'plug' | 'folder' | 'notebook' | 'radar' | 'stop' | 'branch' | 'bell' | 'mail' | 'db' | 'browse' | 'phone' | 'film' | 'music' | 'mic' | 'git' | 'box' | 'flask' | 'heart' | 'wrench' | 'ponder' | 'bow' | 'sweat' | 'sleepy' | 'oops'

declare module 'claude-code' {
  interface PluginState {
    'pixel-pal': { mood: Mood }
  }
}
