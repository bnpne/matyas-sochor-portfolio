<script setup lang='ts'>
const props = defineProps(['card',])

const store = useStore()
const { activeFilters } = storeToRefs(store)
const { isMobile } = useDevice();
const article = ref()
const route = useRoute()
const routeParams = reactive({ params: route.query.filter })
const isActive = ref(true)

const resizeGridItem = (item) => {
  const grid = document.querySelector(".archive-container");
  const rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
  const rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('row-gap'));
  const rowSpan = Math.ceil((item.getBoundingClientRect().height + rowGap) / (rowHeight + rowGap));
  item.style.gridRowEnd = "span " + rowSpan;
}

watch(() => route.query.filter, () => {
  routeParams.params = route.query.filter ? route.query.filter : ''
  if (routeParams.params !== '') {
    let splt = route.query.filter.split(';')

    if (props.card.articleType[0]) {
      let t = props.card.articleType[0]?.showTagTitle
      if (props.card.articleType[0]?.showTagTitle === 'Selected Project') {
        t = 'Project'
      }

      if (splt.includes(t)) {
        isActive.value = true

        // if project, filter more
        if (props.card.project && splt.includes('Projects')) {
          let y = props.card.project !== null || undefined ? props.card.project?.projectFilters?.filter[0].tagTitle : null

          let tempF = activeFilters.value.filter(f => {
            if (f.type === 'project') {
              return f
            }
          })
          console.log(tempF)
          let tempS = tempF.map(p => {
            return p.el.children[0].innerHTML
          })
          if (tempS.length > 0) {
            if (tempS.includes(y)) {
              isActive.value = true
            } else {
              isActive.value = false
            }
          } else {
            isActive.value = true
          }
        }
      } else {
        isActive.value = false
      }
    }

    // if project
  } else {
    isActive.value = true
  }
})

onMounted(() => {
  if (!isMobile) {
    // await nextTick(() => {
    //   const grid = document.querySelector(".archive-container");
    //   if (grid) {
    //     // window.addEventListener('DOMContentLoaded', resizeGridItem(article.value))
    //     resizeGridItem(article.value)
    //   }
    // })
    window.addEventListener('DOMContentLoaded', resizeGridItem(article.value))
    window.addEventListener('resize', resizeGridItem(article.value))
  }
})
</script>

<template>
  <div v-if='card' ref='article' class='card' :class='{
    project: card.isProject, base: !card.isProject, active:
      isActive
  }'>
    <div class='card-heading'>
      <p class='card-type'>{{ card.articleType[0]?.showTagTitle }}</p>
      <div v-if='card.project?.projectFilters?.filter' class='card-tag'>{{
    card.project?.projectFilters?.filter[0].tagTitle }}</div>
    </div>
    <p class='card-title'>{{ card.articleTitle }}</p>
    <div class='card-image'>
      <SanityImage :asset-id='card.articleImage?.asset?._ref' auto='format' w='1000' fit='clip' />
    </div>
    <p class='card-desc'>{{ card.articleDesc }}</p>
    <template v-if='card.articleLink'>
      <div class='card-link'>
        <NuxtLink :to='card.articleLink' target='_blank'>{{ card.articleLinkText
          }}</NuxtLink>
      </div>
    </template>
    <template v-if='card.project?.projectSlug && !card.articleLink'>
      <div class='card-link'>
        <NuxtLink v-if='card.project.projectType === "selectedProject"'
          :to="`/work/${card.project.projectSlug.current}`">
          Show
        </NuxtLink>
        <NuxtLink v-else :to="`/experiments/${card.project.projectSlug.current}`">
          Show
        </NuxtLink>
      </div>
    </template>
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
  padding: desktop-vw(16px);
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
