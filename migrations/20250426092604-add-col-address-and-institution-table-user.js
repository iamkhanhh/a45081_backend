'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db, callback) {
	db.addColumn("users", "address", { type: 'string' }, callback);
	db.addColumn("users", "institution", { type: 'string' }, callback);
};

exports.down = function (db, callback) {
	db.removeColumn("users", "address", callback);
	db.removeColumn("users", "institution", callback);
};

exports._meta = {
  "version": 1
};
