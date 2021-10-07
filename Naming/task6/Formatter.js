const os = require('os');

const CORNOR_SYMBOL = '+';
const HORIZONTAL_EDGE_SYMBOL = '|';
const VERTICAL_EDGE_SYMBOL = '-';
const DELIMITOR_SYMBOL = ' _ ';

const repeat = (symbol, times) => {
    let result = '';
    for (let iteration = 0; iteration < times; iteration++) {
        result += symbol;
    }
    return result;
}

const formatKeyValue = (key, value) => {
    const content = key + DELIMITOR_SYMBOL + value;
    const horizontalEdge = repeat(VERTICAL_EDGE_SYMBOL, content.length);

    return CORNOR_SYMBOL + horizontalEdge + CORNOR_SYMBOL + os.EOL
        + HORIZONTAL_EDGE_SYMBOL + content + HORIZONTAL_EDGE_SYMBOL + os.EOL +
        CORNOR_SYMBOL + horizontalEdge + CORNOR_SYMBOL + os.EOL;
}

const main = () => {
    console.log(formatKeyValue('enable', 'true'));
    console.log(formatKeyValue('name', 'Bob'));
}

main();
