const timestamp = { seconds: 1689769983, nanoseconds: 906000000 };
const date = new Date(timestamp.seconds * 1000); // Convert seconds to milliseconds

// Format the date as a readable string
const formattedDate = date.toLocaleDateString(); // Get the date part (e.g., "7/19/2023" for "July 19, 2023")
const formattedTime = date.toLocaleTimeString(); // Get the time part (e.g., "8:38:21 PM" for "8:38:21 PM UTC")

let second= new Date().getSeconds();
console.log("second",second)

// Get the seconds directly from the timestamp
const seconds = timestamp.seconds % 60;

console.log("Readable seconds:", seconds);

console.log("Readable Date:", formattedDate);
console.log("Readable Time:", formattedTime);