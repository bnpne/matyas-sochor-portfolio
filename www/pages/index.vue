<script setup lang='ts'>
const query = groq`*[_type=="home"]`
const { data, refresh } = useSanityQuery(query)
</script>

<template>
  <div>
    <NuxtLayout>
      <div>Home</div>
    </NuxtLayout>
  </div>
</template>
