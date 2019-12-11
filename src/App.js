import React, { useState } from 'react';
import { Container, Row, Col, Form, Jumbotron, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [artist, setArtist] = useState('');

  const handleClick = () => {
    console.log('click');
    fetchData();
  };

  const fetchData = () => {
    const prefix = 'https://cors-anywhere.herokuapp.com/';
    const query = encodeURI(artist);
    console.log(query);
    const deezerUrl = `${prefix}https://api.deezer.com/search?q=${query}}`;
    const itunesUrl = `${prefix}https://itunes.apple.com/search?term=${query}}`;

    const promiseDeezer = fetch(deezerUrl);
    const promiseItunes = fetch(itunesUrl);

    const resDeezer = promiseDeezer.then( res => res.json());
    const resItunes = promiseItunes.then( res => res.json());

    let list = [];
    resDeezer.then(res => {
        res.data.map( artist => {
          const {
            artist: { name },
            album: { title, cover_medium }
          } = artist;

          list.push(
            {
              name,
              album: title,
              image: cover_medium,

            })
        });
        console.log(list);
    }

    );   // save next link to fetch more
    resItunes.then(data => console.log(data.results));
  };

  return (
   <Container>
     <Jumbotron className="mt-5">
     <Row className="justify-content-center">
       <h1>Searcher</h1>
     </Row>
     <Row className="justify-content-center">
       <Form>
         <Form.Group>
           <Col className="d-flex">
             <Form.Control
               type="text"
               placeholder="Red hot chili peppers"
               value={artist}
               onChange={(event) => setArtist(event.target.value)}
             />
             <Button
               variant="warning"
               onClick={handleClick}
             >
               Go!
             </Button>
           </Col>
         </Form.Group>
       </Form>
     </Row>
     </Jumbotron>
   </Container>
  );
}

export default App;
