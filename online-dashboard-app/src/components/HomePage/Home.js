import React from 'react';
import '../../styles/Home.css';
import home_image from "../../Images/home_image.png";

const Home = () => {
    const jobData = [
        {
            logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCfbD_cFA2zWYyY4Y4ewOkBuqAcGEqfN2H8g&s", // Replace with actual company logo URLs
            role: "Software Engineer",
            salary: "$70,000 - $90,000",
            location: "New York, NY",
            applyLink: "#",
        },
        {
            logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCfbD_cFA2zWYyY4Y4ewOkBuqAcGEqfN2H8g&s", // Replace with actual company logo URLs
            role: "Frontend Developer",
            salary: "$60,000 - $80,000",
            location: "San Francisco, CA",
            applyLink: "#",
        },
        {
            logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCfbD_cFA2zWYyY4Y4ewOkBuqAcGEqfN2H8g&s", // Replace with actual company logo URLs
            role: "Data Scientist",
            salary: "$80,000 - $100,000",
            location: "Seattle, WA",
            applyLink: "#",
        },
        {
            logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCfbD_cFA2zWYyY4Y4ewOkBuqAcGEqfN2H8g&s", // Replace with actual company logo URLs
            role: "UI/UX Designer",
            salary: "$50,000 - $70,000",
            location: "Austin, TX",
            applyLink: "#",
        },
    ];

    return (
        <div className="home-container">
            <div className="job-cards">
                {jobData.map((job, index) => (
                    <div key={index} className="job-card">
                        <img src={job.logo} alt={`${job.role} Logo`} className="job-logo" />
                        <h3>{job.role}</h3>
                        <p><strong>Salary:</strong> {job.salary}</p>
                        <p><strong>Location:</strong> {job.location}</p>
                        <a href={job.applyLink} className="apply-link" target="_blank" rel="noopener noreferrer">
                            Apply
                        </a>
                    </div>
                ))}
            </div>
            <div className="signup-section">
                <h2>Sign Up</h2>
                <form className="signup-form">
                    <input type="text" id="name" placeholder="Name" />
                    <input type="tel" id="phone" placeholder="Phone Number" />
                    <input type="email" id="email" placeholder="Email" />
                    <input type="password" id="password" placeholder="Password" />
                    <input
                        type="password"
                        id="confirm-password"
                        placeholder="Confirm Password"
                    />
                    <button type="submit" className="register-button">
                        Register
                    </button>
                </form>
            </div>
            <footer className="footer" style={{marginTop: "2px"}}>
                © CopyRights ProjPort. All rights reserved.
            </footer>
        </div>
    );
};

export default Home;
