const os = require('os');

const TABLE_ROW_BORDER_SYMBOL = '═';
const TABLE_COLUMN_BORDER_SYMBOL = '║';

const TABLE_TOP_LEFT_CORNER_SYMBOL = '╔';
const TABLE_TOP_RIGHT_CORNER_SYMBOL = '╗';
const TABLE_TOP_MIDDLE_SYMBOL = '╦';

const TABLE_BOTTOM_LEFT_CORNER_SYMBOL = '╚';
const TABLE_BOTTOM_RIGHT_CORNER_SYMBOL = '╝';
const TABLE_BOTTOM_MIDDLE_SYMBOL = '╩';

const TABLE_CELL_LEFT_CORNER_SYMBOL = '╠';
const TABLE_CELL_RIGHT_CORNER_SYMBOL = '╣';
const TABLE_CELL_MIDDLE_SYMBOL = '╬';

const LAYOUT_ADJUSTMENT_VALUE = 2;

const tableDetails = {
    columnCount: null,
    maxColumnSize: null,
    data: null
}

const repeatSymbol = (symbol, textLength) => {
    let result = ''
    for (let iteration = 0; iteration < textLength; iteration++) {
        result += symbol;
    }
    return result;
}

const getMaxColumnSize = () => {
    let maxLength = 0;
    if (tableDetails.data.length > 0) {
        for (const dataSet of tableDetails.data) {
            const values = dataSet.getValues();
            for (let value of values) {
                value += '';
                if (value.length > maxLength) {
                    maxLength = value.length;
                }
            }
        }
    }
    return maxLength;
}

const getColumnCount = () => {
    const result = 0;
    if (tableDetails.data.length > 0) {
        return tableDetails.data[0].getColumnNames().length;
    }
    return result;
}

const getBorderString = (startSymbol, centerSymbol, endSymbol) => {
    let result = '';
    result += startSymbol;
    for (let interator = 1; interator < tableDetails.columnCount; interator++) {
        result += repeatSymbol(TABLE_ROW_BORDER_SYMBOL, tableDetails.maxColumnSize)
        result += centerSymbol;
    }
    result += repeatSymbol(TABLE_ROW_BORDER_SYMBOL, tableDetails.maxColumnSize)
    return result += endSymbol + os.EOL;
}

const getTableTopBorderString = () => {
    return getBorderString(TABLE_TOP_LEFT_CORNER_SYMBOL, TABLE_TOP_MIDDLE_SYMBOL, TABLE_TOP_RIGHT_CORNER_SYMBOL);
}

const getTableBottomBorderString = () => {
    return getBorderString(TABLE_BOTTOM_LEFT_CORNER_SYMBOL, TABLE_BOTTOM_MIDDLE_SYMBOL, TABLE_BOTTOM_RIGHT_CORNER_SYMBOL);
}

const getTableContentBorderString = () => {
    return getBorderString(TABLE_CELL_LEFT_CORNER_SYMBOL, TABLE_CELL_MIDDLE_SYMBOL, TABLE_CELL_RIGHT_CORNER_SYMBOL);
}


const getTableCellString = (text) => {
    let result = '';
    text += '';
    const textLength = text.length;
    paddingLength = Math.trunc((tableDetails.maxColumnSize - textLength) / 2);
    result += repeatSymbol(' ', paddingLength);
    result += text;
    paddingLength += textLength % 2 == 0 ? 0 : 1; // add extra padding space for odd length string
    result += repeatSymbol(' ', paddingLength);
    return result;
}

const getTableColumnString = (columns, isHeader) => {
    let result = '';
    const values = columns;
    for (let column = 0; column < tableDetails.columnCount; column++) {
        result += isHeader ? TABLE_COLUMN_BORDER_SYMBOL : '';
        result += getTableCellString(values[column]);
        result += !isHeader ? TABLE_COLUMN_BORDER_SYMBOL : '';
    }
    result += isHeader ? TABLE_COLUMN_BORDER_SYMBOL : '';
    return result += os.EOL;
}

const adjustMaxCoulmnSize = (maxColumnSize) => {
    return maxColumnSize += maxColumnSize % 2 === 0 ? LAYOUT_ADJUSTMENT_VALUE : LAYOUT_ADJUSTMENT_VALUE + 1;
}

const getEmptyTabelHeader = (tableName) => {
    return `${TABLE_COLUMN_BORDER_SYMBOL} Table "${tableName}" is empty or does not exist ${TABLE_COLUMN_BORDER_SYMBOL}`;

}
const getEmptyTableString = (tableHeader) => {
    let result = '';
    result += getTableTopBorderString()
    result += tableHeader + os.EOL;
    result += getTableBottomBorderString()
    return result;
}

const getTableHeadeString = () => {
    let result = '';
    result += getTableTopBorderString();
    result += getTableColumnString(tableDetails.data[0].getColumnNames(), true)
    //last string of the header
    if (tableDetails.data.length > 0) {
        result += getTableContentBorderString();
    } else {
        result += getTableBottomBorderString();
    }
    return result;
}

const getTableDataString = () => {
    let result = '';
    const rowsCount = tableDetails.data.length;
    for (let row = 0; row < rowsCount; row++) {
        result += TABLE_COLUMN_BORDER_SYMBOL;
        result += getTableColumnString(tableDetails.data[row].getValues(), false);
        if (row < rowsCount - 1) {
            result += getTableContentBorderString();
        }
    }
    result += getTableBottomBorderString();
    return result;
}

const getTableString = () => {
    let result = '';
    result += getTableHeadeString();
    result += getTableDataString();
    return result;
}

const isEmptyTable = () => {
    return getMaxColumnSize() === 0;
}

const validateCommand = (command) => {
    if (command.length !== 2) {
        throw new TypeError('Incorrect number of parameters. Expected 1, got ' + (command.length - 1));
    }
}

const setMaxColumnSize = (count) => {
    tableDetails.maxColumnSize = count;
}

const setColumnCount = (count) => {
    tableDetails.columnCount = count;
}

const setTableData = (data) => {
    tableDetails.data = data;
}

module.exports = class Print {
    constructor(view, manager) {
        this.view = view;
        this.manager = manager;
    }

    canProcess(command) {
        return command.startsWith('print ');
    }

    process(input) {
        try {
            const command = input.split(' ');
            validateCommand(command)
            const tableName = command[1];
            setTableData(this.manager.getTableData(tableName))
            let tableString;
            if (isEmptyTable()) {
                const emptyTableHeader = getEmptyTabelHeader(tableName);
                setMaxColumnSize(emptyTableHeader.length - 2);
                setColumnCount(1);
                tableString = getEmptyTableString(emptyTableHeader);
            } else {
                setMaxColumnSize(adjustMaxCoulmnSize(getMaxColumnSize()));
                setColumnCount(getColumnCount());
                tableString = getTableString()
            }
            this.view.write(tableString);
        } catch (e) {
            console.log(`Error : ${e}`);
            throw e;
        }
    }
};
