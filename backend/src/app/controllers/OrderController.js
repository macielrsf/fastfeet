import * as Yup from 'yup';

import Order from '../models/Order';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';

import NewOrderMail from '../jobs/NewOrderMail';

import Queue from '../../lib/Queue';

class OrderController {
    async index(req, res) {
        const orders = await Order.findAll({
            where: { canceled_at: null }
        });

        return res.json(orders);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            recipient_id: Yup.number().required(),
            deliveryman_id: Yup.number().required(),
            product: Yup.string().required(),
        });

        if ( !(await schema.isValid(req.body)) ) {
            return res.json({ error: 'Validation fails.' });
        }

        let order = await Order.create(req.body);

        order = await Order.findByPk(order.id, {
            include: [{
                model: Deliveryman,
                as: 'deliveryman',
                attributes: ['name', 'email']
            }, {
                model: Recipient,
                as: 'recipient',
            }],
        });

        await Queue.add(NewOrderMail.key, {
            order,
        })

        return res.json(order);
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            recipient_id: Yup.number().required(),
            deliveryman_id: Yup.number().required(),
            product: Yup.string().required(),
        });

        if ( !(await schema.isValid(req.body)) ) {
            return res.json({ error: 'Validation fails.' });
        }

        const { id } = req.params;

        const order = await Order.findByPk(id, {
            include: [{
                model: Deliveryman,
                as: 'deliveryman',
                attributes: ['name']
            }]
        });

        if ( !order ) {
            return res.status(400).json({
                error: 'Order does not exists.'
            });
        }

        if ( order.start_date && (order.deliveryman_id !== req.body.deliveryman_id) ) {
            return res.status(401).json({
                error:  `You can not change the deliveryman, because ${order.deliveryman.name} already catch this order.`
            });
        }

        const { 
            recipient_id, 
            deliveryman_id, 
            product, 
            created_at, 
            updated_at,
        } = await order.update(req.body);

        return res.json({
            recipient_id, 
            deliveryman_id, 
            product, 
            created_at, 
            updated_at,
        });
    }

    async destroy(req, res) {
        const order = await Order.findByPk(req.params.id, {
            include: [{
                model: Deliveryman,
                as: 'deliveryman',
                attributes: ['name']
            }]
        });

        if ( !order ) {
            return res.status(400).json({ error: 'Order does not exists.' });
        }

        if ( order.start_date ) {
            return res.status(401).json({
                error: `You can not delete the deliveryman, because ${order.deliveryman.name} already catch this order.`
            });
        }

        await order.destroy();

        return res.json({ deleted_at: new Date() });
    }
}

export default new OrderController();
