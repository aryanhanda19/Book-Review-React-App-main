import React from 'react';
import './AboutUs.css';

/**
 * AboutUs component displays team member profiles with images and quotes.
 * @returns {JSX.Element} The rendered AboutUs component.
 */
const AboutUs = () => {

    // Team members data configuration
    const teamMembers = [
        {
            name: "Viraj Patel",
            image: "/Viraj.jpeg",
            quote: "Discipline is the silent force that transforms dreams into reality."
        },
        {
            name: "Aryan Handa",
            image: "/Aryan.png",
            quote: `Kali Rati ki zulfo me
                 vo khadi thi bhahe khol kar
                 aur mai us ke bagal se nikal gaya
                 Excuse me bol kar`
        },
        {
            name: "Vineeth Dumpa",
            image: "/Vineeth.jpg",
            quote: "I can resist everything except temptation"
        }
    ];

    /**
     * TeamMember component displays an individual team member's profile.
     * @param {Object} props - Component props.
     * @param {Object} props.member - The member object containing details.
     * @returns {JSX.Element} The rendered TeamMember component.
     */
    const TeamMember = ({ member }) => {
        return (
            <div className='about-us-member'>
                <img className='about-us-image' src={member.image} alt={member.name} />
                <div className='about-us-member-name'>
                    <h2>{member.name}</h2>
                </div>
                <p className='about-us-quote'>{member.quote}</p>
            </div>
        );
    };

    return (
        <div className='about-us-page'>
            <h1 className="about-us-title">Meet Our Lazy Team</h1>

            <div className="about-us-content">
                {teamMembers.map(member => (
                    <TeamMember key={member.name} member={member} />
                ))}
            </div>
        </div>
    );
};

export default AboutUs;
