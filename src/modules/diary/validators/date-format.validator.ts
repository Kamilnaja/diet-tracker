import { Validator } from "@shared/models/validator.model";

const dateFormatValidator: Validator = (value: string) => ({
  isValid: new RegExp(/^\d{4}-\d{2}-\d{2}$/).test(value),
});

export default dateFormatValidator;
