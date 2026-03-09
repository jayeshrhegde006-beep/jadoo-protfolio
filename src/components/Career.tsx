import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>BSCIT Student</h4>
                <h5>Mumbai University</h5>
              </div>
              <h3>2022 - 2025</h3>
            </div>
            <p>
              In my 3rd year of Bachelor of Science in Information Technology, focusing on software development, data structures, and database management.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Freelance Developer</h4>
                <h5>Self-Employed</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Actively freelancing for the past 3-4 months, delivering high-quality web, mobile, and game projects using technologies like React, Unity, and C#.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
