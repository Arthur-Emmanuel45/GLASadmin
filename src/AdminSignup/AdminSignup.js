import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import '../AdminLogin/AdminLogin.css';
import { Link } from 'react-router-dom';
import { registerAdmin } from "../api/adminApi";
import { useNavigate } from 'react-router-dom';


const AdminSignup = () => {
    const [form, setForm] = useState({ fullname: "", email: "", password: "", confirmPassword: "" });
    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await registerAdmin(form);
            alert("Admin registered successfully!");
            console.log(res);
            navigate('./dashboard')
        } catch (err) {
            alert(err.response?.data?.message || "Error signing up");
        }
    };
    return (
        <div>
            <div className='form_container'>
                <div className='form_inner_container'>
                    <form onSubmit={handleSubmit} className='signup_form login_signup_style'>
                        <h4>Create an Account</h4>
                        <div className='details_container'>
                            <label className='form_label'>Full Name : </label>
                            <input name='fullname' value={form.fullname} onChange={handleChange} type='text' className='form_input'></input>
                        </div>

                        <div className='details_container'>
                            <label className='form_label'>Email : </label>
                            <input name='email' value={form.email} onChange={handleChange} type='email' className='form_input'></input>
                        </div>

                        <div className='details_container'>
                            <label className='form_label'>Password : </label>
                            <input name='password' value={form.password} onChange={handleChange} type='password' className='form_input'></input>                    
                        </div>

                         <div className='details_container'>
                            <label className='form_label'>Confirm Password : </label>
                            <input name='confirmPassword' value={form.confirmPassword} onChange={handleChange} type='password' className='form_input'></input>                    
                        </div>
                        
                        <button type='submit' className='signup_button admin_button'>Sign Up</button>

                        <button className='inwith_button'><FontAwesomeIcon icon={faGoogle} className='google_button'></FontAwesomeIcon>Sign Up with Google</button>
                    </form>
                    <div className='sidebar_form'>
                        <h3>Customer Satisfaction Adminitration Portal</h3>
                        <p>Already have an account? 
                            <Link to='/'>
                                <button className='login_signup_button admin_button'>Login</button>
                            </Link>
                        </p>
                    </div>
                </div>
         
            </div>
        </div>
    );
}

export default AdminSignup;
