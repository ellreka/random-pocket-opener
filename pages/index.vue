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
          <dd>
            <Select></Select>
          </dd>
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
import Select from '~/components/parts/Select'

export default {
  components: {
    Header,
    CheckBox,
    AllCheckBox,
    Input,
    Select
  },
  async asyncData({ store, redirect }) {
    const response = await axios.post('/api/get')
    store.commit('save', response.data.articles)
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
      const checkedTag = this.$store.state.tags.map((val) => {
        if (val.checked) return val.name
      })
      const sortArticles = this.$store.state.articles.filter(
        (item) =>
          item.tags.some((el) => checkedTag.includes(el)) &&
          item.title.includes(this.$store.state.params.title)
      )
      const shuffle = ([...array]) => {
        for (let i = array.length - 1; i >= 0; i--) {
          const j = Math.floor(Math.random() * (i + 1))
          ;[array[i], array[j]] = [array[j], array[i]]
        }
        return array
      }
      const shuffleArticles = shuffle(sortArticles)
      const result = shuffleArticles.slice(0, this.$store.state.params.count)
      console.log(result)
      result.forEach((val) => {
        window.open(val.url)
      })
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
