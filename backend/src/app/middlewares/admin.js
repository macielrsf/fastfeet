import User from '../models/User';

export default async (req, res, next) => {
    const { userId } = req;

    const user = await User.findOne({
        where: { id: userId, admin: true }
    });

    if ( !user ) {
        return res.status(401).json({ error: 'Only admin can access this function.' });
    }

    return next();
}
