import React, { useEffect, useState } from 'react';
import './PokemonStyle.css';

type PokemonCardProps = {
  name: string;
  url: string;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ name, url }) => {
  const [imgUrl, setImgUrl] = useState<string>();

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const { sprites } = data;
        const frontDefaultImgUrl = sprites.front_default;
        setImgUrl(frontDefaultImgUrl);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [name, url]);

  return (
    <a href={url} target="_blank" className="pokemon-card">
      <p>{name}</p>
      {imgUrl ? (
        <img src={imgUrl} alt={name} />
      ) : (
        <div>Loading...</div>
      )}
    </a>
  );
};

export default PokemonCard;