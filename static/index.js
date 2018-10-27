const app = new Vue({
  el: '#app',
  delimiters: ['[[', ']]'],
  data:{
    results:[],
    title:[],
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
          // for(let k of Object.keys(l)) {
          //   console.log(l[k])
          //   this.results.push(l[k])
          // }
          // console.log(this.results)

          this.results.forEach((val) => {
            console.log(val.resolved_url)
            window.open(val.resolved_url)
          })
          // console.log(this.title)
        })
      .catch(error => {
        console.log(error);
      })
    }
  }
})