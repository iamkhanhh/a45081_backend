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
    CREATE TABLE payment_orders (
      id              INT AUTO_INCREMENT PRIMARY KEY,
      order_code      BIGINT UNIQUE NOT NULL, 
      user_id         INT NOT NULL,
      plan_id         INT NOT NULL,
      amount          INT NOT NULL,
      description     VARCHAR(255),
      status          ENUM('PENDING', 'PAID', 'CANCELLED', 'EXPIRED') NOT NULL DEFAULT 'PENDING',
      checkout_url    VARCHAR(512),
      payment_link_id VARCHAR(255),
      paid_at         DATETIME,
      createdAt       DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt       DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      CONSTRAINT fk_payment_orders_user   FOREIGN KEY (user_id) REFERENCES users(id),
      CONSTRAINT fk_payment_orders_plan   FOREIGN KEY (plan_id) REFERENCES subscription_plans(id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);
};

exports.down = function (db) {
  return db.runSql('DROP TABLE IF EXISTS payment_orders;');
};

exports._meta = {
  "version": 1
};
