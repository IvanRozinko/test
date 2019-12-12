import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import TableResults from "./components/TableResults";
import Searcher from "./components/Searcher";

function App() {
  const [artist, setArtist] = useState('');
  const [list, setList] = useState([]);

  const handleClick = () => {
    console.log('click');
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

    const promiseDeezer = await fetch(deezerUrl);
    const promiseItunes = await fetch(itunesUrl);

    const resDeezer = await promiseDeezer.json();
    const resItunes = await promiseItunes.json();

    console.log(resDeezer.data);
    console.log(resItunes.results);
    filter([resDeezer.data, resItunes.results]);

  };

  const filter = ([ listDeezer, listItunes ]) => {      //TODO: Remove repeating albums from results;
    const albums = new Set();
    listDeezer.forEach( item => {
      const {album: {title, cover_small, tracklist}, artist: {name}} = item;

      albums.add(
        {
          [title]:
            {
              album: title,
              cover: cover_small,
              link: tracklist,
              name
            }
        }
      );

    });

      listItunes.forEach( item => {
        const { collectionName, artworkUrl30, collectionViewUrl, artistName } = item;

        albums.add(
          {
            [collectionName]:
              {
                album: collectionName,
                cover: artworkUrl30,
                link: collectionViewUrl,
                name: artistName
              }
          }
        );

    });

    albums.forEach(item => console.log(item))
  };

  return (
   <Container>
      <Searcher
        artist={artist}
        handleChange={handleChange}
        handleClick={handleClick}
      />
     { list.length > 0 &&
     <TableResults list={list}/>
     }
   </Container>
  );
}

export default App;
