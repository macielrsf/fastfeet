import Mail from '../../lib/Mail';

class CancelOrderMail {

    get key() {
        return 'CancelOrderMail';
    }

    async handle({ data }) {
        const { order } = data;

        console.log('A fila executou');

        await Mail.sendMail({
            to: `${order.deliveryman.name} <${order.deliveryman.email}>`,
            subject: 'Encomenda cancelada',
            template: 'cancel_order',
            context: {
                order: order.product,
                deliveryman: order.deliveryman.name,
                recipient: order.recipient.name,
                complete_address: order.recipient.complete_address,
            }
        });
    }
}

export default new CancelOrderMail();
