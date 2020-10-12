import express from 'express';
import { Session } from '../logic/session';

var router = express.Router();

router.route('/', function(req, res) {
    if (!req.session.user) {
        req.session.user = new Session();
    }
});

module.exports = router;