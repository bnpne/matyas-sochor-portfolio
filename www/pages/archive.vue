<script setup lang='ts'>
const query = groq`*[_type == 'articles'][0]{..., articleList[]{..., project->{projectSlug, projectType, projectFilters{filter[]->}},'articleType':articleTypeFilters.showFilter[]->}}`
const { data: archive } = useSanityQuery(query)

useHead({
  title: 'Archive | Matyas Sochor'
})

const grid = ref()

onMounted(() => {
})
</script>

<template>
  <NuxtLayout name='archive' class='archive'>
    <div v-if='archive.articleList' ref='grid' class='archive-container'>
      <ArchiveCard v-for='card in archive.articleList' :card='card' />
    </div>
  </NuxtLayout>
</template>

<style lang='scss'>
.archive {
  position: relative;

  &-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: desktop-vw(24px);
    column-gap: desktop-vw(24px);
    grid-gap: 24px;
    padding: desktop-vw(90px) 0 0;
  }
}
</style>
