import { createRoot } from "react-dom/client";
import Routing from './Components/routing'
import {Provider} from 'react-redux'
import Store from './Store/storefile'


const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <Provider store={Store}>
    <Routing />
  </Provider>
);
