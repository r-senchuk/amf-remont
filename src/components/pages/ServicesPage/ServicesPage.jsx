/**
 * Services Page Component (React)
 * List of renovation services offered
 */
import './ServicesPage.css';

function ServicesPage() {
  const services = [
    { icon: 'home', title: 'Zabudowy z płyt g-k', description: 'Zabudowy z płyt g-k.', bgColor: '#eceff1', iconColor: null },
    { icon: 'engineering', title: 'Gładź gipsowa', description: 'Gładź gipsowa, szpachlowanie ścian, sufitów.', bgColor: null, iconColor: '#4caf50' },
    { icon: 'handyman', title: 'Montaż ścian', description: 'Montaż ścian z płyt kartonowo-gipsowych.', bgColor: '#eceff1', iconColor: null },
    { icon: 'construction', title: 'Układanie paneli', description: 'Układanie paneli.', bgColor: null, iconColor: '#4caf50' },
    { icon: 'palette', title: 'Malowanie', description: 'Malowanie ścian, pomieszczeń.', bgColor: '#eceff1', iconColor: null },
    { icon: 'yard', title: 'Tapetowanie', description: 'Tapetowanie ścian.', bgColor: null, iconColor: '#4caf50' },
    { icon: 'light', title: 'Sufity podwieszane', description: 'Sufity podwieszane.', bgColor: '#eceff1', iconColor: null },
    { icon: 'palette', title: 'Ściany dekoracyjne', description: 'Ściany dekoracyjne.', bgColor: null, iconColor: '#4caf50' },
    { icon: 'handyman', title: 'Suche tynki', description: 'Suche tynki kartonowo-gipsowe.', bgColor: '#eceff1', iconColor: null },
    { icon: 'engineering', title: 'Wylewki', description: 'Wylewki samopoziomujące i wyrównawcze.', bgColor: null, iconColor: '#4caf50' },
    { icon: 'touch_app', title: 'Glazura i terakota', description: 'Układanie glazury i terakoty.', bgColor: '#eceff1', iconColor: null },
    { icon: 'construction', title: 'Łazienki kompleksowo', description: 'Łazienki kompleksowo.', bgColor: null, iconColor: '#4caf50' },
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
            <div 
              className="serviceCard" 
              key={index}
              style={{ backgroundColor: service.bgColor || undefined }}
            >
              <div 
                className="serviceIcon"
                style={{ color: service.iconColor || undefined }}
              >
                <i className="material-icons">{service.icon}</i>
              </div>
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

