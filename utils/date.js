// Create a new Date object for the current date
const currentDate = new Date();

// Get the current day of the year
const dayOfYear = getDayOfYear(currentDate);

// Function to calculate the day of the year
function getDayOfYear(date) {
	const startOfYear = new Date(date.getFullYear(), 0, 0);
	const diff = date - startOfYear;
	const oneDay = 1000 * 60 * 60 * 24; // milliseconds in a day
	return Math.floor(diff / oneDay);
}

console.log('Day of the year:', dayOfYear);

module.exports = {
	getDayOfYear,
};
