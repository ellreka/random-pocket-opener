const openUrl = async (x) => {
    const articles_data = await axios.post('/pick',
    {
        tag: document.getElementById('tag').value,
        search_word: document.getElementById('search_word').value,
        num: document.getElementById('num').value
    }
    )
    console.log(articles_data)
    if(articles_data.data.length !== 0) {
        for(let i in articles_data.data){
            window.open(articles_data.data[i]['url']);
        }
    }else{
    }
}