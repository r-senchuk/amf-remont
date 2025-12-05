/**
 * Services Page Component (React)
 * List of renovation services offered
 */
import './ServicesPage.css';

function ServicesPage() {
  const services = [
    { icon: 'home', title: 'Zabudowy z płyt g-k', description: 'Zabudowy z płyt g-k.' },
    { icon: 'engineering', title: 'Gładź gipsowa', description: 'Gładź gipsowa, szpachlowanie ścian, sufitów.' },
    { icon: 'handyman', title: 'Montaż ścian', description: 'Montaż ścian z płyt kartonowo-gipsowych.' },
    { icon: 'construction', title: 'Układanie paneli', description: 'Układanie paneli.' },
    { icon: 'palette', title: 'Malowanie', description: 'Malowanie ścian, pomieszczeń.' },
    { icon: 'yard', title: 'Tapetowanie', description: 'Tapetowanie ścian.' },
    { icon: 'light', title: 'Sufity podwieszane', description: 'Sufity podwieszane.' },
    { icon: 'palette', title: 'Ściany dekoracyjne', description: 'Ściany dekoracyjne.' },
    { icon: 'handyman', title: 'Suche tynki', description: 'Suche tynki kartonowo-gipsowe.' },
    { icon: 'engineering', title: 'Wylewki', description: 'Wylewki samopoziomujące i wyrównawcze.' },
    { icon: 'touch_app', title: 'Glazura i terakota', description: 'Układanie glazury i terakoty.' },
    { icon: 'construction', title: 'Łazienki kompleksowo', description: 'Łazienki kompleksowo.' },
  ];

  return (
    <div className="servicesPage">
      {/* Page Header */}
      <header className="pageHeader">
        <h1 className="pageTitle">Nasza Oferta</h1>
        <p className="pageSubtitle">Kompleksowe usługi remontowe - od projektu po ostatnią pędzelkę</p>
      </header>

      {/* Services Grid */}
      <section className="section">
        <h2 className="sectionTitle">Specjalizujemy się w następujących usługach:</h2>
        <div className="servicesGrid">
          {services.map((service, index) => (
            <div className="serviceCard" key={index}>
              <div className="serviceIcon"><i className="material-icons">{service.icon}</i></div>
              <h3 className="serviceTitle">{service.title}</h3>
              <p className="serviceDescription">{service.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default ServicesPage;

