import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { getAuth, onAuthStateChanged, sendEmailVerification } from "firebase/auth";
import { firebaseError } from '../../firebase/firebaseError';
import { Button, Container } from 'react-bootstrap';
import "./EmailVerification.css"



function EmailVerification () {
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.emailVerified) {
          window.location.href = "http://localhost:3000/";
          
        }
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const handleSendEmailVerification = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        toast.success(`Email de verificação enviado para ${auth.currentUser.email}`, {
          position: "bottom-right",
          duration: 2500,
        });
        
      })
      .catch((erro) => {
        toast.error(`Um erro aconteceu.  ${firebaseError(erro.code)}`, {
          position: "bottom-right",
          duration: 2500,
        });
      });
  }

  return (
    <div className='verificacao'>
      <Container>
      <h2 className='titulo-2'>Para concluir o cadastro clique no botão abaixo para verificar seu email</h2>
      <Button variant="success" size="lg" onClick={handleSendEmailVerification}>
      Enviar email de verificação
        </Button>
        <h5 className='titulo-5'>Após verificar seu email, atualize a página para acessar o site!</h5>
      </Container>
    </div>
  );
}

export default EmailVerification;
