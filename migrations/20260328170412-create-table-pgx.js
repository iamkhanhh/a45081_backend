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
	db.createTable('PGx', {
		id: {
			type: 'int',
			primaryKey: true,
			unique: true,
			autoIncrement: true,
			length: 11
		},
    rsid: {
			type: 'string',
			length: '255'
		},
    gene: {
			type: 'string',
			length: '255'
		},
    evidence: {
			type: 'string',
			length: '255'
		},
    clinical_annotation_types: {
			type: 'string',
			length: '255'
		},
    related_chemicals: {
			type: 'string',
			length: '255'
		},
    drug_response_category: {
			type: 'string',
			length: '255'
		},
    related_diseases: {
			type: 'string',
			length: '255'
		},
    annotation_text: {
			type: 'text',
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
	db.dropTable('PGx', callback);
};

exports._meta = {
  "version": 1
};
