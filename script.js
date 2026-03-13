document.addEventListener('DOMContentLoaded', function () {
    var ctaPrimary = document.getElementById('cta-hero-primary');
    var ctaSecondary = document.getElementById('cta-hero-secondary');
    var quickCards = document.querySelectorAll('.quick-card');
    var recommendedCards = document.querySelectorAll('.recommended-card');
    var ctaLinks = document.querySelectorAll('a[href="#cta"]');

    var lastLeadSourceLabel = null;
    var leadCtaLabelInput = document.getElementById('lead-cta-label');

    function setLeadSourceLabel(label) {
        if (!label) return;
        lastLeadSourceLabel = label;
        if (leadCtaLabelInput) {
            leadCtaLabelInput.value = label;
        }
    }

    function trackCtaClick(label) {
        setLeadSourceLabel(label);
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
                if (card.getAttribute('href') === '#cta') {
                    setLeadSourceLabel(label);
                }
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
                if (card.getAttribute('href') === '#cta') {
                    setLeadSourceLabel(label);
                }
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
    var errorMessage = document.getElementById('error-message');
    var submitButton = form ? form.querySelector('button[type="submit"]') : null;

    function setMessage(el, msg) {
        if (!el) return;
        if (!msg) {
            el.textContent = '';
            el.classList.remove('visible');
            return;
        }
        el.textContent = msg;
        el.classList.add('visible');
    }

    function hydrateLeadMetaFields() {
        var pageUrlInput = document.getElementById('lead-page-url');
        var referrerInput = document.getElementById('lead-referrer');
        var subjectInput = document.getElementById('lead-subject');
        var utmSourceInput = document.getElementById('lead-utm-source');
        var utmMediumInput = document.getElementById('lead-utm-medium');
        var utmCampaignInput = document.getElementById('lead-utm-campaign');
        var utmContentInput = document.getElementById('lead-utm-content');
        var utmTermInput = document.getElementById('lead-utm-term');

        if (pageUrlInput) pageUrlInput.value = window.location.href;
        if (referrerInput) referrerInput.value = document.referrer || '';

        if (subjectInput && lastLeadSourceLabel) {
            subjectInput.value = 'Farm-tner lead: ' + lastLeadSourceLabel;
        }

        var params = new URLSearchParams(window.location.search || '');
        if (utmSourceInput) utmSourceInput.value = params.get('utm_source') || '';
        if (utmMediumInput) utmMediumInput.value = params.get('utm_medium') || '';
        if (utmCampaignInput) utmCampaignInput.value = params.get('utm_campaign') || '';
        if (utmContentInput) utmContentInput.value = params.get('utm_content') || '';
        if (utmTermInput) utmTermInput.value = params.get('utm_term') || '';

        if (leadCtaLabelInput && !leadCtaLabelInput.value) {
            leadCtaLabelInput.value = lastLeadSourceLabel || 'cta_form';
        }
    }

    if (form && emailInput && successMessage) {
        if (ctaLinks && ctaLinks.length) {
            ctaLinks.forEach(function (link) {
                link.addEventListener('click', function () {
                    var label = link.getAttribute('data-ga-label') || link.textContent || 'cta_link';
                    setLeadSourceLabel(label.trim());
                });
            });
        }

        form.addEventListener('submit', function (e) {
            e.preventDefault();

            setMessage(errorMessage, '');

            if (!emailInput.checkValidity()) {
                emailInput.reportValidity();
                return;
            }

            if (typeof gtag === 'function') {
                gtag('event', 'beta_signup', { event_category: 'engagement', event_label: 'cta_form' });
            }
            if (typeof hj === 'function') {
                hj('event', 'beta_signup');
            }

            hydrateLeadMetaFields();

            var originalButtonText = submitButton ? submitButton.textContent : null;
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = 'Sending...';
            }

            fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: { 'Accept': 'application/json' }
            })
                .then(function (res) {
                    return res.json().catch(function () { return null; }).then(function (json) {
                        return { ok: res.ok, status: res.status, json: json };
                    });
                })
                .then(function (result) {
                    if (result.ok) {
                        successMessage.classList.add('visible');
                        form.style.display = 'none';
                        setMessage(errorMessage, '');
                        emailInput.value = '';
                        if (typeof gtag === 'function') {
                            gtag('event', 'beta_signup_success', { event_category: 'engagement', event_label: lastLeadSourceLabel || 'cta_form' });
                        }
                        if (typeof hj === 'function') {
                            hj('event', 'beta_signup_success');
                        }
                        return;
                    }

                    var message = 'Submit failed. Please try again.';
                    if (result && result.json) {
                        if (result.json.error) {
                            message = result.json.error;
                        } else if (Array.isArray(result.json.errors) && result.json.errors.length && result.json.errors[0].message) {
                            message = result.json.errors[0].message;
                        }
                    }
                    setMessage(errorMessage, message);

                    if (typeof gtag === 'function') {
                        gtag('event', 'beta_signup_error', { event_category: 'engagement', event_label: String(result.status || '') });
                    }
                    if (typeof hj === 'function') {
                        hj('event', 'beta_signup_error');
                    }
                })
                .catch(function () {
                    setMessage(errorMessage, 'Network error. Please try again.');
                    if (typeof gtag === 'function') {
                        gtag('event', 'beta_signup_error', { event_category: 'engagement', event_label: 'network' });
                    }
                    if (typeof hj === 'function') {
                        hj('event', 'beta_signup_error_network');
                    }
                })
                .finally(function () {
                    if (submitButton) {
                        submitButton.disabled = false;
                        submitButton.textContent = originalButtonText || submitButton.textContent;
                    }
                });
        });
    }
});
