import { Container, Spinner } from "react-bootstrap";
import login from '../../assets/images/login.png';

export function Loader() {
    return (
        <Container className="d-flex justify-content-center align-items-center">
            <img className="loader-image" src={login} alt="imagem de carregamento" />
            <Spinner variant="success"></Spinner>
            <span className="ms-1">Carregando...</span>
        </Container>
    )
}