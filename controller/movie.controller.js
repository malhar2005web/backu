import  {fetchFromTMDB} from "../services/tmdb.service.js";
export async function getTrendingMovie(req,res)
{try {
    const data = await fetchFromTMDB(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=bc6dddace4cdc07f1fc2f980d3e5d707`
    );

    console.log("Fetched Data:", data);

    const movies = data?.results || [];

    if (movies.length === 0) {
        console.error("No Movies Found");
        return res.status(404).json({
            success: false,
            message: "No Movies Found"
        });
    }

    const randomMovie = movies[Math.floor(Math.random() * movies.length)];

    console.log("Random Movie:", randomMovie);

    res.json({
        success: true,
        content: 
            randomMovie,
        
    });
} catch (error) {
    console.error("Error in getTrendingMovie:", error);
    res.status(500).json({
        success: false,
        message: "Internal Server Error"
    });
}
}
export async function getMovieTrailers(req,res){
    const {id} = req.params;
    try{
      const data= await fetchFromTMDB(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=bc6dddace4cdc07f1fc2f980d3e5d707`);
        res.json({
            success:true,
            content:data.results
        })


    }
catch(error){
    if(error.message.includes("404")){
        return res.status(404),send(null);
    }
    res.status(500).json({
        success:false,
        message:"Internal Server Error"
    });
}
}
export async function getMovieDetails(req,res){
    const {id} = req.params;
    try{
        const data=await fetchFromTMDB(
            `https://api.themoviedb.org/3/movie/${id}?api_key=bc6dddace4cdc07f1fc2f980d3e5d707`);
            res.status(200).json({
                sucess:true,
                content:data
                
            })

    }
    catch(error){
        if(error.message.includes("404")){
            return res.status(404).send(null);
        }
        console.error(error);
        res.status(500).json({
            success:false,
            message:"Internal Server Error"
        });
    }
}
export async function getMovieRatings(req,res){
    const {id} = req.params;
    try{
        const data=await fetchFromTMDB(
            `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=bc6dddace4cdc07f1fc2f980d3e5d707`);
            res.status(200).json({
                sucess:true,
                content:data
                
            })

    }
    catch(error){
        if(error.message.includes("404")){
            return res.status(404).send(null);
        }
        console.error(error);
        res.status(500).json({
            success:false,
            message:"Internal Server Error"
        });
    }
}
export async function getSimilarMovies(req,res) {
    const { id } = req.params;
    try {
        const data = await fetchFromTMDB(
            `https://api.themoviedb.org/3/movie/${id}/similar?api_key=bc6dddace4cdc07f1fc2f980d3e5d707`
        );
        res.status(200).json({
            success: true,
            content: data.results
        });
    } catch (error) {
        if (error.message.includes("404")) {
            return res.status(404).send(null);
        }
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}
export async function getMovieCategories(req,res) {
    const {categories} = req.params;
    try {
        const data = await fetchFromTMDB(
            `https://api.themoviedb.org/3/movie/${categories}?api_key=bc6dddace4cdc07f1fc2f980d3e5d707`
        );
        res.status(200).json({
            success: true,
            content: data.results
        });
    } catch (error) {
        if (error.message.includes("404")) {
            return res.status(404).send(null);
        }
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}
export async function getMovieRecommendations(req,res) {
    const { id } = req.params;
    try {
        const data = await fetchFromTMDB(
            `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=bc6dddace4cdc07f1fc2f980d3e5d707`
        );
        res.status(200).json({
            success: true,
            content: data.results
        });
    } catch (error) {
        if (error.message.includes("404")) {
            return res.status(404).send(null);
        }
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

    

