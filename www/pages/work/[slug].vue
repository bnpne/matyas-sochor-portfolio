<script setup lang='ts'>
const route = useRoute()
const query = groq`*[_type == 'projects' && projectSlug.current == "${route.params.slug}"][0]`
const { data } = useSanityQuery<Project>(query)

useHead({
  title: `${data.value?.projectTitle} | Matyas Sochor`
})

onMounted(() => {
})
</script>

<template>
  <NuxtLayout name='work' class='work'>
    <div v-if='data'>{{ $route.params.slug }}</div>
  </NuxtLayout>
</template>

<style lang='scss'>
.work {
  position: relative;
}
</style>
