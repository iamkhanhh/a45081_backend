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
	db.createTable('gene_clinical_synopsis', {
		id: {
      type: 'int',
      primaryKey: true,
      unique: true,
      autoIncrement: true,
      size: 11
    },
    gene_omim: {
      type: 'string',
      size: 255
    },
    gene_name: {
      type: 'string',
      size: 255
    },
    pheno_omim: {
      type: 'string',
      size: 255
    },
    pheno_name: {
      type: 'string',
      size: 255
    },
    location: {
      type: 'string',
      size: 255
    },
		createdAt: {
			type: 'timestamp',
			defaultValue: new String('CURRENT_TIMESTAMP')
		},
		updatedAt: {
			type: 'timestamp',
			defaultValue: new String('CURRENT_TIMESTAMP')
		}
	}, callback);
};

exports.down = function(db, callback) {
	db.dropTable('gene_clinical_synopsis', callback);
};

exports._meta = {
  "version": 1
};
