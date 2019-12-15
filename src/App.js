import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import TableResults from "./components/TableResults";
import Searcher from "./components/Searcher";

function App() {
  const [artist, setArtist] = useState('');
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    fetchData();
  };

  const handleChange = (value) => {
    setArtist(value);
  };

  const handleKeyDown = (event) => {
    if(event.key === 'Enter') {
      event.preventDefault();
      handleClick();
    }
  };

  const fetchData = async () => {
    const prefix = 'https://cors-anywhere.herokuapp.com/';
    const query = encodeURI(artist);
    const deezerUrl = `${prefix}https://api.deezer.com/search?limit=300&q=artist:"${artist}"`;
    const itunesUrl = `${prefix}https://itunes.apple.com/search?term=${query}&entity=album&attribute=artistTerm`;

    try{
      const promiseDeezer = await fetch(deezerUrl);
      const promiseItunes = await fetch(itunesUrl);

      const resDeezer = await promiseDeezer.json();
      const resItunes = await promiseItunes.json();
      setLoading(false);

      filter([resDeezer.data, resItunes.results]);

    } catch(error){

      console.log(error);

    }
  };

  const filter = ([ listDeezer, listItunes ]) => {
    const albums = [];
    const albumIdSet = new Set();

    listDeezer.forEach( item => {
      const {album: {title, cover_small, id }, artist: {name}, preview, link} = item;
      if (!albumIdSet.has(id) && title) {
        albumIdSet.add(id);
        albums.push(
          {
            album: title,
            cover: cover_small,
            link,
            name,
            preview,
            id
          }
        );
      }
    });

    listItunes.forEach( item => {
      const { collectionId, collectionName, artworkUrl60, collectionViewUrl, artistName, previewUrl } = item;
      if (!albumIdSet.has(collectionId) && collectionName) {
        albumIdSet.add(collectionId);
        albums.push(
          {
            album: collectionName,
            cover: artworkUrl60,
            link: collectionViewUrl,
            name: artistName,
            preview: previewUrl,
            id: collectionId
          }
        );
      }
    });
    setList(albums);
  };

  return (
   <Container>
      <Searcher
        artist={artist}
        handleChange={handleChange}
        handleClick={handleClick}
        loading={loading}
        handleKeyDown={handleKeyDown}
      />
     { list.length > 0 &&
     <TableResults list={list}/>
     }
   </Container>
  );
}

export default App;
