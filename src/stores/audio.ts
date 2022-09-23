import fireSound from '@/assets/fire.mp3'
import emptyFireSound from '@/assets/empty-fire.mp3'
import reloadSound from '@/assets/reload-bullet.mp3'
import { Howl } from 'howler'

export const useAudio = () => {
  const soundMap = {
    fire: fireSound,
    empty: emptyFireSound,
    reload: reloadSound,
  }
  const contextMap = Object.fromEntries(
    Object.entries(soundMap).map(([key, url]) => [
      key,
      new Howl({ src: [url] }),
    ]),
  )
  return {
    stop() {
      Object.values(contextMap).forEach((au) => au.stop())
    },
    play(key: keyof typeof soundMap) {
      contextMap[key].play()
    },
  }
}
