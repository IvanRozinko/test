import React from 'react';
import {Button, Col, Form, Jumbotron, Row, Spinner} from "react-bootstrap";

const Searcher = ({artist, handleChange, handleClick, loading, handleKeyDown }) => {
  const buttonStyle = {
    width: '160px',
    marginLeft: '3px',
  };
  return (
    <Jumbotron className="mt-5">
      <Row className="justify-content-center">
        <h1>Searcher</h1>
      </Row>
      <Row className="justify-content-center">
        <Form>
          <Form.Group>
            <Col className="d-flex col-12">
              <Form.Control
                type="text"
                placeholder="Red hot chili peppers"
                value={artist}
                size="lg"
                onChange={(event) => handleChange(event.target.value)}
                onKeyDown={(event) => handleKeyDown(event)}
              />
              <Button
                variant="warning"
                onClick={handleClick}
                size="lg"
                disabled={loading}
                style={buttonStyle}
              >
              {loading &&
                <Spinner
                  as="span"
                  animation="grow"
                  role="status"
                  aria-hidden="true"
                  size="sm"
                 />
                }
                {loading ? "" : "Search"}
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </Row>
    </Jumbotron>
  );
};

export default Searcher;
