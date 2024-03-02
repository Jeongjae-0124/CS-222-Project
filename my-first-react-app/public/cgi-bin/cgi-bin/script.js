document.addEventListener('DOMContentLoaded', function () {
    const sellForm = document.getElementById('sell-form');
    const postsSection = document.getElementById('posts');

    sellForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Get form values
        const itemName = sellForm.querySelector('#item-name').value;
        const itemDescription = sellForm.querySelector('#item-description').value;
        const itemPrice = sellForm.querySelector('#item-price').value;
        const itemImage = sellForm.querySelector('#item-image').files[0];

        // Create a new post element
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `
            <h3>${itemName}</h3>
            <p>${itemDescription}</p>
            <p>Price: $${itemPrice}</p>
        `;

        // Display the image preview
        if (itemImage) {
            const imagePreview = document.createElement('a');
            imagePreview.href = URL.createObjectURL(itemImage);
            imagePreview.setAttribute('data-lightbox', 'item-images');
            imagePreview.innerHTML = `
                <img src="${URL.createObjectURL(itemImage)}" alt="Item Image">
            `;
            postElement.appendChild(imagePreview);
        }

        // Append the new post to the posts section
        postsSection.appendChild(postElement);

        // Clear the form
        sellForm.reset();
        clearImagePreview();
    });

    // Function to clear the image preview
    function clearImagePreview() {
        const imagePreview = document.getElementById('image-preview');
        if (imagePreview) {
            imagePreview.remove();
        }
    }

    // Function to update image preview on file selection
    sellForm.querySelector('#item-image').addEventListener('change', function () {
        clearImagePreview();

        const itemImage = sellForm.querySelector('#item-image').files[0];
        if (itemImage) {
            const imagePreview = document.createElement('img');
            imagePreview.src = URL.createObjectURL(itemImage);
            imagePreview.alt = 'Image Preview';
            imagePreview.id = 'image-preview';
            sellForm.appendChild(imagePreview);
        }
    });
});
