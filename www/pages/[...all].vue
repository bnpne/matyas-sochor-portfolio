<script setup>
import gsap from 'gsap'

definePageMeta({
  pageTransition: {
    css: false,
    name: 'work',
    mode: 'out-in',
    onEnter(el, done) {
      const app = useNuxtApp()

      gsap.to('.t-o', {
        opacity: 0, duration: .75, delay: .25, ease: 'circ.out',
        onComplete: () => {
          app.$scrollStart()
          done()
        }
      })
    },
    onLeave(el, done) {
      const app = useNuxtApp()
      app.$scrollStop()
      gsap.to('.t-o', { opacity: 1, duration: .75, ease: 'circ.out', onComplete: () => { done() } })
    },
  },
})
</script>

<template>
  <div id='page' class='error'>
    <p> 🙊 Whoops,</p>
    <p>this page doesn't exist.</p>
    <NuxtLink class='error-button' to='/'>
      Back to Homepage
    </NuxtLink>
  </div>
</template>

<style lang='scss'>
.error {
  flex-grow: 1;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - desktop-vw(20px));
  @include sans-serif-regular;
  font-size: desktop-vw(28px);
  line-height: desktop-vw(44px);
  //gap: desktop-vw(20px);

  @include mobile() {
    min-height: calc(100vh - mobile-vw(20px));
    font-size: mobile-vw(28px);
    line-height: mobile-vw(40px);
  }

  &-button {
    @include body-type();
    margin-top: desktop-vw(20px);
    @include button-default-black();
    font-size: desktop-vw(14px);
    line-height: desktop-vw(20px);

    @include mobile() {
      @include body-type();
      padding: mobile-vw(12px) mobile-vw(15px);
      margin-top: mobile-vw(20px);
      font-size: mobile-vw(14px);
      line-height: mobile-vw(20px);
    }
  }
}
</style>
