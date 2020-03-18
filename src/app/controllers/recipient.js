import * as Yup from 'yup';

import Recipient from '../models/Recipient';

class RecipientController {
    async index(req, res) {

    }

    async show(req, res) {

    }

    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            street: Yup.string().required(),
            number: Yup.number().required(),
            complement: Yup.string(),
            district: Yup.string().required(),
            state: Yup.string().required()
        });

        if ( !(await schema.isValid(req.body)) ) {
            return res.status(400).json({ error: 'Validation fails.' });
        }
        
        const recipient = await Recipient.create(req.body);

        return res.json({ recipient });
    }

    async update(req, res) {

    }

    async destroy(req, res) {

    }
}

export default new RecipientController();
