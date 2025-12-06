/**
 * Home Page Component (React)
 * Main landing page with hero section and overview
 */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ContactSection from './ContactSection';
import Gallery from '../../shared/Gallery/Gallery';
import './HomePage.css';

function HomePage() {
  const [galleryPhotos, setGalleryPhotos] = useState([]);

  // Load gallery images for homepage
  useEffect(() => {
    async function loadGallery() {
      try {
        const response = await fetch('/data/gallery.json');
        if (response.ok) {
          const data = await response.json();
          // Sort by order and take first 12 images for preview (max needed for large screens)
          const sortedPhotos = data.photos.slice().sort((a, b) => a.order - b.order);
          setGalleryPhotos(sortedPhotos.slice(0, 12));
        }
      } catch (err) {
        console.error('Error loading gallery for homepage:', err);
      }
    }
    loadGallery();
  }, []);

  return (
    <div className="homePage">
      {/* Hero Section */}
      <section className="hero">
        <div className="heroContent">
          <h1 className="heroTitle">Wykończenie wnętrz we Wrocławiu</h1>
          <p className="heroTagline">AMF GROUP Remont - Zmiana, Którą Chcesz Dziś Rozpocząć!</p>
          <div className="heroDecorative">
            <div className="heroDecorativeImage">
              <img src="/assets/images/kut2.png" alt="city1" />
            </div>
            <div className="heroDecorativeImage">
              <img src="/assets/images/kut1.png" alt="city2" />
            </div>
          </div>
        </div>
      </section>

      {/* O NAS Section */}
      <section className="section aboutSection">
        <div className="aboutContent">
          <div className="aboutImage">
            <img src="/assets/icons/key.jpg" alt="Klucz - remont pod klucz" />
          </div>
          <div className="aboutText">
            <h2 className="sectionTitle">O NAS</h2>
            <p>
              Czy marzysz o nowym, świeżym wnętrzu? My to dla Ciebie zrealizujemy! Zadzwoń już teraz, a razem zespolimy Twoje pomysły z naszą ekspertyzą.
            </p>
            <p>
              Zaprojektujemy i wykończymy Twoje mieszkanie pod klucz. Jeśli chcesz mieć niebanalnie wykończone mieszkanie oraz kontrolę nad budżetem i nie masz czasu na pilnowanie ekipy budowlanej to dobrze trafiłeś! Zrobimy wszystko za Ciebie oraz zapewnimy 24 miesięczny serwis gwarancyjny.
            </p>
            <p>
              Zajmujemy się projektowaniem, aranżacją i kompleksowym wykończeniem wnętrz. Przygotujemy profesjonalny projekt, doradzimy w wyborze materiałów oraz wykończymy całościowo Twoje mieszkanie. Wszystkie prace będą stale nadzorowane przez kierownika projektu. Wykończymy pod klucz na terenie Wrocławia i okolic.
            </p>
            <Link to="/about" className="sectionLink">Dowiedz się więcej →</Link>
          </div>
        </div>
      </section>

      {/* Wykończenie wnętrz we Wrocławiu Section */}
      <section className="section">
        <h2 className="sectionTitle">Wykończenie wnętrz we Wrocławiu</h2>
        <div className="content">
          <p>
            Wieloletnia działalność w branży pozwoliła nam zdobyć kwalifikacje niezbędne do świadczenia usług na najwyższym poziomie. Jesteśmy firmą remontowo-budowlaną świadczącą kompleksowe usługi w zakresie remontów mieszkań, domów oraz lokali użytkowych.
          </p>
          <p>
            Dzięki bogatemu doświadczeniu możemy zagwarantować, że realizowane przez nas inwestycje trzymają się założonego jeszcze przed podpisaniem umowy budżetu oraz harmonogramu prac. Oznacza to spokój i pewność terminowego ukończenia prac dla każdego inwestora, który zdecyduje się podjąć z nami współpracę.
          </p>
          <p>
            Jeśli poszukują Państwo firmy zajmującej się wykończeniem wnętrz we Wrocławiu, która stawia na jakość, estetykę oraz ścisłą współpracę z Klientem, zapraszamy do zapoznania się z naszą ofertą.
          </p>
        </div>
      </section>

      {/* Nasze Atuty Section */}
      <section className="section featuresSection">
        <h2 className="sectionTitle">Nasze Atuty</h2>
        <div className="features">
          <div className="featureCard">
            <div className="featureIcon"><i className="material-icons">grade</i></div>
            <h3 className="featureTitle">Doświadczenie</h3>
            <p className="featureDescription">
              Setki zrealizowanych projektów - tworzymy wnętrza, które zachwycają.
            </p>
          </div>
          <div className="featureCard">
            <div className="featureIcon"><i className="material-icons">house</i></div>
            <h3 className="featureTitle">Remonty Pod Klucz</h3>
            <p className="featureDescription">
              Od planu po ostatnią pędzelkę, wszystko załatwimy, a Ty tylko cieszysz się efektem.
            </p>
          </div>
          <div className="featureCard">
            <div className="featureIcon"><i className="material-icons">emoji_objects</i></div>
            <h3 className="featureTitle">Kreatywne Rozwiązania</h3>
            <p className="featureDescription">
              Innowacyjne podejście do remontów - Twoje mieszkanie będzie unikatowe.
            </p>
          </div>
          <div className="featureCard">
            <div className="featureIcon"><i className="material-icons">handshake</i></div>
            <h3 className="featureTitle">Osobiste Podejście</h3>
            <p className="featureDescription">
              Dla Ciebie, a nie dla projektu - dopasowujemy się do Twoich potrzeb.
            </p>
          </div>
          <div className="featureCard">
            <div className="featureIcon"><i className="material-icons">alarm</i></div>
            <h3 className="featureTitle">Terminowość</h3>
            <p className="featureDescription">
              Liczy się każdy dzień. U nas termin to nie puste słowo.
            </p>
          </div>
          <div className="featureCard">
            <div className="featureIcon"><i className="material-icons">location_on</i></div>
            <h3 className="featureTitle">Lokalizacja</h3>
            <p className="featureDescription">
              Jesteśmy tu, gdzie Ty. Działamy na terenie Wrocławia.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="section galleryPreviewSection bg-gradient-to-br from-stone-800 via-stone-700 to-stone-600 py-16 relative overflow-hidden">
        {/* Decorative gradient overlay for olive tint */}
        <div className="absolute inset-0 bg-green-900/20 pointer-events-none mix-blend-overlay"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-10">GALERIA</h2>
          
          <Gallery 
            photos={galleryPhotos} 
            variant="small" 
            showLink={true} 
          />
        </div>
      </section>

      {/* Services Section */}
      <section className="section servicesSection">
        <h2 className="sectionTitle">Oferta naszej firmy remontowej</h2>
        <p className="sectionSubtitle">Specjalizujemy się w następujących usługach:</p>
        <div className="servicesGrid">
          <div className="serviceCard" style={{ backgroundColor: '#eceff1' }}>
            <div className="serviceIcon"><i className="material-icons">home</i></div>
            <h3 className="serviceTitle">Zabudowy z płyt g-k</h3>
            <p className="serviceDescription">Zabudowy z płyt g-k.</p>
          </div>
          <div className="serviceCard">
            <div className="serviceIcon" style={{ color: '#4caf50' }}><i className="material-icons">engineering</i></div>
            <h3 className="serviceTitle">Gładź gipsowa</h3>
            <p className="serviceDescription">Gładź gipsowa, szpachlowanie ścian, sufitów.</p>
          </div>
          <div className="serviceCard" style={{ backgroundColor: '#eceff1' }}>
            <div className="serviceIcon"><i className="material-icons">handyman</i></div>
            <h3 className="serviceTitle">Montaż ścian</h3>
            <p className="serviceDescription">Montaż ścian z płyt kartonowo-gipsowych.</p>
          </div>
          <div className="serviceCard">
            <div className="serviceIcon" style={{ color: '#4caf50' }}><i className="material-icons">construction</i></div>
            <h3 className="serviceTitle">Układanie paneli</h3>
            <p className="serviceDescription">Układanie paneli.</p>
          </div>
          <div className="serviceCard" style={{ backgroundColor: '#eceff1' }}>
            <div className="serviceIcon"><i className="material-icons">palette</i></div>
            <h3 className="serviceTitle">Malowanie</h3>
            <p className="serviceDescription">Malowanie ścian, pomieszczeń.</p>
          </div>
          <div className="serviceCard">
            <div className="serviceIcon" style={{ color: '#4caf50' }}><i className="material-icons">yard</i></div>
            <h3 className="serviceTitle">Tapetowanie</h3>
            <p className="serviceDescription">Tapetowanie ścian.</p>
          </div>
          <div className="serviceCard" style={{ backgroundColor: '#eceff1' }}>
            <div className="serviceIcon"><i className="material-icons">light</i></div>
            <h3 className="serviceTitle">Sufity podwieszane</h3>
            <p className="serviceDescription">Sufity podwieszane.</p>
          </div>
          <div className="serviceCard">
            <div className="serviceIcon" style={{ color: '#4caf50' }}><i className="material-icons">palette</i></div>
            <h3 className="serviceTitle">Ściany dekoracyjne</h3>
            <p className="serviceDescription">Ściany dekoracyjne.</p>
          </div>
          <div className="serviceCard" style={{ backgroundColor: '#eceff1' }}>
            <div className="serviceIcon"><i className="material-icons">handyman</i></div>
            <h3 className="serviceTitle">Suche tynki</h3>
            <p className="serviceDescription">Suche tynki kartonowo-gipsowe.</p>
          </div>
          <div className="serviceCard">
            <div className="serviceIcon" style={{ color: '#4caf50' }}><i className="material-icons">engineering</i></div>
            <h3 className="serviceTitle">Wylewki</h3>
            <p className="serviceDescription">Wylewki samopoziomujące i wyrównawcze.</p>
          </div>
          <div className="serviceCard" style={{ backgroundColor: '#eceff1' }}>
            <div className="serviceIcon"><i className="material-icons">touch_app</i></div>
            <h3 className="serviceTitle">Glazura i terakota</h3>
            <p className="serviceDescription">Układanie glazury i terakoty.</p>
          </div>
          <div className="serviceCard">
            <div className="serviceIcon" style={{ color: '#4caf50' }}><i className="material-icons">construction</i></div>
            <h3 className="serviceTitle">Łazienki kompleksowo</h3>
            <p className="serviceDescription">Łazienki kompleksowo.</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
}

export default HomePage;

