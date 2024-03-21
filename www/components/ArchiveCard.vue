<script setup lang='ts'>
defineProps(['card'])

const article = ref()

const resizeGridItem = (item) => {
  const grid = document.querySelector(".archive-container");
  const rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
  const rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('row-gap'));
  const rowSpan = Math.ceil((item.getBoundingClientRect().height + rowGap) / (rowHeight + rowGap));
  item.style.gridRowEnd = "span " + rowSpan;
}

onMounted(() => {
  console.log(article.value)
  resizeGridItem(article.value)
})
</script>

<template>
  <div v-if='card' ref='article' class='card' :class='{ project: card.isProject, base: !card.isProject }'>
    <p class='card-type'>{{ card.articleType }}</p>
    <p class='card-title'>{{ card.articleTitle }}</p>
    <div class='card-image'>
      <SanityImage :asset-id='card.articleImage?.asset?._ref' auto='format' />
    </div>
    <p class='card-desc'>{{ card.articleDesc }}</p>
  </div>
</template>

<style lang='scss'>
.base {
  @include rounded-border();
  background: $white;
  color: $black;
}

.project {
  @include rounded();
  background: $black;
  color: $white;

  .card-type {
    color: $white50;
  }

  .card-image {

    aspect-ratio: 388/408;
  }
}

.card {
  padding: desktop-vw(12px);
  position: relative;
  display: flex;
  flex-direction: column;
  gap: desktop-vw(12px);
  height: fit-content;

  &-type {
    @include small-type();
    color: $black50;
  }

  &-title {
    @include sans-serif-regular();
  }

  &-desc {
    @include small-type();
    @include sans-serif-regular();
  }

  &-link {
    @include small-type();
    color: $black50;
  }

  &-image {
    overflow: hidden;
    @include rounded();
    aspect-ratio: 16/9;

    &>img {
      @include image-default();
    }
  }
}
</style>
