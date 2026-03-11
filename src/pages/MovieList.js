    import{useState,useEffect} from "react"
    import axios from "axios"
import { Link } from "react-router-dom";

    function  MovieList(){
        const[searchTerm,setSearchTerm]=useState("")
        const[movies,setMovies]=useState([])


        async function handleClick(id){
            try{
                const token=localStorage.getItem("token")
                await axios.post("https://warrior.ge/api/favorites",{
                    movie_id:id 
                },{
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                });
                alert("რჩეული დამატება წარმატებით!")
            }catch(e){
                console.log(e)
                alert("რჩეული დამატება ვერ განხორციელდა")       

            }
        }
        useEffect(()=>{
            const url="https://warrior.ge/api/movies"
            axios.get(url).then((res)=>{   
                setMovies(res.data.data)
                console.log(res.data)
                            console.log(res.data)

                
            })
        },[])
        return(
            <div className="movie-list">
                <h1 className="movie-list-title">ფილმები</h1>
                <input className="search-bar" type="text" placeholder="ძებნა" onChange={(e)=>setSearchTerm(e.target.value)}/>
                <div className="movies">
                {
                    movies.filter((movie)=>
                         movie.title.toLowerCase().includes(searchTerm.toLowerCase())
                    ).map((movie)=>{
                    
                    return <div className="movie" key={movie.id}>
                        <Link to ={`/movie/${movie.id}`}>
                        <h3>{movie.title}</h3>
                        </Link>
                        <p>{movie.description}</p>
                        <p>{movie.year}</p>
                        <p>{movie.genre}</p>
                        <div className="MovieButtons">
                 <button onClick={() => handleClick(movie.id)}>რჩეულებში დამატება</button>
                            </div>
                         </div>
                         })
                         }
                </div>
            </div>
        )
    }
    export default MovieList