'use strict';

const Line = Object.freeze({
    Any: 0,
    Top: 1,
    Junggle: 2,
    Middle: 3,
    Bottom: 4,
    Support: 5,
    Count: 6
});

class MatchingOptions {
    constructor (props) {
        super(props);

        this.myLines = [];
        this.partnerLines = [];
    }
}

class MatchingUser {
    constructor(props) {
        super(props);

        this.userId = props.userId;
        this.options = props.options;
    }

    IsValid() {
        return (this.userId != "" && typeof this.userId == "string")
            && (this.options != undefined && typeof this.options == "MatchingOptions")
    }
}

class MatchingPool {
    constructor(props) {
        super(props);

        this.tier = props.tier;
        this.rank = props.rank;
        this.userPool = [];
    }

    Push(userId) {
        if (!userId || typeof userId == "string") {
            throw "please check userId parameter";
        }

        if (this.userPool.find(userId)) {
            throw "alreay include user";
        }

        this.userPool.push(userId);
    }

    Pop() {
        if (this.Empty()) {
            throw "emtpy pool";
        }

        return this.userPool.pop();
    }

    Empty() {
        return this.userPool.length == 0;
    }
}

class MatchingRoom {
    constructor(props) {
        super(props);

        this.roomId = props.roomId;
        this.tier = props.tier;
        this.rank = props.rank;
        this.usersId = [];
    }

    Enter(userId) {
        if (!userId || typeof userId != "string") {
            throw "please check userId parameter";
        }

        if (this.usersId.find(userId)) {
            throw "alreay enter user";
        }

        this.usersId.push(userId);
    }

    Leave(userId) {
        if (!userId || typeof userId != "string") {
            throw "please check userId parameter";
        }

        if (!this.usersId.find(userId)) {
            throw "not found user";
        }

        var index = this.usersId.findIndex(userId);
        this.usersId.splice(index, 1);
    }

    Exists(userId) {
        return !!this.usersId.find(userId);
    }
}

class MatchingSystem {
    constructor(props) {
        super(props);

        this.matchingUsers = [];
        this.poolbyLine = [];

        for (var index = 0; index < Line.Count; ++index) {
            this.poolbyLine.push(new MatchingPool());
        }
    }

    RegisterUser(userId, options) {
        if (!userId || typeof userId != "string") {
            throw "please check userId parameter";
        }

        if (!options || typeof options != "MatchingOptions") {
            throw "please check options parameter";
        }

        if (this.matchingUsers.find(x => x.userId == userId)) {
            throw "alreay matching";
        }

        var lines = this.poolbyLine;
        
        options.myLines.forEach(lineIndex => {
            lines[lineIndex].Enter(userId);
        });

        this.matchingUsers.push(new MatchingUser(userId, options));
    }

    UnregisterUser(userId) {
        if (!userId || typeof userId != "string") {
            throw "please check userId parameter";
        }

        this.poolbyLine.forEach(line => {
            if (line.Exists(userId) == false) {
                return;
            }

            line.Leave(line);
        });

        var index = this.matchingUsers.findIndex(x => x.userId == userId);
        if (index == -1) {
            console.error("unregister user: not found matching user");
            return;
        }

        this.matchingUsers.splice(index, 1);
    }

    Match() {
        if (this.matchingUsers.length == 0) {
            return null;
        }

        // TODO: 구현 가자
        return null;   
    }
}