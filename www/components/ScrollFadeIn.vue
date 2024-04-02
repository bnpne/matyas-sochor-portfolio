<script setup lang='ts'>
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const el = ref()

onMounted(() => {
  ScrollTrigger.refresh()
  const children = gsap.utils.toArray(el.value.children)
  gsap.from(children, {
    opacity: 0,
    y: '80%',
    duration: 1,
    ease: 'circ.out',
    stagger: .17,
    scrollTrigger: {
      trigger: el.value,
      start: 'top 90%'
    }
  })
})
</script>

<template>
  <span ref='el'>
    <slot />
  </span>
</template>
