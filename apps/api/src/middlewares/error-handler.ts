import type { ErrorRequestHandler } from 'express'

export const errorHandler: ErrorRequestHandler = (
    error,
    _request,
    response,
    _next,
) => {
    console.error(error)

    return response.status(500).json({
        message: 'Erro interno do servidor.',
    })
}
