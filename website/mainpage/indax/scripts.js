// JavaScript for any interactive elements can go here
// Example: Change text on button click

document.addEventListener("DOMContentLoaded", () => {
    const welcomeMessage = document.querySelector('.welcome-section h1');
    
    welcomeMessage.addEventListener('click', () => {
        welcomeMessage.textContent = "Have a great day!";
});
});