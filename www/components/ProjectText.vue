<script setup lang='ts'>
defineProps(['data'])
</script>

<template v-if='data'>
  <section class='section-project-text'>
    <div class='section-project-text-heading'>
      <span class='anima-fade'>
        <p class='section-project-text-heading-highlight'>
          {{ data.projectTextHighlight }}
        </p>
      </span>
      <span class='anima-fade'>
        <p class='section-project-text-heading-title'>
          {{ data.projectTextTitle }}
        </p>
      </span>
    </div>
    <div class='section-project-text-body'>
      <span class='anima-fade'>
        <SanityContent :blocks='data.projectTextBody' />
      </span>
    </div>
  </section>
</template>

<style lang='scss'>
.section-project-text {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  margin-top: desktop-vw(30px);
  margin-bottom: desktop-vw(165px);

  @include mobile() {
    padding: 0 mobile-vw(14px);
    margin-top: mobile-vw(30px);
    margin-bottom: mobile-vw(58px);
    flex-direction: column;
    justify-content: flex-start;
    gap: mobile-vw(32px);
  }

  &-heading {
    @include small-type();

    &-highlight {
      color: $black50;
    }
  }

  &-body {
    @include medium-type();
    max-width: desktop-vw(655px);
    margin-right: desktop-vw(14px);

    @include mobile() {
      max-width: 100%;
      margin-right: 0;
    }

    strong {
      color: $black50;
    }
  }
}
</style>
