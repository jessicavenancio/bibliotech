import imgLogo from "../../assets/BookTech/05 - LogoNome.png";

export function Home() {
  return <>
        <div className="col-md-6 m-4">
          <img src={imgLogo} alt="Imagem da biblioteca" class="img-fluid"/>
          <h1 className="text-center m-4">Bem-vindo à Biblioteca</h1>
        </div>
  </>;
}
