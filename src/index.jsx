import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./index.css";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';


const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(<App />);
