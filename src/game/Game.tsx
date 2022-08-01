import { Col, Container, Row } from "react-bootstrap";
import Card from "./Card";
import Score from "./Score";
import { useEffect } from "react";
import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import {
    gameAsync,
    drawCard,
    reshuffle
} from './gameSlice';
import deckImage from "./back.svg";
type GameProps = {
    numberOfPlayers: number;
}

const Game = ({ numberOfPlayers }: GameProps): JSX.Element => {

    const cards = useAppSelector((state) => state.game.cards);
    const remaining = useAppSelector((state) => state.game.remaining);
    const reshuffled = useAppSelector((state) => state.game.reshuffle);
    const shouldReshuffle = useAppSelector((state) => state.game.shouldReshuffle);
    const points = useAppSelector((state) => state.game.playersPoints);

    const dispatch = useAppDispatch();

    const handleDeckClick = () => {
        if (remaining === 0) {
            window.location.reload();
        } else {
            dispatch(drawCard(numberOfPlayers));
        }
    }

    useEffect(() => {
        dispatch(gameAsync(numberOfPlayers));
    }, []);

    useEffect(() => {
        if (shouldReshuffle === true) {
            dispatch(reshuffle());
        }
    }, [shouldReshuffle]);

    return (
        <Container className={"game_container"}>
            <Row className={"players_container"}>
                {
                    cards.length > 0 ?
                        cards.map((card, index: number) =>
                            <Card
                                key={index}
                                {...card}
                            />
                        ) : null
                }
            </Row>


            <Score numberOfPlayers={numberOfPlayers} />

            <Row>
                <Col>
                    <img role={"button"} className={"cursor-pointer"} onClick={handleDeckClick} src={deckImage} alt={"back_card"} />
                </Col>
            </Row>

            <Row className={"text-center"}><h2>Remaining: {remaining}</h2></Row>
            <Row className={"text-center"}><h2>Reshuffle: {reshuffled}</h2></Row>

            {
                remaining === 0 && points.length > 0 ?
                    <Row className={"text-center"}><h1>Game over! Player {points.indexOf(Math.max(...points)) + 1} wins!</h1></Row>
                    : null
            }
        </Container >


    )

};
export default Game;