import { Op } from 'sequelize';
import { startOfDay, endOfDay, parseISO } from 'date-fns';
import * as Yup from 'yup';

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

        let where = {
            end_date: null, 
            canceled_at: null,
            deliveryman_id: id
        };

        if ( delivered ) {
            where = {
                end_date: {
                    [Op.ne]: null
                }, 
                deliveryman_id: id
            };
        }

        const orders = await Order.findAll({ where });

        return res.json(orders);
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            start_date: Yup.date().required(),
            end_date: Yup.date(),
            signature_id: Yup.number(),
        });


        if ( !(await schema.isValid(req.body)) ) {
            return res.status(401).json({
                error: 'Validation fails.'
            });
        }

        const { id } = req.params;

        const order = await Order.findByPk(id);

        if ( !order ) {
            return res.status(401).json({
                error: 'Order does not exists.'
            });
        }

        if ( order.end_date && order.signature_id ) {
            return res.status(401).json({
                error: 'This order already delivered.'
            });
        }

        const today = new Date();

        const countWithdrawal = await Order.count({
            where: { 
                start_date: {
                    [Op.between]: [
                        startOfDay(today),
                        endOfDay(today)
                    ]
                } 
            }
        });

        if ( countWithdrawal >= 5 ) {
            return res.status(401).json({
                error: 'You can do just 5 withdawals'
            });
        }

        const orderUpdated = await order.update(req.body);

        return res.json(orderUpdated); 
    }
}

export default new DeliveryController();
