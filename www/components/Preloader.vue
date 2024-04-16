<script setup lang='ts'>
import gsap from 'gsap'

const app = useNuxtApp()
const store = useData()
// const { data } = storeToRefs(store)
let appReady = false
const pre = ref(null)

onMounted(() => {
  const tl = gsap.timeline({
    defaults: { duration: 1.5, ease: 'circ.out' }, paused: true, onComplete: () => {
      app.$scrollStart()
      pre.value.remove()
    }
  })
  app.hook('app:suspense:resolve', () => {
    store.$subscribe((s, m) => {
      if (m.isFetched) {
        tl.to('.pl-overlay', { x: '100%', duration: 3 })
          .from('.pl-text', { y: '100%', opacity: 0, duration: 1, stagger: .15 }, '>-1.7')
          .to('.pl', { y: '-100%', duration: 1.2, ease: 'circ.inOut' })
          .from('.sidebar', { x: '-20%' }, '<')
          .from('.pre-anima', { x: '-50%', stagger: .08 }, '<')
          .from('.pre-project', { y: '20%', stagger: .15 }, '<')
          .from('.pre-image', { scale: 1.2, duration: 1.5, stagger: .08 }, '<')
          .from(['.work-layout-nav', '.page-layout-nav'], { y: '-100%', duration: 1.5, }, '<')

        tl.play()
      }
    })
  })
  app.$scrollStop()
})
</script>

<template>
  <div ref='pre' class='pl'>
    <div class='pl-overlay'></div>
    <div class='pl-text-container'>
      <p class='pl-text'>Matyas Sochor</p>
      <p class='pl-text'>Digital Graphic Designer</p>
    </div>
  </div>
</template>

<style lang='scss'>
.pl {
  display: flex;
  position: absolute;
  height: 100vh;
  width: 100vw;
  background: $black;
  z-index: 9998;
  justify-content: flex-end;
  align-items: center;

  &-overlay {
    display: flex;
    position: absolute;
    height: 100vh;
    width: 100vw;
    background: #000000;
    z-index: 9999;
  }

  &-text {
    &-container {
      flex: 0 1 50%;
      display: flex;
      flex-direction: column;
      gap: desktop-vw(12px);
    }

    &:first-child {
      @include sans-serif-medium();
      color: $white;
      font-size: desktop-vw(32px);
      line-height: desktop-vw(36px);
    }

    &:last-child {
      color: $white50;
      font-size: desktop-vw(32px);
      line-height: desktop-vw(36px);
    }

  }
}
</style>
