module.exports = class User {
    constructor(name) {
        this.dateOfBirth;
        this.name = name;
        this.isAdmin = false;
        this.subOrdinates = [];
        this.rating;
    }

    toString() {
        return `User : [
            dateOfBirth= ${this.dateOfBirth},
            name= ${this.name},
            isAdmin= ${this.isAdmin},
            subOrdinates= ${this.subOrdinates},
            rating= ${this.rating}
        ]`;
    }
};
