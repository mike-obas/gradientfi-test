//import { readFileSync, writeFileSync } from "node:fs";
const {readFileSync, writeFileSync} = require('node:fs');

module.exports.saveJsonToFile = (filename, newDataObj) => {
    // const fileData = readFileSync(filename, { encoding: "utf8" });
    // const finalData = JSON.parse(fileData);
    // if (!finalData || finalData?.length < 1) {
    //   return writeFileSync(filename, JSON.stringify([newDataObj]));
    // }
    // finalData.push(newDataObj);
    return writeFileSync(filename, JSON.stringify(newDataObj));
  };