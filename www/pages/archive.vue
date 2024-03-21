<script setup lang='ts'>
const query = groq`*[_type == 'articles'][0]`
const { data: archive } = useSanityQuery(query)

useHead({
  title: 'Archive | Matyas Sochor'
})

const grid = ref()

onMounted(() => {
  console.log(toRaw(archive.value))
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
    grid-auto-rows: 24px;
    gap: 24px;
    padding: desktop-vw(90px) 0 0;
  }
}
</style>
