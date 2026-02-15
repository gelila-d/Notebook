import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "../config/upstash.js";

// Create rate limiter (5 requests per 10 seconds per IP)
const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, "20 s"),
});

const rateLimiter = async (req, res, next) => {
  try {
    const ip = req.ip || "127.0.0.1";

    const { success } = await ratelimit.limit(ip);

    if (!success) {
      return res.status(429).json({
        message: "Too many requests. Please slow down.",
      });
    }

    next();
  } catch (error) {
    console.error("Rate limiter error:", error);
    next();
  }
};

export default rateLimiter;
