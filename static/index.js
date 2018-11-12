const firstEvent = (app) =>{
  axios.get('/update')
  .then(response => {
    if (response.data == 'NOTPOCKET'){
      app.loading = false
      app.message = '<div class="ui negative message">Pocketから記事を取得することができませんでした</div>'
    }else{
      app.allTag = response.data[1]
      app.articles = response.data[0]
      app.loading = false
    }
  })
  .catch(error => {
    console.log(error);
  })
}

const app = new Vue({
  el: '#app',
  delimiters: ['[[', ']]'],
  data:{
    formData:{
      tags:'ALL',
      num:1,
      words:''
    },
    message:'',
    history:[],
    loading:true,
    articles:[],
    allTag:[],
    checked:true
  },
  created: function () {
    firstEvent(this)
  },
  methods:{
    pick:function ()  {
    var arr_articles;
    if(this.formData["tags"] == "ALL"){
      arr_articles = this.articles.filter(a => a.title.indexOf(this.formData.words)!=-1)
    }else if(this.formData["tags"] == "NoTag"){
      arr_articles = this.articles.filter(a => a.tag == "" && a.title.indexOf(this.formData.words)!=-1)
    }else{
      arr_articles = this.articles.filter(a => a.tag.some(t => t==this.formData["tags"]) &&  a.title.indexOf(this.formData.words)!=-1)
    }
    axios.post('/open',{"article":arr_articles,"num":this.formData["num"]})
    .then(response => {
      if(response.data.length !== 0){
        for(let i in response.data){
          if (this.checked){
            this.history.unshift(response.data[i])
            window.open(response.data[i]['url'])
          }else{
            this.history.unshift(response.data[i])
          }
        }
      this.message = ''
      }else{
        this.message = '<div class="ui negative message">一致する記事がありませんでした</div>'
      }

    })
    .catch(error => {
      console.log(error);
    })
    }
  }
})



