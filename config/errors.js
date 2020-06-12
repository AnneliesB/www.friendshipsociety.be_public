const BadRequestError = {
    code: 400,
    error: 'Bad Request',
    name: 'Invalid body',
    message: 'Missing fields',
}

const ConflictError = {
    code: 409,
    error: 'Conflict error',
    name: 'Conflict',
    message: 'Email address is not available for use',
}

const UnauthorizedError = {
    code: 401,
    error: 'Unauthorized',
    name: 'Unauthorized',
    message: 'No user found with these credentials',
}

const NotFoundError = {
    code: 404,
    error: 'Not found',
    name: 'Not Found',
    message: 'Item does not exist',
}

const UserNotFoundError = {
    code: 404,
    error: 'Not found',
    name: 'Not Found',
    message: 'User does not exist',
}

const InvalidObjectIdError = {
    code: 400,
    error: 'Invalid Object ID',
    name: 'Invalid Object ID',
    message: 'Parameter does not match a valid ObjectId',
}

const InvalidTemplateError = {
    code: 404,
    error: 'Invalid Template',
    name: 'Invalid Template',
    message: 'This template name does not exist',
}

const PasswordResetError = {
    code: 404,
    error: 'No password reset requested',
    name: 'No password reset requested',
    message: 'This user has not requested a password reset',
}

module.exports.BadRequestError = BadRequestError
module.exports.ConflictError = ConflictError
module.exports.UnauthorizedError = UnauthorizedError
module.exports.NotFoundError = NotFoundError
module.exports.UserNotFoundError = UserNotFoundError
module.exports.InvalidObjectIdError = InvalidObjectIdError
module.exports.InvalidTemplateError = InvalidTemplateError
module.exports.PasswordResetError = PasswordResetError
