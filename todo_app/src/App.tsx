import { Provider } from 'react-redux';
import { store } from './store';
import TodoPage from './pages/TodoPage';
import Layout from './components/layout/Layout';
import { ThemeProvider } from './components/contexts/ThemeContext';
function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Layout>
          <div className="container mx-auto px-4">

            <TodoPage />
          </div>
        </Layout>
      </ThemeProvider>
    </Provider >
  );
}

export default App;