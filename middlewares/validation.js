const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

const userRegistrationValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      "string.empty": 'The "email" field must be filled in',
      "string.email": 'the "email" field must be a valid email',
    }),
    password: Joi.string().required().messages({
      "string.empty": 'The "password" field must be filled in',
    }),
    name: Joi.string().required().min(2).max(30).messages({
      "string.empty": 'The "name" field must be filled in',
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
    }),
  }),
});

const createSlaylistValidation = celebrate({
  body: Joi.object().keys({
    title: Joi.string().required().min(3).max(100).messages({
      "string.min": 'The minimum length of the "title" field is 3',
      "string.max": 'The maximum length of the "title" field is 100',
      "string.empty": 'The "title" field must be filled in',
    }),

    category: Joi.string().required().messages({
      "string.empty": 'The "category" field must be filled in',
    }),

    tagline: Joi.string().required().max(100).messages({
      "string.empty": 'The "name" field must be filled in',
      "string.max": 'The maximum length of the "tagline" field is 100',
    }),
  }),
});

const createSlayletValidation = celebrate({
  body: Joi.object().keys({
    handle: Joi.string().required().max(45).messages({
      // "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "handle" field is 45',
      "string.empty": 'The "handle" field must be filled in',
    }),

    link: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "link" field must be filled in',
      "string.uri": 'the "link" field must be a valid url',
    }),

    notes: Joi.string().max(300).messages({
      "string.max": 'The maximum length of the "notes" field is 300',
      "string.empty": 'The "notes" field must be filled in',
    }),
  }),
});

const userLoginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      "string.empty": 'The "email" field must be filled in',
      "string.email": 'the "email" field must be a valid email',
    }),
    password: Joi.string().required().messages({
      "string.empty": 'The "password" field must be filled in',
    }),
  }),
});

const slaylistIdValidation = celebrate({
  params: Joi.object().keys({
    slaylistId: Joi.string().required().hex().length(24).messages({
      "string.empty": "The 'slaylistId' field must be filled in",
      "string.length":
        "The 'slaylistId' field must be exactly 24 characters long",
      "string.hex": "The 'slaylistId' must be a hexadecimal string",
    }),
  }),
});

module.exports = {
  userRegistrationValidation,
  createSlaylistValidation,
  createSlayletValidation,
  userLoginValidation,
  slaylistIdValidation,
};
