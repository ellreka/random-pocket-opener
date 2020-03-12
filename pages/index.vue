<template>
  <div>
    <Header></Header>
    <main>
      <div class="w-9/12 m-auto pt-10">
        <dl>
          <dt>Tag</dt>
          <dd class="flex flex-wrap">
            <AllCheckBox class="mr-5" :label="'ALL'"></AllCheckBox>
            <CheckBox
              v-for="(val, key) in tags"
              :key="key"
              class="mr-5"
              :label="val.name"
              :checked="val.checked"
            ></CheckBox>
          </dd>
        </dl>
        <dl>
          <dt>Title</dt>
          <dd>
            <Input />
          </dd>
        </dl>
        <dl>
          <dt>Sort</dt>
          <dd></dd>
        </dl>
        <dl>
          <dt>Count</dt>
          <dd></dd>
        </dl>
        <dl>
          <dt>Open</dt>
          <dd></dd>
        </dl>
      </div>
      <div class="text-center">
        <button
          class="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded mt-10 m-auto"
          @click="open"
        >
          OPEN
        </button>
      </div>
    </main>
  </div>
</template>

<script>
import axios from 'axios'
import Header from '~/components/Header'
import CheckBox from '~/components/parts/CheckBox'
import AllCheckBox from '~/components/parts/AllCheckBox'
import Input from '~/components/parts/Input'

export default {
  components: {
    Header,
    CheckBox,
    AllCheckBox,
    Input
  },
  async asyncData({ store, redirect }) {
    const response = await axios.post('/api/get')
    store.commit('save', response.data.articles)
    console.log(store.state.articles)
    if (response.data === 'ERROR') {
      return redirect('/login')
    }
    store.commit('tags')
  },
  computed: {
    tags() {
      return this.$store.state.tags
    }
  },
  methods: {
    open() {
      this.$store.commit('get')
    }
  }
}
</script>

<style>
dl {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
}

dl + dl {
  margin-top: 25px;
}

dt {
  width: 10%;
}

dd {
  width: 90%;
}

input:checked + svg {
  display: block;
}
</style>
