import { User } from "../models/user.model.js";
import { fetchFromTMDB } from "../services/tmdb.service.js";

export async function searchPerson(req,res) {
    const { query } = req.params;
    try {
        const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/person?api_key=bc6dddace4cdc07f1fc2f980d3e5d707&query=${query}`);
        if(response.resultss.length===0){
            return res.status(404).send(null);
        }
        await User.findByIdAndUpdate(req.user._id, {
            $push: { searchHistory: {
                id:response.results[0].id,
                image:response.results[0].profile_path,
                title:response.results[0].name,
                searchType:"person",
                createdAt: new Date(),
             } }
        }, { new: true });
        res.status(200).json({
            success: true,
            content: response.results
        });
    } catch (error) {
        console.log("Error in searchPerson:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}
export async function searchMovie(req,res) {
    const { query } = req.params;
    try {
        const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/movie?api_key=bc6dddace4cdc07f1fc2f980d3e5d707&query=${query}`);
        if(response.results.length===0){
            return res.status(404).send(null);
        }
        await User.findByIdAndUpdate(req.user._id, {
            $push: { searchHistory: {
                id:response.results[0].id,
                image:response.results[0].poster_path,
                title:response.results[0].title,
                searchType:"movie",
                createdAt: new Date(),
             } }
        }, { new: true });
        res.status(200).json({
            success: true,
            content: response.results
        });
    } catch (error) {
        console.log("Error in searchMovie:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}
export async function searchTv(req,res) {
    const { query } = req.params;
    try {
        const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/tv?api_key=bc6dddace4cdc07f1fc2f980d3e5d707&query=${query}`);
        if(response.results.length===0){
            return res.status(404).send(null);
        }
        await User.findByIdAndUpdate(req.user._id, {
            $push: { searchHistory: {
                id:response.results[0].id,
                image:response.results[0].poster_path,
                title:response.results[0].name,
                searchType:"tv",
                createdAt: new Date(),
             } }
        }, { new: true });
        res.status(200).json({
            success: true,
            content: response.results
        });
    } catch (error) {
        console.log("Error in searchTv:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}
export async function getSearchHistory(req,res) {
    try {
        
        res.status(200).json({
            success: true,
            content: user.searchHistory
        });
    } catch (error) {
        console.log("Error in getSearchHistory:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}
export async function deleteSearchHistory(req,res) {
    let { id } = req.params;
    id=parseInt(id);

    try {
        const user = await User.findByIdAndUpdate(req.user._id, {
            $pull: { searchHistory: { id:id } }
        }, { new: true });
        res.status(200).json({
            success: true,
            content: user.searchHistory
        });
    } catch (error) {
        console.log("Error in deleteSearchHistory:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}
