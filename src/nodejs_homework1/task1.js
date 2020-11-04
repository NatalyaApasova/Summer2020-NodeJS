import * as readline from 'readline';

const reverseString = function(string) {
  return `${string.split('').reverse().join('')} \n`;
}

const lineReader = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

lineReader.question('Enter a line:\n\n', (line) => {
  console.log(reverseString(line));
})

lineReader.on('line', (line) => {
  console.log(reverseString(line));
})
