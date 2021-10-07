const path = require('path');
const fs = require('fs');

const PropertyUtil = require('./lib/PropertyUtil');
const InvalidFileTypeError = require('./lib/InvalidFileTypeError');
const InvalidDirectoryException = require('./lib/InvalidDirectoryException');
const FileExtensionChecker = require('./FileExtensionChecker');

const IMAGE_EXTENSIONS = ['jpg', 'png'];
const DOCUMENT_EXTENTIONS = ['pdf', 'doc'];

module.exports = class FileManager {
    constructor() {
        this.basePath = PropertyUtil.loadProperty('basePath');
    }

    getFile(fileName) {
        this.isValidFileType(fileName);
        const fileAbsolutePath = this.basePath + path.sep;
        return path.resolve(fileAbsolutePath, fileName);
    }

    getAllImages() {
        return this.getAllSupportedFiles(this.basePath, IMAGE_EXTENSIONS);
    }

    getAllDocumentFiles() {
        return this.getAllSupportedFiles(this.basePath, DOCUMENT_EXTENTIONS);
    }

    isValidFileType(fileName) {
        if (!this.isValidFileType(fileName)) {
            throw new InvalidFileTypeError('File type not Supported: ' + fileName);
        }
    }

    isValidFileType(fileName) {
        return this.isValidImage(fileName) && this.isValidDocument(fileName);
    }

    isValidImage(fileName) {
        const imageExtensionsPredicate = new FileExtensionChecker(IMAGE_EXTENSIONS);
        return !imageExtensionsPredicate.hasValidExtension(fileName);
    }

    isValidDocument(fileName) {
        const documentExtensionsPredicate = new FileExtensionChecker(DOCUMENT_EXTENTIONS);
        return documentExtensionsPredicate.hasValidExtension(fileName);
    }

    getAllSupportedFiles(directoryPath, allowedExtensions) {
        const fileExtensionChecker = new fileExtensionChecker(allowedExtensions);
        return this.readDirSync(directoryPath).filter((path) => {
            return fileExtensionChecker.hasValidExtension(path);
        });
    }

    readDirSync(directoryPath) {
        const direcotryStats = fs.statSync(directoryPath);
        this.isValidateDirectory(direcotryStats, directoryPath);
        return fs.readdirSync(directoryPath);
    }

    isValidateDirectory(stats, directoryPath) {
        if (!this.isDirectory(stats)) {
            throw new InvalidDirectoryException('Invalid directory found: ' + directoryPath);
        }
    }

    isDirectory(stats) {
        return stats.isDirectory();
    }
};
