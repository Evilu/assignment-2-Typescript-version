"use strict";
//==========================================================================================================
//Other files request
//==========================================================================================================
Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = require("./user");
//==========================================================================================================
//==========================================================================================================
//users constructor
//==========================================================================================================
var Users = /** @class */ (function () {
    function Users() {
        this.users = [];
    }
    Users.prototype.MakeUser = function (name, password, age) {
        if (!(name in this.users)) {
            this.users[name] = new user_1.default(name, password, age);
            return true;
        }
        return false;
    };
    Users.prototype.FindAge = function (name) {
        return this.users[name] || null;
    };
    Users.prototype.FindPass = function (password) {
        return this.users[password] || null;
    };
    Users.prototype.NameUser = function (name) {
        if (name in this.users) {
            return this.users[name];
        }
        return null;
    };
    Users.prototype.PushAllusers = function () {
        var clientarr = [];
        for (var name_1 in this.users) {
            clientarr.push(this.users[name_1]);
        }
        return clientarr;
    };
    Users.prototype.EraseUser = function (name) {
        if (name in this.users) {
            delete this.users[name];
            return true;
        }
        return false;
    };
    return Users;
}());
//==========================================================================================================
exports.default = Users;
