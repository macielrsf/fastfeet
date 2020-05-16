import Order from '../models/Order';
import DeliveryProblem from '../models/DeliveryProblem';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';

import CancelOrderMail from '../jobs/CancelOrderMail';
import Queue from '../../lib/Queue';

class DeliveryProblemController {
    async index(req, res) {
        /*
         * Return all deliveries has
         * some problem
         */
        const orders = await Order.findAll({
            where: {
                canceled_at: null
            },
            include: {
                model: DeliveryProblem,
                as: 'problems',
                attributes: ['description', 'created_at'],
                required: true
            }
        });

        return res.json(orders);
    }

    async show(req, res) {
        const { id } = req.params;

        const order = await Order.findByPk(id, {
            include: [{
                model: DeliveryProblem,
                as: 'problems'
            }]
        });

        if ( !order ) {
            return res.status(401).json({
                error: 'Order does not exists.'
            });
        }

        return res.json(order.problems);
    }

    async store(req, res) {
        const { id } = req.params;

        const order = await Order.findByPk(id);

        if ( !order ) {
            return res.status(401).json({
                error: 'Order does not exists.'
            });
        }

        const problem = await DeliveryProblem.create(req.body);

        return res.json(problem);
    }

    async destroy(req, res) {
        const { id } = req.params;

        const problem = await DeliveryProblem.findByPk(id, {
            include: [{
                model: Order,
                as: 'order'
            }]
        });

        if ( !problem ) {
            return res.status(401).json({
                error: 'Problem does not provided.'
            });
        }

        const order = await Order.findByPk(problem.order_id, {
            include: [{
                model: Recipient,
                as: 'recipient'
            }, {
                model: Deliveryman,
                as: 'deliveryman'
            }]
        });

        if ( order.canceled_at ) {
            return res.status(401).json({
                error: 'Order already was canceled.'
            });
        }

        await order.update({
            canceled_at: new Date()
        });

        await Queue.add(CancelOrderMail.key, {
            order,
        });

        return res.json(order);
    }
}

export default new DeliveryProblemController();
