document.addEventListener('DOMContentLoaded', function () {
    var ctaPrimary = document.getElementById('cta-hero-primary');
    var ctaSecondary = document.getElementById('cta-hero-secondary');
    var quickCards = document.querySelectorAll('.quick-card');
    var recommendedCards = document.querySelectorAll('.recommended-card');

    function trackCtaClick(label) {
        if (typeof gtag === 'function') {
            gtag('event', 'cta_click', { event_category: 'engagement', event_label: label });
        }
        if (typeof hj === 'function') {
            hj('event', 'cta_click_' + label.replace(/\s/g, '_'));
        }
    }

    if (ctaPrimary) {
        ctaPrimary.addEventListener('click', function () { trackCtaClick(ctaPrimary.getAttribute('data-ga-label') || 'hero_primary'); });
    }
    if (ctaSecondary) {
        ctaSecondary.addEventListener('click', function () { trackCtaClick(ctaSecondary.getAttribute('data-ga-label') || 'hero_secondary'); });
    }

    if (quickCards && quickCards.length) {
        quickCards.forEach(function (card) {
            card.addEventListener('click', function () {
                var label = card.getAttribute('data-ga-label') || card.getAttribute('data-qa-id') || 'quick_action';
                if (typeof gtag === 'function') {
                    gtag('event', 'tab_click', { event_category: 'engagement', event_label: label });
                }
                if (typeof hj === 'function') {
                    hj('event', 'tab_click_' + label.replace(/\s/g, '_'));
                }
            });
        });
    }

    if (recommendedCards && recommendedCards.length) {
        recommendedCards.forEach(function (card) {
            card.addEventListener('click', function () {
                var label = card.getAttribute('data-ga-label') || 'recommended';
                if (typeof gtag === 'function') {
                    gtag('event', 'recommended_click', { event_category: 'engagement', event_label: label });
                }
                if (typeof hj === 'function') {
                    hj('event', 'recommended_click_' + label.replace(/\s/g, '_'));
                }
            });
        });
    }

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
