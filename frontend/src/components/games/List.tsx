import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { api } from "../../services/apiService";
import { PageTitle } from "../utils/PageTitle";
import { Pagination } from "../utils/Pagination";
import { LeaderboardSidebar } from "./Sidebar";
import './games.css';

export const GamesList = () => (
    <Container className="mt-5">
    <Row>
        <Col md="3">
            <LeaderboardSidebar />
        </Col>
        <Col md="9">
            <PageTitle>Jeux</PageTitle>
            <Pagination
                apiKey={["api.games.list"]}
                apiMethod={api.games.list}
                render={(games, paginationControl) => (
            <>
              <Row>
                {games.map((game) => (
                  <Card key={game.id} className={"m-4"}>
                    <Card.Header className="overflow-hidden img-preview">
                        <Card.Img
                            variant="top"
                            // src="https://upload.wikimedia.org/wikipedia/commons/8/83/2048_Monotonicity.png"
                            className="img-fluid"
                        />
                    </Card.Header>
                    <Card.Body>
                        <Card.Title>{game.name}</Card.Title>
                        <Card.Subtitle>{game.mode == "S" ? "Un seul joueur" : "Mulitjoueur"}</Card.Subtitle>
                        <Card.Text>
                            {game.description}
                        </Card.Text>
                        <Link to={`/games/${game.id}/`}>
                            <Button variant="primary">Jouer</Button>
                        </Link>
                    </Card.Body>
                  </Card>
                ))}
              </Row>
              {paginationControl}
            </>
          )}
        />
        </Col>
    </Row>
</Container>
)