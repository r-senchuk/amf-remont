/**
 * Contact Page Component (React)
 * Contact information and details
 */
import './ContactPage.css';

function ContactPage() {
  return (
    <div className="contactPage">
      {/* Page Header */}
      <header className="pageHeader">
        <h1 className="pageTitle">Kontakt</h1>
        <p className="pageSubtitle">Gotowy na zmianę? Dzwonisz, a my zajmiemy się resztą.</p>
      </header>

      {/* Contact Section */}
      <section className="contactSection">
        <div className="contactIntro">
          <p><strong>Skontaktuj się teraz - odpowiadamy szybko i profesjonalnie:</strong></p>
        </div>

        <div className="contactGrid">
          {/* Anatolij */}
          <div className="contactCard">
            <h2 className="contactCardTitle">Anatolij</h2>
            <a href="tel:+48796019986" className="phoneNumber">+48 (796) 019-986</a>
            <div className="messengerLinks">
              <a href="whatsapp://send?phone=+48796019986" target="_blank" rel="noopener noreferrer" className="messengerLink" title="WhatsApp">
                <img src="/assets/social/wa.svg" alt="WhatsApp" />
              </a>
              <a href="https://t.me/+48796019986" target="_blank" rel="noopener noreferrer" className="messengerLink" title="Telegram">
                <img src="/assets/social/tlegr.svg" alt="Telegram" />
              </a>
            </div>
          </div>

          {/* Maks */}
          <div className="contactCard">
            <h2 className="contactCardTitle">Maks</h2>
            <a href="tel:+48795621905" className="phoneNumber">+48 (795) 621-905</a>
            <div className="messengerLinks">
              <a href="whatsapp://send?phone=+48795621905" target="_blank" rel="noopener noreferrer" className="messengerLink" title="WhatsApp">
                <img src="/assets/social/wa.svg" alt="WhatsApp" />
              </a>
              <a href="https://t.me/+48795621905" target="_blank" rel="noopener noreferrer" className="messengerLink" title="Telegram">
                <img src="/assets/social/tlegr.svg" alt="Telegram" />
              </a>
              <a href="viber://chat?number=%2B48795621905" target="_blank" rel="noopener noreferrer" className="messengerLink" title="Viber">
                <img src="/assets/social/vb.svg" alt="Viber" />
              </a>
            </div>
          </div>
        </div>

        {/* Email */}
        <div className="contactCard emailCard">
          <h2 className="contactCardTitle">E-mail</h2>
          <a href="mailto:amfgroupremont@gmail.com" className="emailLink">amfgroupremont@gmail.com</a>
        </div>

        {/* Closing Message */}
        <div className="closingMessage">
          <p>
            W AMF GROUP Remont tworzymy nie tylko nowe wnętrza, ale także nowe historie.
          </p>
          <p>
            Zadzwoń, a zaczniemy pisać razem Twoją!
          </p>
        </div>
      </section>
    </div>
  );
}

export default ContactPage;

