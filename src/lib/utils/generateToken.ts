import jwt from 'jsonwebtoken';

export const generateToken = (userId: string | number) => {
    return jwt.sign({ userId }, 'secret_dont_share', {
        expiresIn: '1h',
    });
};
