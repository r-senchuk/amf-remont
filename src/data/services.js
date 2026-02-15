const services = [
  { icon: 'home', title: 'Zabudowy z płyt g-k', description: 'Zabudowy i sufity z płyt kartonowo-gipsowych.', muted: true },
  { icon: 'engineering', title: 'Gładź gipsowa', description: 'Gładź gipsowa, szpachlowanie ścian i sufitów.', accent: true },
  { icon: 'handyman', title: 'Montaż ścian', description: 'Montaż ścian i zabudów systemowych.', muted: true },
  { icon: 'construction', title: 'Układanie paneli', description: 'Panele podłogowe i wykończenia listew.', accent: true },
  { icon: 'palette', title: 'Malowanie', description: 'Malowanie ścian, sufitów i elementów dekoracyjnych.', muted: true },
  { icon: 'yard', title: 'Tapetowanie', description: 'Tapetowanie ścian i wykończenia dekoracyjne.', accent: true },
  { icon: 'light', title: 'Sufity podwieszane', description: 'Systemy sufitów podwieszanych z oświetleniem.', muted: true },
  { icon: 'palette', title: 'Ściany dekoracyjne', description: 'Beton architektoniczny, tynki i detale.', accent: true },
  { icon: 'handyman', title: 'Suche tynki', description: 'Suche tynki kartonowo-gipsowe.', muted: true },
  { icon: 'engineering', title: 'Wylewki', description: 'Wylewki samopoziomujące i wyrównawcze.', accent: true },
  { icon: 'touch_app', title: 'Glazura i terakota', description: 'Układanie glazury i terakoty.', muted: true },
  { icon: 'construction', title: 'Łazienki kompleksowo', description: 'Kompleksowe wykończenie łazienek.', accent: true }
];

const strengths = [
  { title: 'Doświadczenie', description: 'Setki zrealizowanych projektów - tworzymy wnętrza, które zachwycają.', icon: 'verified_user' },
  { title: 'Remonty Pod Klucz', description: 'Od planu po ostatnią pędzelkę, wszystko załatwimy, a Ty tylko cieszysz się efektem.', icon: 'home_repair_service' },
  { title: 'Kreatywne Rozwiązania', description: 'Innowacyjne podejście do remontów - Twoje mieszkanie będzie unikatowe.', icon: 'lightbulb' },
  { title: 'Osobiste Podejście', description: 'Pracujemy dla Ciebie, a nie dla projektu - dopasowujemy się do Twoich potrzeb.', icon: 'handshake' },
  { title: 'Terminowość', description: 'Liczy się każdy dzień. U nas termin to nie puste słowo.', icon: 'schedule' },
  { title: 'Lokalizacja', description: 'Jesteśmy tu, gdzie Ty. Działamy na terenie Wrocławia.', icon: 'location_city' }
];

const serviceCategories = [
  {
    title: 'Zabudowy i konstrukcje g-k',
    icon: 'wall',
    items: [
      { title: 'Zabudowy z płyt g-k', description: 'Zabudowy i sufity z płyt kartonowo-gipsowych.' },
      { title: 'Montaż ścian z płyt k-g', description: 'Montaż ścian i zabudów systemowych.' },
      { title: 'Sufity podwieszane', description: 'Systemy sufitów podwieszanych z oświetleniem.' },
      { title: 'Suche tynki', description: 'Suche tynki kartonowo-gipsowe.' }
    ]
  },
  {
    title: 'Wykończenia ścian i sufitu',
    icon: 'palette',
    items: [
      { title: 'Gładź gipsowa / szpachlowanie', description: 'Gładź gipsowa, szpachlowanie ścian i sufitów.' },
      { title: 'Malowanie', description: 'Malowanie ścian, sufitów i elementów dekoracyjnych.' },
      { title: 'Tapetowanie', description: 'Tapetowanie ścian i wykończenia dekoracyjne.' },
      { title: 'Ściany dekoracyjne', description: 'Beton architektoniczny, tynki i detale.' }
    ]
  },
  {
    title: 'Podłogi i posadzki',
    icon: 'layers',
    items: [
      { title: 'Układanie paneli', description: 'Panele podłogowe i wykończenia listew.' },
      { title: 'Wylewki samopoziomujące i wyrównawcze', description: 'Wylewki samopoziomujące i wyrównawcze.' }
    ]
  },
  {
    title: 'Płytki i łazienki',
    icon: 'bathroom',
    items: [
      { title: 'Układanie glazury i terakoty', description: 'Układanie glazury i terakoty.' },
      { title: 'Łazienki kompleksowo', description: 'Kompleksowe wykończenie łazienek.' }
    ]
  }
];

export default services;
export { strengths, serviceCategories };
