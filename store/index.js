export const state = () => ({
  tags: [],
  articles: [],
  params: {
    tag: [],
    title: '',
    count: 1,
    sort: ''
  }
})

export const mutations = {
  save(state, payload) {
    state.articles = payload
  },
  tags(state) {
    const tags = []
    state.articles.forEach((val) => {
      tags.push(...val.tags)
    })
    state.tags = [...new Set(tags)].map((val) => {
      return {
        name: val,
        checked: true
      }
    })
  },
  setTitle(state, payload) {
    state.params.title = payload
  },
  setTag(state, payload) {
    state.tags = state.tags.map((v) => {
      return v.name === payload.name ? payload : v
    })
  },
  setCount(state, payload) {
    state.params.count = payload
  },
  allCheck(state, payload) {
    state.tags = state.tags.map((v) => {
      return {
        name: v.name,
        checked: !!payload
      }
    })
  }
}
