import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';
import { Layout } from './components/layout/layout';
import { AppContext } from './contexts/AppContext';
function App() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const api = (window as any).api;

  return (
    <>
      <Router>
        <AppContext.Provider value={api}>
          <Layout>
            <Routes />
          </Layout>
        </AppContext.Provider>
      </Router>
    </>
  );
}

export default App;
