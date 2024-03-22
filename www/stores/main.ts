type Store = {
  socialPostLikes: number
  activeProject: number | null
  showFilters: string[] | []
  showFilterLengths: number[] | []
  activeFilters: HTMLElement[] | []
}

export const useStore = defineStore('main', {
  state: (): Store => ({
    socialPostLikes: 0,
    activeProject: null,
    showFilters: [],
    showFilterLengths: [],
    activeFilters: [],
  }),
  actions: {
    incrementPostLikes() {
      this.socialPostLikes++
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
    clearFilters() {
      this.showFilters = []
      this.showFilterLengths = []
    },
    addActiveFilter(filter: HTMLElement) {
      this.activeFilters.push(filter)
    },
    removeActiveFilter(filter: HTMLElement) {
      let index = this.activeFilters.indexOf(filter)
      this.activeFilters.splice(index, 1)
    },
    clearActiveFilters() {
      this.activeFilters.length = 0
    },
  },
})
