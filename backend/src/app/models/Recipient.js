import Sequelize, { Model } from 'sequelize';

class Recipient extends Model {
    static init(sequelize) {
        super.init({
            name: Sequelize.STRING,
            street: Sequelize.STRING,
            number: Sequelize.INTEGER,
            complement: Sequelize.STRING,
            district: Sequelize.STRING,
            city: Sequelize.STRING,
            state: Sequelize.STRING,
            complete_address: {
                type: Sequelize.VIRTUAL,
                get() {
                    return this.getCompleteAddress();
                }
            }
        }, {
            sequelize
        });

        return this;
    }

    getCompleteAddress() {
        let address = `${this.street}, ${this.number}`;

        if ( this.complement ) {
            address += ` (${this.complement})`;
        }

        address += ` , ${this.district} - ${this.city}, ${this.state}`;

        return address;
    }
}

export default Recipient;
