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
	db.createTable('analysis', {
		id: {
			type: 'int',
			primaryKey: true,
			unique: true,
			autoIncrement: true,
			length: 11
		},
		name: {
			type: 'string',
			length: '255'
		},
		user_id: {
			type: 'int',
			length: '11'
		},
		data_type: {
			type: 'int'
		},
		control: {
			type: 'string'
		},
		genotype: {
			type: 'string'
		},
    igv_local_path: {
			type: 'string'
		},
    sample_id: {
			type: 'int'
		},
    project_id: {
			type: 'int'
		},
    p_type: {
			type: 'string'
		},
    analyzed: {
			type: 'timestamp'
		},
    variants: {
			type: 'int'
		},
    size: {
			type: 'bigint'
		},
    status: {
			type: 'int'
		},
    variants_to_report: {
			type: 'text'
		},
    file_path: {
			type: 'string'
		},
    description: {
			type: 'text'
		},
    is_deleted: {
			type: 'int'
		},
    pipeline_id: {
			type: 'int'
		},
    upload_id: {
			type: 'int'
		},
    assembly: {
			type: 'string'
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
	db.dropTable('analysis', callback);
};

exports._meta = {
  "version": 1
};
