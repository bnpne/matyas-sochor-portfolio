import Lenis from '@studio-freight/lenis'
import R from '~/utils/R'

export default defineNuxtPlugin(() => {
  const scroll = useScroll()

  const lenis = new Lenis()

  // @ts-ignore
  R.add(time => {
    lenis.raf(time)
  }, 0)

  const scrollStop = () => {
    // document.body.style.overflowY = 'hidden'
    lenis.stop()
  }

  const scrollStart = () => {
    // document.body.style.overflowY = ''
    lenis.start()
  }

  scroll.value.scrollY = window.scrollY

  lenis.on('scroll', (_e: any) => {
    scroll.value.scrollY = window.scrollY
  })

  return {
    provide: {
      lenis,
      scrollStop,
      scrollStart,
    },
  }
})
