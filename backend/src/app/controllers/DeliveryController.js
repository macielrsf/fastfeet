import { Op } from 'sequelize';
import Deliveryman from '../models/Deliveryman';
import Order from '../models/Order';

class DeliveryController {
    async show(req, res) {
        const { id } = req.params;
        const { delivered } = req.query;

        const deliveryman = await Deliveryman.findByPk(id);

        if ( !deliveryman ) {
            return res.status(401).json({
                error: 'Deliveryman does not exists.'
            });
        }

        let orders = [];

        if ( delivered ) {
            orders = await Order.findAll({
                where: { 
                    end_date: {
                        [Op.ne]: null
                    }, 
                    deliveryman_id: id
                }
            });
        }
        else {
            orders = await Order.findAll({
                where: { 
                    end_date: null, 
                    canceled_at: null,
                    deliveryman_id: id
                }
            });
        }

        return res.json(orders);
    }

    async update(req, res) {

    }
}

export default new DeliveryController();
