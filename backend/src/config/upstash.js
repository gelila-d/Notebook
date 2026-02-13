import {Ratelimit} from "@upstash/ratelimit";
import { Ratelimit } from "@upstash/redis";
import dotenv from "dotenv";
dotenv.config();

const ratelimit = new Ratelimit({
    redis:Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(10,"20 s")
});

export default ratelimit;