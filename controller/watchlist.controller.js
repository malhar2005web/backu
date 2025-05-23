import { User } from "../models/user.model.js";
import { fetchFromTMDB } from "../services/tmdb.service.js";
export async function addToWatchlist(req,res) {
    const { movieId } = req.params;
    try {
        const response = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${movieId}?api_key=bc6dddace4cdc07f1fc2f980d3e5d707`);
        if(response.result.length===0){
            return res.status(404).send(null);
        }
        await User.findByIdAndUpdate(req.user._id, {
            $push: { watchlist: {
                id:response.result.id,
                image:response.result.poster_path,
                title:response.result.title,
                createdAt: new Date(),
             } }
        }, { new: true });  
        res.status(200).json({
            success: true,
            content: response.result
        });
    } catch (error) {
        console.log("Error in addToWatchlist:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}
export async function getWatchlist(req,res) {
    try {
        const user = await User.findById(req.user._id).populate("watchlist.id", "title poster_path overview release_date runtime genres vote_average");
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json({
            success: true,
            content: user.watchlist
        });
    } catch (error) {
        console.log("Error in getWatchlist:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}
export async function removeFromWatchlist(req,res) {
    const { movieId } = req.params;
    try {
        const response = await User.findByIdAndUpdate(req.user._id, {
            $pull: { watchlist: { id: movieId } }
        }, { new: true });
        if (!response) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json({
            success: true,
            content: response.watchlist
        });
    } catch (error) {
        console.log("Error in removeFromWatchlist:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}