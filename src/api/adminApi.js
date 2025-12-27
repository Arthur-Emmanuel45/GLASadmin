import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api/adminApi",
});

// Register
export const registerAdmin = async (formData) => {
    const { data } = await API.post("/signup", formData);
    return data;
};

// Login
export const loginAdmin = async (formData) => {
    const { data } = await API.post("/login", formData);
    localStorage.setItem("adminToken", data.token);
    return data;
};

// Get Analytics (Protected)
export const getAnalytics = async (startDate = "", endDate = "") => {
    const token = localStorage.getItem("adminToken");
    const { data } = await API.get("/stats", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: {
            startDate,
            endDate
        }
    });
    return data;
};

//logout
export const logoutAdmin = () => {
    localStorage.removeItem("token");
};

