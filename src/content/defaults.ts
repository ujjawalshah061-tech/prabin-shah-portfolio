// The site's built-in content. It is shown instantly, used as the fallback for anything the CMS
// leaves empty, and used by scripts/seed.ts to fill the CMS the first time.
// Keep this file free of imports other than types (the seed script runs it under plain Node).
import type { Content } from "./types.ts";

export const defaults: Content = {
  settings: {
    firstName: "Prabin",
    lastName: "Shah",
    heroGreeting: "Hello, I'm",
    availability: "Available for hydropower & structural projects",
    heroRoles: ["Hydropower Designer", "Structural Drafter", "Founder & CEO"],
    heroDescription:
      "Civil Engineering professional & researcher from Kathmandu University, specializing in hydropower design, structural drafting and sustainable infrastructure — based in Lalitpur, Nepal.",
    heroStats: [
      { value: 5, decimals: 0, suffix: "+", label: "Hydropower projects" },
      { value: 4, decimals: 0, suffix: "", label: "Industry roles" },
      { value: 40, decimals: 0, suffix: "", label: "MW site exposure" },
      { value: 6, decimals: 0, suffix: "+", label: "Leadership posts" },
    ],
    marquee: [
      "Civil 3D",
      "AutoCAD",
      "HEC-RAS",
      "SAP 2000",
      "SW_DTM",
      "SW_Road",
      "Primavera",
      "Hydropower Design",
      "BOQ Estimation",
    ],
    heroCards: [
      { title: "CEO & Founder", subtitle: "Code & Concrete Construction" },
      { title: "M.Sc. Construction Mgmt", subtitle: "Nepal Engineering College" },
    ],
    locationPin: "Lalitpur, NP",
    toolkitCaption: "Drafting precision, field discipline.",
    email: "prabinshah919@gmail.com",
    phone: "+9779812186293",
    phoneDisplay: "+977 981-2186293",
    whatsapp: "9779812186293",
    worksAt: "Hydro Tunneling and Research Pvt. Ltd. · Lalitpur, Nepal",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113060.19830589574!2d85.25552984570075!3d27.67138243162791!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb198a307baabf%3A0xb5137c1bf18db1ea!2sLalitpur!5e0!3m2!1sen!2snp!4v1700000000000!5m2!1sen!2snp",
    mapLink: "https://maps.app.goo.gl/wyBpvtVPm2QKJYzZ8?g_st=aw",
    linkedin: "https://www.linkedin.com/in/prabin-shah-59247b2b5/",
    facebook: "https://www.facebook.com/prabinshah123",
    instagram: "https://www.instagram.com/pprabinshah/",
    footerHeadline: "Have a project in mind?",
    footerHighlight: "Let's engineer something durable.",
    footerText:
      "Specialized in underground rock mechanics, hydraulic design, and civil infrastructure. Based in Lalitpur, Nepal — open for worldwide consultancy.",
    footerRole: "Civil & Hydropower Engineer",
    footerLocation: "Lalitpur, Nepal",
    firmName: "Hydro Tunneling & Research",
    firmUrl: "https://htr.com.np/",
  },

  about: {
    lead: "Civil & Hydropower Engineer, Researcher & Founder.",
    leadHighlight: "Researcher",
    paragraphs: [
      "I am a results-driven Civil Engineer with hands-on expertise in hydropower design, underground rock mechanics, structural drafting, and construction monitoring. Currently pursuing an M.Sc. in Construction Management at Nepal Engineering College, I hold a B.E. in Civil Engineering from Kathmandu University.",
      "My professional experience bridges academic rock mechanics research with field execution. At Kathmandu University’s Rock Mechanics Lab, I contributed to experimental trials on the KU Research Tunnel. Concurrently, with roles at Hydro Tunneling and Research Pvt. Ltd. and Green Engineering and Solution, I handle hydraulic profile modeling, structural AutoCAD/Civil 3D drawings, and geotechnical vetting.",
      "As the CEO & Founder of Code & Concrete Construction Pvt. Ltd., I am committed to delivering durable, resilient civil infrastructure across Nepal through precise digital drafting and modern project management protocols.",
    ],
    competencies: [
      "Hydropower Hydraulic Design",
      "Rock Mechanics & UTM Testing",
      "AutoCAD & Civil 3D Drafting",
      "Residential Building Construction",
      "BOQ & Cost Estimation",
      "Construction Site Monitoring",
    ],
    photoCaption: "Design · Build · Endure",
  },

  education: [
    {
      degree: "M.Sc. in Construction Management",
      institution: "Nepal Engineering College",
      period: "March 2026 - Present",
      status: "Currently Pursuing",
      focus: "Construction monitoring, project management, contract estimation & resource optimization.",
    },
    {
      degree: "B.E. in Civil Engineering",
      institution: "Kathmandu University (KU)",
      period: "December 2020 - July 2025",
      focus: "Underground rock mechanics, hydropower engineering, hydraulic structures & surveying.",
    },
    {
      degree: "+2 Science",
      institution: "Uniglobe Secondary School",
      period: "2017 - 2019",
      focus: "Physics, Chemistry, and Advanced Mathematics.",
    },
    {
      degree: "Secondary Education Examination (SEE)",
      institution: "Nightingale International Secondary School",
      period: "Completed 2017",
      focus: "Foundational science, mathematics, and technical coursework.",
    },
  ],

  skills: [
    {
      title: "Engineering & Design Software",
      subtitle: "Hydraulic, Highway & Structural CAD",
      accent: "amber",
      skills: ["Civil 3D", "AutoCAD", "SW_DTM", "SW_Road", "SAP 2000", "HEC-RAS"],
    },
    {
      title: "Computation & Project Management",
      subtitle: "BOQ, Quantity Estimation & Technical Reports",
      accent: "cyan",
      skills: ["Primavera", "Microsoft Excel (Advanced)", "Microsoft Word", "Microsoft PowerPoint"],
    },
    {
      title: "Languages Spoken",
      subtitle: "Professional & Regional Communication",
      accent: "violet",
      skills: ["English (Fluent)", "Nepali (Native)", "Maithili (Native)", "Hindi (Fluent)"],
    },
  ],

  milestones: [
    {
      tag: "ACADEMIC CONVOCATION",
      title: "B.E. Civil Engineering Conferred",
      caption: "Receiving Bachelor's degree from Kathmandu University School of Engineering.",
      imageFile: "convocation.jpg",
      focus: "center 30%",
    },
    {
      tag: "CIVIL ENGINEERING LEADERSHIP",
      title: "KU Civil Club Keynote & Address",
      caption:
        "Addressing students and faculty at Kathmandu University Civil Engineering Club (KUCEC) official assembly.",
      imageFile: "ku-speech.jpg",
      focus: "center 25%",
    },
    {
      tag: "RESEARCH & INSTITUTIONAL ADDRESS",
      title: "Academic Colloquium Presentation",
      caption: "Delivering engineering insights and project presentations at the Kathmandu University main auditorium.",
      imageFile: "ku-podium.jpg",
      focus: "center 20%",
    },
    {
      tag: "PROFESSIONAL PROFILE",
      title: "KU School of Engineering Premise",
      caption:
        "Academic journey representation at Kathmandu University, transitioning from student researcher to industry founder.",
      imageFile: "campus-portrait.jpg",
      focus: "center 40%",
    },
  ],

  gallery: [
    {
      tag: "UNDERGROUND STRUCTURES",
      title: "Tunnel Modeling",
      caption: "Tunnel geometry and numerical modeling for underground hydropower waterways.",
      imageFile: "survey.jpg",
      focus: "center center",
    },
    {
      tag: "ROCK MECHANICS LAB",
      title: "Core Specimen Extraction for UTM",
      caption:
        "Operating core drilling apparatus for cylindrical rock specimen sampling to conduct uniaxial compressive strength (UCS) trials.",
      imageFile: "rock-drilling.jpg",
      focus: "center 30%",
    },
    {
      tag: "GEOTECHNICAL TESTING",
      title: "Soil Consistency & Material Trials",
      caption: "Analyzing soil index properties, compaction parameters, and aggregate mix consistency in the laboratory.",
      imageFile: "soil-lab.jpg",
      focus: "center 20%",
    },
    {
      tag: "STRUCTURAL MODELING",
      title: "Rebar Cage Detailing & Fabrication",
      caption:
        "Hands-on assembly of column-beam reinforcement cage models and structural geometry during semester project work.",
      imageFile: "structural-rebar.jpg",
      focus: "center 75%",
    },
  ],

  work: [
    {
      badge: "2024 - Present",
      category: "HYDROPOWER & TUNNELING",
      company: "Hydro Tunneling & Research",
      role: "Hydropower Design Assistant",
      description: "Assisting in hydraulic profile design, technical drafting, tunnel geometry, and engineering coordination.",
      isCurrent: true,
      link: "https://htr.com.np/",
      icon: "building",
      thumbFile: "htr-logo.png",
      thumbIsLogo: true,
    },
    {
      badge: "Freelance",
      category: "FREELANCE DRAFTING",
      company: "Green Engineering & Solution",
      role: "Civil & Structural Drafting",
      description: "Delivered freelance structural CAD drawings, civil component drafting, and BOQ layout vetting.",
      icon: "compass",
      thumbFile: "greensolutions.jpg",
      thumbIsLogo: true,
    },
    {
      badge: "2023 - 2024",
      category: "SITE EXECUTION",
      company: "Rahughat Hydroelectric (40MW)",
      role: "Hydroelectric Project Intern",
      description: "Field exposure in construction monitoring, civil structural supervision, and site progress reporting.",
      icon: "hardhat",
      thumbFile: "rahughat-logo.png",
      thumbIsLogo: true,
    },
    {
      badge: "2024",
      category: "RESEARCH LAB",
      company: "Kathmandu University",
      role: "Research Intern",
      description: "Conducted rock mechanics laboratory trials, UTM testing, and research tunnel geotechnical analysis.",
      icon: "flask",
      thumbFile: "ku-building.jpg",
    },
  ],

  leadership: [
    {
      period: "2024 / 2025",
      role: "President",
      entity: "Kathmandu University Civil Engineering Club (KUCEC)",
      domain: "Executive Student Body & Technical Conclaves",
    },
    {
      period: "2023 / 2024",
      role: "Coordinator",
      entity: "Kathmandu University Youth Red Cross Circle (KUYRCC)",
      domain: "Institutional Blood Donation & Humanitarian Drives",
    },
    {
      period: "2024",
      role: "Volunteer",
      entity: "Kathmandu University",
      domain: "Volunteered in Roshi River Flood areas for donation, and data collection",
    },
    {
      period: "2024",
      role: "Vice Coordinator",
      entity: "Sankalpa’24 National Engineering Event",
      domain: "National Symposia & Inter-University Technical Logistics",
    },
    {
      period: "2022 / 2023",
      role: "Executive Member",
      entity: "Kathmandu University Civil Engineering Club (KUCEC)",
      domain: "Student Workshops & Technical Field Delegations",
    },
    {
      period: "2023 / 2024",
      role: "Treasurer",
      entity: "Kathmandu University Indoor Games Club (KUIGC)",
      domain: "Budget Allocation, Fiscal Audits & Athletic Operations",
    },
    {
      period: "Technical Volunteer",
      role: "International Delegate Support",
      entity: "International Conference Surung-I",
      domain: "Tunnels & Underground Structures Symposia",
    },
  ],

  featured: {
    title: "Budhigandaki Hydropower Project",
    capacity: "341 MW",
    role: "Detailed design & drafting",
    desc: "Nepal's flagship national hydropower scheme and one of the most technically complex underground infrastructure programmes in the country.",
    specs: [
      { value: "101 × 17 × 35 m", label: "Underground powerhouse (approx.)" },
      { value: "5.95 km", label: "Horseshoe headrace tunnel" },
      { value: "6.8 m", label: "Tunnel diameter" },
      { value: "3D FEM", label: "Numerical modelling" },
    ],
    tools: ["3D FEM Modelling", "Rock Support Design", "Geotechnical Interpretation", "AutoCAD", "Civil 3D"],
    imageFile: "sahas-feat.jpg",
  },

  projects: [
    {
      category: "Professional",
      title: "Upper Dudhkhola Hydropower Project",
      desc: "Detailed design and drafting support for the waterway system — hydraulic profile layouts, tunnel geometry and construction drawings coordinated with the design team.",
      tools: ["Civil 3D", "AutoCAD", "Hydraulic Profiling"],
    },
    {
      category: "Professional",
      title: "Dudhkoshi-6 Hydropower Project",
      desc: "Design-stage engineering support: hydraulic layout, tunnel alignment studies and geotechnical drawing preparation for underground components.",
      tools: ["Civil 3D", "AutoCAD", "Tunnel Geometry"],
      capacity: "270 MW",
    },
    {
      category: "Professional",
      title: "Upper Maiwa Khola Hydropower Project",
      desc: "Drafting and hydraulic design coordination covering headworks and waterway layouts and the associated drawing sets.",
      tools: ["AutoCAD", "Civil 3D", "HEC-RAS"],
      capacity: "17.85 MW",
    },
    {
      category: "Professional",
      title: "Paramolung Hydropower Project",
      desc: "Technical drafting and design support, preparing layout drawings and waterway details through the design stage.",
      tools: ["AutoCAD", "Civil 3D", "Technical Drafting"],
      capacity: "9 MW",
    },
    {
      category: "Hydropower",
      title: "Potential Study of Hewa-A Small Hydropower Project",
      desc: "Final-year capstone: feasibility study covering river discharge estimation, hydraulic headrace alignment, intake design and energy yield calculation at Kathmandu University.",
      tools: ["Civil 3D", "HEC-RAS", "SW_DTM", "AutoCAD"],
    },
    {
      category: "Hydropower",
      title: "RUM Project of Pharping Hydropower to Convert into Pump Storage Hydropower",
      desc: "Rehabilitation, Upgradation and Modernization investigation modeling reservoir circulation loops and peak-energy storage for Nepal's historic first plant.",
      tools: ["Hydraulic Modeling", "AutoCAD", "Fluid Mechanics"],
    },
    {
      category: "Physical Modeling",
      title: "Physical Model Study of Kalanki Underpass",
      desc: "Scaled structural and geotechnical prototype evaluating retaining wall earth pressure, approach slopes and urban drainage underpass behavior.",
      tools: ["Physical Prototyping", "Soil Mechanics", "Structural Modeling"],
    },
    {
      category: "Physical Modeling",
      title: "Physical Model Study of Isolated and Combined Footings",
      desc: "Laboratory modeling analyzing stress distribution bulbs, differential settlement and load-bearing performance against Terzaghi theory.",
      tools: ["Geotechnical Lab", "Static Load Rig", "Dial Gauges"],
    },
  ],
};
