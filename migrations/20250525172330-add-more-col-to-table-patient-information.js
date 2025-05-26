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
	db.addColumn("patients_information", "gender", { type: 'string' }, callback);
	db.addColumn("patients_information", "ethnicity", { type: 'string' }, callback);
	db.addColumn("patients_information", "sample_type", { type: 'string' }, callback);
};

exports.down = function (db, callback) {
	db.removeColumn("patients_information", "gender", callback);
	db.removeColumn("patients_information", "ethnicity", callback);
	db.removeColumn("patients_information", "sample_type", callback);
};

exports._meta = {
  "version": 1
};
