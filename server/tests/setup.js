import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

// Silencing logs during tests if necessary
// process.env.LOG_LEVEL = 'error';
