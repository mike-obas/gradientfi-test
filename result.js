//import { readFileSync } from "node:fs";
const {readFileSync} = require('node:fs');
const { saveJsonToFile } = require('./utils');

const groupBy = (array, property) => array.reduce((grouped, element) => ({
    ...grouped,
    [element[property]]: [...(grouped[element[property]] || []), element]
  }), {})

  const getValueANumber = (value) => {
    const plainNumber = parseFloat(value.replaceAll(',', ''));
    return isNaN(plainNumber) ? 0 : plainNumber
  }

module.exports.solve = function () {
    const csvData = readFileSync("annual-enterprise-survey-2021-financial-year-provisional-csv.csv", {
        encoding: "utf8",
        flag: "rs",
      }); 
  
      function csvToJson(csvData) {
        const csvArray = csvData.split("\n");
  
        let result = [];
  
        let headers = csvArray[0].split(",");
  
        for (let i = 1; i < csvArray.length - 1; i++) {
          let rowObj = {};
  
          let rowArray = csvArray[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
          rowArray.forEach((element, index) => {
            const refinedHeader = headers[index] //.replace(/\"/g, "");
            const refinedValue = element.replace(/\n|\"/g, "");
            const finalValue =
              refinedHeader !== "Value"
                ? refinedValue
                : getValueANumber(refinedValue)
            rowObj[refinedHeader] = finalValue;
          });
  
          result.push(rowObj);
        }

        const groupByIndustryName = groupBy(result, "Industry_name_NZSIOC");
        let getSumbyIndustry = []
        for (const key in groupByIndustryName) {
                const eachSum = groupByIndustryName[key].reduce((total, item) => {
                    return total + item.Value

                }, 0)
                getSumbyIndustry.push({[key]: eachSum})
                
        }
        return getSumbyIndustry
      }
  
      const getJson = csvToJson(csvData);
      saveJsonToFile("newDetails.json", getJson);

      return "SUCCESSFULL"
}

// To run: node -p "require('./result.js').solve()"