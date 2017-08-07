const download = require('../lib/index')

const options = {
    hostname:'gw.alicdn.com',
    reqUrl:'/tfs/TB1sakpSpXXXXaAXFXXXXXXXXXX-900-500.jpg',
    secure:true,
    filename:'pre.jpg',
    port:'443',
    dest:'./dest'    
}
download(options).then(()=>{
    console.log('success')
}).catch((e)=>{
  console.log(e)
})