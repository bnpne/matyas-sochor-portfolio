import Lenis from '@studio-freight/lenis'
import R from '~/utils/R'

import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'

export default defineNuxtPlugin(() => {
  gsap.registerPlugin(ScrollTrigger)

  const scroll = useScroll()

  const lenis = new Lenis({lerp: 0.1})

  // @ts-ignore
  // R.add(time => {
  //   lenis.raf(time)
  // }, 0)

  const scrollStop = () => {
    // document.body.style.overflowY = 'hidden'
    lenis.stop()
  }

  const scrollStart = () => {
    // document.body.style.overflowY = ''
    lenis.start()
  }

  const scrollToTop = () => {
    lenis.scrollTo(0, {immediate: true})
  }

  scroll.value.scrollY = window.scrollY

  lenis.on('scroll', (_e: any) => {
    scroll.value.scrollY = window.scrollY
    ScrollTrigger.update()
  })

  gsap.ticker.add(time => {
    lenis.raf(time * 1000)
  })

  gsap.ticker.lagSmoothing(0)

  return {
    provide: {
      lenis,
      scrollStop,
      scrollStart,
      scrollToTop,
    },
  }
})
