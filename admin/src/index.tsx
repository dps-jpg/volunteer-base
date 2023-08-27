import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { App } from 'app/App';
import { store } from 'store';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');
const root = createRoot(rootElement);

root.render(
  <BrowserRouter basename={'/admin'}>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
