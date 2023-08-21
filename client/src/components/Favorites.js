import React, { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";

function Favorites(){
    const [favorites, setFavorites] = useState([])

    useEffect(() => {
        fetch('http://localhost:5557/sneakers/')
        .then(response => response.json())
        .then(s => {setFavorites(s.filter(sneaker => sneaker.favorited))})
    }, [])

    const favoritedSneakers = favorites.map(sneaker => <ReviewCard key={sneaker.id} sneaker={sneaker} />)

    return (
      <div>
            <h1>My Favorite Sneakers</h1>
            <div className="sneaker-grid">
                {favoritedSneakers}
            </div>
        </div>
    )
}

export default Favorites