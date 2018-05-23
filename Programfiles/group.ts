//==========================================================================================================
//files requests
//==========================================================================================================
import users from './users';
import groups from './groups';
//==========================================================================================================

//==========================================================================================================
//Tree class
//==========================================================================================================

class Group {
    constructor(name, parent) {
        this.name = name;
        this.parent = parent || null;
        this.children = [];
        this.users = {}
    }

    welcome(user) {
        if (!(user.name in this.users)) {
            this.users[user.name] = user
            return true
        }
        return false
    }

    kick(user) {
        if (user.name in this.users) {
            delete this.users[user.name]
            return true
        }
        return false
    }


    setChildren(child) {
        this.children.push(child);
    }


    removeByName(name){
        let index = this.children.findIndex(g => g.name === name)
        if (index > -1) {
            this.children.splice(index, 1)
            console.log(`removed ${name} from ${this.name}`)
        } else {
            this.children.forEach(child => child.removeByName(name))
        }

    }

    PushAllusers() {
        const PeopleArray = [];
        for (const userName in this.users) {
            PeopleArray.push(this.users[userName]);
        }
        return PeopleArray
    }


}
//==========================================================================================================

export default Group;
