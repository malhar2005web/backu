import express from 'express'
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.route.js';
import movieRoutes from './routes/movie.route.js';
import tvRoutes from './routes/tv.route.js';
import searchRoutes from './routes/search.route.js';
import watchlistRoutes from './routes/watchlist.route.js';
import { ENV_VARS } from './config/envVars.js';
import { connectDB } from './config/db.js';
import cors from 'cors';
import { protectRoute } from './middleware/protectRoute.js';



const app = express();
const PORT=ENV_VARS.PORT;
app.use(express.json());//will allow us to parse req.body
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
})); // Enable CORS for all routes
app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/movie",protectRoute,movieRoutes)
app.use("/api/v1/tv",protectRoute,tvRoutes)
app.use("/api/v1/search",protectRoute,searchRoutes)
app.use("/api/v1",protectRoute,watchlistRoutes)



            
app.listen(PORT,()=>{
 console.log("Server started at http://localhost:"+PORT);
 connectDB();
});



   