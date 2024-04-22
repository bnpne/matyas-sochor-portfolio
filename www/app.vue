<script setup lang='ts'>
useHead({
  title: 'Matyas Sochor | Digital Graphic Designer'
})
useSeoMeta({
  title: 'Matyas Sochor | Digital Graphic Designer',
  ogTitle: 'Matyas Sochor | Digital Graphic Designer',
  description: 'Matyas Sochor | Digital Graphic Designer',
  ogDescription: 'Matyas Sochor | Digital Graphic Designer',
  ogImage: 'https://www.sochor.xyz/og-image.png',
  twitterCard: 'summary_large_image',
})

const app = useNuxtApp()

const store = useData()
// store.$subscribe((state, mutation) => console.log(mutation.isFetched))
// const { data } = storeToRefs(store)
// watch(data, () => {
//   if (data.value) {
//     console.log(toRaw(data.value).home)
//   }
// })

onMounted(() => {
  app.$scrollToTop()
  console.log(
    `
Development by 
Studio Paine c/o Ben Paine
www.studiopaine.com
`
  )
})
</script>

<template>
  <NuxtLayout name='default'>
    <Preloader />
    <TransitionElement />
    <NuxtPage />
  </NuxtLayout>
</template>
