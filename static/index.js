const app = new Vue({
  el: '#app',
  delimiters: ['[[', ']]'],
  data:{
    num:null,
    tags:null

  },
  methods:{
    open: function() {
      axios.post('/open'),{tags:this.tags,num:this.num}
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


