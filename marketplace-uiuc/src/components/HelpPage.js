// src/components/HelpPage.js
import React from 'react'; 

const HelpPage = () => {
  return (
    <div className="container mt-4">
      <div className="jumbotron bg-light help-jumbotron shadow">
        <h2 className="display-4 text-center mb-4">Help Page</h2>
        <p className="lead text-center">
          Welcome to the Help Page! If you have any questions or need assistance,
          feel free to reach out.
        </p>

        <section className="faq-section">
          <h4 className="text-center mb-3">Frequently Asked Questions</h4>
          <ol>
            <li>
              <strong>How do I create a new posting?</strong>
              <p>
                To create a new posting, navigate to the "Postings" page and click on
                the "New Posting" button. Fill out the required information, including
                title, description, price, and contact details, then submit the form.
              </p>
            </li>
            <li>
              <strong>Can I edit or delete my posting?</strong>
              <p>
                Yes, you can. On the "Postings" page, find your posting. To edit, click
                on the "Edit" button and update the information. To delete, use the "Delete"
                button to remove your posting.
              </p>
            </li>
            <li>
              <strong>What information should I include in my posting?</strong>
              <p>
                Provide clear details about your item or service, such as a descriptive
                title, a comprehensive description, the price, and a valid contact email.
                Adding images can also enhance your posting.
              </p>
            </li>
            {/* Add more questions and answers as needed */}
          </ol>
        </section>

        <section className="contact-section mt-4">
          <h4 className="text-center mb-3">Contact Support</h4>
          <p className="text-center">
            If you still have questions or need further assistance, please contact
            our support team at{' '}
            <a href="mailto:support@example.com">support@example.com</a>.
          </p>
        </section>
      </div>
    </div>
  );
};

export default HelpPage;
