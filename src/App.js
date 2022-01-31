import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/main.scss';

import {BrowserRouter as Router} from 'react-router-dom'
import Routers from './Routers';
import './App.css';

function App() {
  return (
    <Router>
      <Routers />
    </Router>
  );
}

export default App;
