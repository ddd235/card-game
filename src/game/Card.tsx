import { Col } from "react-bootstrap";

type CardProps = {
    image: string;
    value: string;
    key?: any
};

const Card = ({ ...props }: CardProps): JSX.Element =>
    <Col key={props.key ? props.key : ""} className="card-container">
        <img src={props.image} />
    </Col>;

export default Card;