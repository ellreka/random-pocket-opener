const app = new Vue({
  el: '#app',
  delimiters: ['[[', ']]'],
  data:{
    formData:{
      tags:'ALL',
      num:1
    }
  },
  methods:{
    open: function() {
      console.log(this.tags)
      axios.post('/open',this.formData)
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


