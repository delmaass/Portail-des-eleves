import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { Game } from "../../models/games";
import { api, useBetterQuery } from "../../services/apiService";
import { ErrorPage } from "../utils/ErrorPage";
import { Loading } from "../utils/Loading";
import { PageTitle } from "../utils/PageTitle";
import { GameSidebar } from "./Sidebar";

export const GameLayout = () => {
    const { gameId } = useParams<{ gameId: string }>();

    const { data: game, status, error } = useBetterQuery<Game>(
        ["api.games.get", gameId],
        api.games.get,
        { refetchOnWindowFocus: false }
    );

    return status === "loading" ? (
        <>
            <Loading />
        </>
      ) : status === "error" ? (
        <ErrorPage>{error}</ErrorPage>
      ) : game ? (
        <Container className="mt-5">
            <Row>
                <Col md="3">
                    <GameSidebar gameId={game.id}/>
                </Col>
                <Col md="9">
                    <PageTitle>{game.name}</PageTitle>
                    GameContainer
                </Col>
            </Row>
        </Container>
    ) : "";
}   