//==========================================================================================================
//Other files request
//==========================================================================================================

import User from './user';
//==========================================================================================================
//==========================================================================================================
//users constructor

//==========================================================================================================

class Users {
    users: User[];
    constructor() {

        this.users = [];
    }

    MakeUser(name, password, age) {
        if (!(name in this.users)) {
            this.users[name] = new User(name, password, age)
            return true
        }
        return false
    }

    FindAge(name) {
        return this.users[name] || null;
    }
    FindPass(password) {
        return this.users[password] || null


    }

    NameUser(name) {
        if (name in this.users) {
            return this.users[name]
        }
        return null
    }

    PushAllusers() {
        const clientarr = []
        for (const name in this.users) {
            clientarr.push(this.users[name])
        }
        return clientarr
    }
    EraseUser(name) {
        if (name in this.users) {
            delete this.users[name]
            return true
        }
        return false
    }

}
//==========================================================================================================
export default Users;