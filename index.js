const https = require('https')
const http = require('http')
const fs = require('fs')
const path = require('path')

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

        if(!fs.existsSync(dest)){
            fs.mkdir(dest,(e)=>{
                if(e){
                    reject(e)
                }
            })
        }

        const writeStream = fs.createWriteStream(path.join(dest,filename))


        const req = portocol.request({
            hostname,
            path:url,
            method,
            port
        },(res)=>{
            res.pipe(writeStream);
            resolve(req,res)
        })

        req.on('error',(e)=>{
            reject(e)
        })

        req.end()
    })

}



