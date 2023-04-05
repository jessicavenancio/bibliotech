import { Button, Container, Form, Nav, InputGroup } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import logoIcon from "../../assets/icons/livros.png";
import googleIcon from "../../assets/icons/google-white.svg";
import { useForm } from "react-hook-form";
import { cadastrarEmailSenha, loginFacebook, loginGitHub, loginGoogle } from "../../firebase/auth";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Footer } from "../../components/Footer/Footer";
import githubWhiteIcon from "../../assets/icons/githubWhiteIcon.svg";
import facebookWhite from "../../assets/icons/facebookWhite.svg"
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { firebaseError } from "../../firebase/firebaseError";
import { signOut } from "@firebase/auth";
import { auth } from "../../firebase/config";




export function Cadastro() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [inputType, setInputType] = useState("password");
  const [iconType, setIconType] = useState("bi bi-eye-slash");
  function showPassword() {
    if (inputType === "password") {
      setInputType("text");
      setIconType("bi bi-eye");
    } else {
      setInputType("password");
      setIconType("bi bi-eye-slash");

    }
  }

  const navigate = useNavigate();

  function onSubmit(data) {
    const { email, senha } = data;
    cadastrarEmailSenha(email, senha)
      .then((user) => {
        toast.success(`Cadastro efetuado com sucesso`, {
          position: "bottom-right",
          duration: 4000,
        });;
        signOut(auth).then(() => {
          navigate("/login");
        });
      })
      .catch((erro) => {
        toast.error(`Um erro aconteceu.  ${firebaseError(erro.code)}`, {
          position: "bottom-right",
          duration: 4000,
        });
      });
  }

  function onLoginGoogle() {
    // then = quando der certo o processo
    loginGoogle()
      .then((user) => {
        toast.success(`Bem-vindo(a) ${user.email}`, {
          position: "bottom-right",
          duration: 2500,
        });
        navigate("/");
      })
      .catch((erro) => {
        // tratamento de erro
        toast.error(`Um erro aconteceu.  ${firebaseError(erro.code)}`, {
          position: "bottom-right",
          duration: 2500,
        });
      });
  }


  function onLoginGitHub() {
    loginGitHub()
    .then((user) => {
      toast.success(`Bem-vindo(a) ${user.email}`, {
        position: "bottom-right",
        duration: 2500,
      });
      navigate("/");
    })
    .catch((erro) => {
      toast.error(`Um erro aconteceu.  ${firebaseError(erro.code)}`, {
        position: "bottom-right",
        duration: 2500,
      });
    });
  }

  function onLoginFacebook() {
    loginFacebook()
      .then((user) => {
        toast.success(`Bem-vindo(a) ${user.email}`, {
          position: "bottom-right",
          duration: 2500,
        });
        navigate("/");
      })
      .catch((erro) => {
        toast.error(`Um erro aconteceu.  ${firebaseError(erro.code)}`, {
          position: "bottom-right",
          duration: 2500,
        });
      })
      
  }

  const usuarioLogado = useContext(AuthContext);

  // Se tiver dados no objeto, está logado
  if (usuarioLogado !== null) {
    return <Navigate to="/" />;
  }



  return (
    <Container fluid className="my-5">
      <p className="text-center">
        <img src={logoIcon} width="256" alt="Logo do app" />
      </p>
      <h4>Faça parte da nossa plataforma</h4>
      <p className="text-muted">
        Já tem conta? <Link to="/login">Entre</Link>
      </p>
      <hr />
      <Button className="mb-2" variant="danger" onClick={onLoginGoogle} style={{width: '260px'}}>
        <img src={googleIcon} width="32" alt="Logo do google" />
        Entrar com o Google
      </Button>
      <br />
      <Button className="mb-2" variant="dark" onClick={onLoginGitHub} style={{width: '260px'}}>
        <img src={githubWhiteIcon} width="32" alt="GitHub icon" /> Entrar com o
        GitHub
      </Button>
      <br />
      <Button className="mb-2" onClick={onLoginFacebook} style={{width: '260px'}}>
        <img src={facebookWhite} width="30" alt="Facebook icon" /> Entrar com o
        Facebook
      </Button>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-5" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            className={errors.email && "is-invalid"}
            placeholder="Seu email"
            {...register("email", { required: "O email é obrigatório" })}
          />
          <Form.Text className="invalid-feedback">
            {errors.email?.message}
          </Form.Text>
        </Form.Group>
          <Form.Label>Senha</Form.Label>
          <InputGroup className="mb-5" controlId="senha">
          <Form.Control
            id="senha"
            type={inputType}
            placeholder="Sua senha"
            className={errors.senha ? "is-invalid" : ""}
            {...register("senha", { required: "Senha é obrigatória" })}
          />
          <InputGroup.Text  onClick={showPassword}><i  className={iconType}></i></InputGroup.Text>
          <Form.Text className="invalid-feedback">
            {errors.senha?.message}
          </Form.Text>
        </InputGroup>
        <Button type="submit" variant="success">
          Cadastrar
        </Button>
      </Form>
      <Button type="submit" className="mt-3" variant="danger">
        <Nav.Link as={Link} to="/vendas">
        Compre já! <i className="ml-2 bi bi-tags"></i>
        </Nav.Link>
      </Button>
      <footer><Footer /></footer>

    </Container>
  );
}
