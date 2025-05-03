import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import autoTable from 'jspdf-autotable';

function DisplayProgressUpdates() {
    const [Progress, setProgress] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        loadUpdates();
    }, []);

    const loadUpdates = async () => {
        try {
            const result = await axios.get("http://localhost:8080/api/progress");
            setProgress(result.data);
        } catch (error) {
            console.error("Error loading progress updates:", error);
        }
    };

    const UpdateNavigate = (id) => {
        window.location.href = `/updateProgress/${id}`;
    };

    const deleteProgress = async (id) => {
        if (window.confirm("Are you sure you want to delete this progress record?")) {
            try {
                await axios.delete(`http://localhost:8080/api/progress/${id}`);
                alert("Progress record deleted successfully.");
                loadUpdates();
            } catch (error) {
                console.error("Error deleting progress:", error);
                alert("Failed to delete the record.");
            }
        }
    };

    const generatePDF = () => {
        const doc = new jsPDF("portrait");

        doc.text("Progress Records List", 14, 10);

        const tableData = Progress.map((progress) => [
            progress.progressId,
            progress.progressName,
            progress.progressCategory,
            progress.progressQty,
            progress.progressDetails,
        ]);

        autoTable(doc, {
            head: [['Progress ID', 'Progress Name', 'Category', 'Quantity', 'Details']],
            body: tableData,
            startY: 20,
            styles: { fontSize: 10, cellPadding: 3 },
            headStyles: { fillColor: [139, 69, 19] },
            alternateRowStyles: { fillColor: [245, 222, 179] }
        });

        doc.save("progress_records.pdf");
    };

    // Define theme colors
    const colors = {
        primary: "#8b4513",
        secondary: "#f5deb3",
        accent: "#654321",
        text: "#3a3a3a",
        border: "#daa520",
        lightBorder: "#e6c088",
        tableBg1: "rgba(245, 222, 179, 0.3)",
        tableBg2: "rgba(255, 248, 231, 0.5)",
        buttonHover: "#7b3f11",
        deleteButton: "#a52a2a",
        deleteHover: "#800000"
    };

    // search function
    const [searchQuery, setSearchQuery] = useState("");
    const filteredData = Progress.filter(
        (progress) =>
            progress.progressId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            progress.progressName?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div style={{
            fontFamily: "'Georgia', serif",
            maxWidth: "90%",
            margin: "0 auto",
            padding: "20px",
            background: `linear-gradient(to bottom, ${colors.secondary}, #fff)`,
            borderRadius: "10px",
            boxShadow: "0 0 15px rgba(0, 0, 0, 0.2)",
            border: `2px solid ${colors.border}`
        }}>
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px"
            }}>
                <div style={{
                    position: "relative",
                    maxWidth: "300px",
                    width: "100%"
                }}>
                    <input
                        type='text'
                        placeholder='Search by ID or name'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                            width: "100%",
                            padding: "10px 30px 10px 12px",
                            border: `1px solid ${colors.border}`,
                            borderRadius: "5px",
                            fontFamily: "'Georgia', serif",
                            fontSize: "14px",
                            transition: "all 0.3s ease"
                        }}
                    />
                    <span style={{
                        position: "absolute",
                        right: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        fontSize: "16px"
                    }}>🔍</span>
                </div>
                <button 
                    onClick={generatePDF}
                    style={{
                        backgroundColor: colors.primary,
                        color: "white",
                        border: "none",
                        padding: "10px 15px",
                        borderRadius: "5px",
                        cursor: "pointer",
                        fontWeight: "bold",
                        letterSpacing: "1px",
                        transition: "all 0.3s ease",
                        backgroundImage: `linear-gradient(to bottom, ${colors.primary}, ${colors.accent})`,
                        boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px"
                    }}
                    onMouseOver={(e) => {
                        e.target.style.backgroundColor = colors.accent;
                        e.target.style.transform = "translateY(-2px)";
                        e.target.style.boxShadow = "0 4px 8px rgba(0,0,0,0.3)";
                    }}
                    onMouseOut={(e) => {
                        e.target.style.backgroundColor = colors.primary;
                        e.target.style.transform = "translateY(0)";
                        e.target.style.boxShadow = "0 2px 4px rgba(0,0,0,0.2)";
                    }}
                >
                    <span style={{ fontSize: "16px" }}>📄</span> Generate PDF
                </button>
            </div>

            <h1 style={{
                textAlign: "center",
                fontSize: "32px",
                fontWeight: "bold",
                color: colors.primary,
                margin: "15px 0 25px 0",
                textTransform: "uppercase",
                letterSpacing: "2px",
                textShadow: "1px 1px 2px rgba(0,0,0,0.2)",
                borderBottom: `2px solid ${colors.border}`,
                paddingBottom: "10px"
            }}>Progress Records</h1>

            <div style={{
                overflowX: "auto",
                background: "rgba(255,255,255,0.7)",
                padding: "20px",
                borderRadius: "8px",
                border: `1px solid ${colors.border}`,
                boxShadow: "inset 0 0 10px rgba(0,0,0,0.1)"
            }}>
                <table style={{
                    width: "100%",
                    borderCollapse: "separate",
                    borderSpacing: "0",
                    borderRadius: "5px",
                    overflow: "hidden",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                }}>
                    <thead>
                        <tr style={{
                            background: `linear-gradient(to bottom, ${colors.primary}, ${colors.accent})`,
                            color: "white",
                            textTransform: "uppercase",
                            letterSpacing: "1px"
                        }}>
                            <th style={{ padding: "15px", fontWeight: "bold", textAlign: "left", borderBottom: `2px solid ${colors.border}` }}>Progress ID</th>
                            <th style={{ padding: "15px", fontWeight: "bold", textAlign: "center", borderBottom: `2px solid ${colors.border}` }}>Progress</th>
                            <th style={{ padding: "15px", fontWeight: "bold", textAlign: "left", borderBottom: `2px solid ${colors.border}` }}>Item Name</th>
                            <th style={{ padding: "15px", fontWeight: "bold", textAlign: "left", borderBottom: `2px solid ${colors.border}` }}>Category</th>
                            <th style={{ padding: "15px", fontWeight: "bold", textAlign: "center", borderBottom: `2px solid ${colors.border}` }}>Quantity</th>
                            <th style={{ padding: "15px", fontWeight: "bold", textAlign: "left", borderBottom: `2px solid ${colors.border}` }}>Details</th>
                            <th style={{ padding: "15px", fontWeight: "bold", textAlign: "center", borderBottom: `2px solid ${colors.border}` }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((progressItem, index) => (
                            <tr key={index} style={{
                                backgroundColor: index % 2 === 0 ? colors.tableBg1 : colors.tableBg2,
                                transition: "background-color 0.3s ease"
                            }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.backgroundColor = "rgba(218, 165, 32, 0.2)";
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.backgroundColor = index % 2 === 0 ? colors.tableBg1 : colors.tableBg2;
                                }}>
                                <td style={{ 
                                    padding: "12px 15px", 
                                    borderBottom: `1px solid ${colors.lightBorder}`, 
                                    fontWeight: "bold", 
                                    color: colors.primary 
                                }}>{progressItem.progressId}</td>
                                <td style={{ 
                                    padding: "12px 15px", 
                                    borderBottom: `1px solid ${colors.lightBorder}`, 
                                    textAlign: "center" 
                                }}>
                                    {progressItem.progressImage && (
                                        <img
                                            src={`http://localhost:8080/api/progress/media/${progressItem.progressImage}`}
                                            alt={progressItem.progressName}
                                            width="50"
                                            height="50"
                                            style={{
                                                borderRadius: "5px",
                                                border: `2px solid ${colors.border}`,
                                                objectFit: "cover",
                                                boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
                                            }}
                                        />
                                    )}
                                </td>
                                <td style={{ 
                                    padding: "12px 15px", 
                                    borderBottom: `1px solid ${colors.lightBorder}` 
                                }}>{progressItem.progressName}</td>
                                <td style={{ 
                                    padding: "12px 15px", 
                                    borderBottom: `1px solid ${colors.lightBorder}`, 
                                    fontStyle: "italic" 
                                }}>{progressItem.progressCategory}</td>
                                <td style={{ 
                                    padding: "12px 15px", 
                                    borderBottom: `1px solid ${colors.lightBorder}`, 
                                    textAlign: "center", 
                                    fontWeight: "bold" 
                                }}>{progressItem.progressQty}</td>
                                <td style={{ 
                                    padding: "12px 15px", 
                                    borderBottom: `1px solid ${colors.lightBorder}`, 
                                    maxWidth: "200px", 
                                    overflow: "hidden", 
                                    textOverflow: "ellipsis", 
                                    whiteSpace: "nowrap" 
                                }}>{progressItem.progressDetails}</td>
                                <td style={{ 
                                    padding: "12px 15px", 
                                    borderBottom: `1px solid ${colors.lightBorder}`, 
                                    textAlign: "center",
                                    display: "flex",
                                    justifyContent: "center",
                                    gap: "8px"
                                }}>
                                    <button
                                        onClick={() => UpdateNavigate(progressItem.id)}
                                        style={{
                                            backgroundColor: colors.primary,
                                            color: "white",
                                            border: "none",
                                            padding: "8px 12px",
                                            borderRadius: "5px",
                                            cursor: "pointer",
                                            fontWeight: "bold",
                                            letterSpacing: "1px",
                                            transition: "all 0.3s ease",
                                            backgroundImage: `linear-gradient(to bottom, ${colors.primary}, ${colors.accent})`,
                                            boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
                                        }}
                                        onMouseOver={(e) => {
                                            e.target.style.backgroundColor = colors.accent;
                                            e.target.style.transform = "translateY(-2px)";
                                            e.target.style.boxShadow = "0 4px 8px rgba(0,0,0,0.3)";
                                        }}
                                        onMouseOut={(e) => {
                                            e.target.style.backgroundColor = colors.primary;
                                            e.target.style.transform = "translateY(0)";
                                            e.target.style.boxShadow = "0 2px 4px rgba(0,0,0,0.2)";
                                        }}
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={() => deleteProgress(progressItem.id)}
                                        style={{
                                            backgroundColor: colors.deleteButton,
                                            color: "white",
                                            border: "none",
                                            padding: "8px 12px",
                                            borderRadius: "5px",
                                            cursor: "pointer",
                                            fontWeight: "bold",
                                            letterSpacing: "1px",
                                            transition: "all 0.3s ease",
                                            backgroundImage: `linear-gradient(to bottom, ${colors.deleteButton}, ${colors.deleteHover})`,
                                            boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
                                        }}
                                        onMouseOver={(e) => {
                                            e.target.style.backgroundColor = colors.deleteHover;
                                            e.target.style.transform = "translateY(-2px)";
                                            e.target.style.boxShadow = "0 4px 8px rgba(0,0,0,0.3)";
                                        }}
                                        onMouseOut={(e) => {
                                            e.target.style.backgroundColor = colors.deleteButton;
                                            e.target.style.transform = "translateY(0)";
                                            e.target.style.boxShadow = "0 2px 4px rgba(0,0,0,0.2)";
                                        }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {Progress.length === 0 && (
                    <div style={{
                        textAlign: "center",
                        padding: "30px",
                        color: colors.primary,
                        fontStyle: "italic",
                        fontSize: "18px",
                        background: "rgba(245, 222, 179, 0.2)",
                        borderRadius: "5px",
                        margin: "20px 0",
                        border: `1px dashed ${colors.border}`
                    }}>
                        No progress records found. Please add some records.
                    </div>
                )}
            </div>
        </div>
    );
}

export default DisplayProgressUpdates;