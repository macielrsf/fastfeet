import * as Yup from 'yup';

import Order from '../models/Order';

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

        const order = await Order.create(req.body);

        return res.json(order);
    }

    async update(req, res) {

    }

    async destroy(req, res) {

    }
}

export default new OrderController();
