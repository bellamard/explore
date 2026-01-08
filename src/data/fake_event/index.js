const FAKE_EVENTS = [
  {
    title: new Date().toISOString().split('T')[0],
    date: new Date().toISOString().split('T')[0],
    data: [
      {
        id: '1',
        hour: '12:00',
        duration: '2h',
        title: "Déjeuner d'affaires exclusif",
        description:
          "Rencontre stratégique avec les principaux investisseurs de la RDC. Discussion sur les nouvelles opportunités d'affaires dans le secteur minier.",
        location: 'Restaurant Le Rendez-Vous, Kinshasa',
        address: 'Avenue des Aviateurs, Gombe',
        urlImage: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8',
        type: 'Travail',
        category: 'Business',
        participants: 12,
        organizer: 'Chambre de Commerce',
        price: 'Gratuit',
        contact: '+243 81 234 5678',
        website: 'www.business-rdc.cd',
        status: 'confirmé',
        premium: true,
        tags: ['VIP', 'Networking', 'Investissement'],
      },
      {
        id: '2',
        hour: '18:00',
        duration: '3h',
        title: 'Concert de musique traditionnelle',
        description:
          'Spectacle exceptionnel mettant en valeur la richesse culturelle de la RDC avec des artistes locaux renommés.',
        location: 'Centre Culturel Boboto',
        address: 'Commune de la Gombe',
        urlImage:
          'https://images.unsplash.com/photo-1511379938547-c1f69419868d',
        type: 'Culture',
        category: 'Arts',
        participants: 300,
        organizer: 'Ministère de la Culture',
        price: '5,000 CDF',
        contact: '+243 89 876 5432',
        website: 'culture-rdc.cd',
        status: 'complet',
        premium: false,
        tags: ['Musique', 'Tradition', 'Spectacle'],
      },
    ],
  },
  {
    title: new Date(new Date().setDate(new Date().getDate() + 1))
      .toISOString()
      .split('T')[0],
    date: new Date(new Date().setDate(new Date().getDate() + 1))
      .toISOString()
      .split('T')[0],
    data: [
      {
        id: '3',
        hour: '09:00',
        duration: '4h',
        title: 'Célébration de Noël familiale',
        description:
          'Journée festive en famille avec échange de cadeaux et repas traditionnel.',
        location: 'Parc de la Vallée',
        address: 'Mont Ngaliema, Kinshasa',
        urlImage:
          'https://images.unsplash.com/photo-1512917774080-9991f1c4c750',
        type: 'Famille',
        category: 'Famille',
        participants: 150,
        organizer: 'Association des Familles',
        price: '2,000 CDF',
        contact: '+243 82 345 6789',
        website: 'noelfamille.cd',
        status: 'places disponibles',
        premium: false,
        tags: ['Famille', 'Noël', 'Enfants'],
      },
      {
        id: '4',
        hour: '14:00',
        duration: '5h',
        title: 'Tournoi de football communautaire',
        description: 'Compétition amicale entre les quartiers de Kinshasa.',
        location: 'Stade des Martyrs',
        address: 'Commune de Lingwala',
        urlImage:
          'https://images.unsplash.com/photo-1461896836934-ffe607ba8211',
        type: 'Sport',
        category: 'Sports',
        participants: 16,
        organizer: 'Fédération de Football',
        price: 'Gratuit',
        contact: '+243 84 567 8901',
        website: 'foot-rdc.cd',
        status: 'inscriptions ouvertes',
        premium: true,
        tags: ['Sport', 'Compétition', 'Communauté'],
      },
    ],
  },
  {
    title: new Date(new Date().setDate(new Date().getDate() + 3))
      .toISOString()
      .split('T')[0],
    date: new Date(new Date().setDate(new Date().getDate() + 3))
      .toISOString()
      .split('T')[0],
    data: [
      {
        id: '5',
        hour: '10:00',
        duration: '3h',
        title: "Atelier d'artisanat local",
        description:
          'Apprenez les techniques traditionnelles de tissage et de poterie.',
        location: 'Maison des Arts',
        address: 'Avenue de la Justice, Binza',
        urlImage: 'https://images.unsplash.com/photo-1560393464-5c3a73cda2b1',
        type: 'Art',
        category: 'Artisanat',
        participants: 25,
        organizer: 'Coopérative des Artisans',
        price: '15,000 CDF',
        contact: '+243 85 678 9012',
        website: 'artisanat-rdc.cd',
        status: 'limité',
        premium: false,
        tags: ['Art', 'Création', 'Atelier'],
      },
    ],
  },
  {
    title: new Date(new Date().setDate(new Date().getDate() + 5))
      .toISOString()
      .split('T')[0],
    date: new Date(new Date().setDate(new Date().getDate() + 5))
      .toISOString()
      .split('T')[0],
    data: [
      {
        id: '6',
        hour: '19:00',
        duration: '4h',
        title: 'Soirée gastronomique',
        description:
          'Découverte de la cuisine congolaise avec des chefs étoilés.',
        location: 'Hôtel Memling',
        address: 'Avenue du Port, Gombe',
        urlImage:
          'https://images.unsplash.com/photo-1414235077428-338989a2e8c0',
        type: 'Gastronomie',
        category: 'Cuisine',
        participants: 50,
        organizer: 'Association des Chefs',
        price: '50,000 CDF',
        contact: '+243 86 789 0123',
        website: 'gastronomie-cd.com',
        status: 'presque complet',
        premium: true,
        tags: ['Gastronomie', 'Dégustation', 'Rencontre'],
      },
    ],
  },
];
export default FAKE_EVENTS;
