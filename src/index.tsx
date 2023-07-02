import * as React from 'react';
import App from './App';
import {createRoot} from 'react-dom/client';
import * as ReactRouterDom from 'react-router-dom';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import TimeSeries from './components/narrative/time-series/TimeSeries';
import './index.css';
import './reset.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {
        index: true,
        loader: () => ReactRouterDom.redirect('/narrative/time-series')
      },
      {
        path: 'narrative/time-series',
        element: <TimeSeries/>
      }
    ]
  }
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <RouterProvider router={router}/>
    </React.StrictMode>
  );
  
  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals((metric) => {
    // console.log(metric);
  });
} else {
  // Handle the case when the element is not found
}

