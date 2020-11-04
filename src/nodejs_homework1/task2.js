import * as fs from 'fs';
import csv from 'csvtojson';
import { pipeline } from 'stream';

const csvFilePath = './src/nodejs_homework1/csv/nodejs-hw1-ex1.csv';
const txtFilePath = './src/nodejs_homework1/nodejs-hw1-ex1.txt';

const writeStream = fs.createWriteStream(txtFilePath);

csv({
  downstreamFormat: 'line',
  headers: ['book', 'author', 'amount', 'price'],
  colParser: {
    "book": "string",
    "author": "string",
    "amount": "number",
    "price": "number"
  },
  checkType: true
})
  .fromFile(csvFilePath)
  .on('data', (buffer) => {
    let data = buffer.toString();
    console.log(data);
    pipeline(
      data,
      () => {
        return new Promise((resolve,reject) => {
          fs.appendFile(txtFilePath, data, (err) => {
            if (err) {
              console.error('Fail.', err)
            }
          }, console.log('Done.'))
        })
      },
      (err) => {
        if (err) {
          console.error('Fail.', err)
        }
      }
    );
  })
  .on('error', (err) => {
    if (err) {
      console.error('Fail.', err);
    }
  })
