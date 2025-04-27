/**
 * Mock data for the Bennett University Event Management System
 */

// Current user - would normally come from auth system
const currentUser = {
    id: 'user1',
    name: 'John Doe',
    email: 'john.doe@bennett.edu.in',
    role: 'student',
    enrollmentNumber: 'E21CSEU0001',
    profileImage: 'https://randomuser.me/api/portraits/men/44.jpg',
    department: 'Computer Science',
    year: 3,
    clubs: ['club1', 'club3']
  };
  
  // Clubs data
  const clubs = [
    {
      id: 'club1',
      name: 'Coding Club',
      description: 'A community for programming enthusiasts to learn, collaborate and build exciting projects.',
      logo: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      coverImage: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      adminIds: ['user2'],
      memberIds: ['user1', 'user3', 'user4', 'user5'],
      events: ['event1', 'event5', 'event9'],
      createdAt: new Date('2023-01-15'),
      updatedAt: new Date('2023-06-20')
    },
    {
      id: 'club2',
      name: 'Cultural Society',
      description: 'Celebrating diversity through art, music, dance and drama performances.',
      logo: 'https://images.pexels.com/photos/1049732/pexels-photo-1049732.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      coverImage: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      adminIds: ['user6'],
      memberIds: ['user7', 'user8', 'user9'],
      events: ['event2', 'event6'],
      createdAt: new Date('2023-02-10'),
      updatedAt: new Date('2023-07-05')
    },
    {
      id: 'club3',
      name: 'Sports Club',
      description: 'Promoting physical fitness, sportsmanship and athletic excellence.',
      logo: 'https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      coverImage: 'https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      adminIds: ['user10'],
      memberIds: ['user1', 'user11', 'user12'],
      events: ['event3', 'event7'],
      createdAt: new Date('2023-03-05'),
      updatedAt: new Date('2023-08-12')
    },
    {
      id: 'club4',
      name: 'Research Society',
      description: 'Exploring cutting-edge research and innovation in science and technology.',
      logo: 'https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      coverImage: 'https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      adminIds: ['user13'],
      memberIds: ['user14', 'user15', 'user16'],
      events: ['event4', 'event8'],
      createdAt: new Date('2023-04-20'),
      updatedAt: new Date('2023-09-01')
    }
  ];
  
  // Events data
  const events = [
    {
      id: 'event1',
      title: 'Hackathon 2025',
      description: 'A 24-hour coding competition to build innovative solutions for real-world problems.',
      clubId: 'club1',
      location: 'Computer Science Block, Lab 301',
      startTime: new Date('2025-03-15T09:00:00'),
      endTime: new Date('2025-03-16T09:00:00'),
      registrationDeadline: new Date('2025-03-10T23:59:59'),
      capacity: 50,
      attendees: ['user1', 'user3', 'user5', 'user7'],
      waitlist: [],
      status: 'approved',
      category: 'technical',
      image: 'https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      createdBy: 'user2',
      createdAt: new Date('2025-02-20'),
      updatedAt: new Date('2025-02-25')
    },
    {
      id: 'event2',
      title: 'Annual Cultural Fest',
      description: 'A vibrant celebration of art, music and dance with performances by talented students.',
      clubId: 'club2',
      location: 'Main Auditorium',
      startTime: new Date('2025-04-10T18:00:00'),
      endTime: new Date('2025-04-10T22:00:00'),
      registrationDeadline: new Date('2025-04-05T23:59:59'),
      capacity: 200,
      attendees: ['user1', 'user4', 'user8', 'user9'],
      waitlist: [],
      status: 'approved',
      category: 'cultural',
      image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      createdBy: 'user6',
      createdAt: new Date('2025-03-15'),
      updatedAt: new Date('2025-03-20')
    },
    {
      id: 'event3',
      title: 'Inter-University Cricket Tournament',
      description: 'Cricket tournament featuring teams from top universities across the region.',
      clubId: 'club3',
      location: 'University Cricket Ground',
      startTime: new Date('2025-02-25T09:00:00'),
      endTime: new Date('2025-02-28T18:00:00'),
      registrationDeadline: new Date('2025-02-20T23:59:59'),
      capacity: 100,
      attendees: ['user1', 'user11', 'user12'],
      waitlist: [],
      status: 'approved',
      category: 'sports',
      image: 'https://images.pexels.com/photos/3657154/pexels-photo-3657154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      createdBy: 'user10',
      createdAt: new Date('2025-01-25'),
      updatedAt: new Date('2025-01-30')
    },
    {
      id: 'event4',
      title: 'AI & ML Workshop',
      description: 'Learn about the latest developments in Artificial Intelligence and Machine Learning.',
      clubId: 'club4',
      location: 'Lecture Hall 102',
      startTime: new Date('2025-03-05T14:00:00'),
      endTime: new Date('2025-03-05T17:00:00'),
      registrationDeadline: new Date('2025-03-03T23:59:59'),
      capacity: 80,
      attendees: ['user14', 'user15', 'user16'],
      waitlist: [],
      status: 'approved',
      category: 'workshop',
      image: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      createdBy: 'user13',
      createdAt: new Date('2025-02-10'),
      updatedAt: new Date('2025-02-15')
    },
    {
      id: 'event5',
      title: 'Web Development Bootcamp',
      description: 'Intensive three-day workshop covering HTML, CSS, JavaScript and popular frameworks.',
      clubId: 'club1',
      location: 'Computer Lab 201',
      startTime: new Date('2025-03-22T10:00:00'),
      endTime: new Date('2025-03-24T16:00:00'),
      registrationDeadline: new Date('2025-03-18T23:59:59'),
      capacity: 40,
      attendees: ['user1', 'user3', 'user4', 'user5'],
      waitlist: [],
      status: 'approved',
      category: 'workshop',
      image: 'https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      createdBy: 'user2',
      createdAt: new Date('2025-03-01'),
      updatedAt: new Date('2025-03-05')
    },
    {
      id: 'event6',
      title: 'Photography Exhibition',
      description: 'Showcasing stunning photographs captured by student photographers.',
      clubId: 'club2',
      location: 'Art Gallery',
      startTime: new Date('2025-04-20T11:00:00'),
      endTime: new Date('2025-04-22T18:00:00'),
      registrationDeadline: new Date('2025-04-15T23:59:59'),
      capacity: 150,
      attendees: ['user7', 'user8', 'user9'],
      waitlist: [],
      status: 'pending',
      category: 'cultural',
      image: 'https://images.pexels.com/photos/1595385/pexels-photo-1595385.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      createdBy: 'user6',
      createdAt: new Date('2025-03-25'),
      updatedAt: new Date('2025-03-28')
    },
    {
      id: 'event7',
      title: 'Yoga and Wellness Workshop',
      description: 'Learn techniques for stress management, physical fitness and mental wellbeing.',
      clubId: 'club3',
      location: 'Sports Complex',
      startTime: new Date('2025-04-05T07:00:00'),
      endTime: new Date('2025-04-05T09:00:00'),
      registrationDeadline: new Date('2025-04-03T23:59:59'),
      capacity: 30,
      attendees: ['user1', 'user11', 'user12'],
      waitlist: [],
      status: 'approved',
      category: 'workshop',
      image: 'https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      createdBy: 'user10',
      createdAt: new Date('2025-03-20'),
      updatedAt: new Date('2025-03-22')
    },
    {
      id: 'event8',
      title: 'Research Symposium',
      description: 'Platform for students to present their research findings and get valuable feedback.',
      clubId: 'club4',
      location: 'Seminar Hall',
      startTime: new Date('2025-04-15T10:00:00'),
      endTime: new Date('2025-04-15T16:00:00'),
      registrationDeadline: new Date('2025-04-10T23:59:59'),
      capacity: 60,
      attendees: ['user14', 'user15', 'user16'],
      waitlist: [],
      status: 'approved',
      category: 'academic',
      image: 'https://images.pexels.com/photos/8837755/pexels-photo-8837755.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      createdBy: 'user13',
      createdAt: new Date('2025-03-30'),
      updatedAt: new Date('2025-04-02')
    },
    {
      id: 'event9',
      title: 'Tech Talk: Blockchain',
      description: 'Expert talk on blockchain technology and its applications in various industries.',
      clubId: 'club1',
      location: 'Conference Room 301',
      startTime: new Date('2025-03-28T15:00:00'),
      endTime: new Date('2025-03-28T17:00:00'),
      registrationDeadline: new Date('2025-03-26T23:59:59'),
      capacity: 70,
      attendees: ['user1', 'user3', 'user5'],
      waitlist: [],
      status: 'approved',
      category: 'seminar',
      image: 'https://images.pexels.com/photos/8370752/pexels-photo-8370752.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      createdBy: 'user2',
      createdAt: new Date('2025-03-10'),
      updatedAt: new Date('2025-03-15')
    }
  ];
  
  // Notifications data
  const notifications = [
    {
      id: 'notif1',
      userId: 'user1',
      message: 'Your registration for Hackathon 2025 has been confirmed.',
      read: false,
      type: 'event',
      relatedId: 'event1',
      createdAt: new Date('2025-02-26T10:15:00')
    },
    {
      id: 'notif2',
      userId: 'user1',
      message: 'Reminder: Tech Talk: Blockchain is tomorrow at 3:00 PM.',
      read: false,
      type: 'event',
      relatedId: 'event9',
      createdAt: new Date('2025-03-27T09:00:00')
    },
    {
      id: 'notif3',
      userId: 'user1',
      message: 'Coding Club has posted a new event: Web Development Bootcamp.',
      read: false,
      type: 'club',
      relatedId: 'club1',
      createdAt: new Date('2025-03-01T14:30:00')
    }
  ];
  
  // Export data
  window.appData = {
    currentUser,
    clubs,
    events,
    notifications
  };