const Joi = require('joi');
const schemas = {
    register: Joi.object({
        fullName: Joi.string().min(2).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        username: Joi.string().allow('', null),
        phone: Joi.string().allow('', null),
        address: Joi.string().allow('', null),
        dateOfBirth: Joi.date().allow(null),
        
    }),
    login: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }),
    transaction: Joi.object({
        type: Joi.string().valid('income', 'expense').required(),
        category: Joi.string().required(),
        amount: Joi.number().positive().required(),
        date: Joi.date().required(),
        notes: Joi.string().allow('')
    }),
    budget: Joi.object({
        name: Joi.string().required(),
        amount: Joi.number().positive().required(),
        categories: Joi.any().required()
    })
};
exports.formatError = (error) => error ? error.details[0].message : null;


exports.validateRegisterData = (data) => schemas.register.validate(data, { abortEarly: false });
exports.validateLoginData = (data) => schemas.login.validate(data);
exports.validateTransactionData = (data) => schemas.transaction.validate(data);
exports.validateBudgetData = (data) => schemas.budget.validate(data);

