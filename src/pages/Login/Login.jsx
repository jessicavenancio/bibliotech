import { useContext, useState } from "react";
import { Button, Container, Form, InputGroup, Nav } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link, Navigate, useNavigate } from "react-router-dom";
import googleIcon from "../../assets/icons/google-white.svg";
import githubWhiteIcon from "../../assets/icons/githubWhiteIcon.svg";
import facebookWhite from "../../assets/icons/facebookWhite.svg"
import loginImg from "../../assets/BookTech/05 - LogoNome.png";
import { AuthContext } from "../../contexts/AuthContext";
import { loginGoogle, loginEmailSenha, loginGitHub, loginFacebook } from "../../firebase/auth";
import { Footer } from "../../components/Footer/Footer";
import "./Login.css"
import { firebaseError } from "../../firebase/firebaseError";

export function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  function onSubmit(data) {
    const { email, senha } = data;
    loginEmailSenha(email, senha)
      .then((user) => {
        if (user.emailVerified) {
          navigate("/");
        } else {
          navigate("/verificacao-email");
        }
      })
      .catch((erro) => {
        toast.error(`Um erro aconteceu.  ${firebaseError(erro.code)}`, {
          position: "bottom-right",
          duration: 2500,
        });
      });
  }

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

  function onLoginGoogle() {
    loginGoogle()
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

  const usuarioLogado = useContext(AuthContext);

  // Se tiver dados no objeto, está logado
  if (usuarioLogado !== null) {
    return <Navigate to="/" />;
  }

  return (
    <Container fluid className="my-2">
      <div className="px-5 py-3 px-md-5 text-center text-lg-start" id="div-bg">
        <div class="container">
          <div class="row gx-lg-5 align-items-center">

            <div class="col-lg-6 mb-3 mb-lg-0">
            <p className="text-center">
            <img src={loginImg} width="256" alt="Logo" />
          </p>

          <h1 class="my-3 display-3 fw-bold ls-tight" >
            Bem-vindo <br />
            <h2 id="span-p">à nossa biblioteca online!</h2>
          </h1>
          <p id="texto" >
            Acesse nossa biblioteca digital de qualquer lugar e a qualquer momento,
            basta ter um dispositivo conectado à internet.
            Faça uma busca rápida pelo título ou autor que deseja e encontre o que procura em segundos.
          </p>

            </div>

            <div className="col-lg-6 mb-2 mb-lg-0">
              <div className="card">
                <div className="card-body py-3 px-md-5">
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group className="mb-2" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Seu email"
                      className={errors.email ? "is-invalid" : ""}
                      {...register("email", { required: "Email é obrigatório" })}
                    />
                    <Form.Text className="invalid-feedback">
                      {errors.email?.message}
                    </Form.Text>
                  </Form.Group>

                  <Form.Label>Senha</Form.Label>
                  <InputGroup className="mb-2" controlId="senha">
                    <Form.Control
                      id="senha"
                      type={inputType}
                      placeholder="Sua senha"
                      className={errors.senha ? "is-invalid" : ""}
                      {...register("senha", { required: "Senha é obrigatória" })}
                    />
                    <InputGroup.Text onClick={showPassword}><i className={iconType}></i></InputGroup.Text>
                    <Form.Text className="invalid-feedback">
                      {errors.senha?.message}
                    </Form.Text>
                  </InputGroup>
                  <Button id="btn-custom" type="submit" variant="primary" className="btn btn-primary btn-block mb-4 ">
                      Enviar
                    </Button>
                </Form>

                <div id="icones-login" className="text-center">
                    <p className="text-muted" >Ou acesse com:</p>

                    <div class="d-flex justify-content-center">

                      <button id="btn-custom" type="button" class="btn btn-sm btn-primary mx-2"
                        onClick={onLoginGoogle}>
                        <img src={googleIcon} alt="Google icon" />
                      </button>

                      <button id="btn-custom" type="button" class="btn btn-sm btn-primary mx-2"
                        onClick={onLoginGitHub}>
                        <img src={githubWhiteIcon} alt="GitHub icon" />
                      </button>

                      <button id="btn-face" type="button" class="btn btn-sm btn-primary mx-2"
                        onClick={onLoginFacebook}>
                        <i class="bi bi-facebook" ></i>
                      </button>
                    </div>
                  </div>


                <p className="text-muted mt-3">
                  Esqueceu a senha? <Link to="/EsqueciMinhaSenha">Acesse</Link><br />
                  Não tem conta? <Link to="/cadastro">Cadastre-se</Link> <br /> <br />
                  Nossos produtos? <Link to="/vendas">Assine aqui!</Link>
                </p>
                </div>
              </div>
            </div>




            {/* <h4>Bem-vindo(a) de volta!</h4>
            <p className="text-muted">
              Não tem conta? <Link to="/cadastro">Cadastre-se</Link>
            </p>
            <hr />
            <div>
              <Button className="mb-2" variant="danger" onClick={onLoginGoogle} style={{ width: '260px' }}>
                <img src={googleIcon} width="32" alt="Google icon" /> Entrar com o
                Google
              </Button>
              <br />
              <Button className="mb-2" variant="dark" onClick={onLoginGitHub} style={{ width: '260px' }}>
                <img src={githubWhiteIcon} width="32" alt="GitHub icon" /> Entrar com o
                GitHub
              </Button>
              <br />
              <Button className="mb-2" onClick={onLoginFacebook} style={{ width: '260px' }}>
                <img src={facebookWhite} width="30" alt="Facebook icon" /> Entrar com o
                Facebook
              </Button>
            </div>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="mb-5" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Seu email"
                  className={errors.email ? "is-invalid" : ""}
                  {...register("email", { required: "Email é obrigatório" })}
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
                <InputGroup.Text onClick={showPassword}><i className={iconType}></i></InputGroup.Text>
                <Form.Text className="invalid-feedback">
                  {errors.senha?.message}
                </Form.Text>
              </InputGroup>
              <p className="text-muted">
                Esqueci minha senha <Link to="/EsqueciMinhaSenha">Acesse</Link>
              </p>
              <Button type="submit" variant="success">
                Entrar
              </Button>
            </Form>
            <Button type="submit" className="mt-3" variant="danger">
              <Nav.Link as={Link} to="/vendas">
                Compre já! <i className="ml-2 bi bi-tags"></i>
              </Nav.Link>
            </Button> */}
          </div>
        </div>
      </div>

      <footer><Footer /></footer>
    </Container>
  );
}