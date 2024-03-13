<script setup lang='ts'>
defineProps(['projects'])
</script>

<template>
  <div v-if='projects' class='sidebar-projects'>
    <div class='sidebar-projects-heading'>
      <div>Selected Work</div>
      <NuxtLink to='/work' class='sidebar-projects-heading-work'>
        <span>All Work</span>
        <svg width="7" height="11" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M0.75 9.25L4.5 5.5L0.75 1.75L2 0.5L7 5.5L2 10.5L0.75 9.25Z"
            fill="#1E1E1E" fill-opacity="0.25" />
        </svg>
      </NuxtLink>

    </div>
  </div>
</template>

<style lang='scss'>
.sidebar-projects {
  @include rounded-border();
  padding: desktop-vw(12px);
  display: flex;
  flex-direction: column;
  gap: desktop-vw(16px);

  &-heading {
    display: flex;
    justify-content: space-between;
    width: 100%;

    &-work {
      display: flex;
      gap: desktop-vw(8px);
      color: rgba(30, 30, 30, .5);
      align-items: center;
    }
  }
}
</style>
