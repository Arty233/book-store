export class User {
    name: string;
    email: string;
    phoneNumber: string;
    address: string;
    constructor(name: string, email: string, phoneNumber: string, address: string) {
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.address = address;
    }
}