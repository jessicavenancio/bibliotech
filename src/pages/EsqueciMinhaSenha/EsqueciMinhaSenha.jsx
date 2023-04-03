import { Button, Container, Form } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import logoIcon from "../../assets/images/reset2.png";
import { useForm } from "react-hook-form";
import { useNavigate, Navigate } from "react-router-dom";
import { loginEmailSenha } from "../../firebase/auth";
import { esqueciMinhaSenha } from "../../firebase/auth";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import "./EsqueciMinhaSenha.css";

export function EsqueciMinhaSenha() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  function onSubmit(data) {
    const { email } = data;
    loginEmailSenha(email).then((user) => {
      console.log(user);
    });
  }

  function onEsqueciMinhaSenha() {
    esqueciMinhaSenha()
      .then((user) => {
        toast.success(`E-mail enviado! ${user.email}`, {
          position: "bottom-right",
          duration: 2500,
        });
        navigate("/");
      })
      .catch((erro) => {
        toast.error(`Um erro aconteceu. Código: ${erro.code}`, {
          position: "bottom-right",
          duration: 2500,
        });
      });
  }


  const usuarioLogado = useContext(AuthContext);

  // Se tiver dados no objeto, está logado
  if (usuarioLogado !== null) {
    return <Navigate to="/" />;
  }

  return (
    <Container fluid className="my-5">
      <p className="text-center">
        <img src={logoIcon} width="256" alt="logo do app" />
      </p>
      <h4>Digite o seu e-mail para recuperar a senha</h4>
      <p className="text-muted">
        Lembrou de sua senha? <Link to="/login">Entre</Link>
      </p>
      <hr />

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Digite seu e-mail</Form.Label>
          <Form.Control
            type="email"
            className={errors.email ? "is-invalid" : ""}
            placeholder="Seu email"
            {...register("email", { required: "O e-mail é obrigatório " })}
        />
        <Form.Text className="invalid-feedback">
        {errors.email?.message}
        </Form.Text>
        <br></br>
        </Form.Group>
        <Button variant="primary" type="submit" onClick={onEsqueciMinhaSenha}>
        Recuperar senha
        </Button>
      </Form>
    </Container>
  );
}




