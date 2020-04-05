var request = require('request');
var cheerio = require('cheerio');

var fs = require('fs');
var util = require('util');

var pageToVisit = "https://www.mohfw.gov.in/";

var path = "data.json";

console.log("Visiting page " + pageToVisit);

request(pageToVisit, function (error, response, body) {
    if (error) {
        console.log("Error: " + error);
    }
    // Check status code (200 is HTTP OK)
    console.log("Status code: " + response.statusCode);
    if (response.statusCode === 200) {
        // Parse the document body
        var $ = cheerio.load(body);
        console.log("Page title:  " + $('title').text());

        const jsonReponse = [];
        const columnHeadings = [];
        var msg ={};
        msg.payload = {
            columnHeadings: columnHeadings,
            rows: jsonReponse,
        }


        $('#state-data .table-striped').find('thead').each(function(i, table) {
            $(this).find('tr').children().each(function(index, tr){
                columnHeadings.push($(this).text().trim());
            });
        });

        $('#state-data .table-striped').find('tbody').each(function(i, table) {
            const rowJson = {};
            $(this).find('tr').each(function(index, tr){
                let row = $(this).text().trim();
                rowJson[ index ] = row.split('\n\t');
            });
            console.log(rowJson);
            console.log("newt line \n");
            if (JSON.stringify(rowJson) !== '{}') {
                jsonReponse.push(rowJson);
            }
        });

        console.log(msg);

        const storeData = (data, path) => {
            try {
              fs.writeFileSync(path, "var coronaStatistics=" + JSON.stringify(data))
            } catch (err) {
              console.error(err)
            }
        };
        storeData(JSON.stringify(msg), path);
    }
});
