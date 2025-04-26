import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RecipeForm from './Page/RecipeForm';
import PostView from './Page/PostView';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>


  <Routes>

    <Route path='/' element={<App />} />
    <Route path='/recipes' element={<RecipeForm />} />
    <Route path='/postview' element={<PostView />} />


  </Routes>

  </BrowserRouter>,
document.getElementById('root')
);


