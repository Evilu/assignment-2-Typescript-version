//==========================================================================================================
//User constructor
//==========================================================================================================
class User {
    name:string;
    password: string;
    age: string;

    constructor(name, password, age) {
        this.name = name;
        this.password = password;
        this.age = age;
    }
}
//==========================================================================================================

export default User;