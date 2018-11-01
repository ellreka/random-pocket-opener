const app = new Vue({
  el: '#app',
  delimiters: ['[[', ']]'],
  data:{
    tags:'ALL',
    num:1

  },
  methods:{
    open: function() {
      console.log(this.tags)
      axios.post('/open',{tags:this.tags,num:this.num})
        .then(response => {
          console.log(response)
        })
      .catch(error => {
        console.log(error);
      })
    },
    refresh: function(){
      axios.post('/refresh')
        .then(response => {
          console.log(response.data)
        })
      .catch(error => {
        console.log(error);
      })
      getCookie()
    }
  }
})


