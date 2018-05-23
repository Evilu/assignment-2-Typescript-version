//==========================================================================================================
//other files request
//==========================================================================================================
import Group from './group';
//==========================================================================================================
//Root class
//==========================================================================================================

class groups {
    public root = new Group('root');
    constructor() {

    }


    addUsers(children,user) {
        if (children in this.root) {
            return this.root[children].welcome(user)
        }
        return false
    }

    DelUsers(children, user) {
        if (children in this.root) {
            return this.root[children].kick(user)
        }
        return false
    }

    displayGroups(){
        let root = this.root;
        let depth = '-';
        recurse( root );
        function recurse( root) {
            depth +='-';
            console.log(depth+root.name);

            for (let child in root.children ) {
                recurse(root.children[child]);
            }
            depth  = depth.slice(0, -1);
        }
    }

    removeByName(name){
        this.root.removeByName(name)
    }


    findGroupByName(name) {
        if (!name) return null;
        return this._findGroupByNameInternal(this.root, name);
    }


    _findGroupByNameInternal(group, name) {
        if (!group) return null;
        if (group.name === name) return group;
        for (const g of group.children) {
            const result = this._findGroupByNameInternal(g, name);
            if (!result) continue;
            return result;
        }
    }

}

export default groups;