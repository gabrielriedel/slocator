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
  lbdStory?: string;
  coordinates?: {        // For future map integration
    latitude: number;
    longitude: number;
  };
  learnMoreUrl?: string;
}

export const buildings: Building[] = [
  {
    id: 'administration-building',
    name: 'Administration Building',
    shortName: 'Admin Building',
    number: '1',
    department: 'Administration & Finance',
    location: '',
    yearBuilt: null,
    description:
      'A&F is the steward of Cal Poly\'s resources, its 9 units fulfill major operational roles for the university. A&F is responsible for capital project planning and maintenance of nearly 6 million sq ft of space in the 150 major campus buildings.',
    funFacts: [],
  },
  {
    id: 'business-building',
    name: 'Orfalea College Of Business Building',
    shortName: 'Business Building',
    number: '3',
    department: 'Orfalea College of Business',
    location: 'Northwest corner of campus near Grand Ave entrance',
    yearBuilt: 1958,
    description:
      'Our learning experience, incorporating real-world business activity with essential technology and top-notch faculty, creates a thriving academic enterprise that effectively transitions students into careers.',
    funFacts: [
      '3,382 students are enrolled in the Orfalea College of Business',
      'Paul Orfalea donated $15M in 2000 to name the college',
      'OCOB offers 12 concentrations across the college',
      '120+ companies have been launched through the Center for Innovation & Entrepreneurship',
      'CIE has created 1,000+ jobs since its founding in 2010',
      'Companies launched through CIE have raised $250M',
      'CIE companies have produced $500M in exits',
      'OCOB alum Haley Pavone (Pashion Footwear) earned a Forbes 30 Under 30 distinction',
    ],
    lbdStory:
      'I took BUS 347, Professional Selling Skills for my sales minor, and we spent the entire quarter learning about foundational selling skills and how to use them in a variety of situations. We were then given a prompt for a real company, Fastenal, and a problem that they were currently facing. We were given the task of developing a sales pitch and any other materials we wanted to provide with it. Then for the entire quarter we were placed with different partners and observers to deliver our pitch. We were graded on rubrics and given feedback after every pitch. For our class final, we were put in a bracket competition for who could deliver the best pitch to Fastenal employees. The winner of the bracket was given $50 to the bookstore and a unique OCOB mug that can only be won in this class competition!',
    coordinates: { latitude: 35.3020, longitude: -120.6648 },
    learnMoreUrl: 'https://business.calpoly.edu',
  },
  {
    id: 'architecture-building',
    name: 'Architecture & Environmental Design Building',
    shortName: 'Architecture',
    number: '5',
    department: 'College of Architecture & Environmental Design',
    location: '',
    yearBuilt: null,
    description:
      'Architecture is one of five departments in the College of Architecture and Environmental Design (CAED), along with Architectural Engineering, City and Regional Planning, Construction Management, and Landscape Architecture.',
    funFacts: [
      'CAED is Cal Poly\'s smallest college with ~2,000 enrolled students',
      'CAED offers 5 disciplines: Architecture, Architectural Engineering, City Planning, Construction Management, and Landscape Architecture',
      'Architecture and Landscape Architecture are 5-year programs',
      'CAED is one of the largest programs of its type in the nation with all 5 disciplines',
      'Because CAED is such a small department, almost all of the professors go by first names, are on first name basis with students and have a full open door policy'
    ],
    lbdStory:
      'Design Village! My team of 7 had 4 weeks to design, fabricate, transport, and construct a full scale structure to sleep in for a weekend! My team\'s design represented a kaleidoscope with 4 modular pods serving as beds for 2. We had to transport our final structure by foot ~1.5 miles from the ARCH buildings to Poly Canyon, figuring out the best method to transport this huge structure — my group created a makeshift cart out of 2 dolleys, pulling it with paracord attached to 3 people\'s backs like a backpack. We constructed the structure to its intended state on site, slept in it for the weekend, and enjoyed the community and scenery! Lots of bands performed in the geodesic dome, people sang songs and hung out until the stars shined bright in the sky.',
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
      'The Performing Arts Center San Luis Obispo is a state-of-the-art venue operated in partnership between Cal Poly, the City of SLO, and the Foundation for the Performing Arts Center.',
    funFacts: [],
    coordinates: { latitude: 35.3030, longitude: -120.6660 },
    learnMoreUrl: 'https://pac.calpoly.edu',
  },
  {
    id: 'erhart-agriculture',
    name: 'Erhart Agriculture Building',
    shortName: 'Erhart Agriculture',
    number: '10',
    department: 'College of Agriculture, Food and Environmental Sciences',
    location: '',
    yearBuilt: null,
    description:
      'Nestled between the Pacific Ocean and the world-class vineyards of the Edna Valley, Cal Poly\'s College of Agriculture, Food and Environmental Sciences boasts one of the nation\'s most prestigious undergraduate agriculture programs.',
    funFacts: [
      'Students refer to the joint Erhart Agriculture and English building as "Aglish"',
      ""
    ],
    lbdStory:
      'I am currently doing research on Iberian pigs (a breed from Spain) about the effects of Roundup in their diet on their health. The concentration of Roundup, or glyphosate, in their food is the same as it is in human produce so this research will be applied to human health. There are three different diets we are using: a control, a "Western diet", and a Western diet with glyphosate — the same concentration found in produce like grapes. The study is looking at how glyphosate affects weight, behavior, and the likelihood of diseases like diabetes and kidney failure. This data can then be applied to human health!',
  },
  {
    id: 'agricultural-sciences',
    name: 'Agricultural Sciences Building',
    shortName: 'Agricultural Sciences',
    number: '11',
    department: 'College of Agriculture, Food and Environmental Sciences',
    location: '',
    yearBuilt: null,
    description:
      'Nestled between the Pacific Ocean and the world-class vineyards of the Edna Valley, Cal Poly\'s College of Agriculture, Food and Environmental Sciences boasts one of the nation\'s most prestigious undergraduate agriculture programs.',
    funFacts: [
      'CAFES has 4,2000 students enrolled with 50+ student clubs and organizations',
      'Students gain exposure to research and development, manufacturing practices,quality assurance, food safety and sanitation principles, as well as sales and marketing.',
      'A beginning rodeo class is offered to all students who are interested and they participate in rodeo events on a small scale.',
      'Enterprise classes allow students to gain even more hands-on experience across CAFES careers with courses including beekeeping, cheese making, and tractor driving.'
    ],
    lbdStory:
      'Students spend a quarter running the Food Science Sensory Lab (located under the stairs in Frost next to the culinary lab). The purpose of the lab is to conduct taste tests for research projects and nationwide companies to gain consumer insight, which is then assessed to alter products. Within the class, students are responsible to plan, execute and analyze a sensory test, presenting their findings back to their company to help the products grow. Additionally, food science students can work for the sensory lab and anyone in SLO can participate in tests — you receive a gift card at the end! My favorite test to have worked on was a coffee creamer test, where a company wanted to see how their new non-dairy coffee creamer would stand against top competitors, and they used the test feedback to determine whether or not it belonged on the market!',
  },
  {
    id: 'engineering-building',
    name: 'Engineering Building',
    shortName: 'Engineering',
    number: '13',
    department: 'College of Engineering',
    location: '',
    yearBuilt: null,
    description:
      'The Cal Poly College of Engineering places an emphasis on preparing today\'s students to solve tomorrow\'s global challenges. U.S. News & World Report recently ranked one of the college\'s departments as the top specialty program in the nation.',
    funFacts: [
      'CENG is the largest college at Cal Poly, with over 6,000 students',
      'CENG has 80+ labs to use for classwork or outside projects, including the Welding Lab, Machine Shop, Casting Lab, and more.',
      'CENG hosts specialized career fairs for engineering students in general, with some focusing on specific majors.',
      'EPIC and ENGAGE are pipeline programs to recruit future underrepresented students interested in Engineering'
    ],
  },
  {
    id: 'frank-pilling',
    name: 'Frank E. Pilling Computer Science Building',
    shortName: 'Frank Pilling',
    number: '14',
    department: 'College of Engineering',
    location: 'Engineering area of campus',
    yearBuilt: null,
    description:
      'Computer science is the study of computers and computer systems including the design and development of software.',
    funFacts: [
      'Nearly every Computer Science lecture has an associated lab section for hands-on-keyboard leaning.',
      'The Cal Poly Hack4Impact club gives students the opportunity to build software solutions for local SLO nonprofits.',
      'Cal Poly CS/CPE/SE grads have gone on to work at companies including Google, Microsoft, Apple, Yahoo, IBM, SUN, Intel, Intuit, Amgen, Adobe, Salesforce, and more.'
    ],
    lbdStory:
      'I am a part of the AI for search and rescue project at Cal Poly! We are a group of computer science students trying to create an AI model that can help the San Luis Obispo Search and Rescue team. We are still in the early stages of the model, but the goal is to create a clue triage model that will accept clues/tips from the public and sort them by severity and importance to give hints to search and rescue teams for areas/locations a person may be! This also includes popular areas and paths people tend to get lost on, and where they are likely to be found.',
    coordinates: { latitude: 35.3010, longitude: -120.6602 },
    learnMoreUrl: 'https://engineering.calpoly.edu',
  },
  {
    id: 'dining-complex-1901',
    name: '1901 Dining Complex',
    shortName: '1901 Dining',
    number: '19',
    department: 'Dining Services',
    location: '',
    yearBuilt: null,
    description:
      '1901 Marketplace has nine separate eatery venues, each with a unique culinary niche, ranging from Mediterranean and Mexican to sandwiches — all located at the heart of Cal Poly\'s campus.',
    funFacts: [
      '1901 Marketplaces includes restuarants Chick-fil-A, Pico\'s, Pom & Honey, Julian\'s Cafe, Red Radish, Panda Express, Poly Choice, and 1901 Kitchen.'

    ],
  },
  {
    id: 'graphic-arts-building',
    name: 'Graphic Arts Building',
    shortName: 'Graphic Arts',
    number: '26',
    department: 'Graphic Communication',
    location: '',
    yearBuilt: null,
    description:
      'Graphic communication is the study of how we convey meaning through visual design. This includes the creation, production, management and distribution of advertising, marketing, websites, apps, books, packaging and other media in printed and digital form.',
    funFacts: [],
    lbdStory:
      'Integrated Marketing Communication in GrC is a class where we partner with a local business or organization and develop new marketing materials for the company based on their needs. The quarter I took the class, we were partnered with a vocational training non-profit that is going through a merger with another similar organization. Our class was actually able to meet the client and discuss their needs and goals for new branding post-merger. We developed countless marketing strategies, budgeting, campaign guidelines, marketing objectives and more before finally starting to design and develop marketing materials. We created variable data printed postcards, fliers, social media materials and planning, a new website landing page, and more! It\'s been a full circle marketing plan and getting to partner with a real local non-profit has been inspiring!',
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
      'Dexter refers to the Walter F. Dexter building, or Building 34 on the Cal Poly Campus, which is home to the Art & Design Department, as well as Landscape Architecture and the ROTC program.',
    funFacts: [],
    coordinates: { latitude: 35.3002, longitude: -120.6628 },
    learnMoreUrl: 'https://arch.calpoly.edu',
  },
  {
    id: 'kennedy-library',
    name: 'Kennedy Library',
    shortName: 'Kennedy Library',
    number: '35',
    department: 'University Library',
    location: 'Central campus, near the main quad',
    yearBuilt: 1980,
    description:
      'The Kennedy Library Building is open following a two-year renovation.',
    funFacts: [],
    coordinates: { latitude: 35.2999, longitude: -120.6625 },
    learnMoreUrl: 'https://lib.calpoly.edu',
  },
  {
    id: 'math-science-building',
    name: 'Mathematics and Science Building',
    shortName: 'Math & Science',
    number: '38',
    department: 'Bailey College of Science and Mathematics',
    location: '',
    yearBuilt: null,
    description:
      'Bailey College of Science and Mathematics — enhancing lives through learning, discovery and innovation.',
    funFacts: [],
    lbdStory:
      'My non-research LBD is that I work for the Cal Poly baseball team as an analytics student manager (Student Director of Baseball Analytics) where I compile stats, build machine learning models, and create scouting reports for the Cal Poly baseball team. I get to work in the clubhouse and operate out of the press box for every home game, and I get to travel with the team to their away games. In this role, I interface with players and coaches, and my work makes a direct impact on team strategy and in-game decision making. I get to apply the concepts I\'m learning in my math and statistics classes to practical applications that support our baseball team and help me pursue my passion for a career in sports.',
  },
  {
    id: 'mott-athletics',
    name: 'Mott Athletics Center',
    shortName: 'Mott Athletics',
    number: '42',
    department: 'Athletics',
    location: '',
    yearBuilt: null,
    description:
      'Located at the southeastern entrance to the university, Cal Poly\'s Mott Athletics Center has been the site of many historic athletic competitions for Cal Poly men\'s and women\'s basketball teams, women\'s volleyball and Mustang wrestling.',
    funFacts: [],
  },
  {
    id: 'recreation-center',
    name: 'Recreation Center',
    shortName: 'Rec Center',
    number: '43',
    department: 'Campus Recreation',
    location: 'Adjacent to the athletics complex, south campus',
    yearBuilt: 1995,
    description:
      'The Recreation Center is Cal Poly\'s destination for fitness, recreation, relaxation, and wellness. Our state-of-the-art facility features everything you need for your workout, leisure, or recreational activity.',
    funFacts: [],
    coordinates: { latitude: 35.2975, longitude: -120.6605 },
    learnMoreUrl: 'https://asi.calpoly.edu/recreation',
  },
  {
    id: 'science-building',
    name: 'Science Building',
    shortName: 'Science Building',
    number: '52',
    department: 'Bailey College of Science and Mathematics',
    location: '',
    yearBuilt: null,
    description:
      'Nestled in between the arms of Building 52, the Cal Poly Observatory is both a portal to the stars and a tool for meaningful research.',
    funFacts: [],
  },
  {
    id: 'university-union',
    name: 'Julian A. McPhee University Union',
    shortName: 'UU',
    number: '65',
    department: 'Associated Students Inc. (ASI)',
    location: 'Central campus, adjacent to Dexter Lawn',
    yearBuilt: 1970,
    description:
      'Visit the UU to grab some Cal Poly gear at the University Store.',
    funFacts: [],
    coordinates: { latitude: 35.3008, longitude: -120.6635 },
    learnMoreUrl: 'https://asi.calpoly.edu',
  },
  {
    id: 'vista-grande',
    name: 'Vista Grande',
    shortName: 'Vista Grande',
    number: '112',
    department: 'Dining Services',
    location: '',
    yearBuilt: null,
    description:
      'The three-story Vista Grande Dining Complex houses seven new dining venues and a neighborhood market in an energy-efficient building.',
    funFacts: [
      'Vista Grande includes restuarants Balance Cafe, Brunch, Hearth, Jamba, Market Grand Ave, Noodles, Streats, Sweet Bar, Mingle, Nosh, Deli at Market Grand Ave, and Vista Grande Express.',
      'The restuarant Streats rotates its menu offerings every few weeks to offer a wide variety of cuisines.',
      ''
    ],
  },
  {
    id: 'baker-science',
    name: 'Baker Center for Science and Math',
    shortName: 'Baker Science',
    number: '180',
    department: 'College of Science & Mathematics',
    location: 'Science quad, center of campus',
    yearBuilt: 2013,
    description:
      'Located at the heart of campus to powerfully symbolize the central nature of science and mathematics in the university\'s polytechnic curriculum, the Warren J. Baker Center for Science and Mathematics opened for classes in fall 2013.',
    funFacts: [],
    lbdStory: 'During my first year I reached out to some professors in the chem department about research, and was able to join a research team looking at yeast proteins which can be used for anti-fungal pharmaceuticals. I was trained in Spring Quarter and then applied to FSURP (Frost Summer Undergrad Research Program). I got a $5,000 stipend to stay in SLO over the summer, and I got really incredible hands-on experiences working in the lab, which has helped me be more confident in my classes. This experience has also pushed me to go into an industry job post-grad, rather than a higher degree — which is really exciting!',
    coordinates: { latitude: 35.3003, longitude: -120.6618 },
    learnMoreUrl: 'https://cosam.calpoly.edu',
  },
  {
    id: 'frost-center',
    name: 'William and Linda Frost Center for Research and Innovation',
    shortName: 'Frost Center',
    number: '181',
    department: 'Research and Innovation',
    location: 'Near Baker Science and the science quad',
    yearBuilt: 2023,
    description:
      'Completed in May 2023, the Frost Center commands a striking presence on campus with its award-winning design that has created the ideal environment for exceptional research, innovation and collaboration.',
    funFacts: [],
    lbdStory:
      'During my first year I reached out to some professors in the chem department about research, and was able to join a research team looking at yeast proteins which can be used for anti-fungal pharmaceuticals. I was trained in Spring Quarter and then applied to FSURP (Frost Summer Undergrad Research Program). I got a $5,000 stipend to stay in SLO over the summer, and I got really incredible hands-on experiences working in the lab, which has helped me be more confident in my classes. This experience has also pushed me to go into an industry job post-grad, rather than a higher degree — which is really exciting!',
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
      'The California Center for Construction Education (CCCE) is the liaison between Cal Poly alumni, students, and industry partners in order to create a network of leaders in the construction industry.',
    funFacts: [
      'Construction Management has a 100% job placement rate, with a median salary of $75,000',
      'CM students wear hard hats instead of grad caps at graduation!'
    ],
    lbdStory:
      'In my Residential Construction class we created a full bid for a house which included a full estimate and schedule that we then presented to our professor. In the lab portion, we built a mini house over the quarter based on a set of plans. This entailed fully framing, roofing, and siding the house as well as installing all doors and windows. My class built it ourselves by hand using actual equipment (hammers, nails, table saws, skill saws, etc.) and real framing techniques that our professor taught us.',
    coordinates: { latitude: 35.3007, longitude: -120.6587 },
    learnMoreUrl: 'https://construction.calpoly.edu',
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
      'The Cal Poly College of Engineering places an emphasis on preparing today\'s students to solve tomorrow\'s global challenges. U.S. News & World Report recently ranked one of the college\'s departments as the top specialty program in the nation.',
    funFacts: [],
    lbdStory:
      'Most engineering students get to take a class called "Introduction to Manufacturing and Design" where you not only learn how to create digital models of objects but you also get to try them! The class gives access and training for all types of industry grade machines such as lathes, CNC mills, broaches, press drills, and many more. I took this class my first quarter at Cal Poly, and it was such a great way to get true hands-on learning right out of the gate. We were able to work on projects that we got to keep, such as aluminum keychains and even making our own screwdrivers!',
    coordinates: { latitude: 35.3011, longitude: -120.6588 },
    learnMoreUrl: 'https://csc.calpoly.edu',
  },
];

// Lookup helper
export function getBuildingById(id: string): Building | undefined {
  return buildings.find((b) => b.id === id);
}
