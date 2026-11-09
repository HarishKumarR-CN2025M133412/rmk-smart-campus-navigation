/**
 * RMK Engineering College - Smart Campus Navigation
 * Script for Stage 3: Interactive Walking Route Navigation
 */

// 1. Campus Map Destinations & Predefined Road Paths
// Main Entrance (Starting point): { x: 50.9, y: 89.2 }
const mapDestinations = [
  {
    id: 'swaminantha-block',
    name: 'Swaminantha Block (Library)',
    category: 'Central Library',
    categoryKey: 'academic',
    x: 31.5,
    y: 52.1,
    description: 'Central campus library, digital research rooms, reference stacks, and quiet study halls.',
    path: [
      { x: 50.9, y: 89.2 }, // Main Entrance (Start)
      { x: 50.9, y: 83.5 }, // Pass through main entrance gate arch
      { x: 50.9, y: 78.5 }, // Inner gate junction
      { x: 44.5, y: 75.0 }, // Follow west roundabout curve around front lawn
      { x: 41.5, y: 67.0 }, // North-west avenue
      { x: 41.5, y: 56.5 }, // West road junction
      { x: 35.0, y: 56.5 }, // West along library front road
      { x: 31.5, y: 56.5 }, // Entrance driveway to Swaminantha Block
      { x: 31.5, y: 52.1 }  // Swaminantha Block (Library) - Arrived
    ],
    instructions: [
      { step: 1, type: 'start', text: 'Start at the Main Entrance gate (You are here).' },
      { step: 2, type: 'straight', text: 'Pass through the grand entrance archway into the campus grounds.' },
      { step: 3, type: 'turn-left', text: 'Veer left around the central landscaped garden along the paved avenue.' },
      { step: 4, type: 'turn-left', text: 'Turn left at the western junction onto the library front roadway.' },
      { step: 5, type: 'straight', text: 'Walk straight along the road towards the curved facade of the library.' },
      { step: 6, type: 'arrive', text: 'You have arrived at your destination: Swaminantha Block (Central Library).' }
    ]
  },
  {
    id: 'srinivasa-block',
    name: 'Srinivasa Block (Auditorium)',
    category: 'Auditorium & Events',
    categoryKey: 'facility',
    x: 51.4,
    y: 38.9,
    description: 'Grand air-conditioned auditorium for college symposiums, conferences, and cultural events.',
    path: [
      { x: 50.9, y: 89.2 }, // Main Entrance (Start)
      { x: 50.9, y: 83.5 }, // Main entrance gate
      { x: 50.9, y: 78.5 }, // Inner gate junction
      { x: 44.5, y: 75.0 }, // Veer left around front garden
      { x: 41.5, y: 67.0 }, // West avenue
      { x: 41.5, y: 56.5 }, // West junction
      { x: 44.0, y: 50.0 }, // Turn right/north-east towards auditorium front plaza
      { x: 51.4, y: 46.5 }, // Enter wide grand auditorium front plaza
      { x: 51.4, y: 38.9 }  // Srinivasa Block (Auditorium) glass entrance - Arrived
    ],
    instructions: [
      { step: 1, type: 'start', text: 'Start at the Main Entrance gate (You are here).' },
      { step: 2, type: 'straight', text: 'Walk through the main gate into the campus.' },
      { step: 3, type: 'turn-left', text: 'Veer left along the paved avenue curving around the front quadrangle.' },
      { step: 4, type: 'turn-right', text: 'At the central-west junction, veer right onto the auditorium plaza approach.' },
      { step: 5, type: 'straight', text: 'Cross into the wide paved front concourse directly facing the grand glass facade.' },
      { step: 6, type: 'arrive', text: 'You have arrived at your destination: Srinivasa Block (Auditorium).' }
    ]
  },
  {
    id: 'sathya-sai-block',
    name: 'Sathya Sai Block',
    category: 'Academic Block',
    categoryKey: 'academic',
    x: 24.5,
    y: 39.1,
    description: '1st Year - Science & Humanities department, lecture halls, and foundational laboratories.',
    path: [
      { x: 50.9, y: 89.2 }, // Main Entrance (Start)
      { x: 50.9, y: 83.5 }, // Main entrance gate
      { x: 50.9, y: 78.5 }, // Inner gate junction
      { x: 44.5, y: 75.0 }, // Follow west roundabout curve
      { x: 41.5, y: 67.0 }, // West avenue
      { x: 41.5, y: 56.5 }, // West junction
      { x: 38.0, y: 48.0 }, // Paved diagonal avenue between Library & Auditorium
      { x: 34.0, y: 43.5 }, // Junction with Sathya Sai western walkway
      { x: 28.5, y: 43.5 }, // Follow paved pathway heading west
      { x: 24.5, y: 39.1 }  // Sathya Sai Block entrance - Arrived
    ],
    instructions: [
      { step: 1, type: 'start', text: 'Start at the Main Entrance gate (You are here).' },
      { step: 2, type: 'straight', text: 'Walk through the main gate and veer left around the front garden.' },
      { step: 3, type: 'straight', text: 'Continue along the avenue past Swaminantha Block.' },
      { step: 4, type: 'slight-right', text: 'Veer right onto the diagonal avenue leading between the library and auditorium.' },
      { step: 5, type: 'turn-left', text: 'Turn left onto the dedicated paved pathway leading to the 1st year block.' },
      { step: 6, type: 'arrive', text: 'You have arrived at your destination: Sathya Sai Block (1st Year).' }
    ]
  },
  {
    id: 'padmavathy-block',
    name: 'Padmavathy Block',
    category: 'Academic Block',
    categoryKey: 'academic',
    x: 26.0,
    y: 29.9,
    description: 'Department classrooms, engineering computing laboratories, and faculty offices.',
    path: [
      { x: 50.9, y: 89.2 }, // Main Entrance (Start)
      { x: 50.9, y: 83.5 }, // Main entrance gate
      { x: 50.9, y: 78.5 }, // Inner gate junction
      { x: 44.5, y: 75.0 }, // West roundabout curve
      { x: 41.5, y: 67.0 }, // West avenue
      { x: 41.5, y: 56.5 }, // West junction
      { x: 38.0, y: 48.0 }, // North-west avenue
      { x: 34.0, y: 43.5 }, // Roadway past Sathya Sai Block
      { x: 35.5, y: 34.5 }, // Paved avenue running north towards Padmavathy
      { x: 30.0, y: 34.5 }, // Turn west onto Padmavathy approach walkway
      { x: 26.0, y: 29.9 }  // Padmavathy Block entrance - Arrived
    ],
    instructions: [
      { step: 1, type: 'start', text: 'Start at the Main Entrance gate (You are here).' },
      { step: 2, type: 'straight', text: 'Enter through the main gate and follow the avenue curving around the front garden.' },
      { step: 3, type: 'straight', text: 'Continue past the western junction onto the diagonal campus avenue.' },
      { step: 4, type: 'straight', text: 'Follow the paved road heading north past Sathya Sai Block.' },
      { step: 5, type: 'turn-left', text: 'Turn left onto the paved entrance walkway leading to Padmavathy Block.' },
      { step: 6, type: 'arrive', text: 'You have arrived at your destination: Padmavathy Block.' }
    ]
  },
  {
    id: 'girls-hostel',
    name: 'Girls Hostel',
    category: 'Hostel Residence',
    categoryKey: 'hostel',
    x: 17.0,
    y: 53.0,
    description: 'Women student residence quarters located on the western residential wing with 24/7 security.',
    path: [
      { x: 50.9, y: 89.2 }, // Main Entrance (Start)
      { x: 50.9, y: 83.5 }, // Main entrance gate
      { x: 50.9, y: 78.5 }, // Inner gate junction
      { x: 44.5, y: 75.0 }, // Follow west roundabout curve
      { x: 41.5, y: 67.0 }, // West avenue
      { x: 41.5, y: 56.5 }, // West road junction
      { x: 31.5, y: 56.5 }, // Paved road running straight west past Library
      { x: 23.0, y: 56.5 }, // Continuing west past the lawn
      { x: 17.0, y: 56.5 }, // Residential entrance driveway
      { x: 17.0, y: 53.0 }  // Girls Hostel main entrance gate - Arrived
    ],
    instructions: [
      { step: 1, type: 'start', text: 'Start at the Main Entrance gate (You are here).' },
      { step: 2, type: 'straight', text: 'Enter through the gate and veer left onto the western campus road.' },
      { step: 3, type: 'turn-left', text: 'At the western junction, turn left onto the library front roadway.' },
      { step: 4, type: 'straight', text: 'Continue straight past Swaminantha Block along the paved road.' },
      { step: 5, type: 'straight', text: 'Follow the road directly to the western residential quarters.' },
      { step: 6, type: 'arrive', text: 'You have arrived at your destination: Girls Hostel.' }
    ]
  },
  {
    id: 'girls-mess',
    name: 'Girls Mess',
    category: 'Mess / Dining',
    categoryKey: 'facility',
    x: 44.1,
    y: 27.3,
    description: 'Dedicated dining hall facility for women resident students located behind Srinivasa Auditorium.',
    path: [
      { x: 50.9, y: 89.2 }, // Main Entrance (Start)
      { x: 50.9, y: 83.5 }, // Main entrance gate
      { x: 50.9, y: 78.5 }, // Inner gate junction
      { x: 44.5, y: 75.0 }, // West roundabout curve
      { x: 41.5, y: 67.0 }, // West avenue
      { x: 41.5, y: 56.5 }, // West junction
      { x: 38.0, y: 48.0 }, // North-west avenue between Library & Auditorium
      { x: 39.5, y: 40.0 }, // Avenue along west flank of Auditorium
      { x: 42.0, y: 33.5 }, // Rear road behind Auditorium
      { x: 44.1, y: 27.3 }  // Girls Mess dining hall entrance - Arrived
    ],
    instructions: [
      { step: 1, type: 'start', text: 'Start at the Main Entrance gate (You are here).' },
      { step: 2, type: 'straight', text: 'Pass through the gate and follow the west avenue around the front garden.' },
      { step: 3, type: 'straight', text: 'At the western junction, take the paved diagonal avenue past the library.' },
      { step: 4, type: 'straight', text: 'Continue north along the paved roadway running alongside Srinivasa Auditorium.' },
      { step: 5, type: 'turn-right', text: 'Turn slightly right into the dining hall courtyard behind the auditorium.' },
      { step: 6, type: 'arrive', text: 'You have arrived at your destination: Girls Mess.' }
    ]
  },
  {
    id: 'boys-mess',
    name: 'Boys Mess',
    category: 'Mess / Dining',
    categoryKey: 'facility',
    x: 62.6,
    y: 27.3,
    description: 'Dedicated dining hall facility for men resident students situated opposite the Girls Mess.',
    path: [
      { x: 50.9, y: 89.2 }, // Main Entrance (Start)
      { x: 50.9, y: 83.5 }, // Main entrance gate
      { x: 50.9, y: 78.5 }, // Inner gate junction
      { x: 57.0, y: 75.0 }, // East roundabout curve around front lawn
      { x: 60.5, y: 67.0 }, // East avenue
      { x: 62.5, y: 58.0 }, // Avenue past Rajendra Naidu Block
      { x: 67.0, y: 49.0 }, // North-east avenue between Auditorium & academic wing
      { x: 70.5, y: 40.0 }, // Avenue past Vijayanagaralu Block
      { x: 68.5, y: 31.5 }, // Rear campus roadway junction
      { x: 62.6, y: 31.5 }, // Paved entrance road heading west to Boys Mess
      { x: 62.6, y: 27.3 }  // Boys Mess dining hall entrance - Arrived
    ],
    instructions: [
      { step: 1, type: 'start', text: 'Start at the Main Entrance gate (You are here).' },
      { step: 2, type: 'straight', text: 'Pass through the main entrance gate into the campus.' },
      { step: 3, type: 'turn-right', text: 'Veer right along the eastern avenue curving around the front quadrangle.' },
      { step: 4, type: 'straight', text: 'Follow the main northeast avenue running between the auditorium and academic blocks.' },
      { step: 5, type: 'turn-left', text: 'At the rear junction past Vijayanagaralu Block, turn left onto the dining hall access road.' },
      { step: 6, type: 'arrive', text: 'You have arrived at your destination: Boys Mess.' }
    ]
  },
  {
    id: 'boys-hostel',
    name: 'Boys Hostels (I, II & III)',
    category: 'Hostel Residence',
    categoryKey: 'hostel',
    x: 40.5,
    y: 14.9,
    description: 'Men student residence blocks with recreation rooms and residential halls at rear campus.',
    path: [
      { x: 50.9, y: 89.2 }, // Main Entrance (Start)
      { x: 50.9, y: 83.5 }, // Main entrance gate
      { x: 50.9, y: 78.5 }, // Inner gate junction
      { x: 44.5, y: 75.0 }, // West roundabout curve
      { x: 41.5, y: 67.0 }, // West avenue
      { x: 41.5, y: 56.5 }, // West junction
      { x: 38.0, y: 48.0 }, // North-west diagonal avenue
      { x: 35.5, y: 34.5 }, // Paved avenue past Sathya Sai & Padmavathy blocks
      { x: 36.5, y: 22.5 }, // Northern perimeter avenue
      { x: 40.5, y: 19.0 }, // Turn east onto Boys Hostel front avenue
      { x: 40.5, y: 14.9 }  // Boys Hostels (I, II & III) main entrance portico - Arrived
    ],
    instructions: [
      { step: 1, type: 'start', text: 'Start at the Main Entrance gate (You are here).' },
      { step: 2, type: 'straight', text: 'Enter through the main gate and veer left onto the western campus road.' },
      { step: 3, type: 'straight', text: 'Follow the north-west avenue past Swaminantha Block and Padmavathy Block.' },
      { step: 4, type: 'straight', text: 'Continue straight north along the perimeter roadway to the rear of the campus.' },
      { step: 5, type: 'turn-right', text: 'Turn right along the residential driveway in front of the hostel blocks.' },
      { step: 6, type: 'arrive', text: 'You have arrived at your destination: Boys Hostels (I, II & III).' }
    ]
  },
  {
    id: 'rajendra-naidu-block',
    name: 'Rajendra Naidu Block',
    category: 'Academic Block',
    categoryKey: 'academic',
    x: 52.3,
    y: 59.6,
    description: 'Prime central administrative block housing Principal, Dean offices, and central administrative divisions.',
    path: [
      { x: 50.9, y: 89.2 }, // Main Entrance (Start)
      { x: 50.9, y: 83.5 }, // Main entrance gate
      { x: 50.9, y: 78.5 }, // Inner gate junction
      { x: 51.5, y: 71.0 }, // Central boulevard driveway heading north
      { x: 52.0, y: 65.5 }, // Front entrance portico driveway
      { x: 52.3, y: 59.6 }  // Rajendra Naidu Block main entrance - Arrived
    ],
    instructions: [
      { step: 1, type: 'start', text: 'Start at the Main Entrance gate (You are here).' },
      { step: 2, type: 'straight', text: 'Pass through the main entrance archway.' },
      { step: 3, type: 'straight', text: 'Walk straight north along the paved central entrance boulevard.' },
      { step: 4, type: 'straight', text: 'Continue directly into the front portico driveway facing the main administrative building.' },
      { step: 5, type: 'arrive', text: 'You have arrived at Rajendra Naidu Block (Administrative & Dean Offices).' }
    ]
  },
  {
    id: 'ramanujalu-block',
    name: 'Ramanujalu Block',
    category: 'Academic Block',
    categoryKey: 'academic',
    x: 78.6,
    y: 52.3,
    description: 'Faculty departments, computing suites, research workspaces, and lecture halls.',
    path: [
      { x: 50.9, y: 89.2 }, // Main Entrance (Start)
      { x: 50.9, y: 83.5 }, // Main entrance gate
      { x: 50.9, y: 78.5 }, // Inner gate junction
      { x: 57.0, y: 75.0 }, // East roundabout curve around front lawn
      { x: 60.5, y: 67.0 }, // East avenue
      { x: 62.5, y: 58.0 }, // East avenue junction past Rajendra Naidu
      { x: 70.0, y: 56.0 }, // Turn east onto Ramanujalu entrance driveway
      { x: 78.6, y: 52.3 }  // Ramanujalu Block front entrance portico - Arrived
    ],
    instructions: [
      { step: 1, type: 'start', text: 'Start at the Main Entrance gate (You are here).' },
      { step: 2, type: 'straight', text: 'Pass through the main gate and veer right onto the eastern campus avenue.' },
      { step: 3, type: 'straight', text: 'Continue along the road curving past Rajendra Naidu Block.' },
      { step: 4, type: 'turn-right', text: 'Turn right onto the dedicated paved driveway leading towards Ramanujalu Block.' },
      { step: 5, type: 'straight', text: 'Follow the driveway directly to the front entrance portico.' },
      { step: 6, type: 'arrive', text: 'You have arrived at your destination: Ramanujalu Block.' }
    ]
  },
  {
    id: 'vijayanagaralu-block',
    name: 'Vijayanagaralu Block',
    category: 'Academic Block',
    categoryKey: 'academic',
    x: 82.0,
    y: 42.1,
    description: 'Undergraduate department lecture rooms, seminar halls, and project engineering labs.',
    path: [
      { x: 50.9, y: 89.2 }, // Main Entrance (Start)
      { x: 50.9, y: 83.5 }, // Main entrance gate
      { x: 50.9, y: 78.5 }, // Inner gate junction
      { x: 57.0, y: 75.0 }, // East roundabout curve
      { x: 60.5, y: 67.0 }, // East avenue
      { x: 62.5, y: 58.0 }, // East avenue past Rajendra Naidu
      { x: 67.0, y: 49.0 }, // Northeast avenue between Auditorium & academic wing
      { x: 74.0, y: 46.0 }, // Turn east onto Vijayanagaralu approach driveway
      { x: 82.0, y: 42.1 }  // Vijayanagaralu Block entrance - Arrived
    ],
    instructions: [
      { step: 1, type: 'start', text: 'Start at the Main Entrance gate (You are here).' },
      { step: 2, type: 'straight', text: 'Enter through the main gate and veer right onto the eastern campus road.' },
      { step: 3, type: 'straight', text: 'Follow the main northeast avenue running past Ramanujalu Block.' },
      { step: 4, type: 'turn-right', text: 'Turn right into the paved front driveway for Vijayanagaralu Block.' },
      { step: 5, type: 'arrive', text: 'You have arrived at your destination: Vijayanagaralu Block.' }
    ]
  },
  {
    id: 'ramanatha-block',
    name: 'Ramanatha Block',
    category: 'Academic Block',
    categoryKey: 'academic',
    x: 81.4,
    y: 32.9,
    description: 'Advanced laboratories, project workspaces, staff lounges, and modern lecture theaters.',
    path: [
      { x: 50.9, y: 89.2 }, // Main Entrance (Start)
      { x: 50.9, y: 83.5 }, // Main entrance gate
      { x: 50.9, y: 78.5 }, // Inner gate junction
      { x: 57.0, y: 75.0 }, // East roundabout curve
      { x: 60.5, y: 67.0 }, // East avenue
      { x: 62.5, y: 58.0 }, // East avenue
      { x: 67.0, y: 49.0 }, // Northeast avenue past Auditorium
      { x: 70.5, y: 40.0 }, // Avenue past Vijayanagaralu Block
      { x: 75.5, y: 36.0 }, // Turn east onto Ramanatha Block approach driveway
      { x: 81.4, y: 32.9 }  // Ramanatha Block entrance portico - Arrived
    ],
    instructions: [
      { step: 1, type: 'start', text: 'Start at the Main Entrance gate (You are here).' },
      { step: 2, type: 'straight', text: 'Enter through the main gate and follow the eastern avenue past the front quadrangle.' },
      { step: 3, type: 'straight', text: 'Walk along the northeast diagonal avenue past Ramanujalu and Vijayanagaralu blocks.' },
      { step: 4, type: 'turn-right', text: 'Turn right onto the entrance driveway leading to Ramanatha Block.' },
      { step: 5, type: 'arrive', text: 'You have arrived at your destination: Ramanatha Block.' }
    ]
  },
  {
    id: 'lakshmikanthamal-block',
    name: 'Lakshmikanthamal Block',
    category: 'Academic Block',
    categoryKey: 'academic',
    x: 72.7,
    y: 70.6,
    description: 'Specialized departmental wing, innovation labs, and seminar halls near the front entrance.',
    path: [
      { x: 50.9, y: 89.2 }, // Main Entrance (Start)
      { x: 50.9, y: 83.5 }, // Main entrance gate
      { x: 50.9, y: 78.5 }, // Inner gate junction
      { x: 57.0, y: 78.5 }, // Turn right onto southern perimeter road
      { x: 67.0, y: 78.5 }, // Walk east along road towards Lakshmikanthamal
      { x: 72.7, y: 78.5 }, // Junction directly in front of Lakshmikanthamal Block
      { x: 72.7, y: 70.6 }  // Lakshmikanthamal Block main front entrance - Arrived
    ],
    instructions: [
      { step: 1, type: 'start', text: 'Start at the Main Entrance gate (You are here).' },
      { step: 2, type: 'straight', text: 'Pass through the main entrance archway.' },
      { step: 3, type: 'turn-right', text: 'Turn sharp right onto the southern campus road heading east.' },
      { step: 4, type: 'straight', text: 'Continue straight past the front gardens along the paved roadway.' },
      { step: 5, type: 'turn-left', text: 'Turn left into the front entrance portico of Lakshmikanthamal Block.' },
      { step: 6, type: 'arrive', text: 'You have arrived at your destination: Lakshmikanthamal Block.' }
    ]
  },
  {
    id: 'vinayagar-temple',
    name: 'Vinayagar Temple',
    category: 'Campus Shrine',
    categoryKey: 'facility',
    x: 91.6,
    y: 72.5,
    description: 'Peaceful campus temple and serene spiritual landmark located near the front entrance.',
    path: [
      { x: 50.9, y: 89.2 }, // Main Entrance (Start)
      { x: 50.9, y: 83.5 }, // Main entrance gate
      { x: 50.9, y: 78.5 }, // Inner gate junction
      { x: 57.0, y: 78.5 }, // Turn right onto southern perimeter road
      { x: 67.0, y: 78.5 }, // Walk east past front lawns
      { x: 78.0, y: 78.5 }, // Roadway past Lakshmikanthamal Block
      { x: 88.0, y: 78.5 }, // Approach temple plaza
      { x: 91.6, y: 78.5 }, // Entrance concourse in front of temple gopuram
      { x: 91.6, y: 72.5 }  // Vinayagar Temple gopuram entrance - Arrived
    ],
    instructions: [
      { step: 1, type: 'start', text: 'Start at the Main Entrance gate (You are here).' },
      { step: 2, type: 'straight', text: 'Enter through the main gate and immediately turn right onto the southern road.' },
      { step: 3, type: 'straight', text: 'Continue straight east past the landscaped gardens and Lakshmikanthamal Block.' },
      { step: 4, type: 'straight', text: 'Follow the paved roadway directly towards the colorful temple gopuram.' },
      { step: 5, type: 'straight', text: 'Step onto the serene temple concourse at the southeast corner of campus.' },
      { step: 6, type: 'arrive', text: 'You have arrived at your destination: Vinayagar Temple.' }
    ]
  },
  {
    id: 'bus-parking',
    name: 'Bus Parking',
    category: 'Transport Hub',
    categoryKey: 'facility',
    x: 68.1,
    y: 16.3,
    description: 'Central fleet parking and boarding hub for RMK Engineering College buses.',
    path: [
      { x: 50.9, y: 89.2 }, // Main Entrance (Start)
      { x: 50.9, y: 83.5 }, // Main entrance gate
      { x: 50.9, y: 78.5 }, // Inner gate junction
      { x: 57.0, y: 75.0 }, // East roundabout curve
      { x: 60.5, y: 67.0 }, // East avenue
      { x: 62.5, y: 58.0 }, // East avenue past Rajendra Naidu
      { x: 67.0, y: 49.0 }, // Northeast avenue between Auditorium & academic wing
      { x: 70.5, y: 40.0 }, // Avenue past Vijayanagaralu & Ramanatha blocks
      { x: 68.5, y: 27.0 }, // Rear campus terminal junction
      { x: 68.1, y: 20.5 }, // Enter designated bus parking tarmac
      { x: 68.1, y: 16.3 }  // Bus Parking & Boarding Bay - Arrived
    ],
    instructions: [
      { step: 1, type: 'start', text: 'Start at the Main Entrance gate (You are here).' },
      { step: 2, type: 'straight', text: 'Pass through the main entrance gate into the campus.' },
      { step: 3, type: 'turn-right', text: 'Veer right along the eastern avenue curving past the front quadrangle.' },
      { step: 4, type: 'straight', text: 'Continue northeast along the wide perimeter avenue past the academic blocks.' },
      { step: 5, type: 'straight', text: 'At the rear junction, proceed straight into the central fleet parking terminal.' },
      { step: 6, type: 'arrive', text: 'You have arrived at your destination: Bus Parking & Boarding Bay.' }
    ]
  },
  {
    id: 'playground',
    name: 'Playground (Sports Ground)',
    category: 'Sports & Athletics',
    categoryKey: 'facility',
    x: 88.0,
    y: 20.7,
    description: 'Full-sized football field, athletic running tracks, and open sports complex.',
    path: [
      { x: 50.9, y: 89.2 }, // Main Entrance (Start)
      { x: 50.9, y: 83.5 }, // Main entrance gate
      { x: 50.9, y: 78.5 }, // Inner gate junction
      { x: 57.0, y: 75.0 }, // East roundabout curve
      { x: 60.5, y: 67.0 }, // East avenue
      { x: 62.5, y: 58.0 }, // East avenue past Rajendra Naidu
      { x: 67.0, y: 49.0 }, // Northeast avenue past Auditorium
      { x: 70.5, y: 40.0 }, // Avenue past Vijayanagaralu & Ramanatha blocks
      { x: 68.5, y: 27.0 }, // Rear campus terminal junction
      { x: 75.0, y: 24.0 }, // Turn right/northeast towards sports ground gate
      { x: 82.0, y: 22.0 }, // Paved entrance walkway along sports perimeter
      { x: 88.0, y: 20.7 }  // Playground (Sports Ground) gate - Arrived
    ],
    instructions: [
      { step: 1, type: 'start', text: 'Start at the Main Entrance gate (You are here).' },
      { step: 2, type: 'straight', text: 'Enter through the main gate and veer right onto the eastern campus avenue.' },
      { step: 3, type: 'straight', text: 'Walk along the main northeast roadway past Ramanatha Block.' },
      { step: 4, type: 'turn-right', text: 'At the rear junction, turn right towards the open sports field.' },
      { step: 5, type: 'straight', text: 'Follow the perimeter walkway directly through the athletic grounds gate.' },
      { step: 6, type: 'arrive', text: 'You have arrived at your destination: Playground (Sports Ground).' }
    ]
  }
];

// 2. Application State
let activeDestination = null;
let zoomScale = 1.0;
let panX = 0;
let panY = 0;
let isPanning = false;
let startPanX = 0;
let startPanY = 0;
let navigationAnimationId = null;
let isNavigating = false;

// 3. DOM Elements
const destinationSelect = document.getElementById('destinationSelect');
const routeInfoCard = document.getElementById('routeInfoCard');
const noSelectionBanner = document.getElementById('noSelectionBanner');
const destinationTitle = document.getElementById('destinationTitle');
const destinationCategory = document.getElementById('destinationCategory');
const clearSelectionBtn = document.getElementById('clearSelectionBtn');
const markersLayer = document.getElementById('markersLayer');
const mapCanvasContainer = document.getElementById('mapCanvasContainer');
const mapViewport = document.getElementById('mapViewport');
const zoomInBtn = document.getElementById('zoomInBtn');
const zoomOutBtn = document.getElementById('zoomOutBtn');
const resetViewBtn = document.getElementById('resetViewBtn');
const toastContainer = document.getElementById('toastContainer');

// Route & Instructions Elements
const routeGlowPath = document.getElementById('routeGlowPath');
const routeMainPath = document.getElementById('routeMainPath');
const routeDashPath = document.getElementById('routeDashPath');
const routeArrowsGroup = document.getElementById('routeArrowsGroup');
const routeWaypointsGroup = document.getElementById('routeWaypointsGroup');
const routeRunner = document.getElementById('routeRunner');

const routePanelCard = document.getElementById('routePanelCard');
const routePanelEmpty = document.getElementById('routePanelEmpty');
const panelCategoryBadge = document.getElementById('panelCategoryBadge');
const panelDestinationTitle = document.getElementById('panelDestinationTitle');
const panelDestinationDesc = document.getElementById('panelDestinationDesc');
const panelStatusBadge = document.getElementById('panelStatusBadge');
const startNavigationBtn = document.getElementById('startNavigationBtn');
const startNavBtnText = document.getElementById('startNavBtnText');
const stepsCountBadge = document.getElementById('stepsCountBadge');
const instructionsList = document.getElementById('instructionsList');

// Helper to get Turn SVG Icons
function getTurnIconSvg(type) {
  switch (type) {
    case 'start':
      return `<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"></circle></svg>`;
    case 'straight':
      return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>`;
    case 'turn-left':
      return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 14 4 9 9 4"></polyline><path d="M20 20v-7a4 4 0 0 0-4-4H4"></path></svg>`;
    case 'turn-right':
      return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 14 20 9 15 4"></polyline><path d="M4 20v-7a4 4 0 0 1 4-4h12"></path></svg>`;
    case 'slight-right':
      return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>`;
    case 'arrive':
      return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"></path><circle cx="12" cy="9" r="2.5"></circle></svg>`;
    default:
      return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle></svg>`;
  }
}

// 4. Initialize Destination Markers
function renderMarkers() {
  mapDestinations.forEach(dest => {
    const markerEl = document.createElement('div');
    markerEl.className = 'map-marker destination-marker';
    markerEl.id = `marker-${dest.id}`;
    markerEl.setAttribute('data-id', dest.id);
    markerEl.setAttribute('tabindex', '0');
    markerEl.setAttribute('role', 'button');
    markerEl.setAttribute('aria-label', `Destination: ${dest.name}`);

    // Set percentage positioning
    markerEl.style.left = `${dest.x}%`;
    markerEl.style.top = `${dest.y}%`;

    markerEl.innerHTML = `
      <div class="marker-pulse-ring blue-pulse"></div>
      <div class="marker-pill-label dest-pill">
        <span class="pill-title">${dest.name}</span>
      </div>
      <div class="marker-pin dest-pin">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"></path>
          <circle cx="12" cy="9" r="2.5" fill="#ffffff"></circle>
        </svg>
      </div>
    `;

    // Click / Touch selection
    markerEl.addEventListener('click', (e) => {
      e.stopPropagation();
      selectDestination(dest.id);
    });

    // Keyboard support
    markerEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectDestination(dest.id);
      }
    });

    markersLayer.appendChild(markerEl);
  });
}

// 5. Populate Quick Selector Dropdown
function populateDropdown() {
  mapDestinations.forEach(dest => {
    const option = document.createElement('option');
    option.value = dest.id;
    option.textContent = `${dest.name} (${dest.category})`;
    destinationSelect.appendChild(option);
  });

  destinationSelect.addEventListener('change', (e) => {
    const selectedId = e.target.value;
    if (selectedId) {
      selectDestination(selectedId);
    } else {
      clearSelection();
    }
  });
}

// 6. Draw Predefined Walking Route on SVG Overlay
function drawWalkingRoute(dest) {
  // Clear any existing simulation
  stopNavigationSimulation();

  if (!dest || !dest.path || dest.path.length === 0) {
    routeGlowPath.setAttribute('d', '');
    routeMainPath.setAttribute('d', '');
    routeDashPath.setAttribute('d', '');
    routeArrowsGroup.innerHTML = '';
    routeWaypointsGroup.innerHTML = '';
    routeRunner.classList.add('hidden');
    return;
  }

  // Convert percentage coordinates (0-100) to SVG viewBox units (1536 x 1024)
  const svgCoords = dest.path.map(pt => ({
    x: (pt.x / 100) * 1536,
    y: (pt.y / 100) * 1024
  }));

  // Build SVG path string "M x0 y0 L x1 y1 L x2 y2 ..."
  const pathData = svgCoords.map((pt, i) => `${i === 0 ? 'M' : 'L'} ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`).join(' ');

  routeGlowPath.setAttribute('d', pathData);
  routeMainPath.setAttribute('d', pathData);
  routeDashPath.setAttribute('d', pathData);

  // Generate directional arrows along each road segment
  let arrowsHtml = '';
  for (let i = 0; i < svgCoords.length - 1; i++) {
    const p1 = svgCoords[i];
    const p2 = svgCoords[i + 1];

    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const dist = Math.hypot(dx, dy);

    // Place directional arrows along the segment
    if (dist > 15) {
      const numArrows = Math.max(1, Math.floor(dist / 45));
      for (let k = 1; k <= numArrows; k++) {
        const frac = k / (numArrows + 1);
        const arrowX = p1.x + dx * frac;
        const arrowY = p1.y + dy * frac;
        const angle = (Math.atan2(dy, dx) * 180) / Math.PI;

        arrowsHtml += `
          <polygon 
            points="-5,-4 7,0 -5,4 -2,0" 
            transform="translate(${arrowX.toFixed(1)}, ${arrowY.toFixed(1)}) rotate(${angle.toFixed(1)})" 
            class="route-arrow-marker"
          />
        `;
      }
    }
  }
  routeArrowsGroup.innerHTML = arrowsHtml;

  // Generate intermediate waypoint dots at turns
  let waypointsHtml = '';
  for (let i = 1; i < svgCoords.length - 1; i++) {
    const pt = svgCoords[i];
    waypointsHtml += `
      <circle 
        cx="${pt.x.toFixed(1)}" 
        cy="${pt.y.toFixed(1)}" 
        r="3.5" 
        class="route-waypoint-dot" 
      />
    `;
  }
  routeWaypointsGroup.innerHTML = waypointsHtml;

  // Position route runner beacon at start (hidden until user clicks Start Navigation)
  const startPt = svgCoords[0];
  routeRunner.setAttribute('transform', `translate(${startPt.x}, ${startPt.y})`);
  routeRunner.classList.add('hidden');
}

// 7. Render Step-by-Step Walking Instructions Panel
function renderInstructions(dest) {
  if (!dest || !dest.instructions) {
    instructionsList.innerHTML = '<p class="no-instructions">No walking instructions available for this route.</p>';
    stepsCountBadge.textContent = '0 Steps';
    return;
  }

  stepsCountBadge.textContent = `${dest.instructions.length} Steps`;

  instructionsList.innerHTML = dest.instructions.map((inst, index) => {
    return `
      <div class="instruction-step ${index === 0 ? 'active' : ''}" data-step="${inst.step}">
        <div class="step-badge-col">
          <span class="step-num">${inst.step}</span>
          <div class="step-line" aria-hidden="true"></div>
        </div>
        <div class="step-icon-col" aria-hidden="true">
          ${getTurnIconSvg(inst.type)}
        </div>
        <div class="step-content">
          <p class="step-text">${inst.text}</p>
        </div>
      </div>
    `;
  }).join('');
}

// 8. Select Destination Core Function
function selectDestination(id, updateUrl = true) {
  let cleanId = (id || '').trim().toLowerCase();
  if (cleanId === 'temple') cleanId = 'vinayagar-temple';
  if (cleanId === 'gents-hostel') cleanId = 'boys-hostel';
  const match = mapDestinations.find(d => d.id === cleanId || d.id === id || d.name.toLowerCase() === cleanId);
  
  if (!match || !match.path || match.path.length === 0) {
    clearSelection();
    showToast(`Walking route for "${id}" is currently unavailable.`, 'warning');
    return;
  }

  activeDestination = match;

  // Update Status Banner UI
  destinationTitle.textContent = match.name;
  destinationCategory.textContent = match.category;

  routeInfoCard.classList.remove('hidden');
  noSelectionBanner.classList.add('hidden');

  // Update Dropdown
  destinationSelect.value = match.id;

  // Highlight Destination Marker on Map
  document.querySelectorAll('.destination-marker').forEach(m => {
    m.classList.remove('selected');
    m.setAttribute('aria-pressed', 'false');
  });

  const activeMarker = document.getElementById(`marker-${match.id}`);
  if (activeMarker) {
    activeMarker.classList.add('selected');
    activeMarker.setAttribute('aria-pressed', 'true');
  }

  // Draw Predefined Walking Route on SVG Overlay
  drawWalkingRoute(match);

  // Update Route Information Panel Beside Map
  panelDestinationTitle.textContent = match.name;
  const panelEndpointDestTitle = document.getElementById('panelEndpointDestTitle');
  if (panelEndpointDestTitle) {
    panelEndpointDestTitle.textContent = match.name;
  }
  panelCategoryBadge.textContent = match.category;
  panelDestinationDesc.textContent = match.description;
  panelStatusBadge.textContent = 'Route Ready';

  renderInstructions(match);

  routePanelCard.classList.remove('hidden');
  routePanelEmpty.classList.add('hidden');

  // Update URL Query Parameter and LocalStorage
  if (updateUrl) {
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set('destination', match.id);
    currentUrl.searchParams.set('name', match.name);
    window.history.replaceState({}, '', currentUrl.toString());

    try {
      localStorage.setItem('selectedDestination', JSON.stringify({
        id: match.id,
        name: match.name,
        category: match.category
      }));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }

  showToast(`Route displayed for ${match.name}`, 'info');
}

// 9. Clear Selection Logic
function clearSelection() {
  const panelEndpointDestTitle = document.getElementById('panelEndpointDestTitle');
  if (panelEndpointDestTitle) {
    panelEndpointDestTitle.textContent = 'Select a Building';
  }
  stopNavigationSimulation();
  activeDestination = null;

  routeInfoCard.classList.add('hidden');
  noSelectionBanner.classList.remove('hidden');

  destinationSelect.value = '';

  document.querySelectorAll('.destination-marker').forEach(m => {
    m.classList.remove('selected');
    m.setAttribute('aria-pressed', 'false');
  });

  // Clear SVG walking route
  drawWalkingRoute(null);

  // Show Empty State in Side Panel
  routePanelCard.classList.add('hidden');
  routePanelEmpty.classList.remove('hidden');

  // Remove URL query parameters
  const currentUrl = new URL(window.location.href);
  currentUrl.searchParams.delete('destination');
  currentUrl.searchParams.delete('name');
  window.history.replaceState({}, '', currentUrl.toString());

  try {
    localStorage.removeItem('selectedDestination');
  } catch (e) {
    // ignore
  }

  showToast('Selection cleared. Tap any building marker on the map to view route.', 'info');
}

// 10. Start Navigation Walking Simulation
function startNavigationSimulation() {
  if (!activeDestination || !activeDestination.path || activeDestination.path.length === 0) {
    showToast('Please select a destination first.', 'warning');
    return;
  }

  if (isNavigating) {
    stopNavigationSimulation();
    showToast('Navigation simulation paused.', 'info');
    return;
  }

  isNavigating = true;
  startNavigationBtn.classList.add('navigating');
  startNavBtnText.textContent = 'Pause Walk';
  panelStatusBadge.textContent = 'Navigating...';
  if (routeRunner) {
    routeRunner.classList.remove('hidden');
  }

  const svgCoords = activeDestination.path.map(pt => ({
    x: (pt.x / 100) * 1536,
    y: (pt.y / 100) * 1024
  }));

  const totalSegments = svgCoords.length - 1;
  const durationMs = 4500; // 4.5 seconds smooth walk
  const startTime = performance.now();

  function animate(currentTime) {
    if (!isNavigating) return;

    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / durationMs, 1.0);

    // Current segment calculation
    const currentProgIndex = progress * totalSegments;
    const segIndex = Math.min(Math.floor(currentProgIndex), totalSegments - 1);
    const segT = currentProgIndex - segIndex;

    const p1 = svgCoords[segIndex];
    const p2 = svgCoords[segIndex + 1];

    const currentX = p1.x + (p2.x - p1.x) * segT;
    const currentY = p1.y + (p2.y - p1.y) * segT;

    routeRunner.setAttribute('transform', `translate(${currentX.toFixed(1)}, ${currentY.toFixed(1)})`);

    // Highlight corresponding instruction step in sync with progress
    const stepsCount = activeDestination.instructions ? activeDestination.instructions.length : totalSegments;
    const activeStepIndex = Math.min(Math.floor(progress * stepsCount), stepsCount - 1);

    document.querySelectorAll('.instruction-step').forEach((el, idx) => {
      if (idx === activeStepIndex) {
        el.classList.add('active');
        el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        el.classList.remove('active');
      }
    });

    if (progress < 1.0) {
      navigationAnimationId = requestAnimationFrame(animate);
    } else {
      // Arrived at destination
      isNavigating = false;
      startNavigationBtn.classList.remove('navigating');
      startNavBtnText.textContent = 'Restart Walk';
      panelStatusBadge.textContent = 'Arrived';
      if (routeRunner) {
        routeRunner.classList.add('hidden');
      }

      showToast(`You have reached ${activeDestination.name}!`, 'info');
    }
  }

  navigationAnimationId = requestAnimationFrame(animate);
}

function stopNavigationSimulation() {
  if (navigationAnimationId) {
    cancelAnimationFrame(navigationAnimationId);
    navigationAnimationId = null;
  }
  isNavigating = false;
  if (startNavigationBtn) {
    startNavigationBtn.classList.remove('navigating');
    startNavBtnText.textContent = 'Start Navigation';
  }
  if (panelStatusBadge && activeDestination) {
    panelStatusBadge.textContent = 'Route Ready';
  }
  if (routeRunner) {
    routeRunner.classList.add('hidden');
  }
}

// 11. Zoom and Pan Controls
function updateMapTransform() {
  mapCanvasContainer.style.transform = `translate(${panX}px, ${panY}px) scale(${zoomScale})`;
  mapCanvasContainer.style.transformOrigin = 'center center';
}

function initZoomControls() {
  zoomInBtn.addEventListener('click', () => {
    if (zoomScale < 2.5) {
      zoomScale = parseFloat((zoomScale + 0.25).toFixed(2));
      updateMapTransform();
    }
  });

  zoomOutBtn.addEventListener('click', () => {
    if (zoomScale > 1.0) {
      zoomScale = parseFloat((zoomScale - 0.25).toFixed(2));
      if (zoomScale <= 1.0) {
        zoomScale = 1.0;
        panX = 0;
        panY = 0;
      }
      updateMapTransform();
    }
  });

  resetViewBtn.addEventListener('click', () => {
    zoomScale = 1.0;
    panX = 0;
    panY = 0;
    updateMapTransform();
    showToast('Map view reset to default', 'info');
  });

  // Pan interaction when zoomed in
  mapViewport.addEventListener('mousedown', (e) => {
    if (zoomScale > 1.0 && (
      e.target === mapCanvasContainer || 
      e.target === mapViewport ||
      e.target.classList.contains('campus-map-image') ||
      e.target.id === 'mapSvgOverlay' ||
      e.target.id === 'markersLayer'
    )) {
      isPanning = true;
      startPanX = e.clientX - panX;
      startPanY = e.clientY - panY;
      mapViewport.style.cursor = 'grabbing';
    }
  });

  window.addEventListener('mousemove', (e) => {
    if (!isPanning) return;
    panX = (e.clientX - startPanX);
    panY = (e.clientY - startPanY);
    updateMapTransform();
  });

  window.addEventListener('mouseup', () => {
    if (isPanning) {
      isPanning = false;
      mapViewport.style.cursor = '';
    }
  });
}

// 12. Toast Notification Utility
function showToast(message, type = 'info') {
  if (!toastContainer) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<span>${message}</span>`;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-10px)';
    toast.style.transition = 'all 0.25s ease';
    setTimeout(() => {
      if (toastContainer.contains(toast)) {
        toastContainer.removeChild(toast);
      }
    }, 250);
  }, 2200);
}

// 13. Read Initial Destination from URL or LocalStorage
function resolveInitialDestination() {
  const params = new URLSearchParams(window.location.search);
  const destFromUrl = params.get('destination');
  const nameFromUrl = params.get('name');

  if (destFromUrl) {
    selectDestination(destFromUrl, false);
    return;
  }

  if (nameFromUrl) {
    selectDestination(nameFromUrl, false);
    return;
  }

  // Fallback to localStorage
  try {
    const saved = localStorage.getItem('selectedDestination');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && parsed.id) {
        selectDestination(parsed.id, false);
        return;
      }
    }
  } catch (err) {
    console.warn('LocalStorage read error:', err);
  }

  // If no destination is selected initially
  clearSelection();
}

// 14. Page Initialization
document.addEventListener('DOMContentLoaded', () => {
  renderMarkers();
  populateDropdown();
  initZoomControls();

  // Clear button click listener
  clearSelectionBtn.addEventListener('click', clearSelection);

  // Back to Map button listener
  const backToMapBtn = document.getElementById('backToMapBtn');
  if (backToMapBtn) {
    backToMapBtn.addEventListener('click', () => {
      clearSelection();
      zoomScale = 1.0;
      panX = 0;
      panY = 0;
      updateMapTransform();
      showToast('Returned to full campus map view', 'info');
    });
  }

  // Start Navigation Button listener
  startNavigationBtn.addEventListener('click', startNavigationSimulation);

  // Entrance start marker click interaction
  const startMarker = document.getElementById('startMarker');
  if (startMarker) {
    startMarker.addEventListener('click', () => {
      showToast('You are here: Main Entrance Gate (Starting Point)', 'info');
    });
  }

  // Resolve passed destination from URL
  resolveInitialDestination();
});

// Explicitly expose functions globally for chatbot.js integration
window.selectDestination = selectDestination;
window.showToast = showToast;

