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
  get(state) {
    const checkedTag = state.tags.map((val) => {
      if (val.checked) return val.name
    })
    const result = state.articles.filter(
      (item) =>
        item.tags.some((el) => checkedTag.includes(el)) &&
        item.title.includes(state.params.title)
    )
    console.log(result)
    return result
  },
  tags(state) {
    const tags = []
    state.articles.forEach((val) => {
      tags.push(...val.tags)
    })
    state.tags = [...new Set(tags)].map((val) => {
      return {
        name: val,
        checked: false
      }
    })
  },
  setTitle(state, payload) {
    return (state.params.title = payload)
  },
  setTag(state, payload) {
    state.tags = state.tags.map((v) => {
      return v.name === payload.name ? payload : v
    })
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
