import React, {useState, useEffect} from 'react';
import { getAnalytics, logoutAdmin } from "../api/adminApi";
import { CircleLoader } from 'react-spinners';
import './DashBoard.css';
import { useNavigate } from 'react-router-dom';
import {saveAs} from 'file-saver';
import {
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Legend,
    Line,
    LineChart,
    CartesianGrid
} from "recharts";

const COLORS = ["#0088FE", "#FF8042", "#00C49F", "#FFBB28"];

const DashBoard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const navigate = useNavigate()

    const logout = () => {
        logoutAdmin();
        navigate('/');
    };

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await getAnalytics(startDate, endDate);
                setStats(data);
            } catch {
                alert("Failed to load analytics");
            }
            setLoading(false);
        };
        loadData();
    }, [startDate, endDate]);

    if (loading)
        return (
            <div className="loader-container">
                <CircleLoader size={80} color="#0057D9" />
            </div>
        );

    if (!stats) return <p>No analytics available. || Server Down</p>;

    const genderData = stats.genderCounts.map((g) => ({
        name: g._id || "Unknown",
        value: g.count,
    }));

    const categoryData = stats.categoryCounts.map((c) => ({
        name: c._id || "Unknown",
        value: c.count,
    }));

    const municipalityData = stats.municipalityCounts.map((m) => ({
        name: m._id || "Unknown",
        value: m.count,
    }));

    const localityData = stats.localityCounts.map((l) => ({
        name: l._id || "Unknown",
        value: l.count,
    }));

    const ratings = stats.ratingAverages;

    const ratingSectionData = [
        { name: "Transparency", value: ratings.avgTransparency },
        { name: "Cost of Service", value: ratings.avgCostOfService },
        { name: "Value for Money", value: ratings.avgValueForMoney },
        { name: "Service Delivary", value: ratings.avgServiceDelivary },
    ];

    // CSV Export
    const exportCSV = () => {
        const rows = [
            ["Metric", "Value"],
            ["Total Responses", stats.totalResponses],
            ...genderData.map(g => [`Gender - ${g.name}`, g.value]),
            ...categoryData.map(c => [`Category - ${c.name}`, c.value]),
            ["Transparency", ratings.avgTransparency.toFixed(2)],
            ["Cost of Service", ratings.avgCostOfService.toFixed(2)],
            ["Value for Money", ratings.avgValueForMoney.toFixed(2)],
            ["Service Delivery", ratings.avgServiceDelivary.toFixed(2)],
            ["Overall Average", stats.avgOverallSatisfaction.toFixed(2)],
        ];
        const csvContent = rows.map(r => r.join(",")).join("\n");
        const blob = new Blob([csvContent], { type: "text/csv" });
        saveAs(blob, "survey_analytics.csv");
    };
    console.log("Rating Section Data:", ratingSectionData);

    return (
    <div className="dashboard-container">

        <div className="dashboard-header">
            <h2>Customer Satisfaction Analytics Dashboard</h2>

            <div className="filters">
                <div>
                    <label>Start Date:</label>
                    <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                </div>

                <div>
                    <label>End Date:</label>
                    <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </div>

                <button onClick={exportCSV}>Export CSV</button>
            </div>

            <button className="logout-btn" onClick={logout}>Logout</button>
        </div>

        <div className="stats-box">
            <h3>Total Responses</h3>
            <p>{stats.totalResponses}</p>
        </div>

        <div className="charts-row">
        
            {/* Gender Chart */}
            <div className="chart-card">
                <h3>Gender Breakdown</h3>
                <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                        <Pie data={genderData} dataKey="value" nameKey="name" label>
                            {genderData.map((_, i) => (
                                <Cell key={i} fill={COLORS[i % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            {/* Category Chart */}
            <div className="chart-card">
                <h3>Category Breakdown</h3>
                <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                        <Pie data={categoryData} dataKey="value" nameKey="name" label>
                            {categoryData.map((_, i) => (
                                <Cell key={i} fill={COLORS[i % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>

        </div>

        {/* Locality Bar Chart */}
        <div className="chart-card full-width">
            <h3>Locality Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={localityData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#0088FE" />
                </BarChart>
            </ResponsiveContainer>
        </div>

        {/* Municipality Bar Chart */}
        <div className="chart-card full-width">
            <h3>Municipality Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={municipalityData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#0088FE" />
                </BarChart>
            </ResponsiveContainer>
        </div>

        <div className="chart-card">
            <h3>Factor Ractings</h3>
            <ResponsiveContainer width="100%" height={350}>
                <BarChart data={ratingSectionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 5]} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#4F46E5" />
                </BarChart>
            </ResponsiveContainer>
        </div>

        <div className="chart-card">
            <h3>Satisfaction Trend</h3>
            <LineChart width={600} height={300} data={ratingSectionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#FF8042" />
            </LineChart>
        </div>

        <div className="stats-box">
            <h3>Overall Ratings</h3>
            <p>{stats.avgOverallSatisfaction}</p>
        </div>

    </div>
    );
};

export default DashBoard;