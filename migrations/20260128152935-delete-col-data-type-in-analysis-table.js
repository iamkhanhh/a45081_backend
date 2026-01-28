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

exports.up = function(db, callback) {
  db.removeColumn("analysis", "data_type", callback);
  db.removeColumn("analysis", "control", callback);
  db.removeColumn("analysis", "genotype", callback);
};

exports.down = function(db, callback) {
  db.addColumn("analysis", "data_type", { type: 'int' }, callback);
  db.addColumn("analysis", "control", { type: 'string' }, callback);
  db.addColumn("analysis", "genotype", { type: 'string' }, callback);
};

exports._meta = {
  "version": 1
};
