import './About.css'; // import your CSS file

const About = () => {
  return (
    <div className="about-container">
      <h1 className="about-title">About Three Good Things</h1>

      <p className="about-text">
        <strong>Three Good Things</strong> is a simple and powerful tool to help you build a habit of reflection and gratitude.
        Every week, you list three good things you did or experienced — big or small. Over time, these moments create a
        timeline of positivity you can look back on.
      </p>

      <p className="about-text">
        Studies have shown that taking time to reflect on the good in your life can improve your mood, reduce stress,
        and promote mental well-being. Whether it’s a small win, a kind interaction, or a personal breakthrough — 
        they all matter.
      </p>

      <p className="about-text">
        This app is your space to track those moments, build a positive streak, and take care of your mental health one week at a time.
      </p>
    </div>
  );
};

export default About;

