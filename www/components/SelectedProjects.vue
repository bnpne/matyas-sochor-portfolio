<script setup lang='ts'>
defineProps(['projects'])

const store = useStore()
const route = useRoute()
const { activeProject } = storeToRefs(store)

onMounted(() => {
  // console.log(activeProject)
})
</script>

<template>
  <div v-if='projects' class='sidebar-projects pre-anima'>
    <div class='sidebar-projects-heading'>
      <div>Selected Work</div>
      <NuxtLink to='/archive' class='sidebar-projects-heading-work'>
        <span>All Work</span>
        <svg viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M0.75 9.25L4.5 5.5L0.75 1.75L2 0.5L7 5.5L2 10.5L0.75 9.25Z"
            fill="currentColor" />
        </svg>
      </NuxtLink>
    </div>
    <NuxtLink :to="`/work/${project.projectSlug?.current}`" v-for='project, index in projects'
      class="sidebar-projects-card"
      :class="{ active: activeProject == index && $device.isDesktop && route.path === '/' }">
      <div class='sidebar-projects-card-img'>
        <SanityImage :asset-id='project.projectCardImage?.asset?._ref' auto='format' fit='crop' h='300' w='300' />
      </div>
      <div class='sidebar-projects-card-info'>
        <div class="sidebar-projects-card-heading">
          <p class='sidebar-projects-card-title'>{{ project.projectTitle }}</p>
          <div v-if='project.filters' class='sidebar-projects-card-tags'>
            <template v-for='filter, index in project.filters'>
              <div v-if='index === 0' class='sidebar-projects-card-tag'>
                {{ filter.tagTitle }}
              </div>
            </template>
            <div v-if='project.filters.length > 1' class='sidebar-projects-card-tag'>
              +{{ project.filters.length - 1 }}
            </div>
          </div>
        </div>
        <p class='sidebar-projects-card-snippet'>{{ project.projectSnippet }}</p>
      </div>
    </NuxtLink>
  </div>
</template>

<style lang='scss'>
.sidebar-projects {
  @include rounded-border();
  padding: desktop-vw(12px);
  display: flex;
  flex-direction: column;
  gap: desktop-vw(16px);

  @include mobile() {
    gap: mobile-vw(16px);
    padding: mobile-vw(12px);
  }

  &-heading {
    display: flex;
    justify-content: space-between;
    width: 100%;
    @include small-type();

    &-work {
      display: flex;
      gap: desktop-vw(8px);
      color: $black50;
      align-items: center;

      @include mobile() {
        gap: mobile-vw(8px);
      }

      &:hover {
        color: $black75;

        &>svg {
          color: currentColor;
        }
      }

      &>svg {
        opacity: .5;
        height: desktop-vw(11px);
        width: desktop-vw(7px);
      }
    }
  }

  @include desktop() {
    &:hover {
      &>.sidebar-projects-card {
        opacity: .5;
      }
    }
  }

  &-card {
    display: flex;
    cursor: pointer;
    align-items: center;
    width: 100%;
    gap: desktop-vw(12px);
    transition: opacity 400ms ease-out;

    @include mobile() {
      gap: mobile-vw(12px);
    }

    &.router-link-active,
    &.active {
      opacity: .5;
    }

    &:hover {
      opacity: 1 !important;
    }

    &-heading {
      display: flex;
      justify-content: space-between;
      width: 100%;
      align-items: center;
    }

    &-img {
      min-width: desktop-vw(56px);
      width: desktop-vw(56px);
      height: desktop-vw(56px);
      aspect-ratio: 1/1;
      border-radius: desktop-vw(8px);
      overflow: hidden;

      @include mobile() {
        min-width: mobile-vw(56px);
        border-radius: mobile-vw(8px);
        width: mobile-vw(56px);
        height: mobile-vw(56px);
      }

      img {
        @include image-default();
      }
    }

    &-info {
      display: flex;
      flex-direction: column;
      width: 100%;
    }

    &-title {
      @include sans-serif-medium();
      @include small-type();
    }

    &-snippet {
      color: $black50;
      @include sans-serif-regular();
      @include small-type();
    }

    &-tags {
      display: flex;
      gap: desktop-vw(2px);

      @include mobile() {
        gap: mobile-vw(2px);
      }
    }

    &-tag {
      @include tag();
    }
  }
}
</style>
