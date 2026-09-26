import multer from "multer";
import type { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (
    error,
    _request,
    response,
    _next,
) => {
    console.error(error);

    if (error instanceof multer.MulterError && error.code === "LIMIT_FILE_SIZE") {
        return response.status(400).json({
            message: "O arquivo deve ter no máximo 5 MB.",
        });
    }

    return response.status(500).json({
        message: "Erro interno do servidor.",
    });
};
