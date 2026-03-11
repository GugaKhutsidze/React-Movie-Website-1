import { useEffect, useState } from "react";
import axios from "axios";

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const token = localStorage.getItem("token");

  const fetchFavorites = async () => {
  try {
    const res = await axios.get("https://warrior.ge/api/favorites", {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log( res.data);
    setFavorites(res.data?.data || res.data || []);
  } catch (e) {
    console.log( e);
    setFavorites([]);
  }
};

  useEffect(() => {
    fetchFavorites();
  }, []);

  const handleRemoveFavorite = async (favoriteId) => {
    try {
      await axios.delete("https://warrior.ge/api/favorites", {
        data: { id: favoriteId },
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("რჩეული წარმატებით წაიშალა!");
      setFavorites((prev) => prev.filter((f) => f.id !== favoriteId));
    } catch (e) {
      console.log(e);
      alert("წაშლა ვერ განხორციელდა");
    }
  };

  return (
    <div className="container">
      <h1>თქვენი რჩეულები</h1>
      <div className="Favorites-items">
        {favorites.length > 0 ? (
          favorites.map((item) => (
            <div className="Favorites-item" key={item.id}>
              <h3>{item.movie?.title || "Unknown Title"}</h3>
              <p>{item.movie?.description || "No description"}</p>
              <p>{item.movie?.year || "-"}</p>
              <p>{item.movie?.genre || "-"}</p>
            </div>
          ))
        ) : (
          <p>მონაცემები ვერ მოიძებნა.</p>
        )}
      </div>
    </div>
  );
}

export default Favorites;