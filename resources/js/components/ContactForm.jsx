import React, { useState } from 'react';
import axios from 'axios';

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        service: '',
        budget: '',
        message: '',
        whatsapp: ''
    });
    
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(null);
        setError(null);

        try {
            const response = await axios.post('/api/contact', formData);
            setSuccess(response.data.message);
            setFormData({
                name: '',
                email: '',
                company: '',
                service: '',
                budget: '',
                message: '',
                whatsapp: ''
            });
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="contact-form">
            {success && (
                <div className="alert alert-success">
                    {success}
                </div>
            )}
            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}
            
            <div className="form-row">
                <div className="fg">
                    <label className="fl">Your Name *</label>
                    <input 
                        type="text" 
                        name="name" 
                        className="ff" 
                        value={formData.name}
                        onChange={handleChange}
                        required 
                    />
                </div>
                <div className="fg">
                    <label className="fl">Company / Project</label>
                    <input 
                        type="text" 
                        name="company" 
                        className="ff" 
                        value={formData.company}
                        onChange={handleChange}
                    />
                </div>
            </div>
            
            <div className="form-row">
                <div className="fg">
                    <label className="fl">Email Address *</label>
                    <input 
                        type="email" 
                        name="email" 
                        className="ff" 
                        value={formData.email}
                        onChange={handleChange}
                        required 
                    />
                </div>
                <div className="fg">
                    <label className="fl">WhatsApp (Optional)</label>
                    <input 
                        type="tel" 
                        name="whatsapp" 
                        className="ff" 
                        value={formData.whatsapp}
                        onChange={handleChange}
                    />
                </div>
            </div>
            
            <div className="form-row">
                <div className="fg">
                    <label className="fl">Service You Need *</label>
                    <select 
                        name="service" 
                        className="ff" 
                        value={formData.service}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select a service</option>
                        <option>Web Development</option>
                        <option>Full-Stack Web Application</option>
                        <option>E-Commerce Platform</option>
                        <option>Blockchain / Smart Contract</option>
                        <option>Token Launch (ERC-20 / BEP-20)</option>
                        <option>Mobile App (Flutter / Android)</option>
                        <option>AI / Automation Integration</option>
                        <option>IT Consulting / DevOps</option>
                    </select>
                </div>
                <div className="fg">
                    <label className="fl">Estimated Budget</label>
                    <select 
                        name="budget" 
                        className="ff" 
                        value={formData.budget}
                        onChange={handleChange}
                    >
                        <option value="">Select budget range</option>
                        <option>Under $500</option>
                        <option>$500 – $1,500</option>
                        <option>$1,500 – $5,000</option>
                        <option>$5,000 – $15,000</option>
                        <option>$15,000+</option>
                    </select>
                </div>
            </div>
            
            <div className="fg">
                <label className="fl">Project Description *</label>
                <textarea 
                    name="message" 
                    className="ff" 
                    rows="6" 
                    value={formData.message}
                    onChange={handleChange}
                    required
                ></textarea>
            </div>
            
            <button type="submit" className="btn-p" disabled={loading}>
                {loading ? 'Sending...' : 'Send Message →'}
            </button>
        </form>
    );
}