import { BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom/client'
import App from './App.js'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
)
