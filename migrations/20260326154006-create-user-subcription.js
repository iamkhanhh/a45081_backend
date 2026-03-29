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
    CREATE TABLE user_subscriptions (
      id          INT AUTO_INCREMENT PRIMARY KEY,
      user_id     INT UNIQUE NOT NULL,
      plan_id     INT NOT NULL,
      order_id    INT NOT NULL,
      start_date  DATETIME NOT NULL,
      end_date    DATETIME NOT NULL,
      is_active   TINYINT(1) NOT NULL DEFAULT 1,
      createdAt   DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt   DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      CONSTRAINT fk_user_subscriptions_user  FOREIGN KEY (user_id)  REFERENCES users(id),
      CONSTRAINT fk_user_subscriptions_plan  FOREIGN KEY (plan_id)  REFERENCES subscription_plans(id),
      CONSTRAINT fk_user_subscriptions_order FOREIGN KEY (order_id) REFERENCES payment_orders(id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);
};

exports.down = function (db) {
  return db.runSql('DROP TABLE IF EXISTS user_subscriptions;');
};


exports._meta = {
  "version": 1
};
