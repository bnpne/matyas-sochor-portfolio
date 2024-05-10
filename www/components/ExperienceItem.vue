<script setup lang='ts'>
defineProps(['data'])
const { isMobile } = useDevice()
</script>

<template>
  <div v-if='data' class='experience-list-section'>
    <div class='experience-list-section-header'>
      <ScrollFadeIn>
        <p>Experience</p>
      </ScrollFadeIn>
      <ScrollDivider>
        <div class='experience-list-section-header-divider'></div>
      </ScrollDivider>
    </div>
    <div class='experience-list-section-info'>
      <ScrollFadeIn>
        <div v-for='info in data' class='experience-list-section-info-line'>
          <p v-if='!info.jobLink'>{{ info.job }}</p>
          <NuxtLink v-else :to='info.jobLink' target='_blank'>{{ info.job }}</NuxtLink>
          <div class='experience-list-section-info-line-right'>
            <p v-if='!isMobile'>{{ info.jobRole }}</p>
            <p v-if='!isMobile'>{{ info.jobLocation }}</p>
            <div class='experience-list-section-info-line-right-current'>
              <p>{{ info.jobStartDate.split('-')[0] }}</p>
              <p v-if='!info.currentJob'> &nbsp;- {{ info.jobEndDate.split('-')[0] }}</p>
              <p v-else>&nbsp;- Current</p>
            </div>
          </div>
        </div>
      </ScrollFadeIn>
    </div>
  </div>
</template>

<style lang='scss'>
.experience-list-section {
  @include small-type();
  display: flex;
  flex-direction: column;
  gap: desktop-vw(12px);

  @include mobile() {
    gap: mobile-vw(12px);
    padding: 0 mobile-vw(14px);
  }

  &-header {
    display: flex;
    flex-direction: column;
    gap: desktop-vw(12px);
    color: $black50;

    @include mobile() {
      gap: mobile-vw(12px);
    }

    &-divider {
      border: .5px solid $black10;
    }
  }

  &-info {
    display: flex;
    flex-direction: column;
    gap: desktop-vw(8px);

    @include mobile() {
      gap: mobile-vw(8px);
    }

    &-line {
      display: flex;
      align-content: center;
      justify-content: space-between;

      &>a {
        transition: color 300ms ease-out;

        &:hover {
          color: $black50;
        }
      }

      &-right {
        color: $black50;
        display: flex;
        gap: desktop-vw(40px);

        @include mobile() {
          gap: mobile-vw(40px);
        }

        &-current {
          display: flex;
          min-width: desktop-vw(100px);
          justify-content: flex-end;

          @include mobile() {
            min-width: mobile-vw(100px);
            justify-content: flex-end;
          }
        }
      }
    }
  }
}
</style>
