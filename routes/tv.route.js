import express from 'express';
import { getSimilarTvs, getTrendingTv, getTvCategories, getTvDetails, getTvTrailers } from '../controller/tv.controller.js';
const router = express.Router();
router.get("/trending",getTrendingTv);
router.get("/:id/trailers",getTvTrailers);
router.get("/:id/details",getTvDetails);

router.get("/:id/similar",getSimilarTvs);

router.get("/:categories",getTvCategories);
export default router;