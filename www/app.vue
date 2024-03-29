<script setup lang='ts'>
useHead({
  title: 'Matyas Sochor | Digital Graphic Designer'
})

const query = groq`*[_type == 'home']{selectedProjects[]->{...,"filters":projectFilters.filter[]->}}[0].selectedProjects`
const { data } = useSanityQuery<Project>(query)

const store = useStore()
store.addProjects(data)
</script>

<template>
  <NuxtLayout name='default'>
    <NuxtPage />
  </NuxtLayout>
</template>
