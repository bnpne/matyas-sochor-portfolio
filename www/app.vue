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
  console.log(
    `
Development by 
Studio Paine c/o Ben Paine
www.studiopaine.com
`
  )
  app.$lenis.scrollTo(0)
})
</script>

<template>
  <NuxtLayout name='default'>
    <Preloader />
    <NuxtPage />
  </NuxtLayout>
</template>
