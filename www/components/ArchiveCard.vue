<script setup lang='ts'>
const props = defineProps(['card'])

const store = useStore()
const { activeFilters, activeProjectFilters } = storeToRefs(store)
const { isMobile } = useDevice();

const article = ref()
const active = reactive({ isActive: true })

const resizeGridItem = (item) => {
  const grid = document.querySelector(".archive-container");
  const rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
  const rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('row-gap'));
  const rowSpan = Math.ceil((item.getBoundingClientRect().height + rowGap) / (rowHeight + rowGap));
  item.style.gridRowEnd = "span " + rowSpan;
}


watch(activeFilters.value, () => {
  if (activeFilters.value.length === 0) {
    active.isActive = true
  } else {
    let trigger = false
    console.log(toRaw(activeFilters.value))
    activeFilters.value.forEach(f => {
      if (f.type === 'show') {
        let html = f.el.children[0].innerHTML
        let t = props.card.articleType[0]?.showTagTitle
        if (props.card.articleType[0]?.showTagTitle === 'Selected Project') t = 'Project'

        if (t === html) {
          trigger = true
        }
      }
      else if (f.type === 'project' || f.type === 'experiement') {
        let html = f.el.children[0].innerHTML
        let t = props.card.project !== null || undefined ? props.card.project?.projectFilters?.filter : null

        if (t !== null) {
          t.forEach(p => {
            if (p.tagTitle === html) {
              trigger = true
            }
          })
        } else {
          trigger = false
        }
      }
    })

    if (trigger === true) {
      active.isActive = true
    } else {
      active.isActive = false
    }
  }
})

onMounted(() => {
  if (!isMobile) {
    window.onload = resizeGridItem(article.value)
    window.addEventListener('resize', resizeGridItem(article.value))
  }
})
</script>

<template>
  <div v-if='card' ref='article' class='card'
    :class='{ project: card.isProject, base: !card.isProject, active: active.isActive }'>
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

      @include mobile() {
        min-width: mobile-vw(80px);
      }
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
  display: none;

  @include mobile() {
    gap: mobile-vw(12px);
    padding: mobile-vw(12px);
  }

  &.active {
    display: flex;
  }

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

    @include mobile() {
      font-size: mobile-vw(15px);
      line-height: mobile-vw(20px);
    }
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
