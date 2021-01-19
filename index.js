const fs = require('fs');
const path = require('path');
const axios = require('axios');


function request (element) {
    try{
      return axios({
        url: element,
        method: "GET",
        responseType: "stream"
      });
    } catch(e) {
      console.log( 'errore: ' + e)
    }
  }
// the function expect an array of urls and a an optinal folder name if folder name is not passed the files will be saved in the downloads folder
const  downloads =  async (urls,src) => {
    for(const url of urls) {
       const saveFile = await request(url);

       const file = url.split('/')[url.split('/').length-1];
       const ext = file.split('.')[file.split('.').length-1];
       if(src){
        if (!fs.existsSync(`./${src}`)){
         await fs.mkdirSync(`./${src}`);
        }
         download = fs.createWriteStream(`./${src}/${file}`);
       }else{
         download = fs.createWriteStream(`./Downloads/${file}`);
       }
       await new Promise((resolve, reject)=> {
          saveFile.data.pipe(download);
          download.on("close", resolve);
          download.on("error", console.error);
       });
    }
  }

  downloads(['https://moc-applications.api-object.bluvalt.com:8082/engage/custom_uploads/dGFoYW5pLnBuZzE2MDQ0MTE3NjM3NDY=.png', 'https://moc-applications.api-object.bluvalt.com:8082/engage/custom_uploads/b21hci5wbmcxNjA0NDExOTM2Nzgz.png', 'https://moc-applications.api-object.bluvalt.com:8082/engage/custom_uploads/bW9udGFoYS5wbmcxNjA0NDExOTk3MjQ2.png'],'cert')