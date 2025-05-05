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



import AddProgress from "./Page/Salindu/AddProgress";
import DisplayProgress from "./Page/Salindu/DisplayProgress";
import UpdateProgress from "./Page/Salindu/UpdateProgress";
import MainProgress from "./Page/Salindu/MainProgress";
import Register from "./Page/Salindu/Register";
import Login from "./Page/Salindu/Login";
import UserProfile from "./Page/Salindu/UserProfile";


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


    <Route path="/addprogress" element={<AddProgress />} />
          <Route path="/allprogresss" element={<DisplayProgress/>}/>
          <Route path="/updateprogress/:id" element={<UpdateProgress/>}/>
          <Route path="/mainprogress" element={<MainProgress/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/userprofile" element={<UserProfile/>}/>

  </Routes>

  </BrowserRouter>,
document.getElementById('root')
);


