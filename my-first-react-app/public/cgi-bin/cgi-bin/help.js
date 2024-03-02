document.addEventListener('DOMContentLoaded', function () {
    // FAQ items
    const faqItems = document.querySelectorAll('.faq-item');

    // Add click event listener to each FAQ item
    faqItems.forEach((item) => {
        item.addEventListener('click', function () {
            const answer = this.querySelector('.faq-answer');
            toggleAnswer(answer);
        });
    });

    // Chatbot input, container, and clear button
    const searchInput = document.getElementById('searchInput');
    const chatContainer = document.getElementById('chatContainer');
    const clearButton = document.getElementById('clearButton');

    // Add keypress event listener to the input
    searchInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            const userInput = searchInput.value.trim();

            // Check if the user input is not empty
            if (userInput !== '') {
                appendUserMessage(userInput);
                // Add logic here to handle user input and generate bot response
                const botResponse = generateBotResponse(userInput);
                appendBotMessage(botResponse);

                // Clear the input
                searchInput.value = '';
            }
        }
    });

    // Add click event listener to the clear button
    clearButton.addEventListener('click', function () {
        clearChat();
    });

    // Function to toggle FAQ answer visibility
    function toggleAnswer(answer) {
        if (answer.style.display === 'block') {
            answer.style.display = 'none';
        } else {
            answer.style.display = 'block';
        }
    }

    // Function to append user message to the chat container
    function appendUserMessage(message) {
        const userMessage = document.createElement('div');
        userMessage.className = 'chat-item user-message';
        userMessage.textContent = message;
        chatContainer.appendChild(userMessage);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    // Function to append bot message to the chat container
    function appendBotMessage(message) {
        const botMessage = document.createElement('div');
        botMessage.className = 'chat-item bot-message';
        botMessage.textContent = message;
        chatContainer.appendChild(botMessage);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    // Function to generate a more dynamic bot response
    function generateBotResponse(userInput) {
    // Simple greetings
    const greetings = ['Hello!', 'Hi there!', 'Greetings!'];

    // Responses based on user input
    const responses = {
        'how are you': 'I am just a bot, but thanks for asking!',
        'help': 'Sure, I can help! Ask me anything.',
        'bye': 'Goodbye! If you have more questions, feel free to ask.',
        'about yourself': "I'm a virtual assistant here to assist you with any questions you may have.",
        'features': 'Our platform offers a variety of features including posting and editing offers, user profiles, and messaging.',
        'security': 'Your security is important to us. We use advanced encryption to protect your data.',
        'contact support': 'You can contact our support team through the "Help" section on the main website.',
        'latest updates': 'For the latest updates and announcements, please check our official blog or social media channels.',
        'account recovery': 'If you have trouble accessing your account, you can use the "Forgot Password" feature on the login page.',
        'mobile app': 'Yes, we have a mobile app available for both Android and iOS platforms.',
        'privacy policy': 'Our privacy policy outlines how we collect, use, and protect your personal information. You can find it in the "Privacy Policy" section.',
        'terms of service': 'Please review our terms of service for information on the rules and guidelines when using our platform.',
        'payment methods': 'We accept payments through major credit cards and PayPal for secure transactions.',
        'community guidelines': 'Our community guidelines ensure a positive and respectful environment for all users. Violating these guidelines may result in account suspension.',
        'data deletion': 'You can request the deletion of your account and data through the account settings or by contacting our support team.',
        'report abuse': 'If you encounter any abusive behavior or content, please use the reporting feature or contact our support for prompt action.',
        'explore categories': 'Browse through different categories to discover a variety of offers from our diverse community of users.',
        'how to rate': 'After completing a transaction, you can leave a rating and feedback for the user in the "My Transactions" section.',
        // Add more responses based on user input
    };

    const lowercaseInput = userInput.toLowerCase();

    // Check if the bot has a predefined response for the user's input
    for (const [key, value] of Object.entries(responses)) {
        if (lowercaseInput.includes(key)) {
            return `Bot: ${value}`;
        }
    }

    // If no predefined response, return a random greeting
    const randomGreeting = getRandomItem(greetings);
    return `Bot: ${randomGreeting}`;
}

function getRandomItem(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}
    // Function to clear the chat
    function clearChat() {
        chatContainer.innerHTML = '';
    }
});
