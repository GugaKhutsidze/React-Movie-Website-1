import React, { useState } from "react";
import axios from "axios";

function AddMovie() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("");

  const handleSubmit = async () => {

    if (!title || !description || !year || !genre) {
      alert("გთხოვთ შეავსოთ ყველა ველი");
      return;
    }

    const url = "https://warrior.ge/api/movies";
    const token = localStorage.getItem("token");
    
    try {
      const res = await axios.post(
        url,
        {
          title,
          description,
          year: Number(year), 
          genre,
        
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("Movie added:", res.data);
      alert("ფილმი დაემატა წარმატებით!");
      setTitle("");
      setDescription("");
      setYear("");
      setGenre("");
    } catch (e) {

        alert(e.response.data.message);
      } 
    }

  return (
    <div className="container">
      <h1>დაამატეთ ფილმები</h1>

      <input
        type="text"
        placeholder="დასახელება"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="text"
        placeholder="აღწერა"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        type="number"
        placeholder="წელი"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />

      <input
        type="text"
        placeholder="ჟანრი"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
      />

      <button onClick={handleSubmit}>დამატება</button>
    </div>
  );
}

export default AddMovie;