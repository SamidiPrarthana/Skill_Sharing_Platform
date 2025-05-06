import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RecipeForm from './Page/RecipeForm';
import PostView from './Page/PostView';
import PlanForm from './Page/PlanForm';
import PlansList from './Page/PlansList';
import EditPlan from './Page/EditPlan';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>


  <Routes>

    <Route path='/' element={<App />} />
    <Route path='/recipes' element={<RecipeForm />} />
    <Route path='/postview' element={<PostView />} />
    <Route path="/Planform" element={<PlanForm />} />
    <Route path="/PlanList" element={<PlansList/>} />
    <Route path='/EditPlan/:planId' element={<EditPlan />} />


  </Routes>

  </BrowserRouter>,
document.getElementById('root')
);


