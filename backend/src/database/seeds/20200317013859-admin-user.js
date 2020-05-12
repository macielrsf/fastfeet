'use strict';

const bcrypt = require("bcryptjs");

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            'users', [{
                name: "Distribuidora FastFeet",
                email: "admin@fastfeet.com",
                admin: true,
                password_hash: bcrypt.hashSync("123456", 8),
                created_at: new Date(),
                updated_at: new Date()
            }]
        )
    },

    down: (queryInterface, Sequelize) => {}
};
