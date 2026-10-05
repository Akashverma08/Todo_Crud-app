
import { createRoot } from 'react-dom/client'
import { store } from "./redux/store.ts";
import { Provider } from "react-redux";
import App from './App.tsx'
import { BrowserRouter } from 'react-router'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />

    </Provider>

  </BrowserRouter>

)
