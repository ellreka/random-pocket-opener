<template>
  <input
    v-model="title"
    class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
    type="text"
  />
</template>

<script>
export default {
  computed: {
    title: {
      get() {
        return this.$store.state.getTitle
      },
      set(value) {
        this.$store.commit('setTitle', value)
      }
    }
  }
}
</script>

<style></style>
