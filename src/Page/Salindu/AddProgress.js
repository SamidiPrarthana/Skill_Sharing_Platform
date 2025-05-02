import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

function AddProgress() {
    const navigate = useNavigate();
    const [progressUpdate ,setProgressUpdate] = useState({
        progressId:'',
        progressName:'',
        progressCategory:'',
        progressQty:'',
        progressDetails:'',
        progressImage:''
    });
    const { progressId, progressName , progressCategory, progressQty, progressDetails } = progressUpdate;

    const onInputChange = (e) => {
        if (e.target.name === 'progressImage'){
            setProgressUpdate({...progressUpdate,progressImage:e.target.files[0]});
        } else {
            setProgressUpdate({...progressUpdate, [e.target.name]: e.target.value })
        }
    }

    const onsubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", progressUpdate.progressImage);
        let imageName = "";

        try {
            const response = await axios.post("http://localhost:8080/api/progress/upload", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            });
            imageName = response.data;
        } catch (error) {
            alert("error uploading image");
            return;
        }

        const updateInventory = {...progressUpdate, progressImage: imageName};
        try {
            await axios.post("http://localhost:8080/api/progress", updateInventory);
            alert("progress added successfully");
            navigate('/allprogresss');
        } catch (error) {
            alert("error adding progress");
        }
    }

    // Traditional theme colors
    const colors = {
        primary: "#8b4513", // Saddle brown - traditional wood color
        secondary: "#f5deb3", // Wheat - traditional paper color
        accent: "#654321", // Dark brown
        text: "#3a3a3a", // Dark grey for text
        border: "#daa520" // Goldenrod for borders
    };

    return (
        <div style={{
            fontFamily: "'Georgia', serif",
            maxWidth: "700px",
            margin: "0 auto",
            padding: "20px",
            background: `linear-gradient(to bottom, ${colors.secondary}, #fff)`,
            borderRadius: "10px",
            boxShadow: "0 0 15px rgba(0, 0, 0, 0.2)",
            border: `2px solid ${colors.border}`
        }}>
            <p style={{
                textAlign: "center", 
                fontSize: "28px", 
                fontWeight: "bold", 
                color: colors.primary,
                margin: "15px 0 25px 0",
                textTransform: "uppercase",
                letterSpacing: "2px",
                textShadow: "1px 1px 2px rgba(0,0,0,0.2)",
                borderBottom: `2px solid ${colors.border}`,
                paddingBottom: "10px"
            }}>ADD PROGRESS</p>
            
            <div className='from_sub_coon' style={{
                background: "rgba(255,255,255,0.7)",
                padding: "20px",
                borderRadius: "8px",
                border: `1px solid ${colors.border}`,
                boxShadow: "inset 0 0 10px rgba(0,0,0,0.1)"
            }}>
                <form id="progressForm" onSubmit={(e)=> onsubmit(e)} style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px"
                }}>
                    <label htmlFor="progressId" style={{
                        color: colors.primary,
                        fontWeight: "bold",
                        marginBottom: "5px",
                        fontSize: "16px"
                    }}>Progress ID:</label>
                    <input type="text" id="progressId" name="progressId" 
                        onChange={(e)=> onInputChange(e)} 
                        value={progressId} 
                        required 
                        style={{
                            padding: "10px",
                            borderRadius: "5px",
                            border: `1px solid ${colors.border}`,
                            fontSize: "16px",
                            marginBottom: "15px",
                            backgroundColor: "rgba(245, 222, 179, 0.3)",
                            transition: "all 0.3s ease"
                        }}
                    />

                    <label htmlFor="progressName" style={{
                        color: colors.primary,
                        fontWeight: "bold",
                        marginBottom: "5px",
                        fontSize: "16px"
                    }}>Progress Name:</label>
                    <input type="text" id="progressName" name="progressName" 
                        onChange={(e)=> onInputChange(e)} 
                        value={progressName} 
                        required 
                        style={{
                            padding: "10px",
                            borderRadius: "5px",
                            border: `1px solid ${colors.border}`,
                            fontSize: "16px",
                            marginBottom: "15px",
                            backgroundColor: "rgba(245, 222, 179, 0.3)",
                            transition: "all 0.3s ease"
                        }}
                    />

                    <label htmlFor="progressCategory" style={{
                        color: colors.primary,
                        fontWeight: "bold",
                        marginBottom: "5px",
                        fontSize: "16px"
                    }}>Progress Category:</label>
                    <select id="progressCategory" name="progressCategory" 
                        onChange={(e)=> onInputChange(e)} 
                        value={progressCategory} 
                        required
                        style={{
                            padding: "10px",
                            borderRadius: "5px",
                            border: `1px solid ${colors.border}`,
                            fontSize: "16px",
                            marginBottom: "15px",
                            backgroundColor: "rgba(245, 222, 179, 0.3)",
                            transition: "all 0.3s ease",
                            appearance: "none",
                            backgroundImage: "url('data:image/svg+xml;utf8,<svg fill=\"%238b4513\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M7 10l5 5 5-5z\"/><path d=\"M0 0h24v24H0z\" fill=\"none\"/></svg>')",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "right 10px center"
                        }}
                    >
                        <option value="" disabled>Select Progress Category</option>
                        <option value="Main Course">Main Course</option>
                        <option value="Breakfast">Breakfast</option>
                        <option value="Side Dish">Side Dish</option>
                        <option value="Street Food">Street Food</option>
                        <option value="Dessert">Dessert</option>
                    </select>

                    <label htmlFor="progressQty" style={{
                        color: colors.primary,
                        fontWeight: "bold",
                        marginBottom: "5px",
                        fontSize: "16px"
                    }}>Progress Quantity:</label>
                    <input type="number" id="progressQty" 
                        value={progressQty} 
                        onChange={(e)=> onInputChange(e)} 
                        name="progressQty" 
                        required 
                        style={{
                            padding: "10px",
                            borderRadius: "5px",
                            border: `1px solid ${colors.border}`,
                            fontSize: "16px",
                            marginBottom: "15px",
                            backgroundColor: "rgba(245, 222, 179, 0.3)",
                            transition: "all 0.3s ease"
                        }}
                    />

                    <label htmlFor="progressDetails" style={{
                        color: colors.primary,
                        fontWeight: "bold",
                        marginBottom: "5px",
                        fontSize: "16px"
                    }}>Item Details:</label>
                    <textarea id="progressDetails" 
                        onChange={(e)=> onInputChange(e)} 
                        name="progressDetails" 
                        value={progressDetails} 
                        required
                        style={{
                            padding: "10px",
                            borderRadius: "5px",
                            border: `1px solid ${colors.border}`,
                            fontSize: "16px",
                            marginBottom: "15px",
                            backgroundColor: "rgba(245, 222, 179, 0.3)",
                            minHeight: "100px",
                            resize: "vertical",
                            fontFamily: "Georgia, serif",
                            transition: "all 0.3s ease"
                        }}
                    ></textarea>

                    <label htmlFor="progressImage" style={{
                        color: colors.primary,
                        fontWeight: "bold",
                        marginBottom: "5px",
                        fontSize: "16px"
                    }}>Progress Image:</label>
                    <div style={{
                        position: "relative",
                        marginBottom: "15px"
                    }}>
                        <input
                            type="file"
                            id="progressImage"
                            name="progressImage"
                            accept="image/*"
                            onChange={(e)=> onInputChange(e)}
                            style={{
                                padding: "10px",
                                borderRadius: "5px",
                                border: `1px solid ${colors.border}`,
                                fontSize: "16px",
                                width: "100%",
                                backgroundColor: "rgba(245, 222, 179, 0.3)",
                                cursor: "pointer"
                            }}
                        />
                    </div>

                    <button 
                        type="submit" 
                        className='fom-btn'
                        style={{
                            backgroundColor: colors.primary,
                            color: "white",
                            border: "none",
                            padding: "12px 20px",
                            borderRadius: "5px",
                            fontSize: "18px",
                            cursor: "pointer",
                            marginTop: "10px",
                            fontWeight: "bold",
                            letterSpacing: "1px",
                            transition: "all 0.3s ease",
                            boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                            backgroundImage: `linear-gradient(to bottom, ${colors.primary}, ${colors.accent})`,
                            textTransform: "uppercase"
                        }}
                        onMouseOver={(e) => {
                            e.target.style.backgroundColor = colors.accent;
                            e.target.style.transform = "translateY(-2px)";
                            e.target.style.boxShadow = "0 4px 8px rgba(0,0,0,0.3)";
                        }}
                        onMouseOut={(e) => {
                            e.target.style.backgroundColor = colors.primary;
                            e.target.style.transform = "translateY(0)";
                            e.target.style.boxShadow = "0 2px 5px rgba(0,0,0,0.2)";
                        }}
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddProgress