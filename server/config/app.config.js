import dotenv from 'dotenv';

dotenv.config();

const { env } = process;

const appVariables = {
    port: env.PORT,
    appUrl: env.APP_URL,
    dbUrl: env.DATABASE_URL,
    secretKey: env.SECRET_KEY,
    cloudinaryUrl: env.CLOUDINARY_URL,
    mailgunApi: env.MAILGUN_API_KEY,
    mailgunDomain: env.MAILGUN_DOMAIN
};

export default appVariables;
