// Mock Database for bookings

// A dictionary where key is "YYYY-MM-DD" and value is an object mapping barber names to an array of booked times
export const mockBookings = {};

export const getAvailableTimeSlots = (dateStr, barberName, allTimeSlots) => {
  if (!dateStr || !barberName) return allTimeSlots;
  
  const dayBookings = mockBookings[dateStr] || {};
  const barberBookedTimes = dayBookings[barberName] || [];
  
  return allTimeSlots.filter(time => !barberBookedTimes.includes(time));
};

export const cancelBooking = (dateStr, barberName, time) => {
  if (mockBookings[dateStr] && mockBookings[dateStr][barberName]) {
    mockBookings[dateStr][barberName] = mockBookings[dateStr][barberName].filter(t => t !== time);
  }
};
