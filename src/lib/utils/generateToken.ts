import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable is not set. Set it in your .env file.');
}

export const generateToken = (userId: string | number): string => {
    return jwt.sign({ userId }, JWT_SECRET, {
        expiresIn: '1h',
    });
};
