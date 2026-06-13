import React, { useState } from 'react';
import axios from 'axios';

export default function CareersForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        role: '',
        experience: '',
        portfolio_url: '',
        message: ''
    });
    
    const [resume, setResume] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleFileChange = (e) => {
        setResume(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(null);
        setError(null);

        const data = new FormData();
        Object.keys(formData).forEach(key => {
            if (formData[key]) {
                data.append(key, formData[key]);
            }
        });
        if (resume) {
            data.append('resume', resume);
        }

        try {
            const response = await axios.post('/api/careers/apply', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setSuccess(response.data.message);
            setFormData({
                name: '',
                email: '',
                phone: '',
                role: '',
                experience: '',
                portfolio_url: '',
                message: ''
            });
            setResume(null);
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="apply-form">
            {success && <div className="alert alert-success">{success}</div>}
            {error && <div className="alert alert-danger">{error}</div>}
            
            <div className="form-row">
                <div className="fg">
                    <label className="fl">Full Name *</label>
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
            </div>
            
            <div className="form-row">
                <div className="fg">
                    <label className="fl">Phone / WhatsApp</label>
                    <input 
                        type="tel" 
                        name="phone" 
                        className="ff" 
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </div>
                <div className="fg">
                    <label className="fl">Role Applying For *</label>
                    <select 
                        name="role" 
                        className="ff" 
                        value={formData.role}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select a role</option>
                        <option>Full-Stack Web Developer</option>
                        <option>Blockchain / Solidity Developer</option>
                        <option>Mobile Developer (Flutter)</option>
                        <option>UI/UX Designer</option>
                        <option>AI / Python Engineer</option>
                        <option>General Application</option>
                    </select>
                </div>
            </div>
            
            <div className="form-row">
                <div className="fg">
                    <label className="fl">Portfolio / GitHub / LinkedIn URL</label>
                    <input 
                        type="url" 
                        name="portfolio_url" 
                        className="ff" 
                        value={formData.portfolio_url}
                        onChange={handleChange}
                    />
                </div>
                <div className="fg">
                    <label className="fl">Experience Level *</label>
                    <select 
                        name="experience" 
                        className="ff" 
                        value={formData.experience}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select experience level</option>
                        <option>Fresher (0–1 yr)</option>
                        <option>Junior (1–2 yrs)</option>
                        <option>Mid-Level (2–4 yrs)</option>
                        <option>Senior (4+ yrs)</option>
                    </select>
                </div>
            </div>
            
            <div className="fg">
                <label className="fl">Upload Resume (PDF/DOC)</label>
                <input 
                    type="file" 
                    accept=".pdf,.doc,.docx" 
                    className="ff" 
                    onChange={handleFileChange}
                />
            </div>
            
            <div className="fg">
                <label className="fl">Tell Us About Yourself *</label>
                <textarea 
                    name="message" 
                    className="ff" 
                    rows="5" 
                    value={formData.message}
                    onChange={handleChange}
                    required
                ></textarea>
            </div>
            
            <button type="submit" className="btn-p" disabled={loading}>
                {loading ? 'Submitting...' : 'Submit Application →'}
            </button>
        </form>
    );
}