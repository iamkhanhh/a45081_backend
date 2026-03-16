exports.up = function (db) {
    return db.createTable('report', {
        id: {
            type: 'int',
            primaryKey: true,
            autoIncrement: true,
            notNull: true
        },

        analysis_id: {
            type: 'int',
            notNull: true
        },

        report_name: {
            type: 'string',
            length: 255,
            notNull: true
        },

        file_path: {
            type: 'string',
            length: 500,
            notNull: true
        },
        user_created: {
            type: 'int',
            length: '11'
        },
        createdAt: {
            type: 'datetime',
            defaultValue: new String('CURRENT_TIMESTAMP')

        },

        updatedAt: {
            type: 'datetime',
            defaultValue: new String('CURRENT_TIMESTAMP')
        },

        is_deleted: {
            type: 'int'
        }
    });
};

exports.down = function (db) {
    return db.dropTable('report');
};