/*
  Lenis and Gsap config
*/

import Lenis from 'lenis'
import R from '~/utils/R'

import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import {CustomEase} from 'gsap/all'

export default defineNuxtPlugin(() => {
  gsap.registerPlugin(ScrollTrigger, CustomEase)
  CustomEase.create('heart', '.17,.67,.83,.67')
  gsap.config({
    // Stops console warnings for targets missing
    // nullTargetWarn: false,
  })

  const scroll = useScroll()

  const lenis = new Lenis({
    lerp: 0.2,
    gestureOrientation: 'vertical',
    orientation: 'vertical',
    wrapper: window,
    content: document.body,
    eventsTarget: window,
  })

  // console.log(lenis.emitter)

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
    lenis.scrollTo(0, {immediate: true})
  }

  scroll.value.scrollY = window.scrollY

  lenis.on('scroll', (_e: any) => {
    ScrollTrigger.update()
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
