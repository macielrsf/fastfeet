import * as Yup from 'yup';

import Deliveryman from '../models/Deliveryman';

class DeliverymanController {

    async index(req, res) {
        const deliverymen = await Deliveryman.findAll();

        return res.json(deliverymen);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
        });

        if ( !(await schema.isValid(req.body)) ) {
            return res.status(401).json({ error: 'Validation fails.' });
        }

        const checkDeliverymanExists = await Deliveryman.findOne({
            where: { email: req.body.email }
        });

        if ( checkDeliverymanExists ) {
            return res.status(400).json({ error: 'Delivery already exists.' });
        }

        const deliveryman = await Deliveryman.create(req.body);

        return res.json(deliveryman);
    }

    async update(req, res) {

    }

    async destroy(req, res) {

    }
}

export default new DeliverymanController();
