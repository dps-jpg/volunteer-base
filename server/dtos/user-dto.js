module.exports = class UserDto {
    email;
    id;
    role;
    firstName;
    secondName;
    middleName;

    constructor(model) {
        this.email = model.email;
        this.id = model.id;
        this.role = model.role;
        this.firstName = model.firstName;
        this.secondName = model.secondName;
        this.middleName = model.middleName;
    }
}
