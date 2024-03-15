<script setup lang='ts'>
const query = groq`*[_type == 'home']{selectedProjects[]->{...,"filters":projectFilters.filter[]->}}[0].selectedProjects`
const { data } = useSanityQuery<Project>(query)

const projects = ref([])

const store = useStore()

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          store.setActiveProject(entry.target.dataset.index)
        }
      });
    },
    {
      threshold: 0.5,
    }
  );

  if (projects) {
    projects.value.forEach(p => {
      observer.observe(p)
    })
  }
})
</script>

<template>
  <NuxtLayout name='page' class='home'>
    <div v-if='data' class='home-container'>
      <NuxtLink :to="`/work/${project.projectSlug?.current}`" v-for="project, index in data" class='home-project'>
        <div ref='projects' class='home-project-img' :data-index='index'>
          <div class='home-project-img-overlay'></div>
          <SanityImage :asset-id="project.projectCaseImage?.asset?._ref" auto="format" />
        </div>
        <div v-if='project.projectDetails' class='home-project-details'>
          <div class='home-project-details-info'>
            <p v-if='project.filters' v-for='filter in project.filters'>{{ filter.tagTitle }},</p>
            <p v-if='project.projectDetails?.projectYear'>{{ project.projectDetails?.projectYear.split('-')[0] }},</p>
            <p v-if='project.projectDetails?.awards'>{{ project.projectDetails?.awards.length }} Awards</p>
            <p v-else>{{ project.projectDetails?.agencies[0] }} +{{ project.projectDetails?.agencies.length - 1 }}</p>
          </div>
          <div class='home-project-details-snippet'>
            <p v-if='project.projectSnippet' class='home-project-details-snippet-text'>{{ project.projectSnippet }}</p>
          </div>
        </div>
      </NuxtLink>
    </div>
  </NuxtLayout>
</template>

<style lang='scss'>
.home {
  position: relative;

  &-container {
    display: flex;
    flex-direction: column;
    gap: desktop-vw(10px);
  }

  &-project {
    position: relative;
    min-height: desktop-vw(866px);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    @include rounded-border();

    &-img {
      display: block;
      height: 100%;
      width: 100%;
      flex-grow: 1;
      display: flex;
      flex-direction: column;

      &-overlay {
        position: absolute;
        height: 100%;
        width: 100%;
        background: linear-gradient(180deg, rgba(0, 0, 0, 0.3) 16.69%, rgba(0, 0, 0, 0) 50.43%, rgba(0, 0, 0, 0) 77.51%, rgba(0, 0, 0, 0.44) 99.58%),
          linear-gradient(180deg, rgba(0, 0, 0, 0.3) 16.69%, rgba(0, 0, 0, 0) 50.43%, rgba(0, 0, 0, 0) 77.51%, rgba(0, 0, 0, 0.44) 99.58%);
      }

      img {
        flex-grow: 1;
        @include image-default();
      }
    }

    &-details {
      @include small-type();
      color: $white;
      text-transform: uppercase;
      position: absolute;
      bottom: desktop-vw(14px);
      right: desktop-vw(14px);
      display: flex;
      align-items: center;
      gap: desktop-vw(16px);

      &-info {
        display: flex;
        flex-direction: row;
        gap: desktop-vw(4px);
      }

      &-snippet {
        padding: desktop-vw(2px) desktop-vw(4px);
        border: $white 1px solid;
        border-radius: 100px;
        max-width: desktop-vw(245px);
        overflow: hidden;

        &-text {
          white-space: nowrap;
        }
      }
    }

  }
}
</style>
