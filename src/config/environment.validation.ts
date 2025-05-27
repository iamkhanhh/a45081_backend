import * as Joi from 'joi';

export default Joi.object({
    NODE_ENV: Joi.string()
        .valid('development', 'production', 'test', 'provision')
        .default('development'),
    VCF_IOBIO_HOST: Joi.string().required(),
    DB_PORT: Joi.number().port().default(3306),
    DB_PASSWORD: Joi.string().required(),
    DB_HOST: Joi.string().required(),
    DB_DATABSE: Joi.string().required(),
    DB_USERNAME: Joi.string().required(),
    MONGO_DB_PREFIX: Joi.string().required(),
    MONGO_DB_HOST: Joi.string().required(),
    MONGO_DB_PORT: Joi.number().port().default(28000).required(),
    MONGO_DB_DATABASE: Joi.string().required(),
    MONGO_IMPORT_CMD: Joi.string().required(),
    JWT_SECRET: Joi.string().required(),
    JWT_ACCESS_TOKEN_EXPIRED: Joi.string().required(),
    MAIL_USER: Joi.string().required(),
    MAIL_PASSWORD: Joi.string().required(),
    MAIL_HOST: Joi.string().required(),
    AWS_ACCESS_KEY: Joi.string().required(),
    AWS_SECRET_KEY: Joi.string().required(),
    AWS_BUCKET: Joi.string().required(),
    AWS_REGION: Joi.string().required(),
    MOUNT_FOLDER: Joi.string().required(),
    EXPORT_FOLDER: Joi.string().required(),
    ANALYSIS_FOLDER: Joi.string().required(),
    UPLOAD_FOLDER: Joi.string().required(),
});