/*
  get data for site
*/

export default defineNuxtPlugin(() => {
  const store = useData()
  const app = useNuxtApp()
  //
  // const query = groq`
  //   {
  //     'home': *[_type=='home'][0]{...,selectedProjects[]->{..., 'filters':projectFilters.filter[]->}, selectedExperiments[]->{..., 'filters':projectFilters.filter[]->}},
  //     'about': *[_type=='about'][0],
  //     'articles': *[_type=='articles'][0]{..., articleList[]{...,project->{projectSlug, projectType, projectFilter{filter[]->}}, 'articleType': articleTypeFilters.showFilter[]->{'title': showTagTitle}}},
  //     'projects': *[_type=='projects'],
  //     'links': *[_type=='links'][0]
  //   }`
  //
  // const {data: main} = useSanityQuery(query)
  // watch(main, () => {
  //   if (main.value) {
  //     // console.log(main.value)
  //     store.addData(main.value)
  //   }
  // })

  app.hook('app:created', () => {
    store.fetchData()
  })
})
