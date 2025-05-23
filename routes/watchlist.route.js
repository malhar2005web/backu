import express from 'express';
import { addToWatchlist, getWatchlist, removeFromWatchlist } from '../controller/watchlist.controller.js';
const router = express.Router();
router.post('/add/:movieId',addToWatchlist);
router.get('/remove/:movieId',removeFromWatchlist);
router.delete('/get',getWatchlist);
export default router;