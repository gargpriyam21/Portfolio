// All site content lives in this file.
// Edit text, skills and projects here; components read from it.
// Leave a field as '' (or an array as []) and its element or section will not render.
//
// Images are added by file name, never by editing code:
//   logos  -> src/assets/logos/<logo>.png   (see the README there)
//   photos -> src/assets/photos/<photo>.jpg (see the README there)
// A `photo` or `logo` value below is that file's name without its extension.

export const profile = {
  // ---- Identity ----------------------------------------------------------
  name: 'Priyam Garg',
  role: 'Software Development Engineer',
  team: 'Agentic AI at AWS',
  location: 'Seattle, WA',
  experience: '4+ years', // industry experience, shown in the hero intro and the facts list
  photo: 'portrait', // src/assets/photos/portrait.jpg; until it exists the hero shows your initials
  accent: { dark: '#ff7a59', light: '#a84f00' }, // the one accent colour, per theme

  // ---- Hero --------------------------------------------------------------
  headline: 'I make AI agents smarter and more dependable.',
  intro:
    'Software engineer with 4+ years of industry experience. I build the engineering around large language models: prompting, retrieval, verification and recovery, so agents return complete, correct work at scale and at a sensible cost.',
  availability: '', // e.g. 'Open to new roles'. Empty = hidden.
  resume: '', // e.g. 'resume.pdf' placed in /public. Shows download buttons and a palette action. Empty = hidden.

  // The replayable agent run in the hero. Simplified, with made-up data.
  trace: {
    run: 'run 0427',
    agents: ['agent 1', 'agent 2', 'agent 3'],
    question: 'Which entities are linked to rule 1?',
    answer: 'Entity A and entity B.',
    answerNote: 'Answered from the graph in one model call.',
    result: 'Complete. Fewer model calls, no lost work.',
    note: 'Simplified replay with made-up data.',
  },

  // ---- Links -------------------------------------------------------------
  links: {
    github: 'https://github.com/gargpriyam21',
    linkedin: 'https://www.linkedin.com/in/priyamgarg21/',
    email: '', // Empty = no email shown anywhere.
  },

  // ---- Highlights -----------------------------------------------------------
  // Each one is drawn as a small diagram of the change, not just a number.
  highlights: {
    lead: 'Outcomes from my agent work at AWS, and the path that led there.',
    speed: {
      title: 'Hours to minutes',
      body: 'Very large documentation runs that used to take hours now finish in minutes, after a redesign of the generation workflow.',
      before: 'Hours',
      after: 'Minutes',
    },
    calls: {
      title: '75% fewer LLM calls',
      body: 'Four model calls per file became one structured call with a fallback, on a step that runs for every file.',
      before: 4,
      after: 1,
    },
    recovery: {
      title: 'No lost work',
      body: 'Jobs that run for days now resume from their last checkpoint after a failure instead of starting over.',
    },
    growth: {
      title: '4+ years in industry',
      steps: ['Technology Analyst', 'Software Engineer Intern', 'Software Engineer', 'Software Development Engineer'],
    },
    research: {
      title: '4 papers',
      body: 'Peer-reviewed work in Elsevier and Springer venues.',
    },
  },

  // ---- About -------------------------------------------------------------
  // The lead brightens word by word as the visitor scrolls past it.
  aboutLead:
    'I build production AI agents at AWS, and my work is the part that makes them dependable: the right context, structured output, checks on every result, and a way to recover when something fails.',
  about: [
    'I started in data engineering, building pipelines over hundred-million-record datasets, then moved through backend development in Java and Spring to agentic AI. What interests me most is the gap between a model that can do something once and a system that does it every time. Closing that gap is engineering work, and it is the work I enjoy most.',
    'Before industry I did research in deep learning and nature-inspired optimization, which led to four published papers.',
  ],
  facts: [
    { label: 'Role', value: 'Software Development Engineer' },
    { label: 'Team', value: 'Agentic AI, AWS' },
    { label: 'Based in', value: 'Seattle, WA' },
    { label: 'Experience', value: '4+ years in industry' },
    { label: 'Focus', value: 'AI agents, LLM reliability, speed and cost' },
    { label: 'Education', value: 'M.S. Computer Science, NC State' },
  ],

  // ---- Work at AWS -----------------------------------------------------------
  work: {
    company: 'Amazon Web Services',
    logo: 'aws',
    mark: 'AWS',
    role: 'Software Development Engineer',
    dates: 'Since November 2024',
    location: 'Seattle, WA',
    summary:
      'I work in AWS Agentic AI, building production AI agents that analyze very large codebases and turn them into documentation, business rules and data lineage. My focus is the engineering that keeps those agents accurate, fast and dependable at enterprise scale.',
    // Diagram under the summary. Remove this block to hide it.
    diagram: {
      input: { label: 'Input', icon: 'folder', title: 'Large codebase', detail: 'Millions of lines, little documentation' },
      agents: { label: 'Processing', title: 'AI agents', steps: ['Plan', 'Retrieve', 'Generate', 'Verify', 'Checkpoint'] },
      outputs: {
        label: 'Output',
        items: [
          { icon: 'doc', title: 'Documentation' },
          { icon: 'rules', title: 'Business rules' },
          { icon: 'branch', title: 'Data lineage' },
        ],
      },
      caption: 'A simplified view of the kind of agent system I work on.',
    },
    highlights: [
      {
        title: 'Faster agent pipelines',
        body: 'Redesigned a generation workflow so very large inputs finish in minutes instead of hours.',
      },
      {
        title: 'Lower LLM cost',
        body: 'Consolidated prompts into fewer structured calls, cutting model calls by up to 75% on one step.',
      },
      {
        title: 'Output you can trust',
        body: 'Added handling for truncated and malformed model responses, so every run returns complete, well-formed results.',
      },
      {
        title: 'Resilient long-running jobs',
        body: 'Designed checkpoint and restore so multi-day agent jobs pick up where they stopped after a failure.',
      },
      {
        title: 'Retrieval and knowledge graphs',
        body: 'Built knowledge-base retrieval for an agent and scaled a knowledge graph builder to much larger inputs.',
      },
      {
        title: 'Operational excellence',
        body: 'Regularly own production operations: triaging live issues, finding root causes and shipping lasting fixes.',
      },
    ],
    tech: ['Python', 'Java', 'Claude on Amazon Bedrock', 'Prompt engineering', 'Retrieval', 'Knowledge graphs', 'AWS CDK', 'Amazon S3'],
  },

  // ---- Career ----------------------------------------------------------------
  // One card: pick a stop on the left to see its details. Newest first.
  // `outcome` is the one line a recruiter reads first; `photo` is an optional
  // picture for that stop (src/assets/photos/<photo>.jpg).
  career: [
    {
      id: 'aws',
      org: 'Amazon Web Services',
      logo: 'aws',
      mark: 'AWS',
      years: '2024 to now',
      dates: 'Nov 2024 to present',
      place: 'Seattle, WA',
      photo: 'work-aws',
      story: 'From a managed service’s control plane to agentic AI.',
      roles: [
        {
          title: 'Software Development Engineer',
          team: 'Agentic AI',
          period: 'Now',
          outcome: 'Building the AI agents that turn very large codebases into documentation, business rules and data lineage.',
          points: [
            'Made long-running agent pipelines faster, cheaper and able to recover from failure.',
            'Own production operations for the service on a regular basis.',
          ],
          more: { label: 'See the details in Work', href: '#work' },
        },
        {
          title: 'Software Development Engineer',
          team: 'Managed service runtime',
          period: 'Earlier',
          outcome: 'Hardened the control plane and runtime of a managed AWS service.',
          points: [
            'Fixed environment-variable resolution with a topological sort, including cycle detection.',
            'Hardened configuration import with validation and clear error messages.',
            'Wrote API design documents for dataset results and configurable startup options.',
          ],
        },
      ],
    },
    {
      id: 'deloitte',
      org: 'Deloitte',
      logo: 'deloitte',
      mark: 'D',
      years: '2023 to 2024',
      dates: 'Jul 2023 to Nov 2024',
      place: 'Remote (Atlanta, GA office)',
      photo: 'work-deloitte',
      roles: [
        {
          title: 'Software Engineer',
          outcome: 'Cut query times by 61% and built secure sign-in for a platform with 400,000+ users.',
          points: [
            'Improved PostgreSQL performance by 47% and cut query response times by 61% with partial and multi-column indexes.',
            'Built a token-based credentialing microservice for Georgia Gateway with Spring Boot and JWT, supporting onboarding of 400,000+ users.',
            'Designed and built Power BI dashboards that improved issue resolution for clients by 35%.',
          ],
        },
      ],
    },
    {
      id: 'ncsu',
      org: 'North Carolina State University',
      logo: 'ncsu',
      mark: 'NC',
      years: '2022 to 2023',
      dates: 'Aug 2022 to May 2023',
      place: 'Raleigh, NC',
      photo: 'work-ncsu',
      roles: [
        {
          title: 'Research Assistant',
          team: 'Expertiza',
          outcome: 'Led role-based reviewing in an open-source peer-assessment system with 50+ contributors.',
          points: [
            'Led the move to role-based reviewing in Expertiza using Ruby on Rails and JavaScript.',
            'Refactored the codebase and raised test coverage by 25%.',
          ],
        },
      ],
    },
    {
      id: 'zscaler',
      org: 'Zscaler',
      logo: 'zscaler',
      mark: 'Z',
      years: '2022',
      dates: 'May 2022 to Aug 2022',
      place: 'San Jose, CA',
      photo: 'work-zscaler',
      roles: [
        {
          title: 'Software Engineer Intern',
          outcome: 'Raised a zero-trust access product’s availability by 25% with request throttling.',
          points: [
            'Built a request-throttling mechanism in Java and Spring that improved Zscaler Private Access availability by 25%.',
            'Moved backend APIs from asynchronous REST to GraphQL, and wrote end-to-end tests with TestNG, JUnit and Mockito that cut testing time by 90%.',
          ],
        },
      ],
    },
    {
      id: 'zs',
      org: 'ZS',
      logo: 'zs',
      mark: 'ZS',
      years: '2020 to 2021',
      dates: 'Jul 2020 to Aug 2021',
      place: 'Gurugram, India',
      photo: 'work-zs',
      roles: [
        {
          title: 'Technology Analyst',
          outcome: 'Sped up big-data pipelines over 100M+ records by 40%.',
          points: [
            'Raised processing efficiency by 40% on data models with 100M+ records using Spark, Hadoop and Hive.',
            'Built data warehouses on AWS and Azure that sped up extraction, transformation and visualization by 30%.',
            'Designed Tableau dashboards for a US biopharmaceutical client covering 23 countries.',
          ],
        },
      ],
    },
  ],

  // ---- Career route ------------------------------------------------------------
  // The stops drawn on the Career line, oldest first. `lane` is 'study' or 'work';
  // dates are year-month and `to: null` means ongoing. `ref` points at the
  // career stop (by id) or education entry (by index) shown when it is chosen.
  route: [
    { id: 'btech', lane: 'study', from: '2016-08', to: '2020-06', label: 'B.Tech, GGSIPU', short: 'B.Tech', ref: { education: 1 } },
    { id: 'zs', lane: 'work', from: '2020-07', to: '2021-08', label: 'ZS', short: 'ZS', ref: { career: 'zs' } },
    { id: 'ms', lane: 'study', from: '2021-08', to: '2023-05', label: 'M.S., NC State', short: 'M.S.', ref: { education: 0 } },
    { id: 'zscaler', lane: 'work', from: '2022-05', to: '2022-08', label: 'Zscaler', short: 'Zscaler', ref: { career: 'zscaler' } },
    { id: 'ncsu', lane: 'work', from: '2022-08', to: '2023-05', label: 'NC State research', short: 'RA', ref: { career: 'ncsu' } },
    { id: 'deloitte', lane: 'work', from: '2023-07', to: '2024-11', label: 'Deloitte', short: 'Deloitte', ref: { career: 'deloitte' } },
    { id: 'aws', lane: 'work', from: '2024-11', to: null, label: 'AWS', short: 'AWS', ref: { career: 'aws' } },
  ],

  // ---- Education ---------------------------------------------------------------
  education: [
    {
      school: 'North Carolina State University',
      degree: 'Master of Computer Science',
      dates: '2021 to 2023',
      location: 'Raleigh, NC',
      grade: '4.00',
      gradeLabel: 'GPA, out of 4.00',
      courses: ['Design and Analysis of Algorithms', 'Software Engineering', 'Internet Protocols', 'Database Management Systems', 'Internet of Things', 'Neural Networks'],
      logo: 'ncsu',
      mark: 'NC',
      photo: 'edu-ncsu',
    },
    {
      school: 'Guru Gobind Singh Indraprastha University',
      degree: 'B.Tech, Computer Science and Engineering',
      dates: '2016 to 2020',
      location: 'New Delhi, India',
      grade: '8.43',
      gradeLabel: 'CGPA, out of 10',
      courses: ['Data Structures', 'Operating Systems', 'Computer Networks', 'Database Systems', 'Software Engineering'],
      logo: 'ggsipu',
      mark: 'IPU',
    },
    {
      school: 'Ryan International School',
      degree: 'Schooling, CBSE',
      dates: 'Completed 2016',
      location: 'Rohini, New Delhi',
      grade: '96%',
      gradeLabel: 'CBSE boards, Class XII',
      note: 'Class X: 9 CGPA',
      stream: 'Science (non-medical) in Classes XI and XII',
      coursesLabel: 'Class XI and XII',
      courses: ['Science stream (non-medical)', 'Physics', 'Chemistry', 'Mathematics'],
      logo: 'ryan',
      mark: 'RIS',
    },
  ],

  // ---- Skills --------------------------------------------------------------
  skills: [
    { group: 'AI and agents', items: ['LLM prompt engineering', 'Claude on Amazon Bedrock', 'Bedrock Knowledge Bases', 'Retrieval', 'Knowledge graphs', 'Agent evaluation'] },
    { group: 'Languages', items: ['Python', 'Java', 'TypeScript', 'JavaScript', 'SQL', 'Ruby', 'C/C++', 'Kotlin'] },
    { group: 'Cloud and infrastructure', items: ['AWS', 'Amazon S3', 'AWS Step Functions', 'Amazon DynamoDB', 'Amazon CloudWatch', 'AWS CDK', 'Docker', 'Kubernetes', 'Azure'] },
    { group: 'Backend and data', items: ['Spring Boot', 'REST APIs', 'GraphQL', 'Spark', 'Kafka', 'Hadoop', 'Hive', 'PostgreSQL', 'MySQL', 'MongoDB'] },
    { group: 'Tools', items: ['Git', 'Gradle', 'Maven', 'JUnit', 'Jenkins', 'Tableau', 'Power BI'] },
  ],

  // ---- Projects ------------------------------------------------------------
  // `category` and `year` show under the title; `photo` is an optional thumbnail.
  projects: [
    {
      name: 'IoT Smart Dog Collar',
      category: 'IoT',
      year: '2022',
      photo: 'project-dog-collar',
      problem: 'Pet owners cannot watch a pet all day, but want to know when it gets into things it should not.',
      description:
        'A collar and a tagged object each carry a Raspberry Pi with a motion sensor. Bluetooth beacons triangulate the dog’s position, and the system flags when the dog and the object move together. Built as a team project at NC State.',
      tech: ['Python', 'Raspberry Pi', 'MQTT', 'BLE', 'Node.js'],
      repo: 'https://github.com/gargpriyam21/IoT_Smart_Dog_Collar',
      demo: 'https://www.youtube.com/watch?v=L9ZbTyrODcE',
      demoLabel: 'Demo video',
    },
    {
      name: 'Client-Server File Transfer',
      category: 'Networking',
      year: '2021',
      photo: 'project-file-transfer',
      problem: 'Reliable file transfer over an unreliable link depends on how lost packets are detected and resent.',
      description:
        'An FTP-style server and client in Python with three retransmission schemes: Go-Back-N, Selective Repeat and Stop-and-Wait. A multithreaded model buffers and manages packets in parallel, which sped up transfer by 50%.',
      tech: ['Python', 'Socket programming', 'Multithreading'],
      repo: 'https://github.com/gargpriyam21/Client-Server-File-Transfer-Application',
      demo: '',
    },
    {
      name: 'Chicken Swarm Optimisation',
      category: 'ML research',
      year: '2019',
      photo: 'project-chicken-swarm',
      problem: 'Medical datasets carry many features, and most of them add noise to a prediction.',
      description:
        'A nature-inspired evolutionary algorithm for feature selection, modelled on the hierarchy of a chicken swarm. Applied to cervical cancer prediction and published with Springer.',
      tech: ['Python', 'Jupyter', 'Machine learning'],
      repo: 'https://github.com/gargpriyam21/Chicken-Swarm-Optimisation',
      demo: '',
    },
    {
      name: 'Door Movement Detection',
      category: 'IoT and ML',
      year: '2022',
      photo: 'project-door-detection',
      problem: 'Detecting whether a door opened or closed from raw motion readings alone.',
      description:
        'A motion sensor on a door streams readings from a Raspberry Pi over MQTT. A classifier hosted on IBM Cloud labels each movement as open or close and publishes the result back to subscribers.',
      tech: ['Python', 'MQTT', 'IBM Cloud', 'SVM'],
      repo: 'https://github.com/gargpriyam21/Door_Movement_Detection',
      demo: '',
    },
    {
      name: 'MyPack-Lite',
      category: 'Full stack',
      year: '2022',
      photo: 'project-mypack-lite',
      problem: 'Course enrollment needs different rules for students, instructors and administrators.',
      description:
        'A full-stack course enrollment application with role-based access, course management and a waitlist system, modelled on NC State’s enrollment portal.',
      tech: ['Ruby on Rails', 'SQLite', 'HTML'],
      repo: 'https://github.com/gargpriyam21/MyPack-Lite',
      demo: '',
    },
    {
      name: 'Brain Tumour Segmentation',
      category: 'Deep learning',
      year: '2018',
      photo: 'project-brain-tumour',
      problem: 'Marking tumour regions on MRI scans by hand is slow and varies between readers.',
      description:
        'A deep learning approach that segments brain tumours from MRI images with a U-Net based fully convolutional network. The work behind my first published paper.',
      tech: ['Python', 'Keras', 'U-Net'],
      repo: 'https://github.com/gargpriyam21/Brain-Tumour-Segmentation',
      demo: '',
    },
  ],

  // ---- Publications --------------------------------------------------------
  publications: [
    {
      title: 'Lung Tuberculosis Detection Using Anti-Aliased Convolutional Networks',
      venue: 'Procedia Computer Science, Elsevier',
      year: '2020',
      url: 'https://www.sciencedirect.com/science/article/pii/S1877050920315374',
    },
    {
      title: 'Prediction of Cervical Cancer Using Chicken Swarm Optimization',
      venue: 'International Conference on Innovative Computing and Communications, Springer',
      year: '2020',
      url: 'https://link.springer.com/chapter/10.1007/978-981-15-1286-5_51',
    },
    {
      title: 'Application of Chicken Swarm Optimization in Detection of Cancer and Virtual Reality',
      venue: 'Advanced Computational Intelligence Techniques for Virtual Reality in Healthcare, Springer',
      year: '2020',
      url: 'https://www.springer.com/in/book/9783030352516',
    },
    {
      title: 'Brain Tumour Segmentation Using U-Net Based Fully Convolutional Networks',
      venue: 'Journal of Multi-Disciplinary Engineering Technologies',
      year: '2018',
      url: 'http://www.jmdet.com/wp-content/uploads/2019/02/4jmdet_12_2_4-2.pdf',
    },
  ],

  // ---- Contact -------------------------------------------------------------
  contact: {
    heading: 'Let’s talk',
    // Form service URL that forwards messages to your inbox, for example
    // 'https://formspree.io/f/abcdwxyz'. Empty = no form; an info card shows instead.
    formEndpoint: '',
    body: 'I am always glad to talk about agentic AI, making language models dependable in production, or software engineering in general.',
    withForm: 'Send me a note here or find me on LinkedIn.',
    withoutForm: 'LinkedIn is the best way to reach me.',
    topics: ['Agentic AI and LLM reliability', 'Speed and cost of AI systems', 'Software engineering roles'],
  },
}
