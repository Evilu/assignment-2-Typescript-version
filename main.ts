import Users from './Programfiles/Users';
import Groups from './programfiles/groups';
import Group from './programfiles/group';
//==========================================================================================================
//Readline and System files
//==========================================================================================================
import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});



const programdata = {
    users: new Users(),
    groups: new Groups()
};
//==========================================================================================================
//Main Menu Controller
//==========================================================================================================
(function start() {
    const  menu = {
        main: [
            {
                name: 'Clients Settings',
                menu: 'users'
            }, {
                name: 'Chat room Settings',
                menu: 'groups'
            }, {
                name: 'options',
                menu: 'otherSettings'
            },{
                name: 'Exit program',
                function: quit
            }
        ],
        users: [
            {
                name: 'Client options',
                menu: 'ClientOptions'
            }, {
                name: 'See who is logged to the system:',
                function: showUsers,
            }
        ],
        ClientOptions: [
            {
                name: 'Create client',
                function: createClient
            }, {
                name: 'Remove client',
                function: RemoveClient
            },{
                name: 'Change age of a client',
                function: setClientAge
            },{
                name: 'Change password of a client',
                function: setClientPassword
            }
        ],
        groups: [
            {
                name: 'add or delete group[s]',
                menu: 'groupsSettings'
            }, {
                name: 'show all groups',
                function: showGroups
            }
        ],
        groupsSettings: [
            {
                name: 'Make new group',
                function: createGroup
            }, {
                name: 'Remove a group',
                function: removeGroup
            },
        ],
        otherSettings: [
            {
                name: 'Add or remove client to/from a group',
                menu: 'addOrRemoveClientFromGroup'
            }, {
                name: 'Show list of users in groups',
                function: showListOfUsersInGroups
            }
        ],
        addOrRemoveClientFromGroup: [
            {
                name: 'Add user to group',
                function: addUserToGroup
            }, {
                name: 'Remove user from group',
                function: removeUserFromGroup
            }
        ]
    };
//==========================================================================================================
//Menu Handler Functions
    //==========================================================================================================
    function createClient(callback) {
        rl.question('Choose Nickname: \n', (name) => {
            rl.question('Choose Password: \n', (password) => {
                rl.question('What is your Age? \n', (age) => {
                    programdata.users.MakeUser(name, password, age);
                    callback()
                })
            })
        })
    }

    function RemoveClient(callback) {
        rl.question('Choose Nickname: \n', (username) => {
            (programdata.users.EraseUser(username))

            {
                console.log('done!')
            }

            callback()
        })
    }

    function setClientAge(callback) { //for user update
        rl.question('which client would you like to change \n', (name) => {
            var user = programdata.users.FindAge(name);
            if (!user) {
                console.log('Sorry no such user found!');

                return callback();
            }

            rl.question('Please enter the new age of the user \n', function (age) {
                user.age = age;

                console.log("Done!");
                callback();
            });
        })
    }

    function setClientPassword(callback) { //for user update
        rl.question('which client would you like to change \n', (password) => {
            var user = programdata.users.FindPass(password);
            if (!user) {
                console.log('Sorry no such user found!');

                return callback();
            }

            rl.question('Please enter the new password of the user \n', function (password) {
                user.password = password;

                console.log("Done!");
                callback();
            });
        })
    }

    function showUsers(callback) {
        const users = programdata.users.PushAllusers();
        users.map(user => console.log("Logged User:",user.name,'age:', '(',user.age,')','user password:',user.password));
        callback()
    }

    function createGroup(callback) {
        rl.question('Add name for father group: \n', (parent) => {
            let parentGroup = programdata.groups.findGroupByName(parent);
            if (!parentGroup) {parentGroup = programdata.groups.root;}
            rl.question('name of new group\n', (groupName) => {
                let isGroupNameUnique = true;
                parentGroup.children.forEach((child) => {
                    if (child.name !== groupName) return;
                    isGroupNameUnique = false;});
                if (!isGroupNameUnique) {
                    console.log("Group name is not unique under parent group", parent);
                    return callback();}
                parentGroup.setChildren(new Group(groupName, parentGroup));
                callback();
            });
        })
    }

    function removeGroup(callback) {
        rl.question('Enter group name to delete: \n', (groupName) => {
            programdata.groups.removeByName(groupName);

            callback()
        })
    }

    function showGroups(callback) {
        rl.question('Press Enter to show full tree: \n', () => {
            programdata.groups.displayGroups();
            callback()
        })


    }

    function addUserToGroup(callback) {
        rl.question('Which user to add?: \n', (username) => {
            rl.question('To  which Group?: \n', (groupName) => {
                const user = programdata.users.NameUser(username);
                if (user) {
                    programdata.groups.addUsers( groupName,user);
                }
                console.log(user, 'was added to Group:',groupName);
                callback()
            })
        })
    }

    function removeUserFromGroup(callback) {
        rl.question('From which Chatroom you want to delete? \n', (groupName) => {
            rl.question('Which user to delete from Chatroom?: \n', (user) => {
                programdata.groups.DelUsers(groupName,user);
                console.log(user, 'was deleted from Group:',groupName);
                callback()
            })
        })
    }

    function showListOfUsersInGroups(callback) {

        callback()
    }
//==========================================================================================================
//Menu Controllers
    //==========================================================================================================
    function ShowMenu(menuName?) {
        const currMenu = menu[menuName || 'main'];

        rl.question(initializemenu(currMenu), (answer) => {
            questionCallback(answer, currMenu)
        })
    }

    function initializemenu(menu) {
        return menu.reduce((prevStr, choice, index) => {
            return prevStr + '[' + (index + 1) + '] ' + choice.name + '\n'
        }, '')
    }

    function questionCallback(answer, prevMenu) {
        answer = +answer;
        if (!!answer && answer > 0 && answer <= prevMenu.length) {
            const selectedChoice = prevMenu[answer - 1];
            console.log(selectedChoice.name);
            if (selectedChoice.menu) {
                ShowMenu(selectedChoice.menu)
            } else {
                selectedChoice.function(ShowMenu)
            }
        } else {
            console.log('No such a command, please try again');
            ShowMenu()
        }
    }

    function ReturnToMain(menu) {
        for (const menuName in menu) {
            if (menuName !== 'main') {
                menu[menuName].push({
                    name: 'Return to Main',
                    menu: 'main'
                })
            }
        }
    }

    function quit() {process.exit(1)}

    ShowMenu();
    ReturnToMain(menu);
})();

//==========================================================================================================


