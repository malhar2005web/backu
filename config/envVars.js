import dotenv from'dotenv'
dotenv.config();
export const ENV_VARS={
    MONGO_URI:process.env.MONGO_URI,
    PORT:process.env.PORT||5000,
    JWT_SECRET:process.env.JWT_SECRET,
    NODE_ENV:process.env.NODE_ENV,
    TMDB_API_KEY:process.env.TMDB_API_KEY,
    GEMINI_API_KEY:process.env.GEMINI_API_KEY,
}
//eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYzZkZGRhY2U0Y2RjMDdmMWZjMmY5ODBkM2U1ZDcwNyIsIm5iZiI6MTc0MTIyNDQ2MC4zODIwMDAyLCJzdWIiOiI2N2M4ZmEwY2ZiNDQwMmRjZTEwMzMxOTUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.CTs27EdBj9EMzROyQOVYn3hR0U9coi5MpyKbNkFbG5A