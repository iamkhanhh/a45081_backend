'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db) {
  return db.runSql(`
    CREATE TABLE subscription_plans (
      id                   INT AUTO_INCREMENT PRIMARY KEY,
      plan_type            ENUM('STANDARD', 'PREMIUM') NOT NULL UNIQUE,
      name                 VARCHAR(100) NOT NULL,
      price                INT NOT NULL,
      duration             INT NOT NULL DEFAULT 30,
      daily_upload_limit   INT NOT NULL,
      daily_analysis_limit INT NOT NULL,
      features             JSON,
      is_active            TINYINT(1) NOT NULL DEFAULT 1,
      createdAt            DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt            DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);
};

exports.down = function (db) {
  return db.runSql('DROP TABLE IF EXISTS subscription_plans;');
};

exports._meta = {
  "version": 1
};
