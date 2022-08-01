import { Col, Row } from "react-bootstrap";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { useEffect } from "react";
import { initScore } from "./gameSlice";

type ScoreProps = {
    numberOfPlayers: number;
}

const Score = ({ numberOfPlayers }: ScoreProps): JSX.Element => {
    const score = useAppSelector((state) => state.game.playersPoints);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(initScore(numberOfPlayers));
    }, []);
    return (
        <Row className={"score-container"}>
            {
                score.length > 0 ?
                    score.map((points, index) =>
                        <Col key={index}>
                            <h2>
                                Player {index + 1} : {points}
                            </h2>
                        </Col>)
                    : null
            }
        </Row >

    )
}

export default Score;