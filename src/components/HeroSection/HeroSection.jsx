import './HeroSection.css';

const HeroSection = ({ hero_text }) => {

    return (
        <div className="hero-section">
            <img className="background-image" src="/Hogwarts.png" alt="Main Background" />
            <div className="overlay">
                <h1 className="hero-text">{hero_text}</h1>
            </div>
        </div>
    )

};

export default HeroSection;
