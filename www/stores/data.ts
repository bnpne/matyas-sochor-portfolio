export const useData = defineStore("data", {
  state: () => ({
    data: null,
    isFetched: false,
    preloaderActive: true,
    isLiked: false,
    notified: false,
    preloaded: false,
  }),
  actions: {
    addData(d: any) {
      this.data = d;
    },
    togglePreloader() {
      this.preloaderActive === true
        ? (this.preloaderActive = false)
        : (this.preloaderActive = true);
    },
    likePost() {
      this.isLiked === true ? (this.isLiked = false) : (this.isLiked = true);
    },
    isPreloaded() {
      this.preloaded = true;
    },

    async fetchData() {
      try {
        const sanity = useSanity();
        const query = groq`
    {
      'home': *[_type=='home'][0]{...,selectedProjects[]->{..., 'filters':projectFilters.filter[]->}, selectedExperiments[]->{..., 'filters':projectFilters.filter[]->}}, 
      'about': *[_type=='about'][0], 
      'articles': *[_type=='articles'][0]{..., articleList[]{...,project->{projectSlug, projectType, projectFilters{filter[]->}}, 'articleType': articleTypeFilters.showFilter[]->{'title': showTagTitle}}}, 
      'projects': *[_type=='projects'],
      'links': *[_type=='links'][0]{...,linkArray[]{..., pdf{asset->}}}
    }`;

        const { data: main } = await useAsyncData("d", () =>
          sanity.fetch(query)
        );

        // const {data: main} = useSanityQuery(query)
        if (main.value) {
          this.data = main.value;
          console.log("Data Fetched");
          this.isFetched = true;
        }
      } catch {
        console.error("Data not Fetched");
      }
    },
  },
});
