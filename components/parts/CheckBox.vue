<template>
  <label class="flex justify-start items-start">
    <div
      class="bg-white border-2 rounded border-gray-darker w-6 h-6 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-blue-500"
    >
      <input
        v-model="tag"
        type="checkbox"
        class="opacity-0 absolute"
        checked="checked"
      />
      <svg
        class="fill-current hidden w-4 h-4 text-green-500 pointer-events-none"
        viewBox="0 0 20 20"
      >
        <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
      </svg>
    </div>
    <div class="select-none">{{ label }}</div>
  </label>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true
    },
    checked: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    tag: {
      get() {
        return this.checked
      },
      set(value) {
        this.$store.commit('setTag', {
          name: this.$options.propsData.label,
          checked: value
        })
      }
    }
  }
}
</script>

<style></style>
