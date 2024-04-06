<script setup lang='ts'>
useHead({
  title: 'Matyas Sochor | Digital Graphic Designer'
})

const query = groq`*[_type == 'home']{selectedProjects[]->{...,"filters":projectFilters.filter[]->}}[0].selectedProjects`
const { data } = useSanityQuery<Project>(query)

const app = useNuxtApp()
const store = useStore()
store.addProjects(data)

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
