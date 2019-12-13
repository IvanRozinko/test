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
    console.log('click');
    setLoading(true);
    fetchData();
  };

  const handleChange = (value) => {
    setArtist(value);
  };

  const fetchData = async () => {
    const prefix = 'https://cors-anywhere.herokuapp.com/';
    const query = encodeURI(artist);
    console.log(query);
    const deezerUrl = `${prefix}https://api.deezer.com/search?q=${query}}`;
    const itunesUrl = `${prefix}https://itunes.apple.com/search?term=${query}}`;

    try{
      const promiseDeezer = await fetch(deezerUrl);
      const promiseItunes = await fetch(itunesUrl);

      const resDeezer = await promiseDeezer.json();
      const resItunes = await promiseItunes.json();
      setLoading(false);

      console.log(resDeezer);
      console.log(resItunes);
      filter([resDeezer.data, resItunes.results]);
    } catch(error){
      console.log(error);
    }
  };

  const filter = ([ listDeezer, listItunes ]) => {

    const albums = [];
    const titlesSet = new Set();

    listDeezer.forEach( item => {
      const {album: {title, cover_small, tracklist }, artist: {name}, preview} = item;
      if (!titlesSet.has(title) && title) {
        titlesSet.add(title);
        albums.push(
          {
            album: title,
            cover: cover_small,
            link: tracklist,
            name,
            preview
          }
        );
      }
    });

    listItunes.forEach( item => {
      const { collectionName, artworkUrl60, collectionViewUrl, artistName, previewUrl } = item;
      if (!titlesSet.has(collectionName) && collectionName) {
        titlesSet.add(collectionName);
        albums.push(
          {
            album: collectionName,
            cover: artworkUrl60,
            link: collectionViewUrl,
            name: artistName,
            preview: previewUrl
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
      />
     { list.length > 0 &&
     <TableResults list={list}/>
     }
   </Container>
  );
}

export default App;
