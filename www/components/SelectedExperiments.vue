<script setup lang='ts'>
defineProps(['experiments'])


const store = useStore()
const { activeProject } = storeToRefs(store)
</script>

<template>
  <div v-if='experiments' class='sidebar-experiments'>
    <div class='sidebar-experiments-heading'>
      <div>Selected Experiments</div>
      <NuxtLink to='/archive' class='sidebar-experiments-heading-work'>
        <span>All Experiments</span>
        <svg width="7" height="11" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M0.75 9.25L4.5 5.5L0.75 1.75L2 0.5L7 5.5L2 10.5L0.75 9.25Z"
            fill="#1E1E1E" fill-opacity="0.25" />
        </svg>
      </NuxtLink>
    </div>
    <NuxtLink :to="`/experiments/${experiment.projectSlug?.current}`" v-for='experiment, index in experiments'
      class='sidebar-experiments-card' :class="{ active: activeProject == index && $device.isDesktop }">
      <div class='sidebar-experiments-card-img'>
        <SanityImage :asset-id='experiment.projectCardImage?.asset?._ref' auto='format' fit='crop' h='56' w='56' />
      </div>
      <div class='sidebar-experiments-card-info'>
        <div class="sidebar-experiments-card-heading">
          <p class='sidebar-experiments-card-title'>{{ experiment.projectTitle }}</p>
          <div v-if='experiment.filters' class='sidebar-experiments-card-tags'>
            <template v-for='filter, index in experiment.filters'>
              <div v-if='index === 0' class='sidebar-experiments-card-tag'>
                {{ filter.tagTitle }}
              </div>
            </template>
            <div v-if='experiment.filters.length > 1' class='sidebar-experiments-card-tag'>
              +{{ experiment.filters.length - 1 }}
            </div>
          </div>
        </div>
        <p class='sidebar-experiments-card-snippet'>{{ experiment.projectSnippet }}</p>
      </div>
    </NuxtLink>
  </div>
</template>

<style lang='scss'>
.sidebar-experiments {
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
      aspect-ratio: 1/1;
      border-radius: desktop-vw(8px);
      overflow: hidden;

      @include mobile() {
        min-width: mobile-vw(56px);
        border-radius: mobile-vw(8px);
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
