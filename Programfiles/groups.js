"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//==========================================================================================================
//other files request
//==========================================================================================================
var group_1 = require("./group");
//==========================================================================================================
//Root class
//==========================================================================================================
var groups = /** @class */ (function () {
    function groups() {
        this.root = new group_1.default('root', null);
    }
    groups.prototype.addUsers = function (children, user) {
        if (children in this.root) {
            return this.root[children].welcome(user);
        }
        return false;
    };
    groups.prototype.DelUsers = function (children, user) {
        if (children in this.root) {
            return this.root[children].kick(user);
        }
        return false;
    };
    groups.prototype.displayGroups = function () {
        var root = this.root;
        var depth = '-';
        recurse(root);
        function recurse(root) {
            depth += '-';
            console.log(depth + root.name);
            for (var child in root.children) {
                recurse(root.children[child]);
            }
            depth = depth.slice(0, -1);
        }
    };
    groups.prototype.removeByName = function (name) {
        this.root.removeByName(name);
    };
    groups.prototype.findGroupByName = function (name) {
        if (!name)
            return null;
        return this._findGroupByNameInternal(this.root, name);
    };
    groups.prototype._findGroupByNameInternal = function (group, name) {
        if (!group)
            return null;
        if (group.name === name)
            return group;
        for (var _i = 0, _a = group.children; _i < _a.length; _i++) {
            var g = _a[_i];
            var result = this._findGroupByNameInternal(g, name);
            if (!result)
                continue;
            return result;
        }
    };
    return groups;
}());
exports.default = groups;
