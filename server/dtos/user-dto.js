module.exports = class UserDto {
    email;
    id;
    role;
    fistName;
    secondName;
    middleName;

    constructor(model) {
        this.email = model.email;
        this.id = model.id;
        this.role = model.role;
        this.fistName = model.fistName;
        this.secondName = model.secondName;
        this.middleName = model.middleName;
    }
}
