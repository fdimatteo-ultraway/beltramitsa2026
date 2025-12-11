import { Link } from 'react-router-dom';
import CustomSlider from '../components/CustomSlider'; // Import the new custom slider
import ultrawayLogo from '../assets/images/Ultraway_positivo_1920x1080.png';

const Home = () => {

    // The images for our new slider
    const sliderImages = [
        'https://images.pexels.com/photos/248559/pexels-photo-248559.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/567996/pexels-photo-567996.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/1149529/pexels-photo-1149529.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ];

    const events = [
        { name: "Granfondo del Po", city: "Ferrara", date: "15/03/2026" },
        { name: "Via del sale", city: "Cervia", date: "29/03/2026" },
        { name: "Granfondo città di Valdagno", city: "Valdagno", date: "26/04/2026" },
        { name: "Granfondo città di San Benedetto", city: "San Benedetto del Tronto", date: "10/05/2026" },
        { name: "Granfondo Squali", city: "Cattolica", date: "17/05/2026" },
        { name: "Marcialonga Craft", city: "Predazzo", date: "31/05/2026" },
        { name: "Granfondo città di Livorno", city: "Livorno", date: "06/09/2026" },
        { name: "Matildica", city: "Reggio Emilia", date: "13/09/2026" },
    ];

    const blogPosts = [
        {
          id: 1,
          title: 'Grande vittoria di Andrea Basso al GP di Primavera',
          summary: 'Il corridore del team Beltrami TSA si impone in volata sul traguardo di...',
          imageUrl: 'https://via.placeholder.com/400x250',
        },
        {
          id: 2,
          title: 'Beltrami TSA Challenge: le nuove date del 2026',
          summary: 'La Federazione Ciclistica Italiana ha ufficializzato il calendario della prossima stagione...',
          imageUrl: 'https://via.placeholder.com/400x250',
        },
        {
            id: 3,
            title: 'Intervista a [Nome Corridore]: sogni e speranze per il futuro',
            summary: 'Abbiamo incontrato uno dei giovani più promettenti del panorama nazionale per farci raccontare...',
            imageUrl: 'https://via.placeholder.com/400x250',
        },
        {
            id: 4,
            title: 'Come preparare al meglio una gara di ciclismo: i consigli del DS',
            summary: 'Il nostro Direttore Sportivo condivide alcuni segreti per arrivare al top della forma nel giorno della gara...',
            imageUrl: 'https://via.placeholder.com/400x250',
        },
      ];

  return (
    <div className="container">
        <section className="hero-slider">
            {/* Use the new CustomSlider component */}
            <CustomSlider images={sliderImages} />
            
            <div className="hero-overlay-new">
                <h1>Otto tappe. Otto eventi. La tua soddisfazione.</h1>
                <Link to="/abbonamenti" className="cta-button">Abbonati</Link>
            </div>
        </section>


      <section className="events">
        <h2>Gli Eventi</h2>
        <div className="events-grid">
          {events.map((event, index) => (
            <div key={index} className="event-card">
                <div className="event-card-content">
                    <h3>{event.name}</h3>
                    <p>{event.city}</p>
                    <p className="event-date">{event.date}</p>
                </div>
                <div className="event-card-actions">
                    <Link to="#" className="btn-detail">Dettagli</Link>
                    <Link to="#" className="btn-subscribe">Iscriviti</Link>
                </div>
            </div>
          ))}
        </div>
      </section>

      <section className="training-partner">
        <h3>Training Partner</h3>
        <img src={ultrawayLogo} alt="Ultraway Logo" className="training-partner-logo" />
      </section>

      <section className="blog">
        <h2>Dal Blog</h2>
        <div className="blog-grid">
          {blogPosts.map((post) => (
            <div key={post.id} className="blog-post">
              <img src={post.imageUrl} alt={post.title} className="blog-post-image" />
              <div className="blog-post-content">
                <h3>{post.title}</h3>
                <p>{post.summary}</p>
                <Link to={`/blog/${post.id}`}>Leggi di più</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Home;
