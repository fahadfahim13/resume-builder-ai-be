export default () => ({
    port: parseInt(process.env.PORT, 10) || 3001,
    database: {
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
      URL: process.env.DB_URL,
    },
    API_KEYS: {
      GEMINI: process.env.GEMINI_API_KEY ?? ""
    },
  });