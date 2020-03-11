<template>
  <div>
    <Header></Header>
    <main>
      <div>
        <dl>
          <dt>Tag</dt>
          <dd>
            <CheckBox></CheckBox>
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
      <button @click="open">Open</button>
    </main>
  </div>
</template>

<script>
// import axios from 'axios'
import Header from '~/components/Header'
import CheckBox from '~/components/parts/CheckBox'
import Input from '~/components/parts/Input'

export default {
  components: {
    Header,
    CheckBox,
    Input
  },
  async asyncData({ store, redirect }) {
    // const response = await axios.post('/api/get')
    // store.commit('save', response.data.articles)
    // console.log(store.state.articles)
    // if (response.data === 'ERROR') {
    //   return redirect('/login')
    // }
  },
  methods: {
    open(e) {
      const params = {
        tag: [],
        title: '',
        count: 10,
        sort: ''
      }
      this.$store.commit('get', params)
    }
  }
}
</script>

<style>
table th {
  width: 10%;
}

input:checked + svg {
  display: block;
}
</style>
