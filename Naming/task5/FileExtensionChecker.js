module.exports = class FileExtensionChecker {
    constructor(fileExtensions) {
        this.fileExtensions = fileExtensions;
    }

    hasValidExtension(fileName) {
        return this.fileExtensions.some((extension) => {
            return fileName.toLowerCase().endsWith(extension);
        });
    }
};
