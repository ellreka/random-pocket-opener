// const getCookie = (() => {
//   let str = document.cookie;
//   console.log(str)
// })

// const app = new Vue({
//   el: '#app',
//   delimiters: ['[[', ']]'],
//   data:{
//     results:[],
//     history:[],
//     num:1,
//     tags:[],
//     tag:'全て'

//   },
//   methods:{
//     open: function() {
//       axios.post('/open')
//         .then(response => {
//           console.log(response)
//         })
//       .catch(error => {
//         console.log(error);
//       })
//     },
//     refresh: function(){
//       axios.post('/refresh')
//         .then(response => {
//           console.log(response.data)
//         })
//       .catch(error => {
//         console.log(error);
//       })
//       getCookie()
//     }
//   }
// })


