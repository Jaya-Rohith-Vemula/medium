import { Hono } from "hono";
import { userRouter } from "./routes/user";
import { blogRouter } from "./routes/blog";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

app.route("api/v1/user", userRouter);
app.route("api/v1/blog", blogRouter);

export default app;

//postgresql://neondb_owner:npg_wK6sS9ueTqiy@ep-wispy-art-a48363t0-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require
//DATABASE_URL="prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiNTlhNGI2ZGUtNzNiZi00NTEwLWI3MjItNTZiMDlhNTYzMzkwIiwidGVuYW50X2lkIjoiNmI1MDY3NDQxODQ3ZTIxMzZkYTg4NWFmNGFlNWQzNDY5ZWNmMWU2ODQ5ZTI3NmI1ODJlMGJkNWI2ODczZGMyNyIsImludGVybmFsX3NlY3JldCI6IjRjZDMxY2YyLWQ4MzAtNGNlYi04MGMwLTZiODU1NTAxMGUwOSJ9.WXb2QYKhK4kdzMi1Ue8cJQCwEF8DJDRnP_iFsoKlhRk"
