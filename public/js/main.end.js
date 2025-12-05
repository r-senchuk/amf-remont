/**
 * AMF Group Main JavaScript
 * Modern vanilla JavaScript implementation (no jQuery)
 */

(function() {
    'use strict';

    const Utils = window.AMFUtils;

    // Initialize when DOM is ready
    Utils.ready(function() {
        document.body.classList.remove('loading');

        /* ---------------------------------------------------------------------- */

        /**
         * Scroll to section by ID
         * @param {string} sid - Section ID (format: s2<target_id>)
         * @returns {boolean} - Returns false if scroll was performed, true otherwise
         */
        window.scroll_to_sid = function(sid) {
            if (sid.length > 3) {
                var oper = sid.substring(0, 2);
                if (oper === 's2') {
                    var target_id = sid.substring(2);
                    if (target_id.length > 0) {
                        var target = document.getElementById(target_id);
                        if (target) {
                            setTimeout(function() {
                                Utils.smoothScrollTo(target, 0, 300);
                                
                                var focus_input = target.querySelector('input[name=name]');
                                if (!focus_input) {
                                    var nextSibling = target.nextElementSibling;
                                    if (nextSibling) {
                                        focus_input = nextSibling.querySelector('input[name=name]');
                                    }
                                }
                                if (focus_input) {
                                    setTimeout(function() {
                                        if (target_id !== 'cid48') {
                                            focus_input.focus();
                                        }
                                    }, 600);
                                }
                            }, 300);
                            
                            // Clean up URL hash
                            var url = window.location.href.split('#')[0];
                            history.replaceState(null, null, url);
                            return false;
                        }
                    }
                }
            }
            return true;
        };

        // Handle initial hash in URL
        if (window.location.hash) {
            var sid = window.location.hash.substring(1);
            scroll_to_sid(sid);
        }

        // Handle anchor link clicks
        Utils.on(document, 'click', 'a', function(e) {
            var href = this.getAttribute('href');
            if (href) {
                var i = href.indexOf('#');
                if (i >= 0) {
                    // Close sidenav if open
                    var sidenav = Utils.$q('.sidenav');
                    if (sidenav) {
                        var instance = M.Sidenav.getInstance(sidenav);
                        if (instance && instance.isOpen) {
                            instance.close();
                        }
                    }
                    
                    var sid = href.substring(i + 1);
                    if (scroll_to_sid(sid) === false) {
                        e.preventDefault();
                    }
                }
            }
        });

        /* ---------------------------------------------------------------------- */

        /**
         * Language code helper
         * @param {Object} s - Language strings object
         * @returns {string} - Localized string
         */
        window.lc = function(s) {
            var lang = document.documentElement.getAttribute('lang') || 'uk';
            if (s[lang] !== undefined) {
                return s[lang];
            } else if (s['uk'] !== undefined) {
                return s['uk'];
            } else {
                return '';
            }
        };

        /* ---------------------------------------------------------------------- */

        /**
         * Show form errors and scroll to first error
         * @param {Element|boolean} form - Form element or false
         */
        window.show_error = function(form) {
            if (!form || !Utils.exists(form)) {
                return;
            }

            var scroll_found = false;

            // Find first invalid input
            var invalidInput = form.querySelector('.cvu-input__invalid');
            if (invalidInput && !scroll_found) {
                var offset = Utils.getOffset(invalidInput);
                Utils.smoothScrollTo(invalidInput, -72, 500);
                scroll_found = true;
            }

            // Find first invalid select
            if (!scroll_found) {
                var invalidSelect = form.querySelector('.cvu-select__invalid');
                if (invalidSelect) {
                    Utils.smoothScrollTo(invalidSelect, -72, 500);
                }
            }
        };

        /* ---------------------------------------------------------------------- */

    });

    // Sidenav and scroll-to-top functionality
    Utils.ready(function() {
        // Initialize Materialize sidenav
        var sidenavEl = Utils.$q('.sidenav');
        if (sidenavEl) {
            M.Sidenav.init(sidenavEl, {
                inDuration: 250,
                onCloseStart: function() {
                    var trigger = Utils.$q('.sidenav-trigger');
                    if (trigger) {
                        trigger.classList.remove('active');
                    }
                }
            });

            // Handle dropdown triggers in sidenav
            Utils.on(sidenavEl, 'click', '.dropdown-trigger', function(e) {
                e.preventDefault();
                
                if (this.classList.contains('expanded')) {
                    this.classList.remove('expanded');
                    var nextUl = this.parentElement.nextElementSibling;
                    if (nextUl && nextUl.tagName === 'UL') {
                        nextUl.style.display = 'none';
                    }
                } else {
                    this.classList.add('expanded');
                    var nextUl = this.parentElement.nextElementSibling;
                    if (nextUl && nextUl.tagName === 'UL') {
                        nextUl.style.display = 'block';
                    }
                }
            });
        }

        /* ---------------------------------------------------------------------- */

        /**
         * Show/hide scroll-to-top button
         */
        function olymp_up() {
            var scroll_offset = window.scrollY || window.pageYOffset;
            var olympUpBtn = Utils.$q('#olymp-up');
            
            if (olympUpBtn) {
                if (scroll_offset > 500) {
                    olympUpBtn.classList.add('show');
                } else if (olympUpBtn.classList.contains('show')) {
                    olympUpBtn.classList.remove('show');
                }
            }
        }

        // Initial check
        olymp_up();

        // Update on scroll
        window.addEventListener('scroll', olymp_up);

        // Scroll to top on click
        Utils.on(document, 'click', '#olymp-up.show', function(e) {
            e.preventDefault();
            Utils.smoothScrollTo(0, 0, 300);
        });

        /* ---------------------------------------------------------------------- */

    });

})();
