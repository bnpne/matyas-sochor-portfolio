<script setup lang='ts'>
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const el = ref()

onMounted(() => {
  const children = gsap.utils.toArray(el.value.children, el.value)
  gsap.from(children, {
    width: '0%',
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
