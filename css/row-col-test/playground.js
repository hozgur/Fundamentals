function getDoubleQuoteSections(str) {
    var sections = [];
    var start = 0;
    var end = 0;
    while (end < str.length) {
      if (str[end] === '"') {
        sections.push(str.substring(start, end));
        start = end + 1;
      }
      end++;
    }
    sections.push(str.substring(start, end));
    return sections;
  }

  let sample = 'gugu="This is a test" as="this is a test"';

const count = (sample.match(/"/g) || []).length;
console.log(count);
  console.log(getDoubleQuoteSections(sample));