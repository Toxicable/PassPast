export function validationMessageMapper(validatorName, validatorValue) {
    const config = {
        required: 'Required',
        requiredGroup: 'All fields in this group are required',
        minLength: 'Minimum length ' + validatorValue.requiredLength,
        maxLength: 'Minimum length ' + validatorValue.requiredLength,
        invalidUrl: 'Invalid url',
        invalidCreditCard: 'Invalid credit card number',
        invalidEmail: 'Invalid email address',
        invalidNumber: 'Invalid number',
        invalidAlpha: 'Invalid character',
        invalidComparison: 'Field: ' + validatorValue.invalidField + ' must match: ' + validatorValue.comparisonField,
        invalidFirstCapital: 'First character must be capital',
        range: validatorValue.value + ' must be in the range: ' + validatorValue.min + '-' + validatorValue.max,
        min: validatorValue.value + ' must be greater than ' + validatorValue.min,
        max: validatorValue.value + ' must be less than than ' + validatorValue.max,
        courseExists: `This course already exists`,
        requestExists: `You have already made a request for this course`,
        paperExists: `This Paper already exists`
    };
    return config[validatorName];
}
