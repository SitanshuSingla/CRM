import { createRoot } from "react-dom/client";
import "./styles.css";
import App from "./App";
import "primereact/resources/themes/lara-light-indigo/theme.css"; // theme
import "primereact/resources/primereact.css"; // core css
import "primeicons/primeicons.css"; // icons
import "primeflex/primeflex.css";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(<App />);
