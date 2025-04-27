/**
 * UI Components for the Bennett University Event Management System
 */

// Create the dashboard content
function createDashboard() {
    const upcomingEvents = window.utils.getUpcomingEvents(3);
    
    // Get user's clubs
    const userClubs = window.appData.clubs.filter(club => 
      club.memberIds.includes(window.appData.currentUser.id) || 
      club.adminIds.includes(window.appData.currentUser.id)
    );
    
    const dashboardHTML = `
      <div class="container">
        <div class="dashboard-grid">
          <div class="welcome-card">
            <div class="decoration"></div>
            <h2>Welcome back, ${window.appData.currentUser.name}!</h2>
            <p>Explore upcoming events, manage your registrations, and stay connected with your favorite clubs.</p>
            <button class="btn btn-gold">Explore Events</button>
          </div>
          
          <div class="stats-card">
            <h3>Your Activity</h3>
            <div class="stats-list">
              <div class="stat-item">
                <span>Events Registered</span>
                <span class="font-bold">${window.appData.events.filter(event => event.attendees.includes(window.appData.currentUser.id)).length}</span>
              </div>
              <div class="stat-item">
                <span>Clubs Joined</span>
                <span class="font-bold">${userClubs.length}</span>
              </div>
              <div class="stat-item">
                <span>Events This Month</span>
                <span class="font-bold">${window.utils.getUpcomingEvents().length}</span>
              </div>
            </div>
          </div>
          
          <div class="upcoming-events card">
            <div class="card-header">
              <h3>Upcoming Events</h3>
              <a href="#" class="btn btn-text">View All</a>
            </div>
            <div class="card-body">
              ${upcomingEvents.length > 0 ? 
                `<div class="event-grid">
                  ${upcomingEvents.map(event => createEventCard(event)).join('')}
                </div>` : 
                `<div class="empty-state">
                  <i class="fas fa-calendar-day fa-3x text-gray-300 mb-2"></i>
                  <p>No upcoming events right now.</p>
                  <p class="text-sm text-gray-500">Check back later or discover events from other clubs.</p>
                </div>`
              }
            </div>
          </div>
          
          <div class="club-highlights card">
            <div class="card-header">
              <h3>Your Clubs</h3>
              <a href="#" class="btn btn-text">View All</a>
            </div>
            <div class="card-body">
              ${userClubs.length > 0 ? 
                `<div class="club-list">
                  ${userClubs.map(club => createClubCard(club)).join('')}
                </div>` : 
                `<div class="empty-state">
                  <i class="fas fa-users fa-3x text-gray-300 mb-2"></i>
                  <p>You haven't joined any clubs yet.</p>
                  <button class="btn btn-primary mt-2">Explore Clubs</button>
                </div>`
              }
            </div>
          </div>
        </div>
        
        <div class="section-title">
          <h2>Events Calendar</h2>
        </div>
        
        ${createCalendar(new Date().getFullYear(), new Date().getMonth())}
      </div>
    `;
    
    return dashboardHTML;
  }
  
  // Create the events page
  function createEventsPage() {
    const events = window.appData.events;
    const categories = [...new Set(events.map(event => event.category))];
    
    const eventsHTML = `
      <div class="container">
        <div class="page-header">
          <h2>Events</h2>
          <button class="btn btn-primary create-event-btn"><i class="fas fa-plus"></i> Create Event</button>
        </div>
        
        <div class="filters">
          <div class="filter-group">
            <label>Category</label>
            <select id="category-filter" class="form-select">
              <option value="all">All Categories</option>
              ${categories.map(category => `<option value="${category}">${category.charAt(0).toUpperCase() + category.slice(1)}</option>`).join('')}
            </select>
          </div>
          
          <div class="filter-group">
            <label>Club</label>
            <select id="club-filter" class="form-select">
              <option value="all">All Clubs</option>
              ${window.appData.clubs.map(club => `<option value="${club.id}">${club.name}</option>`).join('')}
            </select>
          </div>
          
          <div class="filter-group">
            <label>Date</label>
            <select id="date-filter" class="form-select">
              <option value="upcoming">Upcoming</option>
              <option value="past">Past</option>
              <option value="all">All</option>
            </select>
          </div>
        </div>
        
        <div class="events-grid">
          ${events.map(event => createEventCard(event)).join('')}
        </div>
      </div>
    `;
    
    return eventsHTML;
  }
  
  // Create the clubs page
  function createClubsPage() {
    const clubs = window.appData.clubs;
    
    const clubsHTML = `
      <div class="container">
        <div class="page-header">
          <h2>Clubs</h2>
        </div>
        
        <div class="clubs-grid">
          ${clubs.map(club => createClubDetailCard(club)).join('')}
        </div>
      </div>
    `;
    
    return clubsHTML;
  }
  
  // Create an event card
  function createEventCard(event) {
    const club = window.utils.getClubById(event.clubId);
    const { day, month } = window.utils.getCalendarDate(event.startTime);
    const isRegistered = window.utils.isUserRegistered(window.appData.currentUser.id, event.id);
    
    return `
      <div class="card event-card" data-event-id="${event.id}">
        <div class="event-card-image">
          <img src="${event.image}" alt="${event.title}">
          <div class="event-card-date">
            <div class="month">${month}</div>
            <div class="day">${day}</div>
          </div>
          <div class="event-card-badge">
            <span class="badge badge-${window.utils.getCategoryColor(event.category)}">${event.category}</span>
          </div>
        </div>
        <div class="card-body event-card-content">
          <h4 class="event-card-title">${event.title}</h4>
          <div class="event-card-details">
            <div class="event-card-detail">
              <i class="fas fa-map-marker-alt"></i>
              <span>${event.location}</span>
            </div>
            <div class="event-card-detail">
              <i class="fas fa-clock"></i>
              <span>${window.utils.formatTime(event.startTime)}</span>
            </div>
          </div>
          <div class="event-card-footer">
            <div class="event-club">
              <div class="event-club-logo">
                <img src="${club.logo}" alt="${club.name}">
              </div>
              <span class="event-club-name">${club.name}</span>
            </div>
            <button class="btn btn-sm ${isRegistered ? 'btn-outline' : 'btn-primary'}">${isRegistered ? 'Registered' : 'Register'}</button>
          </div>
        </div>
      </div>
    `;
  }
  
  // Create a club card
  function createClubCard(club) {
    const isAdmin = window.utils.isClubAdmin(window.appData.currentUser.id, club.id);
    const isMember = window.utils.isClubMember(window.appData.currentUser.id, club.id);
    
    return `
      <div class="club-card" data-club-id="${club.id}">
        <div class="club-card-header">
          <div class="club-logo">
            <img src="${club.logo}" alt="${club.name}">
          </div>
          <div class="club-info">
            <h4>${club.name}</h4>
            <p>${isAdmin ? 'Administrator' : 'Member'}</p>
          </div>
        </div>
        <div class="club-stats">
          <div class="club-stat">
            <div class="club-stat-value">${club.events.length}</div>
            <div class="club-stat-label">Events</div>
          </div>
          <div class="club-stat">
            <div class="club-stat-value">${club.memberIds.length}</div>
            <div class="club-stat-label">Members</div>
          </div>
        </div>
      </div>
    `;
  }
  
  // Create a detailed club card for clubs page
  function createClubDetailCard(club) {
    const isAdmin = window.utils.isClubAdmin(window.appData.currentUser.id, club.id);
    const isMember = window.utils.isClubMember(window.appData.currentUser.id, club.id);
    
    return `
      <div class="card" data-club-id="${club.id}">
        <div class="card-body p-0">
          <div class="club-cover-image">
            <img src="${club.coverImage}" alt="${club.name}" class="w-full h-40 object-cover">
          </div>
          <div class="p-4">
            <div class="flex items-center -mt-12 mb-4">
              <div class="club-avatar">
                <img src="${club.logo}" alt="${club.name}" class="w-20 h-20 rounded-full border-4 border-white">
              </div>
              <div class="ml-4 mt-6">
                <h3 class="text-xl font-semibold">${club.name}</h3>
                <div class="text-sm text-gray-500">${club.memberIds.length} Members • ${club.events.length} Events</div>
              </div>
            </div>
            
            <p class="mb-4">${club.description}</p>
            
            <button class="btn ${isMember ? 'btn-outline' : 'btn-primary'} mr-2">
              ${isMember ? (isAdmin ? 'Manage Club' : 'Leave Club') : 'Join Club'}
            </button>
            <button class="btn btn-outline">View Events</button>
          </div>
        </div>
      </div>
    `;
  }
  
  // Create a notification item
  function createNotificationItem(notification) {
    const isUnread = !notification.read;
    const relatedItem = notification.relatedId ? 
      (notification.type === 'event' ? window.utils.getEventById(notification.relatedId) : 
       notification.type === 'club' ? window.utils.getClubById(notification.relatedId) : null) : null;
    
    return `
      <div class="notification-item ${isUnread ? 'unread' : ''}" data-notification-id="${notification.id}">
        <div class="notification-content">
          <p>${notification.message}</p>
          <span class="notification-time">${window.utils.timeAgo(notification.createdAt)}</span>
        </div>
      </div>
    `;
  }
  
  // Create calendar
  function createCalendar(year, month) {
    const now = new Date();
    const currentYear = typeof year !== 'undefined' ? year : now.getFullYear();
    const currentMonth = typeof month !== 'undefined' ? month : now.getMonth();
    
    const monthName = new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' });
    const calendarDays = window.utils.generateCalendarDays(currentYear, currentMonth);
    
    // Get weekday names
    const weekdays = [];
    for (let i = 0; i < 7; i++) {
      weekdays.push(new Date(2021, 0, 3 + i).toLocaleString('default', { weekday: 'short' }));
    }
    
    const calendarHTML = `
      <div class="calendar-container">
        <div class="calendar-header">
          <span class="calendar-title">${monthName} ${currentYear}</span>
          <div class="calendar-nav">
            <button class="calendar-nav-btn" data-calendar-nav="prev">
              <i class="fas fa-chevron-left"></i>
            </button>
            <button class="calendar-nav-btn" data-calendar-nav="next">
              <i class="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
        
        <div class="calendar-weekdays">
          ${weekdays.map(day => `<div class="calendar-weekday">${day}</div>`).join('')}
        </div>
        
        <div class="calendar-days">
          ${calendarDays.map(dayInfo => {
            const dayDate = new Date(dayInfo.year, dayInfo.month, dayInfo.day);
            const isToday = window.utils.isToday(dayDate);
            const events = window.utils.getEventsForDay(dayInfo.year, dayInfo.month, dayInfo.day);
            const hasEvents = events.length > 0;
            
            return `
              <div class="calendar-day ${!dayInfo.isCurrentMonth ? 'other-month' : ''} ${isToday ? 'today' : ''} ${hasEvents ? 'has-events' : ''}" 
                   data-date="${dayInfo.year}-${dayInfo.month + 1}-${dayInfo.day}">
                <span class="day-number">${dayInfo.day}</span>
                ${hasEvents ? `
                  <div class="day-events">
                    ${events.slice(0, 2).map(event => `
                      <div class="day-event-dot" style="background-color: var(--${window.utils.getCategoryColor(event.category)}-400);"></div>
                    `).join('')}
                    ${events.length > 2 ? `<div class="day-event-more">+${events.length - 2}</div>` : ''}
                  </div>
                ` : ''}
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
    
    return calendarHTML;
  }
  
  // Create event form modal
  function createEventFormModal() {
    const clubs = window.appData.clubs.filter(club => 
      window.utils.isClubAdmin(window.appData.currentUser.id, club.id)
    );
    
    const categories = [
      'academic', 'cultural', 'sports', 'technical', 
      'workshop', 'seminar', 'competition', 'other'
    ];
    
    const modalHTML = `
      <div class="modal">
        <div class="modal-header">
          <h3>Create New Event</h3>
          <button class="modal-close" id="close-modal"><i class="fas fa-times"></i></button>
        </div>
        <div class="modal-body">
          <form id="event-form">
            <div class="form-group">
              <label class="form-label" for="event-title">Event Title</label>
              <input type="text" id="event-title" class="form-input" placeholder="Enter event title" required>
            </div>
            
            <div class="form-group">
              <label class="form-label" for="event-description">Description</label>
              <textarea id="event-description" class="form-textarea" placeholder="Enter event description" required></textarea>
            </div>
            
            <div class="form-group">
              <label class="form-label" for="event-club">Club</label>
              <select id="event-club" class="form-select" required>
                <option value="">Select a club</option>
                ${clubs.map(club => `<option value="${club.id}">${club.name}</option>`).join('')}
              </select>
            </div>
            
            <div class="form-group">
              <label class="form-label" for="event-category">Category</label>
              <select id="event-category" class="form-select" required>
                <option value="">Select a category</option>
                ${categories.map(category => `<option value="${category}">${category.charAt(0).toUpperCase() + category.slice(1)}</option>`).join('')}
              </select>
            </div>
            
            <div class="form-group">
              <label class="form-label" for="event-location">Location</label>
              <input type="text" id="event-location" class="form-input" placeholder="Enter event location" required>
            </div>
            
            <div class="form-group">
              <label class="form-label" for="event-start">Start Date & Time</label>
              <input type="datetime-local" id="event-start" class="form-input" required>
            </div>
            
            <div class="form-group">
              <label class="form-label" for="event-end">End Date & Time</label>
              <input type="datetime-local" id="event-end" class="form-input" required>
            </div>
            
            <div class="form-group">
              <label class="form-label" for="event-deadline">Registration Deadline</label>
              <input type="datetime-local" id="event-deadline" class="form-input" required>
            </div>
            
            <div class="form-group">
              <label class="form-label" for="event-capacity">Capacity</label>
              <input type="number" id="event-capacity" class="form-input" min="1" placeholder="Maximum number of attendees" required>
            </div>
            
            <div class="form-group">
              <label class="form-label" for="event-image">Event Image URL</label>
              <input type="url" id="event-image" class="form-input" placeholder="Enter image URL">
              <span class="form-help">Recommended image size: 1200 x 600 pixels</span>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button class="btn btn-outline" id="cancel-event">Cancel</button>
          <button class="btn btn-primary" id="save-event">Create Event</button>
        </div>
      </div>
    `;
    
    return modalHTML;
  }
  
  // Export components to window
  window.components = {
    createDashboard,
    createEventsPage,
    createClubsPage,
    createEventCard,
    createClubCard,
    createClubDetailCard,
    createNotificationItem,
    createCalendar,
    createEventFormModal
  };