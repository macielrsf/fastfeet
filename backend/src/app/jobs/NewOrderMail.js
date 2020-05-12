import Mail from '../../lib/Mail';

class NewOrderMail {

    get key() {
        return 'NewOrderMail';
    }

    async handle({ data }) {
        const { order } = data;

        console.log('A fila executou');

        await Mail.sendMail({
            to: `${order.deliveryman.name} <${order.deliveryman.email}>`,
            subject: 'Nova encomenda',
            template: 'order',
            context: {
                deliveryman: order.deliveryman.name,
                recipient: order.recipient.name,
                complete_address: order.recipient.complete_address,
            }
        });
    }
}

export default new NewOrderMail();
