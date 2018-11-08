const db = new Dexie("MyDatabase");
const firstEvent = (db) =>{
  axios.post('/update')
  .then(response => {
    console.log(response.data)
    db.version(1).stores({
      articles: "title, url, tag",
      tags: "tag"
    });
    console.log(db)
    db.articles.clear()
    db.tags.clear()
    response.data[0].forEach((val) => {
      db.articles.add({title: val.title,url: val.url,tag: val.tag.join()})
    })
    response.data[1].forEach((val) => {
      db.tags.add({tag:val})
    })
    db.tags.each(function(val){
      console.log(val)
      app.allTag.push(val.tag)
    })
    app.loading = false

  })
  .catch(error => {
    console.log(error);
  })
}
firstEvent(db)




const app = new Vue({
  el: '#app',
  delimiters: ['[[', ']]'],
  data:{
    formData:{
      tags:'ALL',
      num:1,
      words:''
    },
    allTag:[],
    history:[],
    loading:true
    // loading:false


  },
  methods:{
    pick:async function ()  {
      // db.version(1).stores({
      //   articles: "title, url, tag",
      //   tags: "tag"
      // });
      var arr_articles = []
      if(this.formData["tags"] == "ALL"){
        await db.articles.filter(article => article.title.indexOf(this.formData.words)!=-1).each(function(t){
          console.log(t)
          arr_articles.push(t)
        })
      }else if(this.formData["tags"] == "NoTag"){
        await db.articles.where("tag").equals("").filter(article => article.title.indexOf(this.formData.words)!=-1).each(function(t){
          arr_articles.push(t)
          console.log(t)
        })
      }else{
        var regex = RegExp(this.formData["tags"])
        await db.articles.filter(article => regex.test(article.tag)).filter(article => article.title.indexOf(this.formData.words)!=-1).each(function(t){
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
    update: function(){
      axios.post('/update')
        .then(response => {
          console.log(response.data)
          // db.version(1).stores({
          //   articles: "title, url, tag",
          //   tags: "tag"
          // });
          db.version(1).stores({
            articles: "title, url, tag",
            tags: "tag"
          });
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
        .catch(error => {
          console.log('error:'+error);
        })
    }
  }
})



