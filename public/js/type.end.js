/**
 * AMF Group Type-Specific JavaScript
 * Form handling and Materialize component initialization
 * Modern vanilla JavaScript implementation (no jQuery)
 */

(function() {
    'use strict';

    const Utils = window.AMFUtils;

    Utils.ready(function() {
        const triggerRoute = "/4ktransReserve";
        const stage = "/prod";
        const apiUrl = `https://4jtzwjgt99.execute-api.eu-central-1.amazonaws.com${stage}${triggerRoute}`;

        // Store first passenger HTML if exists
        var firstPassenger = Utils.$q('#first_passenger');
        if (firstPassenger) {
            window.first_passenger_empty_html = firstPassenger.innerHTML;
        }

        // Initialize Materialize form selects
        var selects = Utils.$qa('.cvu-select > select');
        selects.forEach(function(select) {
            M.FormSelect.init(select);
        });

        // Handle cart form submission
        Utils.on(document, 'click', 'form.cvu-form #cart_send', function(e) {
            e.preventDefault();
            
            var formEl = Utils.closest(this, 'form.cvu-form');
            if (!formEl) return;

            // checkData should be defined elsewhere, or we'll need to create it
            var error = (typeof checkData === 'function') ? checkData(formEl) : false;
            
            if (!error) {
                var cartForm = document.getElementById("cart_form");
                if (!cartForm) return;

                let form = new FormData(cartForm);
                const data = JSON.stringify(Object.fromEntries(form.entries()));

                var buttonEl = formEl.querySelector('.cvu-form_send');
                var buttonMemory = buttonEl ? buttonEl.innerHTML : '';

                if (buttonEl) {
                    buttonEl.innerHTML = '<div class="lds-ellipsis"><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div></div>';
                }

                const initDetails = {
                    method: 'PUT',
                    body: data,
                    mode: "cors"
                };

                fetch(apiUrl, initDetails)
                    .then(function(respData) {
                        setTimeout(function() {
                            formEl.innerHTML = '<div class="cvu_feed">Надіслано</div>';
                            
                            var bookFormCont = document.querySelector('div[id=book_form_cont]');
                            if (bookFormCont) {
                                Utils.smoothScrollTo(bookFormCont, -45, 500);
                            }
                        }, 2000);
                    })
                    .catch(function(err) {
                        console.log('sending error\n', err);
                        // Restore button on error
                        if (buttonEl && buttonMemory) {
                            buttonEl.innerHTML = buttonMemory;
                        }
                    });
            } else {
                if (typeof show_error === 'function') {
                    show_error(formEl);
                }
            }
        });

        // -------------------------------------------------------------------------

        // Input masking for TTN field (simple implementation)
        var ttnInput = Utils.$q('input[name=ttn]');
        if (ttnInput) {
            ttnInput.addEventListener('input', function(e) {
                var value = this.value.replace(/\D/g, ''); // Remove non-digits
                var formatted = '';
                
                // Format: 00 0000 0000 0000
                if (value.length > 0) {
                    formatted = value.substring(0, 2);
                    if (value.length > 2) {
                        formatted += ' ' + value.substring(2, 6);
                    }
                    if (value.length > 6) {
                        formatted += ' ' + value.substring(6, 10);
                    }
                    if (value.length > 10) {
                        formatted += ' ' + value.substring(10, 14);
                    }
                }
                
                this.value = formatted;
            });
        }

        // Handle CRM search button
        Utils.on(document, 'click', 'form.cvu-form #crm_search_go', function(e) {
            e.preventDefault();
            var crmForm = document.querySelector('form.cvu-form#crm_form');
            if (crmForm) {
                crmForm.submit();
            }
        });

        // Handle CRM form submission
        Utils.on(document, 'submit', 'form.cvu-form#crm_form', function(e) {
            var form = Utils.closest(this, 'form.cvu-form');
            if (!form) return;

            var error = (typeof checkData === 'function') ? checkData(form) : false;
            if (error) {
                e.preventDefault();
                return false;
            }
        });

        // -------------------------------------------------------------------------

    });

    // PhotoSwipe integration (legacy - check if still used)
    Utils.ready(function() {
        var pswp = Utils.$q('.pswp');
        var photoswipe = Utils.$q('.photoswipe');
        
        if (pswp && photoswipe && typeof PhotoSwipe !== 'undefined' && typeof PhotoSwipeUI_Default !== 'undefined') {
            var images = [];
            var items = [];
            
            var photoElements = Utils.$qa('amp-img.photoswipe_zoom');
            photoElements.forEach(function(element) {
                var attr = element.getAttribute('itemprop');
                var href = element.getAttribute('src');
                var sizeData = element.getAttribute('data-size');
                
                if (sizeData) {
                    var size = sizeData.split('x');
                    var width = size[0];
                    var height = size[1];
                    
                    var item = {
                        src: href,
                        w: width,
                        h: height
                    };
                    
                    var figcaption = element.nextElementSibling;
                    if (figcaption && figcaption.tagName === 'FIGCAPTION') {
                        item.title = figcaption.innerHTML;
                    }
                    
                    items.push(item);
                }
            });

            // Preload images
            items.forEach(function(value, index) {
                images[index] = new Image();
                images[index].src = value.src;
            });

            // Handle photo click
            Utils.on(document, 'click', 'amp-img.photoswipe_zoom', function(e) {
                e.preventDefault();
                
                var index = Array.from(photoElements).indexOf(this);
                var options = {
                    index: index,
                    bgOpacity: 0.7,
                    showHideOpacity: true
                };
                
                var lightBox = new PhotoSwipe(pswp, PhotoSwipeUI_Default, items, options);
                lightBox.init();
            });
        }
    });

    // Initialize collapsible components
    Utils.ready(function() {
        var collapsibles = Utils.$qa('.collapsible');
        if (collapsibles.length > 0) {
            M.Collapsible.init(collapsibles, {
                accordion: false
            });
        }
    });

    // Form enhancements
    Utils.ready(function() {
        // Auto-focus/blur for question textarea
        var questionTextarea = Utils.$q('textarea[name=question]');
        if (questionTextarea && questionTextarea.value) {
            questionTextarea.focus();
            questionTextarea.blur();
        }

        // Handle Enter key in form inputs
        Utils.on(document, 'keyup', 'form.cvu-form .cvu-input input', function(e) {
            e = e || window.event;
            if (e.keyCode === 13) { // Enter key
                var submitBtn = document.querySelector('form.cvu-form .cvu_submit');
                if (submitBtn) {
                    submitBtn.click();
                }
            }
        });

        // Feedback form handler (placeholder)
        Utils.on(document, 'click', 'form.cvu-form #feedback_send', function(e) {
            e.preventDefault();
            console.log("feedback");
            // TODO: Implement feedback form submission
        });
    });

})();
