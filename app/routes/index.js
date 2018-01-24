const TrackerRouter = require('./Tracker_routes');

module.exports = function(app, db) {
    TrackerRouter(app, db);
};
