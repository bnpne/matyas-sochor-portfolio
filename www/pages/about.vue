<script setup lang='ts'>
const query = groq`*[_type == 'about'][0]`
const { data: about } = useSanityQuery(query)

useHead({
  title: 'About | Matyas Sochor'
})

onMounted(() => {
})
</script>

<template>
  <NuxtLayout v-if='about' name='work' class='about'>
    <div class='about-container'>
      <div class='about-container-flex'>
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
            <EducationItem v-if='about.resume.eductionList' :data='about.resume.eductionList' />
            <ExperienceItem v-if='about.resume.experienceList' :data='about.resume.experienceList' />
            <RecognitionItem v-if='about.resume.recognitionList' :data='about.resume.recognitionList' />
            <SoftwareItem v-if='about.resume.softwareList' :data='about.resume.softwareList' />
            <SelectedProjectsItem v-if='about.resume.selectedAndCollaborations'
              :data='about.resume.selectedAndCollaborations' />
          </div>
        </div>
      </div>
      <div class='about-footer'>
        <div v-if='about.footerImage' class='about-footer-image'>
          <div class='about-footer-image-overlay'></div>
          <SanityImage :asset-id='about.footerImage?.asset?._ref' format='auto' />
          <div class='about-footer-image-text'>
            <p>Let's create something extraordinary together.</p>
            <NuxtLink class='about-footer-image-text-button' to='mailto:matyas@sochor.xyz' target='_blank'>Let's Chat
            </NuxtLink>
          </div>
        </div>
        <div class='about-footer-links'>
          <div class='about-footer-link'>
            <NuxtLink to='mailto:matyas@sochor.xyz'>matyas@sochor.xyz</NuxtLink>
          </div>
          <div class='about-footer-linkList'>
            <NuxtLink to='mailto:matyas@sochor.xyz'>matyas@sochor.xyz</NuxtLink>
          </div>
          <div class='about-footer-copyright'>
            <p>©Matyas Sochor 2024</p>
          </div>
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
    flex-direction: column;
    gap: desktop-vw(40px);

    &-flex {
      position: relative;
      display: flex;
      gap: desktop-vw(24px);
      position: relative;
    }
  }

  &-avatar {
    padding: desktop-vw(14px) 0;
    max-width: desktop-vw(300px);
    flex: 0 0 desktop-vw(300px);
    position: sticky;
    bottom: desktop-vw(100px);

    &-list {
      color: $black50;
      // position: sticky;
      // top: desktop-vw(24px);
    }

    &-image {
      position: sticky;
      top: 50%;
      transform: translateY(desktop-vw(-100px));
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
      margin-bottom: desktop-vw(40px);
    }
  }

  &-footer {
    display: flex;
    flex-direction: column;
    gap: desktop-vw(24px);
    margin-right: desktop-vw(14px);

    &-image {
      position: relative;
      @include rounded();
      overflow: hidden;
      min-height: 100vh;

      &>img {
        @include image-default();
        object-fit: cover;
        min-height: 100vh;
      }

      &-overlay {
        position: absolute;
        height: 100%;
        width: 100%;
        background: linear-gradient(180deg, rgba(0, 0, 0, 0.3) 16.69%, rgba(0, 0, 0, 0) 50.43%, rgba(0, 0, 0, 0) 77.51%, rgba(0, 0, 0, 0.44) 99.58%),
          linear-gradient(180deg, rgba(0, 0, 0, 0.3) 16.69%, rgba(0, 0, 0, 0) 50.43%, rgba(0, 0, 0, 0) 77.51%, rgba(0, 0, 0, 0.44) 99.58%);
      }

      &-text {
        position: absolute;
        bottom: desktop-vw(34px);
        left: desktop-vw(24px);
        max-width: desktop-vw(400px);
        display: flex;
        flex-direction: column;
        gap: desktop-vw(20px);

        &>p {
          @include medium-type();
          color: $white;
        }

        &>a {
          display: inline-block;
          @include button-default-white();
          width: fit-content;
          padding: desktop-vw(11px) desktop-vw(20px);
        }
      }
    }

    &-links {
      display: flex;
      justify-content: space-between;
      margin-bottom: desktop-vw(40px);

      &-link,
      &-copyright {
        min-width: desktop-vw(180px);

      }

      &-copyright {
        display: flex;
        justify-content: flex-end;
        color: $black50;
      }
    }
  }
}
</style>
