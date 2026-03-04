'use strict';

var dbm;
var type;
var seed;

exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db, callback) {
  db.addColumn('users', 'googleId', { type: 'string', length: 255, nullable: true }, function(err) {
    if (err) return callback(err);
    db.alterColumn('users', 'password', { type: 'string', length: 255, nullable: true }, callback);
  });
};

exports.down = function(db, callback) {
  db.removeColumn('users', 'googleId', function(err) {
    if (err) return callback(err);
    db.alterColumn('users', 'password', { type: 'string', length: 255, nullable: false }, callback);
  });
};

exports._meta = {
  "version": 1
};
