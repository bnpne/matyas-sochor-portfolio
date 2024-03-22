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
  window.onload = resizeGridItem(article.value)
  window.addEventListener('resize', resizeGridItem(article.value))
})
</script>

<template>
  <div v-if='card' ref='article' class='card' :class='{ project: card.isProject, base: !card.isProject }'>
    <div class='card-heading'>
      <p class='card-type'>{{ card.articleType[0]?.showTagTitle }}</p>
      <div v-if='card.project?.projectFilters?.filter' class='card-tag'>{{
    card.project?.projectFilters?.filter[0].tagTitle }}</div>
    </div>
    <p class='card-title'>{{ card.articleTitle }}</p>
    <div class='card-image'>
      <SanityImage :asset-id='card.articleImage?.asset?._ref' auto='format' />
    </div>
    <p class='card-desc'>{{ card.articleDesc }}</p>
    <div v-if='card.articleLink' class='card-link'>
      <NuxtLink :to='card.articleLink' target='_blank'>{{ card.articleLinkText
        }}</NuxtLink>
    </div>
    <div v-if='card.project?.projectSlug' class='card-link'>
      <NuxtLink v-if='card.project.projectType === "selectedProject"' :to="`/work/${card.project.projectSlug.current}`">
        Show
      </NuxtLink>
      <NuxtLink v-else :to="`/experiements/${card.project.projectSlug.current}`">
        Show
      </NuxtLink>
    </div>
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

  .card-link {
    &>a {
      @include button-default-white();
      min-width: desktop-vw(80px);
      text-align: center;
    }
  }
}

.card {
  padding: desktop-vw(12px);
  position: relative;
  display: flex;
  flex-direction: column;
  gap: desktop-vw(12px);
  height: fit-content;

  &-heading {
    display: flex;
    justify-content: space-between;
  }

  &-type {
    @include small-type();
    color: $black50;
  }

  &-tag {
    @include tag();
  }

  &-title {
    @include sans-serif-regular();
  }

  &-desc {
    @include sans-serif-regular();
    @include small-type();
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
