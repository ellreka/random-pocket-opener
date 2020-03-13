<template>
  <div>
    <Header></Header>
    <main class="text-center mt-10">
      <p class="text-1xl">Pocketに保存してある記事をソートして開きます</p>
      <button
        class="bg-pink-400 hover:bg-pink-500 text-white font-bold py-2 px-4 rounded mt-10"
        @click="auth"
      >
        Authorize Pocket
      </button>
    </main>
  </div>
</template>

<script>
import axios from 'axios'
import Header from '~/components/Header'

export default {
  components: {
    Header
  },
  methods: {
    async auth(e) {
      const response = await axios.post('/api/auth')
      const requestToken = response.data
      const redirectUrl = `${location.protocol}//${location.hostname}`
      location.href = `https://getpocket.com/auth/authorize?request_token=${requestToken}&redirect_uri=${redirectUrl}/api/callback?code=${requestToken}`
    }
  }
}
</script>
