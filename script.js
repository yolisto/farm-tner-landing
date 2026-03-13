document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('beta-form');
    var emailInput = document.getElementById('email-input');
    var successMessage = document.getElementById('success-message');

    if (form && emailInput && successMessage) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            var email = emailInput.value.trim();

            if (!email) {
                return;
            }

            console.log('Beta signup email:', email);

            if (typeof gtag === 'function') {
                gtag('event', 'beta_signup', { event_category: 'engagement', event_label: 'cta_form' });
            }
            if (typeof hj === 'function') {
                hj('event', 'beta_signup');
            }

            successMessage.classList.add('visible');
            form.style.display = 'none';

            emailInput.value = '';
        });
    }
});
