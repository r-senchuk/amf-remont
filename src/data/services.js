const services = [
  { icon: 'home', title: 'Zabudowy z płyt g-k', description: 'Zabudowy i sufity z płyt kartonowo-gipsowych.' },
  { icon: 'engineering', title: 'Gładź gipsowa', description: 'Gładź gipsowa, szpachlowanie ścian i sufitów.' },
  { icon: 'handyman', title: 'Montaż ścian', description: 'Montaż ścian i zabudów systemowych.' },
  { icon: 'construction', title: 'Układanie paneli', description: 'Panele podłogowe i wykończenia listew.' },
  { icon: 'palette', title: 'Malowanie', description: 'Malowanie ścian, sufitów i elementów dekoracyjnych.' },
  { icon: 'yard', title: 'Tapetowanie', description: 'Tapetowanie ścian i wykończenia dekoracyjne.' },
  { icon: 'light', title: 'Sufity podwieszane', description: 'Systemy sufitów podwieszanych z oświetleniem.' },
  { icon: 'palette', title: 'Ściany dekoracyjne', description: 'Beton architektoniczny, tynki i detale.' },
  { icon: 'handyman', title: 'Suche tynki', description: 'Suche tynki kartonowo-gipsowe.' },
  { icon: 'engineering', title: 'Wylewki', description: 'Wylewki samopoziomujące i wyrównawcze.' },
  { icon: 'touch_app', title: 'Glazura i terakota', description: 'Układanie glazury i terakoty.' },
  { icon: 'construction', title: 'Łazienki kompleksowo', description: 'Kompleksowe wykończenie łazienek.' }
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
    icon: 'construction',
    items: [
      { icon: 'home', title: 'Zabudowy z płyt g-k', description: 'Zabudowy i sufity z płyt kartonowo-gipsowych.' },
      { icon: 'handyman', title: 'Montaż ścian z płyt k-g', description: 'Montaż ścian i zabudów systemowych.' },
      { icon: 'wb_incandescent', title: 'Sufity podwieszane', description: 'Systemy sufitów podwieszanych z oświetleniem.' },
      { icon: 'construction', title: 'Suche tynki', description: 'Suche tynki kartonowo-gipsowe.' }
    ]
  },
  {
    title: 'Wykończenia ścian i sufitu',
    icon: 'palette',
    items: [
      { icon: 'engineering', title: 'Gładź gipsowa / szpachlowanie', description: 'Gładź gipsowa, szpachlowanie ścian i sufitów.' },
      { icon: 'format_paint', title: 'Malowanie', description: 'Malowanie ścian, sufitów i elementów dekoracyjnych.' },
      { icon: 'wallpaper', title: 'Tapetowanie', description: 'Tapetowanie ścian i wykończenia dekoracyjne.' },
      { icon: 'brush', title: 'Ściany dekoracyjne', description: 'Beton architektoniczny, tynki i detale.' }
    ]
  },
  {
    title: 'Podłogi i posadzki',
    icon: 'layers',
    items: [
      { icon: 'view_column', title: 'Układanie paneli', description: 'Panele podłogowe i wykończenia listew.' },
      { icon: 'format_color_fill', title: 'Wylewki samopoziomujące i wyrównawcze', description: 'Wylewki samopoziomujące i wyrównawcze.' }
    ]
  },
  {
    title: 'Płytki i łazienki',
    icon: 'bathroom',
    items: [
      { icon: 'grid_on', title: 'Układanie glazury i terakoty', description: 'Układanie glazury i terakoty.' },
      { icon: 'bathtub', title: 'Łazienki kompleksowo', description: 'Kompleksowe wykończenie łazienek.' }
    ]
  }
];

export default services;
export { strengths, serviceCategories };
