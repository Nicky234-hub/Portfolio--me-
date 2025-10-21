document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Navigation (Hamburger Menu) ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const mainContent = document.querySelector('main'); // Get the main content area

    // Function to close the sidebar
    const closeNav = () => {
        navLinks.classList.remove('active');
    }

    // Event listener to open the sidebar
    hamburger.addEventListener('click', (event) => {
        // Stop this click from also triggering the 'mainContent' click event
        event.stopPropagation();
        navLinks.classList.add('active');
    });

    // Event listener to close sidebar when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', closeNav);
    });

    // NEW: Event listener to close the sidebar when the main content is clicked
    mainContent.addEventListener('click', () => {
        // Check if the nav is currently active before trying to close it
        if (navLinks.classList.contains('active')) {
            closeNav();
        }
    });

    // --- Contact Form Submission ---
    const form = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    async function handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        
        try {
            const response = await fetch(event.target.action, {
                method: form.method,
                body: data,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                formStatus.textContent = "Thanks! I'll get back to you soon.";
                formStatus.style.color = '#007BFF';
                form.reset();
            } else {
                formStatus.textContent = "Oops! There was a problem submitting your form.";
                formStatus.style.color = 'red';
            }
        } catch (error) {
            formStatus.textContent = "Oops! There was a problem submitting your form.";
            formStatus.style.color = 'red';
        }
    }

    form.addEventListener("submit", handleSubmit);

});
