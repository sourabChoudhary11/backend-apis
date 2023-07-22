class errorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

export const errorMiddleware = (err, req, res, next) => {
    res.status(err.statusCode).json({
        success: false,
        message: err.message
    })
}

export default errorHandler;