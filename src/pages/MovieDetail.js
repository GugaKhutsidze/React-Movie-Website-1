import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../index.css";

function MovieDetail() {
  const [movie, setMovie] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { id } = useParams();
  const token = localStorage.getItem("token");

  async function getMovieDetail() {
    try {
      const res = await axios.get(`https://warrior.ge/api/movies/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMovie(res.data.data);
    } catch (e) {
      console.log(e);
    }
  }

  async function getComments() {
    try {
      const res = await axios.get(
        `https://warrior.ge/api/movies/${id}/comments`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComments(Array.isArray(res.data.data) ? res.data.data : Array.isArray(res.data) ? res.data : []);
    } catch (e) {
      console.log(e);
    }
  }

  async function addComment(e) {
    e.preventDefault();
    if (!newComment) return;
    try {
      await axios.post(
        `https://warrior.ge/api/movies/${id}/comments`,
        { content: newComment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewComment("");
      getComments();
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getMovieDetail();
    getComments();
  }, []);

  return (
    <div className="movie-detail">
      <h1>{movie?.title}</h1>
      <p>{movie?.description}</p>
      <p>Year: {movie?.year}</p>
      <p>Genre: {movie?.genre}</p>

      <hr />

      <h2>კომენტარები</h2>
      <div className="comments-list">
        {comments.length === 0 && <p>კომენტარები არ არის</p>}
        {comments.map((c) => (
          <div key={c.id} className="comment-item">
            <strong>{c.user?.name || "მომხმარებელი"}:</strong> {c.content}
          </div>
        ))}
      </div>

      <form onSubmit={addComment} className="comment-form">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="comment-input"
        />
        <button type="submit" className="comment-button">send</button>
      </form>
    </div>
  );
}

export default MovieDetail;