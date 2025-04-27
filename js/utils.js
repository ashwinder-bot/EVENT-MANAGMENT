/**
 * Utility functions for the Bennett University Event Management System
 */

// Format date to display in UI
function formatDate(date) {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
    
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
  
  // Format time to display in UI
  function formatTime(date) {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
    
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  }
  
  // Format date and time together
  function formatDateTime(date) {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
    
    return `${formatDate(date)} at ${formatTime(date)}`;
  }
  
  // Get day and month for calendar display
  function getCalendarDate(date) {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
    
    return {
      day: date.getDate(),
      month: date.toLocaleString('en-US', { month: 'short' })
    };
  }
  
  // Check if a date is today
  function isToday(date) {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
    
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  }
  
  // Check if an event is upcoming
  function isUpcoming(eventDate) {
    if (!(eventDate instanceof Date)) {
      eventDate = new Date(eventDate);
    }
    
    const now = new Date();
    return eventDate > now;
  }
  
  // Get status badge color based on event status
  function getStatusColor(status) {
    const statusColors = {
      draft: 'neutral',
      pending: 'warning',
      approved: 'success',
      rejected: 'danger',
      cancelled: 'danger',
      completed: 'primary'
    };
    
    return statusColors[status] || 'neutral';
  }
  
  // Get category badge color
  function getCategoryColor(category) {
    const categoryColors = {
      academic: 'primary',
      cultural: 'secondary',
      sports: 'success',
      technical: 'primary',
      workshop: 'warning',
      seminar: 'info',
      competition: 'danger',
      other: 'neutral'
    };
    
    return categoryColors[category] || 'neutral';
  }
  
  // Format relative time for notifications
  function timeAgo(date) {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
    
    const seconds = Math.floor((new Date() - date) / 1000);
    
    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) {
      return interval === 1 ? '1 year ago' : `${interval} years ago`;
    }
    
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      return interval === 1 ? '1 month ago' : `${interval} months ago`;
    }
    
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
      return interval === 1 ? '1 day ago' : `${interval} days ago`;
    }
    
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
      return interval === 1 ? '1 hour ago' : `${interval} hours ago`;
    }
    
    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
      return interval === 1 ? '1 minute ago' : `${interval} minutes ago`;
    }
    
    return 'Just now';
  }
  
  // Get club by ID
  function getClubById(clubId) {
    return window.appData.clubs.find(club => club.id === clubId);
  }
  
  // Get event by ID
  function getEventById(eventId) {
    return window.appData.events.find(event => event.id === eventId);
  }
  
  // Filter events by category
  function filterEventsByCategory(events, category) {
    if (!category || category === 'all') {
      return events;
    }
    return events.filter(event => event.category === category);
  }
  
  // Filter events by club
  function filterEventsByClub(events, clubId) {
    if (!clubId || clubId === 'all') {
      return events;
    }
    return events.filter(event => event.clubId === clubId);
  }
  
  // Sort events by date
  function sortEventsByDate(events, ascending = true) {
    return [...events].sort((a, b) => {
      const dateA = new Date(a.startTime);
      const dateB = new Date(b.startTime);
      return ascending ? dateA - dateB : dateB - dateA;
    });
  }
  
  // Get upcoming events
  function getUpcomingEvents(limit = null) {
    const now = new Date();
    let upcoming = window.appData.events
      .filter(event => new Date(event.startTime) > now && event.status === 'approved')
      .sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
    
    if (limit) {
      upcoming = upcoming.slice(0, limit);
    }
    
    return upcoming;
  }
  
  // Check if user is registered for an event
  function isUserRegistered(userId, eventId) {
    const event = getEventById(eventId);
    return event && event.attendees.includes(userId);
  }
  
  // Check if user is a member of a club
  function isClubMember(userId, clubId) {
    const club = getClubById(clubId);
    return club && (club.memberIds.includes(userId) || club.adminIds.includes(userId));
  }
  
  // Check if user is an admin of a club
  function isClubAdmin(userId, clubId) {
    const club = getClubById(clubId);
    return club && club.adminIds.includes(userId);
  }
  
  // Generate calendar days for a month
  function generateCalendarDays(year, month) {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    // Get days from previous month to fill in first week
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    const prevMonthDays = [];
    for (let i = prevMonthLastDay - startingDayOfWeek + 1; i <= prevMonthLastDay; i++) {
      prevMonthDays.push({
        day: i,
        month: month - 1,
        year,
        isCurrentMonth: false
      });
    }
    
    // Current month days
    const currentMonthDays = [];
    for (let i = 1; i <= daysInMonth; i++) {
      currentMonthDays.push({
        day: i,
        month,
        year,
        isCurrentMonth: true
      });
    }
    
    // Next month days to fill out last week
    const totalDaysSoFar = prevMonthDays.length + currentMonthDays.length;
    const nextMonthDays = [];
    const daysToAdd = (7 - (totalDaysSoFar % 7)) % 7;
    
    for (let i = 1; i <= daysToAdd; i++) {
      nextMonthDays.push({
        day: i,
        month: month + 1,
        year,
        isCurrentMonth: false
      });
    }
    
    return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
  }
  
  // Get events for a specific day
  function getEventsForDay(year, month, day) {
    const startDate = new Date(year, month, day, 0, 0, 0);
    const endDate = new Date(year, month, day, 23, 59, 59);
    
    return window.appData.events.filter(event => {
      const eventDate = new Date(event.startTime);
      return eventDate >= startDate && eventDate <= endDate;
    });
  }
  
  // Generate random ID
  function generateId(prefix = '') {
    return `${prefix}${Date.now().toString(36)}${Math.random().toString(36).substr(2, 5)}`;
  }
  
  // Get user-friendly role name
  function getUserRoleName(role) {
    const roleNames = {
      student: 'Student',
      clubAdmin: 'Club Administrator',
      universityAdmin: 'University Administrator'
    };
    
    return roleNames[role] || role;
  }
  
  // Export utilities to window
  window.utils = {
    formatDate,
    formatTime,
    formatDateTime,
    getCalendarDate,
    isToday,
    isUpcoming,
    getStatusColor,
    getCategoryColor,
    timeAgo,
    getClubById,
    getEventById,
    filterEventsByCategory,
    filterEventsByClub,
    sortEventsByDate,
    getUpcomingEvents,
    isUserRegistered,
    isClubMember,
    isClubAdmin,
    generateCalendarDays,
    getEventsForDay,
    generateId,
    getUserRoleName
  }; 