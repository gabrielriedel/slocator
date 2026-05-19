// Cal Poly SLO Campus Buildings Database
// Add new buildings here — the app picks them up automatically.

export interface Building {
  id: string;
  name: string;
  shortName: string;
  number: string;        // Cal Poly building number
  department: string;
  location: string;      // On-campus location description
  yearBuilt: number | null;
  description: string;
  funFacts: string[];
  coordinates?: {        // For future map integration
    latitude: number;
    longitude: number;
  };
  learnMoreUrl?: string;
}

export const buildings: Building[] = [
  {
    id: 'kennedy-library',
    name: 'Robert E. Kennedy Library',
    shortName: 'Kennedy Library',
    number: '35',
    department: 'University Library',
    location: 'Central campus, near the main quad',
    yearBuilt: 1980,
    description:
      'The Robert E. Kennedy Library is the heart of Cal Poly\'s academic community, providing research resources, study spaces, and special collections for students and faculty.',
    funFacts: [
      'Houses over 700,000 physical volumes and access to millions of digital resources.',
      'Named after Robert E. Kennedy, Cal Poly\'s fourth president who served from 1967 to 1979.',
      'Features the Digital Scholarship Lab with high-performance computing and visualization tools.',
      'The 6th floor offers panoramic views of the Santa Lucia foothills and campus.',
    ],
    coordinates: { latitude: 35.2999, longitude: -120.6625 },
    learnMoreUrl: 'https://lib.calpoly.edu',
  },
  {
    id: 'engineering-iv',
    name: 'Engineering IV',
    shortName: 'Engineering IV',
    number: '192',
    department: 'College of Engineering',
    location: 'Engineering plaza, east side of campus',
    yearBuilt: 2014,
    description:
      'Engineering IV is one of Cal Poly\'s newest engineering facilities, housing state-of-the-art labs and classrooms for computer science, software engineering, and electrical engineering.',
    funFacts: [
      'Built with $97 million in funding, it\'s one of the largest construction projects in Cal Poly history.',
      'Features a rooftop solar array that offsets a significant portion of the building\'s energy use.',
      'Home to Cal Poly\'s renowned computer science department, ranked top 10 among public universities.',
      'The atrium is designed to mimic a tech company\'s open workspace — inspiration for student collaboration.',
    ],
    coordinates: { latitude: 35.3011, longitude: -120.6588 },
    learnMoreUrl: 'https://csc.calpoly.edu',
  },
  {
    id: 'baker-science',
    name: 'Baker Science',
    shortName: 'Baker Science',
    number: '180',
    department: 'College of Science & Mathematics',
    location: 'Science quad, center of campus',
    yearBuilt: 1969,
    description:
      'Baker Science is the home of Cal Poly\'s chemistry, physics, and mathematics departments, featuring modern laboratory spaces and lecture halls.',
    funFacts: [
      'Named after Frank E. Baker, one of Cal Poly\'s most beloved science professors.',
      'The chemistry labs have produced multiple award-winning undergraduate research projects.',
      'Houses one of the few functioning nuclear magnetic resonance (NMR) spectrometers at an undergraduate institution.',
      'Students here have gone on to work at NASA, SpaceX, and leading biotech firms.',
    ],
    coordinates: { latitude: 35.3003, longitude: -120.6618 },
    learnMoreUrl: 'https://cosam.calpoly.edu',
  },
  {
    id: 'business-building',
    name: 'Orfalea College of Business',
    shortName: 'Business Building',
    number: '3',
    department: 'Orfalea College of Business',
    location: 'Northwest corner of campus near Grand Ave entrance',
    yearBuilt: 1958,
    description:
      'One of Cal Poly\'s original buildings, the Business Building houses the Orfalea College of Business — consistently ranked among the best undergraduate business programs in the western US.',
    funFacts: [
      'Named after Paul Orfalea, founder of Kinko\'s, who donated $15 million to the college.',
      'The Orfalea College of Business is ranked #5 among undergraduate business programs in the US by Bloomberg.',
      'Home to the Collaborative for Entrepreneurship & Innovation, which has helped launch 50+ student startups.',
      'Alumni include executives at Microsoft, Google, and dozens of Fortune 500 companies.',
    ],
    coordinates: { latitude: 35.3020, longitude: -120.6648 },
    learnMoreUrl: 'https://business.calpoly.edu',
  },
  {
    id: 'recreation-center',
    name: 'Recreation Center',
    shortName: 'Rec Center',
    number: '41',
    department: 'Campus Recreation',
    location: 'Adjacent to the athletics complex, south campus',
    yearBuilt: 1995,
    description:
      'The Cal Poly Recreation Center is a world-class fitness and recreation facility featuring a climbing wall, pools, courts, and extensive fitness equipment.',
    funFacts: [
      'Houses one of the tallest indoor climbing walls in the California State University system.',
      'Serves over 10,000 students, faculty, and community members annually.',
      'The outdoor pool is heated and open year-round thanks to SLO\'s Mediterranean climate.',
      'Home base for Cal Poly\'s nationally competitive club sports, including cycling and triathlon.',
    ],
    coordinates: { latitude: 35.2975, longitude: -120.6605 },
    learnMoreUrl: 'https://asi.calpoly.edu/recreation',
  },
  {
    id: 'performing-arts-center',
    name: 'Performing Arts Center',
    shortName: 'PAC',
    number: '6',
    department: 'College of Liberal Arts',
    location: 'Grand Ave, main entrance to campus',
    yearBuilt: 1996,
    description:
      'The Cal Poly Performing Arts Center is a premier performing arts venue serving both the university and Central Coast communities, featuring multiple theaters and state-of-the-art acoustics.',
    funFacts: [
      'Hosts over 100 performances per year, from Broadway touring shows to Cal Poly student productions.',
      'The Harman Hall seats 1,314 and is considered one of the finest acoustic spaces in California.',
      'Has welcomed world-class performers including Itzhak Perlman, Yo-Yo Ma, and Branford Marsalis.',
      'Built through a unique public-private partnership — half university, half community fundraising.',
    ],
    coordinates: { latitude: 35.3030, longitude: -120.6660 },
    learnMoreUrl: 'https://pac.calpoly.edu',
  },
  {
    id: 'university-union',
    name: 'University Union',
    shortName: 'UU',
    number: '65',
    department: 'Associated Students Inc. (ASI)',
    location: 'Central campus, adjacent to Dexter Lawn',
    yearBuilt: 1970,
    description:
      'The University Union is the social hub of Cal Poly campus, home to ASI student government, food vendors, student organizations, and recreational activities.',
    funFacts: [
      'The UU Ballroom has hosted everything from debate watch parties to sold-out concerts.',
      'Houses El Corral Bookstore, one of the largest college bookstores in California.',
      'The building\'s courtyard, known as the "Pit," is a legendary hangout spot for generations of Mustangs.',
      'ASI, based here, manages over $10 million in student programs and services annually.',
    ],
    coordinates: { latitude: 35.3008, longitude: -120.6635 },
    learnMoreUrl: 'https://asi.calpoly.edu',
  },
  {
    id: 'advanced-tech-lab',
    name: 'Advanced Technologies Laboratory',
    shortName: 'ATL',
    number: '7',
    department: 'College of Engineering',
    location: 'Engineering row, near Grand Ave',
    yearBuilt: 2004,
    description:
      'The Advanced Technologies Laboratory supports cutting-edge research and development in aerospace, mechanical, and industrial engineering.',
    funFacts: [
      'Home to Cal Poly\'s CubeSat program — students here have launched satellites into orbit.',
      'Features a high-bay area tall enough to accommodate full-scale aerospace test structures.',
      'Cal Poly teams using ATL facilities have won multiple AIAA and SAE design competitions.',
      'The lab has collaborated with NASA, Lockheed Martin, and Boeing on applied research projects.',
    ],
    coordinates: { latitude: 35.3025, longitude: -120.6642 },
    learnMoreUrl: 'https://aero.calpoly.edu',
  },
  {
    id: 'dexter-building',
    name: 'Dexter Building',
    shortName: 'Dexter',
    number: '34',
    department: 'College of Architecture & Environmental Design',
    location: 'Architecture alley, center of campus',
    yearBuilt: 1967,
    description:
      'The Dexter Building is the heart of Cal Poly\'s renowned College of Architecture and Environmental Design, featuring open studios where students work around the clock.',
    funFacts: [
      'Cal Poly\'s architecture program is consistently ranked #1 among public universities in the nation.',
      'The studio culture is legendary — students often sleep here during finals week.',
      'The building\'s brutalist design is itself a teaching tool in architectural history courses.',
      'Graduates have designed buildings in over 40 countries and won multiple AIA honors.',
    ],
    coordinates: { latitude: 35.3002, longitude: -120.6628 },
    learnMoreUrl: 'https://arch.calpoly.edu',
  },
  {
    id: 'davidson-music',
    name: 'Davidson Music Center',
    shortName: 'Davidson Music',
    number: '45',
    department: 'Music Department, College of Liberal Arts',
    location: 'Near the Performing Arts Center, north campus',
    yearBuilt: 1985,
    description:
      'The Davidson Music Center houses Cal Poly\'s award-winning music program, with practice rooms, recording studios, and performance spaces for students and ensembles.',
    funFacts: [
      'Named after Harold Davidson, a longtime supporter of music education at Cal Poly.',
      'Home to the Wind Orchestra, which has performed at Carnegie Hall three times.',
      'The recording studio is professional-grade and used by student artists to produce commercial releases.',
      'Cal Poly jazz ensembles trained here have competed and won at international jazz festivals.',
    ],
    coordinates: { latitude: 35.3027, longitude: -120.6655 },
    learnMoreUrl: 'https://music.calpoly.edu',
  },
  {
    id: 'engineering-east',
    name: 'Engineering East',
    shortName: 'Engineering East',
    number: '20',
    department: 'College of Engineering',
    location: 'Engineering area, east side of campus',
    yearBuilt: null,
    description:
      'Engineering East is part of Cal Poly\'s engineering core, supporting hands-on labs, classrooms, and project spaces for engineering students.',
    funFacts: [
      'The engineering area is one of the busiest academic zones on campus.',
      'Students use nearby labs and shops for Learn by Doing design work.',
      'It sits near several other engineering and technical buildings.',
    ],
    coordinates: { latitude: 35.3009, longitude: -120.6595 },
    learnMoreUrl: 'https://engineering.calpoly.edu',
  },
  {
    id: 'engineering-west-architecture',
    name: 'Engineering West / Architectural Engineering',
    shortName: 'Engineering West',
    number: '21',
    department: 'College of Architecture & Environmental Design',
    location: 'Near the architecture and engineering buildings',
    yearBuilt: null,
    description:
      'Engineering West supports architecture, architectural engineering, and related project-based coursework at Cal Poly.',
    funFacts: [
      'Architectural engineering bridges structural design, construction, and building systems.',
      'The surrounding studios and labs are heavily used during project deadlines.',
      'The area connects CAED and engineering workflows on campus.',
    ],
    coordinates: { latitude: 35.3004, longitude: -120.6619 },
    learnMoreUrl: 'https://caed.calpoly.edu',
  },
  {
    id: 'frank-pilling',
    name: 'Frank E. Pilling Building',
    shortName: 'Frank Pilling',
    number: '14',
    department: 'College of Engineering',
    location: 'Engineering area of campus',
    yearBuilt: null,
    description:
      'The Frank E. Pilling Building is one of Cal Poly\'s engineering facilities, used for technical instruction and applied project work.',
    funFacts: [
      'The building is named for Frank E. Pilling, an important figure in Cal Poly engineering history.',
      'It is part of the dense cluster of engineering buildings near the center-east side of campus.',
      'Students pass through this area frequently on the way to labs and design spaces.',
    ],
    coordinates: { latitude: 35.3010, longitude: -120.6602 },
    learnMoreUrl: 'https://engineering.calpoly.edu',
  },
  {
    id: 'frost-center',
    name: 'William and Linda Frost Center for Research and Innovation',
    shortName: 'Frost Center',
    number: '181',
    department: 'Research and Innovation',
    location: 'Near Baker Science and the science quad',
    yearBuilt: 2022,
    description:
      'The Frost Center for Research and Innovation brings together teaching, research, and interdisciplinary collaboration in modern lab and classroom spaces.',
    funFacts: [
      'The building supports cross-disciplinary student and faculty research.',
      'Its location connects it closely with Baker Science and other STEM spaces.',
      'The facility was designed for modern collaboration and flexible lab use.',
    ],
    coordinates: { latitude: 35.3004, longitude: -120.6612 },
    learnMoreUrl: 'https://research.calpoly.edu',
  },
  {
    id: 'construction-innovations-center',
    name: 'Construction Innovations Center',
    shortName: 'Construction Innovation',
    number: '186',
    department: 'Construction Management',
    location: 'Near the engineering and construction management facilities',
    yearBuilt: null,
    description:
      'The Construction Innovations Center supports Cal Poly construction management students with applied spaces for building methods, materials, and project work.',
    funFacts: [
      'Construction management students use applied labs to practice real-world jobsite workflows.',
      'The program emphasizes estimating, scheduling, safety, and field coordination.',
      'The center reflects Cal Poly\'s Learn by Doing approach to the built environment.',
    ],
    coordinates: { latitude: 35.3007, longitude: -120.6587 },
    learnMoreUrl: 'https://construction.calpoly.edu',
  },
];

// Lookup helper
export function getBuildingById(id: string): Building | undefined {
  return buildings.find((b) => b.id === id);
}
