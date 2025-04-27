/**
 * Main application logic for the Bennett University Event Management System
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize the application
    initApp();
    
    // Set up event listeners
    setupEventListeners();
  });
  
  // Initialize the application
  function initApp() {
    // Load dashboard as the default view
    loadPage('dashboard');
    
    // Initialize notifications
    renderNotifications();
  }
  
  // Set up event listeners
  function setupEventListeners() {
    // Navigation links
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const page = e.currentTarget.getAttribute('data-page');
        loadPage(page);
        
        // Update active link
        document.querySelectorAll('.nav-links a').forEach(navLink => {
          navLink.classList.remove('active');
        });
        e.currentTarget.classList.add('active');
      });
    });
    
    // Mobile menu button
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    if (mobileMenuBtn) {
      mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }
    
    // Notification button
    const notificationBtn = document.getElementById('notification-btn');
    if (notificationBtn) {
      notificationBtn.addEventListener('click', toggleNotificationPanel);
    }
    
    // User profile dropdown
    const profileImg = document.getElementById('profile-img');
    if (profileImg) {
      profileImg.addEventListener('click', toggleProfileDropdown);
    }
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
      // Close profile dropdown if clicking outside
      const userProfile = document.getElementById('user-profile');
      if (userProfile && !userProfile.contains(e.target) && !e.target.closest('#profile-img')) {
        userProfile.classList.remove('active');
      }
      
      // Close notification panel if clicking outside
      const notificationPanel = document.getElementById('notification-panel');
      if (notificationPanel && notificationPanel.classList.contains('active') && 
          !notificationPanel.contains(e.target) && !e.target.closest('#notification-btn')) {
        notificationPanel.classList.remove('active');
      }
    });
    
    // Create event buttons
    document.querySelectorAll('.create-event-btn').forEach(btn => {
      btn.addEventListener('click', openCreateEventModal);
    });
    
    // Modal container click
    const modalContainer = document.getElementById('modal-container');
    if (modalContainer) {
      modalContainer.addEventListener('click', (e) => {
        if (e.target === modalContainer) {
          closeModal();
        }
      });
    }
    
    // Mark all notifications as read
    const markAllReadBtn = document.getElementById('mark-all-read');
    if (markAllReadBtn) {
      markAllReadBtn.addEventListener('click', markAllNotificationsAsRead);
    }
    
    // Calendar navigation
    document.addEventListener('click', (e) => {
      if (e.target.closest('[data-calendar-nav]')) {
        const navBtn = e.target.closest('[data-calendar-nav]');
        const direction = navBtn.getAttribute('data-calendar-nav');
        navigateCalendar(direction);
      }
    });
    
    // Event card clicks
    document.addEventListener('click', (e) => {
      const eventCard = e.target.closest('.event-card');
      if (eventCard) {
        const eventId = eventCard.getAttribute('data-event-id');
        openEventDetails(eventId);
      }
    });
    
    // Club card clicks
    document.addEventListener('click', (e) => {
      const clubCard = e.target.closest('[data-club-id]');
      if (clubCard) {
        const clubId = clubCard.getAttribute('data-club-id');
        openClubDetails(clubId);
      }
    });
    
    // Calendar day clicks
    document.addEventListener('click', (e) => {
      const calendarDay = e.target.closest('.calendar-day');
      if (calendarDay) {
        const dateStr = calendarDay.getAttribute('data-date');
        if (dateStr) {
          showEventsForDate(dateStr);
        }
      }
    });
  }
  
  // Load page content
  function loadPage(pageName) {
    const appContainer = document.getElementById('app-container');
    
    // Clear current content with a fade-out effect
    appContainer.classList.add('fade-out');
    
    // After fade out, load new content
    setTimeout(() => {
      let content = '';
      
      switch (pageName) {
        case 'dashboard':
          content = window.components.createDashboard();
          break;
        case 'events':
          content = window.components.createEventsPage();
          break;
        case 'clubs':
          content = window.components.createClubsPage();
          break;
        default:
          content = window.components.createDashboard();
      }
      
      appContainer.innerHTML = content;
      appContainer.classList.remove('fade-out');
      appContainer.classList.add('fade-in');
      
      // Remove animation classes after animation completes
      setTimeout(() => {
        appContainer.classList.remove('fade-in');
      }, 300);
      
      // Update document title
      document.title = `${pageName.charAt(0).toUpperCase() + pageName.slice(1)} | Bennett University Events`;
    }, 300);
  }
  
  // Toggle mobile menu
  function toggleMobileMenu() {
    const mobileNav = document.querySelector('.mobile-nav');
    if (!mobileNav) {
      // Create mobile nav if it doesn't exist
      const mobileNavHTML = `
        <div class="mobile-nav">
          <ul class="mobile-nav-links">
            <li><a href="#" class="active" data-page="dashboard"><i class="fas fa-home"></i> Dashboard</a></li>
            <li><a href="#" data-page="events"><i class="fas fa-calendar"></i> Events</a></li>
            <li><a href="#" data-page="clubs"><i class="fas fa-users"></i> Clubs</a></li>
          </ul>
          <div class="mobile-nav-action">
            <button class="btn btn-primary btn-lg w-full create-event-btn"><i class="fas fa-plus"></i> Create Event</button>
          </div>
        </div>
      `;
      document.body.insertAdjacentHTML('beforeend', mobileNavHTML);
      
      // Add event listeners to mobile nav
      const newMobileNav = document.querySelector('.mobile-nav');
      newMobileNav.querySelectorAll('.mobile-nav-links a').forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const page = e.currentTarget.getAttribute('data-page');
          loadPage(page);
          
          // Update active link
          newMobileNav.querySelectorAll('.mobile-nav-links a').forEach(navLink => {
            navLink.classList.remove('active');
          });
          e.currentTarget.classList.add('active');
          
          // Close mobile nav
          newMobileNav.classList.remove('active');
          document.getElementById('mobile-menu-btn').innerHTML = '<i class="fas fa-bars"></i>';
        });
      });
      
      // Add event listener to create event button
      newMobileNav.querySelector('.create-event-btn').addEventListener('click', () => {
        openCreateEventModal();
        // Close mobile nav
        newMobileNav.classList.remove('active');
        document.getElementById('mobile-menu-btn').innerHTML = '<i class="fas fa-bars"></i>';
      });
      
      newMobileNav.classList.add('active');
      document.getElementById('mobile-menu-btn').innerHTML = '<i class="fas fa-times"></i>';
    } else {
      mobileNav.classList.toggle('active');
      document.getElementById('mobile-menu-btn').innerHTML = mobileNav.classList.contains('active') ? 
        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    }
  }
  
  // Toggle notification panel
  function toggleNotificationPanel() {
    const notificationPanel = document.getElementById('notification-panel');
    notificationPanel.classList.toggle('active');
  }
  
  // Toggle profile dropdown
  function toggleProfileDropdown() {
    const userProfile = document.getElementById('user-profile');
    userProfile.classList.toggle('active');
  }
  
  // Render notifications
  function renderNotifications() {
    const notificationList = document.querySelector('.notification-list');
    const notifications = window.appData.notifications;
    
    // Clear current notifications
    notificationList.innerHTML = '';
    
    if (notifications.length > 0) {
      notifications.forEach(notification => {
        const notificationItem = window.components.createNotificationItem(notification);
        notificationList.insertAdjacentHTML('beforeend', notificationItem);
      });
      
      // Add event listeners to notification items
      document.querySelectorAll('.notification-item').forEach(item => {
        item.addEventListener('click', () => {
          const notificationId = item.getAttribute('data-notification-id');
          markNotificationAsRead(notificationId);
        });
      });
    } else {
      notificationList.innerHTML = `
        <div class="empty-state">
          <i class="fas fa-bell-slash fa-3x text-gray-300 mb-2"></i>
          <p>No notifications</p>
        </div>
      `;
    }
    
    // Update notification count
    updateNotificationCount();
  }
  
  // Mark notification as read
  function markNotificationAsRead(notificationId) {
    const notification = window.appData.notifications.find(n => n.id === notificationId);
    if (notification) {
      notification.read = true;
      
      // Update UI
      const notificationItem = document.querySelector(`.notification-item[data-notification-id="${notificationId}"]`);
      if (notificationItem) {
        notificationItem.classList.remove('unread');
      }
      
      // Update notification count
      updateNotificationCount();
    }
  }
  
  // Mark all notifications as read
  function markAllNotificationsAsRead() {
    window.appData.notifications.forEach(notification => {
      notification.read = true;
    });
    
    // Update UI
    document.querySelectorAll('.notification-item').forEach(item => {
      item.classList.remove('unread');
    });
    
    // Update notification count
    updateNotificationCount();
  }
  
  // Update notification count
  function updateNotificationCount() {
    const unreadCount = window.appData.notifications.filter(n => !n.read).length;
    const notificationBadge = document.querySelector('.notification-badge');
    
    if (unreadCount > 0) {
      notificationBadge.textContent = unreadCount;
      notificationBadge.style.display = 'flex';
    } else {
      notificationBadge.style.display = 'none';
    }
  }
  
  // Open create event modal
  function openCreateEventModal() {
    const modalContainer = document.getElementById('modal-container');
    modalContainer.innerHTML = window.components.createEventFormModal();
    modalContainer.classList.add('active');
    
    // Add event listeners to modal buttons
    document.getElementById('close-modal').addEventListener('click', closeModal);
    document.getElementById('cancel-event').addEventListener('click', closeModal);
    document.getElementById('save-event').addEventListener('click', saveEvent);
    
    // Set default dates
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    // Format date for input
    const formatDateForInput = (date) => {
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}T${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
    };
    
    document.getElementById('event-start').value = formatDateForInput(tomorrow);
    
    const endDate = new Date(tomorrow);
    endDate.setHours(endDate.getHours() + 2);
    document.getElementById('event-end').value = formatDateForInput(endDate);
    
    document.getElementById('event-deadline').value = formatDateForInput(now);
  }
  
  // Close modal
  function closeModal() {
    const modalContainer = document.getElementById('modal-container');
    modalContainer.classList.remove('active');
    
    // Clear modal content after animation completes
    setTimeout(() => {
      modalContainer.innerHTML = '';
    }, 300);
  }
  
  // Save event
  function saveEvent() {
    const form = document.getElementById('event-form');
    const formElements = form.elements;
    
    // Basic validation
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    
    // Create new event object
    const newEvent = {
      id: window.utils.generateId('event'),
      title: formElements['event-title'].value,
      description: formElements['event-description'].value,
      clubId: formElements['event-club'].value,
      location: formElements['event-location'].value,
      startTime: new Date(formElements['event-start'].value),
      endTime: new Date(formElements['event-end'].value),
      registrationDeadline: new Date(formElements['event-deadline'].value),
      capacity: parseInt(formElements['event-capacity'].value),
      attendees: [],
      waitlist: [],
      status: 'pending',
      category: formElements['event-category'].value,
      image: formElements['event-image'].value || 'https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      createdBy: window.appData.currentUser.id,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    // Add event to data
    window.appData.events.push(newEvent);
    
    // Update club events
    const club = window.utils.getClubById(newEvent.clubId);
    if (club) {
      club.events.push(newEvent.id);
    }
    
    // Close modal
    closeModal();
    
    // Show success message
    showNotification('Event created successfully! Awaiting approval.');
    
    // Reload current page
    const activePage = document.querySelector('.nav-links a.active');
    if (activePage) {
      loadPage(activePage.getAttribute('data-page'));
    } else {
      loadPage('dashboard');
    }
  }
  
  // Navigate calendar
  function navigateCalendar(direction) {
    const calendarTitle = document.querySelector('.calendar-title');
    if (!calendarTitle) return;
    
    const [month, year] = calendarTitle.textContent.split(' ');
    const monthIndex = new Date(`${month} 1, ${year}`).getMonth();
    const yearNum = parseInt(year);
    
    let newMonth, newYear;
    
    if (direction === 'prev') {
      if (monthIndex === 0) {
        newMonth = 11;
        newYear = yearNum - 1;
      } else {
        newMonth = monthIndex - 1;
        newYear = yearNum;
      }
    } else {
      if (monthIndex === 11) {
        newMonth = 0;
        newYear = yearNum + 1;
      } else {
        newMonth = monthIndex + 1;
        newYear = yearNum;
      }
    }
    
    // Replace calendar
    const calendarContainer = document.querySelector('.calendar-container');
    if (calendarContainer) {
      const newCalendar = window.components.createCalendar(newYear, newMonth);
      calendarContainer.outerHTML = newCalendar;
    }
  }
  
  // Open event details
  function openEventDetails(eventId) {
    const event = window.utils.getEventById(eventId);
    if (!event) return;
    
    const club = window.utils.getClubById(event.clubId);
    const isRegistered = window.utils.isUserRegistered(window.appData.currentUser.id, eventId);
    
    const modalContainer = document.getElementById('modal-container');
    const modalHTML = `
      <div class="modal">
        <div class="modal-header">
          <h3>Event Details</h3>
          <button class="modal-close" id="close-modal"><i class="fas fa-times"></i></button>
        </div>
        <div class="modal-body p-0">
          <div class="event-image">
            <img src="${event.image}" alt="${event.title}" class="w-full h-48 object-cover">
          </div>
          <div class="p-4">
            <div class="event-tags mb-2">
              <span class="badge badge-${window.utils.getCategoryColor(event.category)}">${event.category}</span>
              <span class="badge badge-${window.utils.getStatusColor(event.status)}">${event.status}</span>
            </div>
            
            <h3 class="text-xl font-semibold mb-2">${event.title}</h3>
            
            <div class="event-detail-item mb-4">
              <div class="flex items-start">
                <div class="mr-2 text-indigo-500"><i class="fas fa-building"></i></div>
                <div>
                  <p class="font-medium">Organized by</p>
                  <p>${club.name}</p>
                </div>
              </div>
            </div>
            
            <div class="event-detail-item mb-4">
              <div class="flex items-start">
                <div class="mr-2 text-indigo-500"><i class="fas fa-map-marker-alt"></i></div>
                <div>
                  <p class="font-medium">Location</p>
                  <p>${event.location}</p>
                </div>
              </div>
            </div>
            
            <div class="event-detail-item mb-4">
              <div class="flex items-start">
                <div class="mr-2 text-indigo-500"><i class="fas fa-calendar-alt"></i></div>
                <div>
                  <p class="font-medium">Date & Time</p>
                  <p>${window.utils.formatDateTime(event.startTime)} - ${window.utils.formatTime(event.endTime)}</p>
                </div>
              </div>
            </div>
            
            <div class="event-detail-item mb-4">
              <div class="flex items-start">
                <div class="mr-2 text-indigo-500"><i class="fas fa-hourglass-end"></i></div>
                <div>
                  <p class="font-medium">Registration Deadline</p>
                  <p>${window.utils.formatDateTime(event.registrationDeadline)}</p>
                </div>
              </div>
            </div>
            
            <div class="event-detail-item mb-4">
              <div class="flex items-start">
                <div class="mr-2 text-indigo-500"><i class="fas fa-users"></i></div>
                <div>
                  <p class="font-medium">Attendees</p>
                  <p>${event.attendees.length} / ${event.capacity}</p>
                </div>
              </div>
            </div>
            
            <div class="mb-4">
              <h4 class="font-medium mb-2">Description</h4>
              <p>${event.description}</p>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-outline" id="close-event-details">Close</button>
          <button class="btn ${isRegistered ? 'btn-danger' : 'btn-primary'}" id="register-event">
            ${isRegistered ? 'Cancel Registration' : 'Register for Event'}
          </button>
        </div>
      </div>
    `;
    
    modalContainer.innerHTML = modalHTML;
    modalContainer.classList.add('active');
    
    // Add event listeners
    document.getElementById('close-modal').addEventListener('click', closeModal);
    document.getElementById('close-event-details').addEventListener('click', closeModal);
    document.getElementById('register-event').addEventListener('click', () => {
      toggleEventRegistration(eventId);
      closeModal();
    });
  }
  
  // Toggle event registration
  function toggleEventRegistration(eventId) {
    const event = window.utils.getEventById(eventId);
    const userId = window.appData.currentUser.id;
    
    if (!event) return;
    
    if (event.attendees.includes(userId)) {
      // Cancel registration
      event.attendees = event.attendees.filter(id => id !== userId);
      showNotification('Your registration has been cancelled.');
    } else {
      // Register for event
      if (event.attendees.length < event.capacity) {
        event.attendees.push(userId);
        showNotification('You have successfully registered for the event!');
      } else {
        // Add to waitlist
        if (!event.waitlist.includes(userId)) {
          event.waitlist.push(userId);
          showNotification('Event is at capacity. You have been added to the waitlist.');
        } else {
          showNotification('You are already on the waitlist for this event.');
        }
      }
    }
    
    // Reload current page
    const activePage = document.querySelector('.nav-links a.active');
    if (activePage) {
      loadPage(activePage.getAttribute('data-page'));
    } else {
      loadPage('dashboard');
    }
  }
  
  // Open club details
  function openClubDetails(clubId) {
    const club = window.utils.getClubById(clubId);
    if (!club) return;
    
    const isMember = window.utils.isClubMember(window.appData.currentUser.id, clubId);
    const isAdmin = window.utils.isClubAdmin(window.appData.currentUser.id, clubId);
    
    // Get club events
    const clubEvents = window.appData.events.filter(event => event.clubId === clubId);
    
    const modalContainer = document.getElementById('modal-container');
    const modalHTML = `
      <div class="modal">
        <div class="modal-header">
          <h3>Club Details</h3>
          <button class="modal-close" id="close-modal"><i class="fas fa-times"></i></button>
        </div>
        <div class="modal-body p-0">
          <div class="club-cover">
            <img src="${club.coverImage}" alt="${club.name}" class="w-full h-48 object-cover">
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
            
            <div class="mb-4">
              <h4 class="font-medium mb-2">About</h4>
              <p>${club.description}</p>
            </div>
            
            <div class="mb-4">
              <h4 class="font-medium mb-2">Upcoming Events</h4>
              ${clubEvents.length > 0 ?
                `<div class="club-events-list">
                  ${clubEvents.slice(0, 3).map(event => `
                    <div class="event-list-item" data-event-id="${event.id}">
                      <div class="event-list-date">
                        <span class="month">${window.utils.getCalendarDate(event.startTime).month}</span>
                        <span class="day">${window.utils.getCalendarDate(event.startTime).day}</span>
                      </div>
                      <div class="event-list-details">
                        <h5>${event.title}</h5>
                        <p>${window.utils.formatTime(event.startTime)} • ${event.location}</p>
                      </div>
                    </div>
                  `).join('')}
                </div>` :
                `<p>No upcoming events</p>`
              }
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-outline" id="close-club-details">Close</button>
          <button class="btn ${isMember ? (isAdmin ? 'btn-secondary' : 'btn-danger') : 'btn-primary'}" id="join-club">
            ${isMember ? (isAdmin ? 'Manage Club' : 'Leave Club') : 'Join Club'}
          </button>
        </div>
      </div>
    `;
    
    modalContainer.innerHTML = modalHTML;
    modalContainer.classList.add('active');
    
    // Add event listeners
    document.getElementById('close-modal').addEventListener('click', closeModal);
    document.getElementById('close-club-details').addEventListener('click', closeModal);
    document.getElementById('join-club').addEventListener('click', () => {
      if (isAdmin) {
        // Open club management page
        closeModal();
        showNotification('Club management feature coming soon!');
      } else {
        toggleClubMembership(clubId);
        closeModal();
      }
    });
    
    // Add event listeners to event items
    document.querySelectorAll('.event-list-item').forEach(item => {
      item.addEventListener('click', () => {
        const eventId = item.getAttribute('data-event-id');
        closeModal();
        openEventDetails(eventId);
      });
    });
  }
  
  // Toggle club membership
  function toggleClubMembership(clubId) {
    const club = window.utils.getClubById(clubId);
    const userId = window.appData.currentUser.id;
    
    if (!club) return;
    
    if (club.memberIds.includes(userId)) {
      // Leave club
      club.memberIds = club.memberIds.filter(id => id !== userId);
      window.appData.currentUser.clubs = window.appData.currentUser.clubs.filter(id => id !== clubId);
      showNotification(`You have left ${club.name}.`);
    } else {
      // Join club
      club.memberIds.push(userId);
      if (!window.appData.currentUser.clubs) {
        window.appData.currentUser.clubs = [];
      }
      window.appData.currentUser.clubs.push(clubId);
      showNotification(`You have joined ${club.name}!`);
    }
    
    // Reload current page
    const activePage = document.querySelector('.nav-links a.active');
    if (activePage) {
      loadPage(activePage.getAttribute('data-page'));
    } else {
      loadPage('dashboard');
    }
  }
  
  // Show events for a specific date
  function showEventsForDate(dateStr) {
    const [year, month, day] = dateStr.split('-').map(num => parseInt(num));
    const events = window.utils.getEventsForDay(year, month - 1, day);
    
    if (events.length === 0) {
      showNotification('No events scheduled for this date.');
      return;
    }
    
    const formattedDate = new Date(year, month - 1, day).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    const modalContainer = document.getElementById('modal-container');
    const modalHTML = `
      <div class="modal">
        <div class="modal-header">
          <h3>Events on ${formattedDate}</h3>
          <button class="modal-close" id="close-modal"><i class="fas fa-times"></i></button>
        </div>
        <div class="modal-body">
          ${events.map(event => `
            <div class="event-list-item" data-event-id="${event.id}">
              <div class="event-list-content">
                <div class="event-list-badge">
                  <span class="badge badge-${window.utils.getCategoryColor(event.category)}">${event.category}</span>
                </div>
                <h4>${event.title}</h4>
                <div class="event-list-details">
                  <div><i class="fas fa-clock"></i> ${window.utils.formatTime(event.startTime)} - ${window.utils.formatTime(event.endTime)}</div>
                  <div><i class="fas fa-map-marker-alt"></i> ${event.location}</div>
                  <div><i class="fas fa-users"></i> ${event.clubId ? window.utils.getClubById(event.clubId).name : 'Unknown Club'}</div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
        <div class="modal-footer">
          <button class="btn btn-outline" id="close-date-events">Close</button>
        </div>
      </div>
    `;
    
    modalContainer.innerHTML = modalHTML;
    modalContainer.classList.add('active');
    
    // Add event listeners
    document.getElementById('close-modal').addEventListener('click', closeModal);
    document.getElementById('close-date-events').addEventListener('click', closeModal);
    
    // Add event listeners to event items
    document.querySelectorAll('.event-list-item').forEach(item => {
      item.addEventListener('click', () => {
        const eventId = item.getAttribute('data-event-id');
        closeModal();
        openEventDetails(eventId);
      });
    });
  }
  
  // Show notification
  function showNotification(message) {
    // Check if notification element exists
    let notification = document.getElementById('toast-notification');
    
    if (!notification) {
      // Create notification element
      notification = document.createElement('div');
      notification.id = 'toast-notification';
      notification.className = 'toast-notification';
      document.body.appendChild(notification);
      
      // Add CSS for notification
      const style = document.createElement('style');
      style.textContent = `
        .toast-notification {
          position: fixed;
          bottom: 20px;
          right: 20px;
          background-color: #4338ca;
          color: white;
          padding: 16px 24px;
          border-radius: 8px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          z-index: 1000;
          transform: translateY(100px);
          opacity: 0;
          transition: transform 0.3s, opacity 0.3s;
          max-width: 400px;
        }
        
        .toast-notification.show {
          transform: translateY(0);
          opacity: 1;
        }
      `;
      document.head.appendChild(style);
    }
    
    // Set message
    notification.textContent = message;
    
    // Show notification
    notification.classList.add('show');
    
    // Hide after 3 seconds
    setTimeout(() => {
      notification.classList.remove('show');
    }, 3000);
  }