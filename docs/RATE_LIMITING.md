# Rate limiting

This project includes a lightweight, in-memory rate limiter for development and low-traffic use.

Important notes:

- The in-memory limiter (`lib/rate-limit.ts`) is process-local (Map) and is **not** suitable for production deployments where multiple instances or serverless functions are used. In those environments, each instance has its own counters and limits can be bypassed by distributing requests across instances.

- For production, use a Redis-backed rate limiter (e.g., Upstash + `@upstash/ratelimit`).

How to enable Upstash (high level):

1. Provision Upstash Redis and get the `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`.
2. Set `RATE_LIMIT_MODE=UPSTASH` in your environment and provide the Upstash env vars.
3. The repo contains a scaffold adapter at `lib/rate-limit-upstash.ts`. Install dependencies:

```bash
npm install @upstash/redis @upstash/ratelimit
```

4. Run your application with `RATE_LIMIT_MODE=UPSTASH`.

See issues #188 and #189 for tracking and implementation details.
