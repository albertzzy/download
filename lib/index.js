const https = require('https')
const http = require('http')
const fs = require('fs')
const path = require('path')

function Mkdir(dest,reject,resolve){
    let pathArr = dest.split('/');

    if(pathArr[0] === '.'){
        reject(new Error('you should specify an absolute path'))
        return;
    }

    let uri = path.resolve(pathArr[0]),i = 1;

    while(i<pathArr.length){

        uri = path.resolve(uri,pathArr[i]);

        if(!fs.existsSync(uri)){

            fs.mkdirSync(uri);
        }

        i++;

    }
    return uri;
}



module.exports = function(options={}){
    return new Promise((resolve,reject)=>{

        let url = options.reqUrl;

        if(!url){
            console.warn('please specify a url you wanna download');
            
            reject(new Error('you need specify a url'));
            
            return;
        }


        let dest = options.dest || process.cwd(),
        extname = path.extname(url);

        let fileType = extname === '' ? '.txt':extname;
        let basename = path.basename(url);
        let filename = options.filename;

        if(filename){
            if(!/\w+\.\w+/.test(filename)){
                filename = `${filename}${fileType}`;
            }

        }else{
            if(!/\w+\.\w+/.test(basename)){
                filename = `${basename}${fileType}`
            }else{
                filename = basename;
            }
        }

        let {hostname,method='GET',port=80} = options;

        let portocol = options.secure ?  https:http;

        let uri = Mkdir(dest,resolve,reject);



        const writeStream = fs.createWriteStream(path.join(uri,filename))


        const req = portocol.request({
            hostname,
            path:url,
            method,
            port
        },(res)=>{
            res.pipe(writeStream);
            resolve(res)
        })

        req.on('error',(e)=>{
            reject(e)
        })

        req.end()
    })

}



