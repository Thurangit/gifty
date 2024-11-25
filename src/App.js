import './App.css';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { AppRoutes, routes } from './modules/routes';

function App() {
  return (
    <Router>
      <div>
        
        <AppRoutes />
      </div>
    </Router >
  );
}



export default App;
