import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RecipeForm from './Page/RecipeForm';
import PostView from './Page/PostView';
import EditRecipe from './Page/EditRecipe';





import PlanForm from './Page/PlanForm';
import PlansList from './Page/PlansList';
import EditPlan from './Page/EditPlan';
import PlanView from './Page/PlanView';
import Home from './Page/Home';
import Login from './Page/Login';
import PlanListBefore from './Page/PlanListBefore';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>


  <Routes>

    <Route path='/' element={<App />} />
    <Route path='/recipes' element={<RecipeForm />} />
    <Route path='/postview' element={<PostView />} />
    <Route path="/update/:id" element={<EditRecipe  />} />




    <Route path="/Planform" element={<PlanForm />} />
    <Route path="/PlanList" element={<PlansList/>} />
    <Route path='/EditPlan/:planId' element={<EditPlan />} />
    <Route path="/PlanView/:planId" element={<PlanView />} />
    <Route path="/home" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/PlanListBefore" element={<PlanListBefore />} />


  </Routes>

  </BrowserRouter>,
document.getElementById('root')
);


