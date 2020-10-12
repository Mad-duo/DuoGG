'use strict';

class User {
    constructor(props) {
        super(props);

        this.id = props.id;
        this.accountId = props.accountId;
        this.leagueId = props.leagueId;
        this.puuid = props.puuid;
        this.name = props.name;
        this.level = props.level;
        this.tier = props.tier;
        this.rank = props.rank;
    }

    IsValid() {
        return (this.id != "" && typeof this.id == "string")
            && (this.accountId != "" && typeof this.accountId == "string") 
            && (this.leagueId != "" && typeof this.leagueId == "string")
            && (this.puuid != "" && typeof this.puuid == "string")
            && (this.name != "" && typeof this.name == "string")
            && (this.level > 0 && typeof this.level == "number")
            && (this.tier > 0 && typeof this.tier == "number")
            && (this.rank > 0 && typeof this.rank == "number");
    }
};

class UserManager {
    constructor() {
        this.users = [];
    }

    Enter(userProps) {
        var newUser = new User(userProps);
        
        if (newUser.IsValid() == false) {
            throw "invalid user";
        }

        if (this.users.find(x => x.id == userProps.id)) {
            throw "alreay enter user";
        }

        this.users.push(newUser);
    }

    Leave(userId) {
        if (!this.users.find(x => x.id == userId)) {
            throw "not found user";
        }

        var index = this.users.findIndex(x => x.id == userId);
        this.users.splice(index, 1);
    }

    GetUser(userId) {
        var foundUser = this.users.find(x => x.id == userId);
        if (!foundUser) {
            throw "not found user";
        }

        return foundUser;
    }
};

var gUserManager = new UserManager();

exports.User = User;
exports.UserManager = gUserManager;