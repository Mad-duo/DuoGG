'use strict';

class Session {
    constructor(props) {
        this.sessionId = props.sessionId;
        this.userId = props.userId;
    }
}

exports.Session = Session;