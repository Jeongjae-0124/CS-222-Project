document.addEventListener('DOMContentLoaded', function () {
    const swipeContainer = document.getElementById('main');
    const hammer = new Hammer(swipeContainer);

    hammer.on('swipeleft swiperight', function (event) {
        if (swipeContainer.dataset.transition === 'idle') {
            const targetPage = getNextPage(event.type);
            applyPageTransition(targetPage);
        }
    });

    // Dummy data for demonstration purposes
    const offersData = [
        {
            title: "Textbook for Sale",
            description: "Lorem ipsum dolor sit amet...",
            price: "$30",
            contact: "seller@example.com",
        },
        // Add more dummy data as needed
    ];

    // Mock data for saved offers
    let savedOffersData = [
        { id: 1, title: 'Saved Offer 1', description: 'Description for Saved Offer 1' },
        { id: 2, title: 'Saved Offer 2', description: 'Description for Saved Offer 2' },
        // Add more saved offers as needed
    ];
    function applyPageTransition(targetPage) {
        document.getElementById('main').dataset.transition = 'in-progress';

        // Apply a fade-out transition effect
        document.getElementById('main').style.opacity = 0;

        // Add a slight delay to allow the transition to take effect before navigating
        setTimeout(function () {
            window.location.href = targetPage + '.html';
        }, 500);
    }
    // Function to display saved offers
    function displaySavedOffers() {
        const savedOffersList = document.getElementById('saved-offers-list');
        savedOffersList.innerHTML = ''; // Clear existing list

        savedOffersData.forEach(offer => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<strong>${offer.title}:</strong> ${offer.description}`;
            savedOffersList.appendChild(listItem);
        });
    }
    document.getElementById('main').addEventListener('transitionend', function () {
        this.style.opacity = 1; // Reset opacity
        this.dataset.transition = 'idle';
    });

    // Function to handle adding an offer to saved offers
    function addToSavedOffers(title, description) {
        const offerId = savedOffersData.length + 1; // Generate a unique ID
        const newOffer = { id: offerId, title, description };
        savedOffersData.push(newOffer);
        displaySavedOffers(); // Refresh the displayed list
    }

    // Function to handle removing an offer from saved offers
    function removeFromSavedOffers(offerId) {
        savedOffersData = savedOffersData.filter(offer => offer.id !== offerId);
        displaySavedOffers(); // Refresh the displayed list
    }

    // Function to dynamically populate offers section
    function displayOffers() {
        const offersSection = document.getElementById("offers");

        offersData.forEach((offer) => {
            const offerElement = document.createElement("div");
            offerElement.classList.add("offer");

            offerElement.innerHTML = `
                <h3>${offer.title}</h3>
                <p>Description: ${offer.description}</p>
                <p>Price: ${offer.price}</p>
                <p>Contact: ${offer.contact}</p>
                <button onclick="addToCart()">Add to Cart</button>
            `;

            offersSection.appendChild(offerElement);
        });
    }

    // Function to dynamically populate user profile section
    function displayUserProfile() {
        const profileSection = document.getElementById("profile");

        const profileElement = document.createElement("div");
        profileElement.classList.add("user-profile");

        profileElement.innerHTML = `
            <img src="User-avatar.png" alt="User Avatar">
            <h3>${userData.username}</h3>
            <p>Email: ${userData.email}</p>
            <p>Description: ${userData.description}</p>
            <button onclick="editProfile()">Edit Profile</button>
        `;

        profileSection.appendChild(profileElement);
    }

    // Function to handle adding an item to the cart (placeholder logic)
    function addToCart() {
        alert('Item added to cart!');
    }

    // Function to handle editing the user profile (placeholder logic)
    function editProfile() {
        alert('Edit profile functionality coming soon!');
    }

    // Function to handle posting a new offer
    function addNewOffer(title, description) {
        const offersContainer = document.getElementById('offers-container');
        const offerDiv = document.createElement('div');
        offerDiv.classList.add('offer');
        offerDiv.innerHTML = `
            <h3>${title}</h3>
            <p>${description}</p>
            <button onclick="addToCart()">Add to Cart</button>
        `;
        offersContainer.appendChild(offerDiv);
    }

    // Handle new message form submission
    const newMessageForm = document.getElementById('new-message-form');

    newMessageForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const messageType = document.getElementById('message-type').value;
        const messageText = document.getElementById('message-text').value;

        if (messageType.trim() !== '' && messageText.trim() !== '') {
            sendMessage('public-messages', messageType, messageText);
            newMessageForm.reset();
        }
    });

    // Additional functionality for direct messages
    const newDirectMessageForm = document.getElementById('new-direct-message-form');

    newDirectMessageForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const recipient = document.getElementById('recipient').value;
        const directMessageText = document.getElementById('direct-message-text').value;

        if (recipient.trim() !== '' && directMessageText.trim() !== '') {
            sendDirectMessage('direct-messages', recipient, directMessageText);
            newDirectMessageForm.reset();
        }
    });

    // Additional functionality for posting new offers
    const addPostForm = document.getElementById('add-post-form');

    addPostForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const offerTitle = document.getElementById('offer-title').value;
        const offerDescription = document.getElementById('offer-description').value;

        if (offerTitle.trim() !== '' && offerDescription.trim() !== '') {
            addNewOffer(offerTitle, offerDescription);
            addToSavedOffers(offerTitle, offerDescription); // Add offer to saved offers
            addPostForm.reset();
        }
    });

    // Call the functions to display content on page load
    displayOffers();
    displayUserProfile();
    displaySavedOffers(); // Call the function to display saved offers
});

function sendMessage(containerId, type, text) {
    const container = document.getElementById(containerId);
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('public-message');
    messageDiv.innerHTML = `
        <p>Type: ${type}</p>
        <p>${text}</p>
    `;
    container.appendChild(messageDiv);
}

function sendDirectMessage(containerId, recipient, text) {
    const container = document.getElementById(containerId);
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('direct-message');
    messageDiv.innerHTML = `
        <p>Recipient: ${recipient}</p>
        <p>${text}</p>
    `;
    container.appendChild(messageDiv);
}
