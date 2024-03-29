type Store = {
  socialPostLikes: number
  activeProject: number | null
  showFilters: string[] | []
  showFilterLengths: number[] | []
  projectFilters: string[] | []
  projectFilterLengths: number[] | []
  experimentFilters: string[] | []
  experimentFilterLengths: number[] | []
  activeFilters: {type: string; el: HTMLElement}[] | []
  activeProjectFilters: HTMLElement[] | []
  allProjects: [] | null
}

export const useStore = defineStore('main', {
  state: (): Store => ({
    socialPostLikes: 0,
    activeProject: null,
    showFilters: [],
    showFilterLengths: [],
    projectFilters: [],
    projectFilterLengths: [],
    experimentFilters: [],
    experimentFilterLengths: [],
    activeFilters: [],
    activeProjectFilters: [],
    allProjects: [],
  }),
  actions: {
    addProjects(projects: any) {
      this.allProjects = projects
    },
    incrementPostLikes() {
      this.socialPostLikes++
    },
    decrementPostLikes() {
      this.socialPostLikes--
    },
    setSocialPostLikeNumber(number: number) {
      this.socialPostLikes = number
    },
    setActiveProject(index: number) {
      this.activeProject = index
    },
    addShowFilter(filter: string) {
      if (!this.showFilters.includes(filter)) {
        this.showFilters.push(filter)
        this.showFilterLengths.push(1)
      } else {
        let index = this.showFilters.indexOf(filter)
        this.showFilterLengths[index] = this.showFilterLengths[index] += 1
      }
    },
    addProjectFilter(filter: string) {
      if (!this.projectFilters.includes(filter)) {
        this.projectFilters.push(filter)
        this.projectFilterLengths.push(1)
      } else {
        let index = this.projectFilters.indexOf(filter)
        this.projectFilterLengths[index] = this.projectFilterLengths[index] += 1
      }
    },
    addExperimentFilter(filter: string) {
      if (!this.experimentFilters.includes(filter)) {
        this.experimentFilters.push(filter)
        this.experimentFilterLengths.push(1)
      } else {
        let index = this.experimentFilters.indexOf(filter)
        this.experimentFilterLengths[index] = this.experimentFilterLengths[
          index
        ] += 1
      }
    },
    clearFilters() {
      this.showFilters = []
      this.showFilterLengths = []
    },
    addActiveFilter(filter: any) {
      this.activeFilters.push(filter)
    },
    removeActiveFilter(filter: any) {
      let index = 0
      this.activeFilters.forEach((f, i) => {
        if (f.type === filter.type && f.el === filter.el) {
          index = i
        }
      })
      this.activeFilters.splice(index, 1)
    },
    clearActiveFilters() {
      this.activeFilters.length = 0
    },
    clearActiveShowFilters() {
      this.activeFilters.forEach((a, i) => {
        if (a.type === 'show') {
          this.activeFilters.splice(index, 1)
        }
      })
    },
    clearActiveProjectFilters() {
      this.activeFilters.forEach((a, i) => {
        if (a.type === 'project') {
          this.activeFilters.splice(index, 1)
        }
      })
    },
    clearActiveExperimentFilters() {
      this.activeFilters.forEach((a, i) => {
        if (a.type === 'experiment') {
          this.activeFilters.splice(index, 1)
        }
      })
    },
    addActiveProjectFilter(filter: HTMLElement) {
      this.activeProjectFilters.push(filter)
    },
    removeActiveProjectFilter(filter: HTMLElement) {
      let index = this.activeProjectFilters.indexOf(filter)
      this.activeProjectFilters.splice(index, 1)
    },
    clearActiveProjectFilters() {
      this.activeProjectFilters.length = 0
    },
  },
})
