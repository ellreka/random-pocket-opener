const app = new Vue({
  el: '#app',
  delimiters: ['[[', ']]'],
  data:{
    results:[],
    history:[],
    num:1,
    tags:[],
    tag:'全て'

  },
  methods:{
    open: function() {
      axios.post('/test',{number:this.num,tag:this.tag})
        .then(response => {
          console.log(response.data)
          this.results = response.data

          this.results.forEach((val) => {
            console.log(val.resolved_url)
            this.history.push({title:val.resolved_title,url:val.resolved_url})
            window.open(val.resolved_url)
          })
          this.history = this.history.reverse();
          console.log(this.history)
        })
      .catch(error => {
        console.log(error);
      })
    }
  }
})