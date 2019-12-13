import React from 'react';
import Player from './Player';
import { Table, Row, Col, Jumbotron } from 'react-bootstrap';

const TableResults = (props) => {
  const { list } = props;
  return (
    <Jumbotron>
      <Row>
        <Col>
          <Table>
            <thead>
            <tr>
              <th>#</th>
              <th>Cover</th>
              <th>Album</th>
              <th>Artist</th>
              <th>Preview</th>
            </tr>
            </thead>
            <tbody>
            {list.map( ({ album, name, link, cover, preview}, index) =>
                <tr key={album}>
                  <td>{index + 1}</td>
                  <td><a href={link}><img src={cover} alt="album cover"/></a></td>
                  <td>{album}</td>
                  <td>{name}</td>
                  <td>
                    <Player trackUrl={preview}/>
                  </td>
                </tr>
              )
            }
            </tbody>
          </Table>
        </Col>
      </Row>
    </Jumbotron>
  );
};
export default TableResults;
