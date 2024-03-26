<script setup lang='ts'>
defineProps(['data'])
</script>

<template v-if='data'>
  <section class='section-project-text'>
    <div class='section-project-text-heading'>
      <p class='section-project-text-heading-highlight'>
        {{ data.projectTextHighlight }}
      </p>
      <p class='section-project-text-heading-title'>
        {{ data.projectTextTitle }}
      </p>
    </div>
    <div class='section-project-text-body'>
      <SanityContent :blocks='data.projectTextBody' />
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

    strong {
      color: $black50;
    }
  }
}
</style>
