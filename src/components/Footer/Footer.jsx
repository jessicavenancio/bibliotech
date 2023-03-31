import React from 'react';
import {
  MDBFooter,
  MDBContainer,
  MDBIcon,
  MDBBtn
} from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./Footer.css"

export function Footer() {
    return (
        <div class=".fixed-bottom">
        <MDBFooter className='bg-light text-center text-white'>
            
      <MDBContainer className='p-4 pb-0'>
        
        <section className='mb-4'>
        <div className='me-10 d-none d-lg-block'>
          <span>Conecte-se com nossas Redes Sociais</span>
        </div>
          <MDBBtn outline style={{ backgroundColor: '#55acee' }} color="dark"  floating className='m-1' href='https://facebook.com' target='_blank' role='button'>
            <MDBIcon fab icon='facebook-f' a/>
          </MDBBtn>

          <MDBBtn outline style={{ backgroundColor: '#55acee' }} color="dark" floating className='m-1' href='https://twitter.com' target='_blank' role='button'>
            <MDBIcon fab icon='twitter' />
          </MDBBtn>

          <MDBBtn outline style={{ backgroundColor: '#dd4b39' }} color="dark" floating className='m-1' href='https://google.com' target='_blank' role='button'>
            <MDBIcon fab icon='google' />
          </MDBBtn>
          <MDBBtn outline style={{ backgroundColor: '#ac2bac' }} color="dark" floating className='m-1' href='https://instagram.com' target='_blank' role='button'>
            <MDBIcon fab icon='instagram' />
          </MDBBtn>

          <MDBBtn outline style={{ backgroundColor: '#0082ca' }} color="dark" floating className='m-1' href='https://linkedin.com' target='_blank' role='button'>
            <MDBIcon fab icon='linkedin-in' />
          </MDBBtn>

          <MDBBtn outline style={{ backgroundColor: '#333333' }} color="dark" floating className='m-1' href='https://github.com' target='_blank' role='button'>
            <MDBIcon fab icon='github' />
          </MDBBtn>
        </section>
      </MDBContainer>
      

      <div className='text-center text-dark p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © 2023 Copyright:
        <a className='text-dark' href='https://mdbootstrap.com/'>
              Squad 7
        </a>
      </div>
    </MDBFooter>
    </div>
    )
}