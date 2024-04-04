<script setup lang='ts'>
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const el = ref()

onMounted(() => {
  const children = gsap.utils.toArray('img, video', el.value)
  gsap.from(children, {
    scale: 1.1,
    ease: 'circ.out',
    stagger: .17,
    duration: 1.5,
    scrollTrigger: {
      trigger: el.value,
      start: 'top 95%',
    }
  })
})
</script>

<template>
  <span ref='el'>
    <slot />
  </span>
</template>
