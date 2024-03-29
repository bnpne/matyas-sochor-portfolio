import Lenis from '@studio-freight/lenis'
import R from '~/utils/R'

export default defineNuxtPlugin(() => {
  const scroll = useScroll()

  const lenis = new Lenis({lerp: 0.1})

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

  const scrollToTop = () => {
    lenis.scrollTo(0)
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
      scrollToTop,
    },
  }
})
