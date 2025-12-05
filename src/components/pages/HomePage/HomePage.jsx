/**
 * Home Page Component (React)
 * Main landing page with hero section and overview
 */
import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
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

      {/* Gallery Preview Section */}
      <section className="section galleryPreviewSection">
        <h2 className="sectionTitle">GALERIA</h2>
        <div className="galleryPreview">
          <div className="galleryPreviewGrid">
            <div className="galleryPreviewItem">
              <img src="/i/9/korytarz_313.jpg" alt="korytarz" loading="lazy" />
            </div>
            <div className="galleryPreviewItem">
              <img src="/i/10/szara_łazienka2_313.jpg" alt="szara_łazienka2" loading="lazy" />
            </div>
            <div className="galleryPreviewItem">
              <img src="/i/8/wanna_wolnostojąca_313.jpg" alt="wanna_wolnostojąca" loading="lazy" />
            </div>
            <div className="galleryPreviewItem">
              <img src="/i/7/jasna_łazienka_313.jpg" alt="jasna_łazienka" loading="lazy" />
            </div>
            <div className="galleryPreviewItem">
              <img src="/i/11/łazienka313.jpg" alt="łazienka" loading="lazy" />
            </div>
            <div className="galleryPreviewItem">
              <img src="/i/12/kuchnia313.jpg" alt="kuchnia" loading="lazy" />
            </div>
          </div>
          <div className="galleryPreviewCTA">
            <Link to="/gallery" className="sectionLink">Zobacz pełną galerię →</Link>
          </div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="section servicesPreviewSection">
        <h2 className="sectionTitle">Oferta naszej firmy remontowej</h2>
        <p className="sectionSubtitle">Specjalizujemy się w następujących usługach:</p>
        <div className="servicesPreview">
          <div className="servicePreviewCard">
            <div className="servicePreviewIcon"><i className="material-icons">home</i></div>
            <h3 className="servicePreviewTitle">Zabudowy z płyt g-k</h3>
          </div>
          <div className="servicePreviewCard">
            <div className="servicePreviewIcon"><i className="material-icons">engineering</i></div>
            <h3 className="servicePreviewTitle">Gładź gipsowa</h3>
          </div>
          <div className="servicePreviewCard">
            <div className="servicePreviewIcon"><i className="material-icons">handyman</i></div>
            <h3 className="servicePreviewTitle">Montaż ścian</h3>
          </div>
          <div className="servicePreviewCard">
            <div className="servicePreviewIcon"><i className="material-icons">construction</i></div>
            <h3 className="servicePreviewTitle">Układanie paneli</h3>
          </div>
          <div className="servicePreviewCard">
            <div className="servicePreviewIcon"><i className="material-icons">palette</i></div>
            <h3 className="servicePreviewTitle">Malowanie</h3>
          </div>
          <div className="servicePreviewCard">
            <div className="servicePreviewIcon"><i className="material-icons">yard</i></div>
            <h3 className="servicePreviewTitle">Tapetowanie</h3>
          </div>
        </div>
        <div className="servicesPreviewCTA">
          <Link to="/services" className="sectionLink">Zobacz pełną ofertę →</Link>
        </div>
      </section>
    </div>
  );
}

export default HomePage;

