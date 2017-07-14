const download = require('../index')

const options = {
    hostname:'github.com',
    reqUrl:'/kevva/download/blob/master/index.js',
    secure:true,
    filename:'dl.html',
    port:'443',
    dest:'./dest'    
}
download(options).then(()=>{
    console.log('success')
}).catch((e)=>{
  console.log(e)
})