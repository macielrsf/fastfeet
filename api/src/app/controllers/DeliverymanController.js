import * as Yup from 'yup';

import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

class DeliverymanController {

    async index(req, res) {
        const deliverymen = await Deliveryman.findAll({
            include: [{
                model: File,
                as: 'avatar',
                attributes: ['url', 'path', 'name']
            },]
        });

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
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
        });

        if ( !(await schema.isValid(req.body)) ) {
            return res.status(401).json({ error: 'Validation fails.' });
        }

        const { email } = req.body;

        const deliveryman = await Deliveryman.findByPk(req.params.id);

        if ( email && email !== deliveryman.email ) {
            const deliverymanExists = await Deliveryman.findOne({
                where: { email }
            });

            if ( deliverymanExists ) {
                return res.status(400).json({ error: 'Delivery already exists.' });
            }
        }

        if ( !deliveryman ) {
            return res.status(400).json({ error: 'Delivery does not exists.' });
        }

        const { id, name, avatar_id } = await deliveryman.update(req.body);

        return res.json({
            id,
            name,
            email,
            avatar_id,
        });
    }

    async destroy(req, res) {
        const deliveryman = await Deliveryman.findByPk(req.params.id);

        if ( !deliveryman ) {
            return res.status(400).json({ error: 'Delivery does not exists.' });
        }

        await deliveryman.destroy();

        return res.json({ deleted_at: new Date() });
    }
}

export default new DeliverymanController();
