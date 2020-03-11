export const state = () => ({
  articles: []
})

export const mutations = {
  save(state, payload) {
    state.articles = payload
  },
  get(state, payload) {
    const result = state.articles.filter((item) =>
      item.title.includes(payload.title)
    )
    console.log(result)
    return result
  }
}
