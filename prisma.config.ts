import 'dotenv/config'
import { defineConfig, env } from 'prisma/config'

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: process.env.NODE_ENV === 'production' ? env('PROD_DATABASE_URL') : env('LOCAL_DATABASE_URL'),
  },
})