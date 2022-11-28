// function to validate time. Must be in format HH:MM
export const validateTime = (time: string) => {
  const timeRegex = new RegExp('^([01]?[0-9]|2[0-3]):[0-5][0-9]$');
  return timeRegex.test(time);
}

export const validateDay = (day: string) => {
  // validate day value case insensitive:
  return !(day.toLowerCase() !== 'monday' && day.toLowerCase() !== 'tuesday' && day.toLowerCase() !== 'wednesday' && day.toLowerCase() !== 'thursday' && day.toLowerCase() !== 'friday' && day.toLowerCase() !== 'saturday' && day.toLowerCase() !== 'sunday');
}
