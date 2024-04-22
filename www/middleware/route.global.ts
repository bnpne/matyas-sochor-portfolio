import gsap from 'gsap'

export default defineNuxtRouteMiddleware((to, from) => {
  // console.log(to, from)
  let fromSplt = from.path.split('/')
  let toSplt = to.path.split('/')

  // from work, to work
  if (
    (toSplt.includes('work') && fromSplt.includes('work')) ||
    (toSplt.includes('experiments') && fromSplt.includes('experiments'))
  ) {
    from.meta.pageTransition.onLeave = (el, done) => {
      const app = useNuxtApp()
      app.$scrollStop()
      done()
    }
    to.meta.pageTransition.onEnter = (el, done) => {
      const app = useNuxtApp()
      app.$scrollStart()
      done()
    }
  }
  if (
    to.path === '/' ||
    to.path === '/about' ||
    to.path === '/archive' ||
    (toSplt.includes('work') && !fromSplt.includes('work')) ||
    (toSplt.includes('experiments') && !fromSplt.includes('experiments')) ||
    (toSplt.includes('experiments') && fromSplt.includes('work')) ||
    (toSplt.includes('work') && fromSplt.includes('experiments'))
  ) {
    if (to.path !== from.path) {
      from.meta.pageTransition.onLeave = (el, done) => {
        const app = useNuxtApp()
        app.$scrollStop()
        gsap.to('.t-o', {
          opacity: 1,
          duration: 0.75,
          ease: 'circ.out',
          onComplete: () => {
            done()
          },
        })
      }
      to.meta.pageTransition.onEnter = (el, done) => {
        const app = useNuxtApp()
        gsap.to('.t-o', {
          opacity: 0,
          duration: 0.75,
          delay: 0.25,
          ease: 'circ.out',
          onComplete: () => {
            app.$scrollStart()
            done()
          },
        })
      }
    }
  }

  // from work, to different page
  // if (toSplt.includes('work') && !fromSplt.includes('work')) {
  //   from.meta.pageTransition.name = 'work'
  //   to.meta.pageTransition.name = 'work'
  // }
})
