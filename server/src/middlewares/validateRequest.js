import { z } from "zod";

export const validateRequest = (schema) => async (req, res, next) => {
  try {
    const validatedData = await schema.parseAsync({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    
    // Replace request data with parsed/sanitized equivalents (Safely for Express 5+)
    if (validatedData.body !== undefined) {
      Object.defineProperty(req, 'body', { value: validatedData.body, configurable: true, enumerable: true, writable: true });
    }
    if (validatedData.query !== undefined) {
      Object.defineProperty(req, 'query', { value: validatedData.query, configurable: true, enumerable: true, writable: true });
    }
    if (validatedData.params !== undefined) {
      Object.defineProperty(req, 'params', { value: validatedData.params, configurable: true, enumerable: true, writable: true });
    }
    
    next();
  } catch (error) {
    if (error instanceof z.ZodError || error.name === "ZodError") {
      const issues = error.errors || error.issues || [];
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: issues.map(err => ({
          field: err.path?.join('.') || 'unknown',
          message: err.message
        }))
      });
    }
    next(error);
  }
};
