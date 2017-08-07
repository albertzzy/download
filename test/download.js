const expect = require('expect');
const download = require('../index');
const fs = require('fs');


const picopts = {
    hostname:'gw.alicdn.com',
    reqUrl:'/tfs/TB1sakpSpXXXXaAXFXXXXXXXXXX-900-500.jpg',
    secure:true,
    filename:'pre.jpg',
    port:'443',
    dest:'/test/fixtures/dest'    
}

describe('download file right',function(){

	it('should return a pic',function(done){

			download(picopts).then(()=>{
				
				let type = fs.statSync('test/fixtures/dest/pre.jpg');

				expect(type.isFile()).toBe(true);


				done();

			}).catch((e)=>{
			  	expect(e).toBe(null)

			})
	});


})

