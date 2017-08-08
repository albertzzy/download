<h1 align="center">
    download-helper
</h1>

[![Build Status](https://travis-ci.org/albertzzy/download.svg?branch=master)](https://travis-ci.org/albertzzy/download)

## install
```bash
npm install download-helper

```

## usage 

```js

const download = require('download')

download(options).then(()=>{
    console.log('success')
}).catch((e)=>{
  console.log(e)
})

```
