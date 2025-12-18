/**
 * About Page Component (React)
 * Company story, experience, and values
 */
import './AboutPage.css';

function AboutPage() {
  return (
    <div className="aboutPage">
      {/* Page Header */}
      <header className="pageHeader">
        <h1 className="pageTitle">O Nas</h1>
      </header>

      {/* Company Story Section */}
      <section className="section">
        <div className="content">
          <div className="imageSection">
            <img src="/assets/icons/key.jpg" alt="Klucz - remont pod klucz" />
            <div>
              <h2 className="sectionTitle">Tworzymy Twoje wymarzone wnętrze</h2>
              <p>
                <strong>Od pomysłu do klucza.</strong> Czy marzysz o nowym, świeżym wnętrzu? 
                My to dla Ciebie zrealizujemy! Zadzwoń już teraz, a razem zespolimy Twoje pomysły z naszą ekspertyzą.
              </p>
              <p>
                <strong>Setki zrealizowanych projektów</strong> - wieloletnie doświadczenie w branży pozwoliło nam 
                zdobyć kwalifikacje niezbędne do świadczenia usług na najwyższym poziomie. Jesteśmy firmą 
                remontowo-budowlaną świadczącą kompleksowe usługi w zakresie remontów mieszkań, domów oraz lokali użytkowych.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="section">
        <div className="content">
          <h2 className="sectionTitle">Remonty pod klucz z pełną obsługą</h2>
          <p>
            Zaprojektujemy i wykończymy Twoje mieszkanie pod klucz. Jeśli chcesz mieć niebanalnie wykończone 
            mieszkanie oraz kontrolę nad budżetem i nie masz czasu na pilnowanie ekipy budowlanej to dobrze trafiłeś! 
            Zrobimy wszystko za Ciebie - od profesjonalnego projektu, przez doradztwo w wyborze materiałów, 
            aż po kompleksowe wykończenie. Wszystkie prace będą stale nadzorowane przez kierownika projektu.
          </p>
          <p>
            <strong>24-miesięczna gwarancja</strong> - zapewniamy pełny serwis gwarancyjny przez 24 miesiące. 
            Dzięki bogatemu doświadczeniu możemy zagwarantować, że realizowane przez nas inwestycje trzymają się 
            założonego jeszcze przed podpisaniem umowy budżetu oraz harmonogramu prac. Wykończymy pod klucz na terenie 
            Wrocławia i okolic.
          </p>
        </div>
      </section>

      {/* Our Values */}
      <section className="section">
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
    </div>
  );
}

export default AboutPage;

