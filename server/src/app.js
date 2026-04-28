import express from "express";
import cors from "cors";
import helmet from "helmet";
import { toNodeHandler } from "better-auth/node";

import { auth } from "../auth.js";
import hostelsRouter from "./modules/hostels/hostels.routes.js";
import roomsRouter from "./modules/rooms/rooms.routes.js";
import bookingsRouter from "./modules/bookings/bookings.routes.js";
import complaintsRouter from "./modules/complaints/complaints.routes.js";
import reviewsRouter from "./modules/reviews/reviews.routes.js";
import usersRouter from "./modules/users/users.routes.js";
import authRouter from "./modules/auth/auth.routes.js";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler.js";

const app = express();

app.use(helmet());
const allowedOrigins = (process.env.CLIENT_ORIGIN || "http://localhost:5173").split(",");
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g. curl, mobile apps)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS: origin ${origin} not allowed`));
    }
  },
  credentials: true,
}));
// Custom Auth Routes (must be before Better Auth wildcard)
app.use("/api/auth", authRouter);

// Better Auth Route Handler 
app.all(/\/api\/auth.*/, toNodeHandler(auth));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application Routes
app.use("/api/hostels", hostelsRouter);
app.use("/api/rooms", roomsRouter);
app.use("/api/bookings", bookingsRouter);
app.use("/api/complaints", complaintsRouter);
app.use("/api/reviews", reviewsRouter);
app.use("/api/users", usersRouter);

// Error Handling
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
