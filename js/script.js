// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('nav');

navToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
const navLinks = document.querySelectorAll('nav ul li a');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
    });
});

// Back to Top Button
const backToTopButton = document.querySelector('.back-to-top');

// Only add back-to-top functionality if the button exists on the page
if (backToTopButton) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('active');
        } else {
            backToTopButton.classList.remove('active');
        }
    });

    backToTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// County Map Selection
document.addEventListener('DOMContentLoaded', () => {
    const countySelector = document.getElementById('countySelector');
    const countyMap = document.getElementById('countyMap');
    
    if (countySelector && countyMap) {
        // Map URLs for each county with adjusted zoom levels
        const countyMaps = {
            duval: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d447428.5023259787!2d-81.65132442698084!3d30.35017107058261!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88e5b2186a9c2fe7%3A0x82e8248de2583b91!2sDuval%20County%2C%20FL!5e0!3m2!1sen!2sus!4v1714432668038!5m2!1sen!2sus",
            baker: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d447428.5023259787!2d-82.35046304326412!3d30.301896172827487!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88e5c1727fad172f%3A0x8a30120f15988d6a!2sBaker%20County%2C%20FL!5e0!3m2!1sen!2sus!4v1714354734358!5m2!1sen!2sus",
            clay: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d447428.5023259787!2d-82.00436980330273!3d30.09825392808607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88e5df4d38210c89%3A0x1bf2c336599c29fc!2sClay%20County%2C%20FL!5e0!3m2!1sen!2sus!4v1714354783604!5m2!1sen!2sus",
            stjohns: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d447428.5023259787!2d-81.42004287099565!3d29.919751413162625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88e6935b7e0872b5%3A0x65822f68a29c50bb!2sSt.%20Johns%20County%2C%20FL!5e0!3m2!1sen!2sus!4v1714354815059!5m2!1sen!2sus"
        };
        // Add click event listener to each county
        countySelector.addEventListener('click', (e) => {
            if (e.target.classList.contains('county')) {
                // Get the county data attribute
                const county = e.target.getAttribute('data-county');
                
                // Update active class
                document.querySelectorAll('.county').forEach(item => {
                    item.classList.remove('active');
                });
                e.target.classList.add('active');
                
                // Update the map iframe source if county exists in our map object
                if (countyMaps[county]) {
                    countyMap.src = countyMaps[county];
                }
            }
        });
    }
    
    // ===========================================
    // ANALYTICS TRACKING IMPLEMENTATION
    // ===========================================
    
    // Helper function to check if gtag is loaded
    function isGtagLoaded() {
        return typeof gtag === 'function';
    }
    
    // Helper function to track events
    function trackEvent(category, action, label = null) {
        if (isGtagLoaded()) {
            gtag('event', action, {
                'event_category': category,
                'event_label': label
            });
            console.log(`Event tracked: ${category} - ${action} - ${label}`);
        }
    }
    
    // 1. Track phone number clicks
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', () => {
            const phoneNumber = link.getAttribute('href').replace('tel:', '');
            trackEvent('Contact', 'Phone Click', phoneNumber);
        });
    });
    
    // 2. Track email clicks
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', () => {
            const email = link.getAttribute('href').replace('mailto:', '');
            trackEvent('Contact', 'Email Click', email);
        });
    });
    
    // 3. Track contact form submissions
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', () => {
            trackEvent('Contact', 'Form Submission', 'Contact Form');
        });
    }
    
    // 4. Track Cleardata link clicks (scheduler links)
    const cleardataLinks = document.querySelectorAll('a[href*="cleardata.io"]');
    cleardataLinks.forEach(link => {
        link.addEventListener('click', () => {
            const linkURL = link.getAttribute('href');
            trackEvent('External', 'Cleardata Click', linkURL);
        });
    });
});