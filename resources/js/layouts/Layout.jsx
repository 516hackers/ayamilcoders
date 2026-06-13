import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function Layout({ children, title }) {
    return (
        <>
            <Head title={title} />
            <div className="app-layout">
                <nav className="navbar">
                    <div className="container">
                        <Link href="/" className="navbar-brand">Ayamil Coders</Link>
                        <div className="nav-links">
                            <Link href="/">Home</Link>
                            <Link href="/services">Services</Link>
                            <Link href="/about">About</Link>
                            <Link href="/careers">Careers</Link>
                            <Link href="/contact">Contact</Link>
                        </div>
                    </div>
                </nav>
                
                <main>{children}</main>
                
                <footer className="footer">
                    <div className="container">
                        <p>&copy; 2025 Ayamil Coders. All rights reserved.</p>
                    </div>
                </footer>
            </div>
        </>
    );
}