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

            successMessage.classList.add('visible');
            form.style.display = 'none';

            emailInput.value = '';
        });
    }
});
