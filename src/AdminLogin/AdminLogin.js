import React, {useState} from 'react';
import './AdminLogin.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import { loginAdmin } from "../api/adminApi";
import { useNavigate } from 'react-router-dom';



const AdminLogin = () => {

    const [form, setForm] = useState({ email: "", password: "" });
    const navigate = useNavigate();
    

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await loginAdmin(form);
            alert(`Welcome, ${res.fullname}`);
            navigate('./dashboard')
        } catch (err) {
            alert(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className='form_container'>
            <div className='form_inner_container'>
                <div className='sidebar_form'>
                    <h3>Customer Satisfaction Adminitration Portal</h3>
                    <p>Don't have an account   
                        <Link to='/AdminSignup'>
                            <button className='login_signup_button admin_button'>Sign Up</button>
                        </Link>
                    </p>
                </div>
                <form onSubmit={handleSubmit} className='login_form login_signup_style'>
                    <div className='details_container'>
                        <label className='form_label'>Email : </label>
                        <input name='email' value={form.email} onChange={handleChange} type='email' className='form_input'></input>
                    </div>

                    <div className='details_container'>
                        <label className='form_label'>Password : </label>
                        <input name='password' value={form.password} onChange={handleChange} type='password' className='form_input'></input>                    
                    </div>
                    
                    <button type='submit' className='login_button admin_button'>Login</button>
                    <button className='inwith_button'><FontAwesomeIcon icon={faGoogle} className='google_button'></FontAwesomeIcon>Continue with Google</button>
                    <p>Forget Password</p>
                </form>
            </div>
         
        </div>
    );
}

export default AdminLogin;
