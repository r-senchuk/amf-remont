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
      { icon: 'format_color_fill', title: 'Wylewki samopoziomujące i wyrównawcze', description: 'Profesjonalne przygotowanie idealnie równego podłoża pod podłogi.' }
    ]
  },
  {
    title: 'Płytki i łazienki',
    icon: 'bathroom',
    items: [
      { icon: 'grid_on', title: 'Układanie glazury i terakoty', description: 'Precyzyjne układanie kafelków ściennych i podłogowych z dbałością o detale.' },
      { icon: 'bathtub', title: 'Łazienki kompleksowo', description: 'Kompleksowe wykończenie łazienek.' }
    ]
  }
];

const services = serviceCategories.flatMap(category => category.items);

const strengths = [
  { title: 'Doświadczenie', description: 'Setki zrealizowanych projektów - tworzymy wnętrza, które zachwycają.', icon: 'verified_user' },
  { title: 'Remonty Pod Klucz', description: 'Od planu po ostatnie pociągnięcie pędzlem, wszystko załatwimy, a Ty tylko cieszysz się efektem.', icon: 'home_repair_service' },
  { title: 'Kreatywne Rozwiązania', description: 'Innowacyjne podejście do remontów - Twoje mieszkanie będzie unikatowe.', icon: 'lightbulb' },
  { title: 'Osobiste Podejście', description: 'Pracujemy dla Ciebie, a nie dla projektu - dopasowujemy się do Twoich potrzeb.', icon: 'handshake' },
  { title: 'Terminowość', description: 'Liczy się każdy dzień. U nas termin to nie puste słowo.', icon: 'schedule' },
  { title: 'Lokalizacja', description: 'Jesteśmy tu, gdzie Ty. Działamy na terenie Wrocławia.', icon: 'location_city' }
];

export default services;
export { strengths, serviceCategories };
