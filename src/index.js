import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { UseFrontPageDataProvider} from "./context/frontPageData";
import { UseScoreDataProvider } from './context/scoreData';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UseScoreDataProvider>
    <UseFrontPageDataProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UseFrontPageDataProvider>
  </UseScoreDataProvider>
);

