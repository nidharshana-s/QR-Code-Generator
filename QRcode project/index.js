/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from "fs";
//var qr = require('qr-image');

inquirer
  .prompt([{    //use curly braces for object
    message:"enter your URL: ",
    name:"URL"
  }])
  .then((answers) => {
    const url =answers.URL;     //answers is a object, URL is key
    
    var qr_svg = qr.image(url);   
    qr_svg.pipe(fs.createWriteStream('qr_image.png'));
    var svg_string = qr.imageSync(url);
    console.log("your QR image for "+url+" is ready ! ");
    
    fs.appendFile("./urls.txt", url+"\n", (err) =>{
      if (err) throw err;
      console.log("file saved");
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });


//var svg_string = qr.imageSync('I love QR!', { type: 'png' });
//console.log(svg_string);
