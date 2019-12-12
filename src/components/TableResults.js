import React from 'react';

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
              <th>Link</th>
            </tr>
            </thead>
            <tbody>
            {list.map( (artist, index) =>
              <tr key={artist.album}>
                <td>{index}</td>
                <td><img src={artist.cover} alt="album cover"/></td>
                <td>{artist.album}</td>
                <td>{artist.name}</td>
                <td>{artist.link}</td>
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
