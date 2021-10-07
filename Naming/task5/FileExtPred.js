module.exports = class FileExtPred {
    constructor(extns) {
        this.extns = extns;
    }

    test(fileName) {
        return this.extns.some((extn) => {
            return fileName.toLowerCase().endsWith(extn);
        });
    }
};
