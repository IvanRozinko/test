import React from 'react';
import {Button, Col, Form, Jumbotron, Row} from "react-bootstrap";

const Searcher = ({artist, handleChange, handleClick}) => {
  return (
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
                onChange={(event) => handleChange(event.target.value)}
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
  );
};
export default Searcher;
