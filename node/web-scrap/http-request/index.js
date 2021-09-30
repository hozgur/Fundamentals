
const cheerio = require("cheerio")
const request = require("request")

if(process.argv.length > 2) {
    const url = process.argv[2];
    console.log("Scraping " + url);
    request(url, function (error, response, html) {
  if (!error && response.statusCode == 200) {
      console.log("Parsing HTML");
     console.log(html);
    var $ = cheerio.load(html);

    $('div.accContent ').each(function(i, element){
        console.log(i,element);
        var name = $(this).find('a.name link').text();
        var price = $(this).find('p.price').text();
        console.log(name + " " + price);
    });
  }
  else
    {
        console.log("Error",error);
    }
});
}
//sendGetRequestSync()
//sendPostRequestSync()
