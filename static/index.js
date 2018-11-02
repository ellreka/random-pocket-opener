const db = new Dexie("MyDatabase");



const app = new Vue({
  el: '#app',
  delimiters: ['[[', ']]'],
  data:{
    formData:{
      tags:'ALL',
      num:1
    },
    allTag:[],
    history:[]
  },
  methods:{
    pick:async function ()  {
      var arr_articles = []
      if(this.formData["tags"] == "ALL"){
        await db.articles.each(function(t){
          arr_articles.push(t)
          console.log(t)
        })
      }else if(this.formData["tags"] == "NoTag"){
        await db.articles.where("tag").equals("").each(function(t){
          arr_articles.push(t)
          console.log(t)
        })
      }else{
        var regex = RegExp(this.formData["tags"])
        await db.articles.filter(article => regex.test(article.tag)).each(function(t){
          arr_articles.push(t)
          console.log(t)
        })
      }
      console.log(db)
      console.log(arr_articles)
      axios.post('/open',{"article":arr_articles,"num":this.formData["num"]})
        .then(response => {
          console.log(response.data)
          for(let i in response.data){
            console.log(response.data[i]['url'])
            this.history.push(response.data[i])
            window.open(response.data[i]['url'])
          }
        })
      .catch(error => {
        console.log(error);
      })
    },
    refresh: function(){
      axios.post('/refresh')
        .then(response => {
          console.log(response.data)

          console.log(db)
          db.articles.clear()
          db.tags.clear()

          response.data[0].forEach((val) => {
            db.articles.add({title: val.title,url: val.url,tag: val.tag.join()})
          })
          response.data[1].forEach((val) => {
            db.tags.add({tag:val})
          })
        })
        .catch(error => {
          console.log(error);
        })
    },
    logout: function(){
      Dexie.delete('MyDatabase');
      Dexie.delete('__dbnames');
      document.cookie = "access_token=; max-age=0";
      axios.post('/logout')
        .then(response => {
          console.log(response.data)

        })
        .catch(error => {
          console.log(error);
        })
    }
  }
})

const getTag = (async() => {
  var arr_tag = []
  db.version(1).stores({
    articles: "title, url, tag",
    tags: "tag"
  });
  await db.tags.each(function(t){
    arr_tag.push(t.tag)
    console.log(t)
  })
  app.allTag = arr_tag
  console.log(app.allTag)
})
getTag()
