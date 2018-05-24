"use strict";
//==========================================================================================================
//files requests
//==========================================================================================================
//import users from './users';
//import groups from './groups';
//==========================================================================================================
Object.defineProperty(exports, "__esModule", { value: true });
//==========================================================================================================
//Tree class
//==========================================================================================================
var Group = /** @class */ (function () {
    function Group(name, parent) {
        this.name = name;
        this.parent = parent || null;
        this.children = [];
        this.users = {};
    }
    Group.prototype.welcome = function (user) {
        if (!(user.name in this.users)) {
            this.users[user.name] = user;
            return true;
        }
        return false;
    };
    Group.prototype.kick = function (user) {
        if (user.name in this.users) {
            delete this.users[user.name];
            return true;
        }
        return false;
    };
    Group.prototype.setChildren = function (child) {
        this.children.push(child);
    };
    Group.prototype.removeByName = function (name) {
        var index = this.children.findIndex(function (g) { return g.name === name; });
        if (index > -1) {
            this.children.splice(index, 1);
            console.log("removed " + name + " from " + this.name);
        }
        else {
            this.children.forEach(function (child) { return child.removeByName(name); });
        }
    };
    Group.prototype.PushAllusers = function () {
        var PeopleArray = [];
        for (var userName in this.users) {
            PeopleArray.push(this.users[userName]);
        }
        return PeopleArray;
    };
    return Group;
}());
//==========================================================================================================
exports.default = Group;
