<script setup lang='ts'>
const query = groq`*[_type == 'about'][0]`
const { data: about } = useSanityQuery(query)

useHead({
  title: 'About | Matyas Sochor'
})

onMounted(() => {
  console.log(toRaw(about.value))
})
</script>

<template>
  <NuxtLayout v-if='about' name='work' class='about'>
    <div class='about-container'>
      <div class='about-avatar'>
        <ul class='about-avatar-list'>
          <li>Website</li>
          <li>Identity</li>
          <li>Branding</li>
          <li>Motion</li>
          <li>Print</li>
        </ul>
        <div v-if='about.bioImage' class='about-avatar-image'>
          <SanityImage :asset-id='about.bioImage.asset?._ref' auto='format' />
        </div>
      </div>
      <div class='about-info'>
        <div v-if='about.bio' class='about-info-bio'>
          <SanityContent :blocks='about.bio' />
        </div>
        <ImageCarousel v-if='about.imageCarousel' containerClass='about-info-carousel'
          slideClass='about-info-carousel-image' :images='about.imageCarousel' />
        <div v-if='about.resume' class='about-info-resume'>
          <EducationItem v-if='about.resume.educationList' :data='about.resume.educationList' />
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<style lang='scss'>
.about {
  position: relative;
  @include small-type();

  &-container {
    display: flex;
    gap: desktop-vw(24px);
    position: relative;
  }

  &-avatar {
    padding: desktop-vw(14px) 0;
    max-width: desktop-vw(300px);
    flex: 0 0 desktop-vw(300px);
    position: sticky;
    top: desktop-vw(14px);

    &-list {
      color: $black50;
    }

    &-image {
      position: relative;
      top: 50%;
      transform: translateY(-50%);
      @include rounded();
      overflow: hidden;

      &>img {
        @include image-default();
      }
    }
  }

  &-info {
    width: 100%;
    flex: 0 0 1;
    display: flex;
    flex-direction: column;
    gap: desktop-vw(40px);

    &-bio {
      @include medium-type();
      font-size: desktop-vw(20px);
      line-height: desktop-vw(34px);
      max-width: desktop-vw(725px);
      margin-bottom: desktop-vw(120px);

      strong {
        font-weight: 500;
      }
    }

    &-carousel {
      width: 100%;
      display: flex;
      gap: desktop-vw(10px);

      &-image {
        @include rounded();
        overflow: hidden;
        width: auto;
        display: inline-block;
        max-width: desktop-vw(848px);

        &>img {
          @include image-default();
          // object-fit: contain;
          max-height: desktop-vw(560px);
        }
      }
    }

    &-resume {
      @include small-type();
      max-width: desktop-vw(640px);
      display: flex;
      flex-direction: column;
      gap: desktop-vw(32px);

    }
  }
}
</style>
