import React from "react";
import{ useNavigate} from "react-router-dom";
import "../Components/RecipeStyle.css";
import Body from '../Components/Body';


function Header(){

   
    const navigate = useNavigate();

    return (
        <div>
            <p style={{ width:"50%", marginLeft: "27%",marginRight:"20%", marginTop:"1%", color: "rgba(167, 76, 23, 0.93)", fontWeight: "1000" ,fontSize:"35px"}}>
              Traditional Recipe Sharing & Learning
            </p>

            
            <nav className="navbar navbar-expand-lg bg-body-tertiary" style={{color: "red"}}>
                <div className="container-fluid">
                    <a className="navbar-brand">
                        <b>
                            <h4 style={{ color: "rgba(243, 224, 24, 0.98)" }}>
                               <b><b>
                                    Recipe <span style={{ color: "white" }}>Management</span>
                                </b> </b>
                            </h4>
                        </b>
                    </a>
                  <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNavDropdown"
                        aria-controls="navbarNavDropdown"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav" style={{ marginLeft: "10%" }}>
                            <li className="nav-item">
                                <button className="nav-btn" onClick={() => navigate("/")}>
                                    {" "}
                                    <div className="nav-link_H" aria-current="page" href="#"><b>
                                        Home
                                        </b>
                                    </div>
                                </button>
                            </li>

                            <li className="nav-item" style={{ marginLeft: "10%" }}>
                                <button className="nav-btn" onClick={() => navigate("/recipes")}>
                                    <div className="nav-link_H">
                                   <b>Recipes</b> 
                                    </div>
                                </button>
                            </li>

                             <li className="nav-item" style={{ marginLeft: "10%" }}>
                                <button className="nav-btn" onClick={() => navigate("/postview")}>
                                    {" "}
                                    <div className="nav-link_H">
                                       <b>Post View </b> 
                                    </div>
                                </button>
                            </li>

                            <li className="nav-item" style={{ marginLeft: "10%" }}>
                                <button className="nav-btn" onClick={() => navigate("/PlanList")}>
                                    {" "}
                                    <div className="nav-link_H">
                                       <b>Learning Plans </b> 
                                    </div>
                                </button>
                            </li>
                              <li className="nav-item" style={{ marginLeft: "10%" }}>
                                <button className="nav-btn" onClick={() => navigate("/addprogress")}>
                                    {" "}
                                    <div className="nav-link_H">
                                       <b>Learning Progress   </b> 
                                    </div>
                                </button>
                            </li>


                            

                        </ul>
                    </div>
                </div>
            </nav>
        <div>
        </div>
        </div>


    ); 

}

export default Header;