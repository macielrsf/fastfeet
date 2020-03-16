import Sequelize, { Model } from 'sequelize';
import bcypt from 'bcryptjs';

class User extends Sequelize {
    static init(sequelize) {
        super.init({
            name: Sequelize.STRING,
            email: Sequelize.STRING,
            password: Sequelize.VIRTUAL,
            password_hash: Sequelize.STRING,
            admin: Sequelize.BOOLEAN
        }, {
            sequelize
        });

        this.addHook('beforeSave', async(user) => {
            if ( user.password ) {
                user.password_hash = await bcrypt.hash(user.password, 8);
            }
        });

        return this;
    }

    checkPassword(password) {
        return bcryptjs.compare(password, this.password_hash);
    }
}
