(function ($) {
    $.fn.mercuryuiAccordion = function (action, options) {
        var settings = $.extend({
            accordionClass: '.accordion',
            accordionTrigger: '.accordion--button',
            accordionOpen: 'accordion-is-shown',
            accordionId: null,
            beforeOpen: null,
            afterOpen: null,
            beforeClose: null,
            afterClose: null
        }, options);

        var accordion = this;
        var accordionClass = settings.accordionClass;
        var accordionTrigger = settings.accordionTrigger;
        var accordionOpen = settings.accordionOpen;
        var accordionId = settings.accordionId;
        if (accordion.selector.length > 0) {
            accordionId = accordion.selector;
        }
        var beforeOpen = settings.beforeOpen;
        var afterOpen = settings.afterOpen;
        var beforeClose = settings.beforeClose;
        var afterClose = settings.afterClose;

        $(accordionTrigger).on('click', function (e) {
            e.preventDefault();
            var accordionTarget = $(this).attr('aria-controls');
            var accordionId = '#' + accordionTarget;
            toggleAccordion(accordionId);
            $(accordionTrigger).each(function(){
                $(this).attr('aria-selected', 'false');
            });
            $(this).attr('aria-selected', 'true');
        });

        $(accordionTrigger).on('focus', function () {
            $(accordionTrigger).each(function(){
                $(this).attr('aria-selected', 'false');
            });
            $(this).attr('aria-selected', 'true');
        });

        $(accordionTrigger).on('blur', function () {
            $(this).attr('aria-selected', 'false');
        });

        function toggleAccordion(id) {
            if ($(id).closest(accordionClass).hasClass(accordionOpen)) {
                closeAccordion(id);
            }
            else {
                openAccordion(id);
            }
        }

        function closeAccordion(id) {
            if (beforeClose !== null && $.isFunction(beforeClose)) {
                beforeClose.call(this);
            }
            $(id).closest(accordionClass).removeClass(accordionOpen);
            $(id).attr('aria-hidden', 'true');
            $(id).attr('aria-expanded', 'false');
            $(id).attr('tabindex', '-1');
            setTimeout(function() {
                if (afterClose !== null && $.isFunction(afterClose)) {
                    afterClose.call(this);
                }
            }, 200);
        }

        function openAccordion(id) {
            if (beforeOpen !== null && $.isFunction(beforeOpen)) {
                beforeOpen.call(this);
            }
            $(id).closest(accordionClass).addClass(accordionOpen);
            $(id).attr('aria-hidden', 'false');
            $(id).attr('aria-expanded', 'true');
            $(id).attr('tabindex', '0');
            setTimeout(function() {
                if (afterOpen !== null && $.isFunction(afterOpen)) {
                    afterOpen.call(this);
                }
            }, 200);
        }

        if (action !== null) {
            if (action === 'close') {
                closeAccordion(accordionId);
            }
            if (action === 'open') {
                openAccordion(accordionId);
            }
        }
    };
}(jQuery));
(function ($) {
    $.fn.mercuryuiDropdown = function (action,options) {
        var settings = $.extend({
            dropdownClass: '.dropdown',
            dropdownOpen: 'dropdown-is-open',
            dropdownTrigger: '.dropdown--button',
            dropdownList: '.dropdown--list',
            dropdownTimeout: 200,
            dropdownId: null,
            beforeOpen: null,
            afterOpen: null,
            beforeClose: null,
            afterClose: null
        }, options);
        var dropdown = this;
        var dropdownClass = settings.dropdownClass;
        var dropdownOpen = settings.dropdownOpen;
        var dropdownTrigger = settings.dropdownTrigger;
        var dropdownList = settings.dropdownList;
        var dropdownTimeout = settings.dropdownTimeout;
        var dropdownId = settings.dropdownId;
        if (dropdown.selector.length > 0) {
            dropdownId = dropdown.selector;
        }
        var beforeOpen = settings.beforeOpen;
        var afterOpen = settings.afterOpen;
        var beforeClose = settings.beforeClose;
        var afterClose = settings.afterClose;

        // Open dropdown on hover
        if ($('html').hasClass('no-touchevents')) {
            $(dropdownClass).hoverIntent({
                over: function () {
                    var id = '#' + $(this).children(dropdownTrigger).attr('aria-controls');
                    openDropdown(id);
                },
                out: function () {
                    var id = '#' + $(this).children(dropdownTrigger).attr('aria-controls');
                    closeDropdown(id);
                },
                timeout: dropdownTimeout
            });
        }

        // Open dropdown on click
        $(dropdownTrigger).on('click', function (e) {
            // preventDefault in case the dropdown trigger is a <a> tag
            e.preventDefault();
            var parent = $(this).closest(dropdownClass);
            if ($(parent).hasClass(dropdownOpen)) {
                closeDropdown('#' + $(this).attr('aria-controls'));
                if ($('html').hasClass('touchevents')) {
                    $('body').removeClass('touch-dropdown-open');
                }
            } else {
                closeAllDropdowns();
                openDropdown('#' + $(this).attr('aria-controls'));
                if ($('html').hasClass('touchevents')) {
                    $('body').addClass('touch-dropdown-open');
                }
            }
            // stopPropagation needed for the document click
            e.stopPropagation();
        });

        // Close all dropdowns
        function closeAllDropdowns() {
            $(dropdownList).each(function () {
                var id = '#' + $(this).attr('id');
                closeDropdown(id);
            });
        }

        function openDropdown(id) {
            if (beforeOpen !== null && $.isFunction(beforeOpen)) {
                beforeOpen.call(this);
            }
            var parent = $(id).closest(dropdownClass);
            var button = '#' + $(id).attr('aria-labelledby');
            closeAllDropdowns();
            $(parent).addClass(dropdownOpen);
            $(id).attr('aria-expanded', 'true').attr('aria-hidden', 'false');
            $(button).attr('aria-expanded', 'true');
            setTimeout(function() {
                if (afterOpen !== null && $.isFunction(afterOpen)) {
                    afterOpen.call(this);
                }
            }, dropdownTimeout);
        }

        function closeDropdown(id) {
            if (beforeClose !== null && $.isFunction(beforeClose)) {
                beforeClose.call(this);
            }
            var parent = $(id).closest(dropdownClass);
            var button = '#' + $(id).attr('aria-labelledby');
            $(parent).removeClass(dropdownOpen);
            $(id).attr('aria-expanded', 'false').attr('aria-hidden', 'true');
            $(button).attr('aria-expanded', 'false');
            setTimeout(function() {
                if (afterClose !== null && $.isFunction(afterClose)) {
                    afterClose.call(this);
                }
            }, dropdownTimeout);
        }

        // Stop the dropdown from closing when clicking on items inside
        $(dropdownList).on('click', function (e) {
            e.stopPropagation();
        });

        // Document clicks & keyup to close dropdowns
        $(document).on('click', function () {
            closeAllDropdowns();
        });

        // Document keyup close dropdowns
        $(document).on('keyup', function (e) {
            // Esc key
            if (e.keyCode === 27) {
                closeAllDropdowns();
            }
        });

        if (action !== null) {
            if (action === 'close') {
                closeDropdown(dropdownId);
            }
            if (action === 'open') {
                openDropdown(dropdownId);
            }
        }
    };
}(jQuery));
(function ($) {
    $.fn.mercuryuiMegaMenu = function (action,options) {
        var settings = $.extend({
            megaMenuDropdown: '.mega-menu--dropdown',
            megaMenuDropdownOpen: 'mega-menu-is-open',
            megaMenuDropdownTrigger: '.mega-menu--button',
            megaMenuDropdownContainer: '.mega-menu--dropdown-container',
            megaMenuTimeout: 200,
            megaMenuId: null,
            beforeOpen: null,
            afterOpen: null,
            beforeClose: null,
            afterClose: null
        }, options);

        var megaMenu = this;
        var megaMenuDropdown = settings.megaMenuDropdown;
        var megaMenuDropdownOpen = settings.megaMenuDropdownOpen;
        var megaMenuDropdownTrigger = settings.megaMenuDropdownTrigger;
        var megaMenuDropdownContainer = settings.megaMenuDropdownContainer;
        var megaMenuTimeout = settings.megaMenuTimeout;
        var megaMenuId = settings.megaMenuId;
        if (megaMenu.selector.length > 0) {
            megaMenuId = megaMenu.selector;
        }
        var beforeOpen = settings.beforeOpen;
        var afterOpen = settings.afterOpen;
        var beforeClose = settings.beforeClose;
        var afterClose = settings.afterClose;

        if ($('html').hasClass('no-touchevents')) {
            $(megaMenuDropdown).hoverIntent({
                over: function () {
                    var id = '#' + $(this).children(megaMenuDropdownTrigger).attr('aria-controls');
                    openMegaMenu(id);
                },
                out: function () {
                    var id = '#' + $(this).children(megaMenuDropdownTrigger).attr('aria-controls');
                    closeMegaMenu(id);
                },
                timeout: megaMenuTimeout
            });
        }

        $(megaMenuDropdownTrigger).on('click', function (e) {
            // preventDefault in case the dropdown trigger is a <a> tag
            e.preventDefault();
            var parent = $(this).closest(megaMenuDropdown);
            if ($(parent).hasClass(megaMenuDropdownOpen)) {
                closeMegaMenu('#' + $(this).attr('aria-controls'));
            } else {
                closeAllMegaMenuDropdowns();
                openMegaMenu('#' + $(this).attr('aria-controls'));
            }
            // stopPropagation needed for the document click
            e.stopPropagation();
        });

        function closeAllMegaMenuDropdowns() {
            $(megaMenuDropdownContainer).each(function () {
                var id = '#' + $(this).attr('id');
                closeMegaMenu(id);
            });
        }

        function closeMegaMenu(id) {
            if (beforeClose !== null && $.isFunction(beforeClose)) {
                beforeClose.call(this);
            }
            var button = '#' + $(id).attr('aria-labelledby');
            $(id).closest(megaMenuDropdown).removeClass(megaMenuDropdownOpen);
            $(id).attr('aria-expanded', 'false').attr('aria-hidden','true');
            $(button).attr('aria-expanded', 'false');
            setTimeout(function() {
                if (afterClose !== null && $.isFunction(afterClose)) {
                    afterClose.call(this);
                }
            }, megaMenuTimeout);
        }

        function openMegaMenu(id) {
            if (beforeOpen !== null && $.isFunction(beforeOpen)) {
                beforeOpen.call(this);
            }
            var button = '#' + $(id).attr('aria-labelledby');
            $(id).closest(megaMenuDropdown).addClass(megaMenuDropdownOpen);
            $(id).attr('aria-expanded', 'true').attr('aria-hidden','false');
            $(button).attr('aria-expanded', 'true');
            setTimeout(function() {
                if (afterOpen !== null && $.isFunction(afterOpen)) {
                    afterOpen.call(this);
                }
            }, megaMenuTimeout);
        }

        // Stop the dropdown from closing when clicking on items inside
        $(megaMenuDropdownContainer).on('click', function (e) {
            e.stopPropagation();
        });

        // Document clicks & keyup to close dropdowns
        $(document).on('click', function () {
            closeAllMegaMenuDropdowns();
        });

        // Document keyup close dropdowns
        $(document).on('keyup', function (e) {
            // Esc key
            if (e.keyCode === 27) {
                closeAllMegaMenuDropdowns();
            }
        });

        if (action !== null) {
            if (action === 'close') {
                closeMegaMenu(megaMenuId);
            }
            if (action === 'open') {
                openMegaMenu(megaMenuId);
            }
        }
    };
}(jQuery));
(function ($) {
    $.fn.mercuryuiModal = function (action, options) {
        var settings = $.extend({
            overflowElement: 'body',
            openModalTrigger: '.open-modal',
            closeModalTrigger: '.close-modal',
            modalClass: '.modal',
            modalId: null,
            modalOpen: 'modal-is-open',
            modalClosing: 'modal-is-closing',
            modalOverflow: 'modal-overflow',
            modalContent: '.modal--content',
            modalAnimationTiming: 600,
            beforeOpen: null,
            afterOpen: null,
            beforeClose: null,
            afterClose: null
        }, options);

        var modal = this;
        var overflowElement = settings.overflowElement;
        var openModalTrigger = settings.openModalTrigger;
        var closeModalTrigger = settings.closeModalTrigger;
        var modalClass = settings.modalClass;
        var modalId = settings.modalId;
        if (modal.selector.length > 0) {
            modalId = modal.selector;
        }
        var modalOpen = settings.modalOpen;
        var modalClosing = settings.modalClosing;
        var modalOverflow = settings.modalOverflow;
        var modalContent = settings.modalContent;
        var modalAnimationTiming = settings.modalAnimationTiming;
        var beforeOpen = settings.beforeOpen;
        var afterOpen = settings.afterOpen;
        var beforeClose = settings.beforeClose;
        var afterClose = settings.afterClose;
        var top = 0;

        $(openModalTrigger).on('click', function (e) {
            var modalButton = $(this);
            modalId = '#' + $(modalButton).attr('aria-controls');
            openModal(modalId);
            // stopPropagation needed for the document click
            e.stopPropagation();
        });

        function openModal(id) {
            if (beforeOpen !== null && $.isFunction(beforeOpen)) {
                beforeOpen.call(this);
            }
            var modalToOpen = id;
            top = $(document).scrollTop();
            $(overflowElement).css('top', -(top));
            setTimeout(function () {
                $(overflowElement).addClass(modalOverflow);
                $(modalToOpen).addClass(modalOpen).attr('aria-hidden', false).attr('tabindex', '0');
                $(modalToOpen).modalTabbing();
                setTimeout(function () {
                    if (afterOpen !== null && $.isFunction(afterOpen)) {
                        afterOpen.call(this);
                    }
                }, modalAnimationTiming);
            }, 100);
        }

        function closeAllModals() {
            if (beforeClose !== null && $.isFunction(beforeClose)) {
                beforeClose.call(this);
            }
            if ($(overflowElement).hasClass(modalOverflow)) {
                $(modalClass).addClass(modalClosing);
                setTimeout(function () {
                    $(overflowElement).css('top', '');
                    $(modalClass).each(function () {
                        $(this).removeClass(modalOpen);
                        $(this).removeClass(modalClosing);
                        $(this).attr('aria-hidden', true).attr('tabindex', '-1');
                    });
                    $(overflowElement).removeClass(modalOverflow);
                    $(document).scrollTop(top);
                    setTimeout(function () {
                        if (afterClose !== null && $.isFunction(afterClose)) {
                            afterClose.call(this);
                        }
                    }, 100);
                }, modalAnimationTiming * .75);
            }
        }

        $(closeModalTrigger).on('click', function () {
            closeAllModals();
        });

        // stopPropagation needed for the document click
        $(modalContent).on('click', function (e) {
            e.stopPropagation();
        });

        // Document keyup close dropdowns
        $(document).on('keyup', function (e) {
            // Esc key
            if (e.keyCode === 27) {
                closeAllModals();
            }
        });

        if (action !== null) {
            if (action === 'close') {
                closeAllModals();
            }
            if (action === 'open') {
                openModal(modalId);
            }
        }
    };
}(jQuery));

// Prevent tabbing outside of the modal while the modal is open
// http://stackoverflow.com/questions/14572084/keep-tabbing-within-modal-pane-only
(function ($) {
    $.fn.modalTabbing = function () {
        var tabbing = function (jqSelector) {
            var inputs = $(jqSelector).find('select, input, textarea, button, a[href]').filter(':visible').not(':disabled');
            inputs.first().focus();
            $(jqSelector).on('keydown', function (e) {
                if (e.which === 9) {
                    var inputs = $(jqSelector).find('select, input, textarea, button, a[href]').filter(':visible').not(':disabled');
                    if (!e.shiftKey) {
                        if (inputs[inputs.length - 1] === e.target) {
                            e.preventDefault();
                            inputs.first().focus();
                        }
                    } else {
                        if (inputs[0] === e.target) {
                            e.preventDefault();
                            inputs.last().focus();
                        }
                    }
                }
            });
        };
        return this.each(function () {
            tabbing(this);
        });
    };
})(jQuery);
(function ($) {
    $.fn.mercuryuiOffCanvas = function (action,options) {
        var settings = $.extend({
            overflowElement: 'body',
            overlay: '.overlay',
            menuClass: '.off-canvas',
            menuOpenClass: 'off-canvas-is-open',
            menuClosingClass: 'off-canvas-is-closing',
            menuOpenTrigger: '.off-canvas--open',
            menuCloseTrigger: '.off-canvas--close',
            menuSideClass: 'off-canvas--direction--',
            menuSide: 'right',
            menuAnimationTiming: 200,
            offCanvasId: null,
            beforeOpen: null,
            afterOpen: null,
            beforeClose: null,
            afterClose: null
        }, options);

        var offCanvas = this;
        var overflowElement = settings.overflowElement;
        var overlay = settings.overlay;
        var menuClass = settings.menuClass;
        var menuOpenClass = settings.menuOpenClass;
        var menuClosingClass = settings.menuClosingClass;
        var menuOpenTrigger = settings.menuOpenTrigger;
        var menuCloseTrigger = settings.menuCloseTrigger;
        var menuSideClass = settings.menuSideClass;
        var menuSide = settings.menuSide;
        var menuAnimationTiming = settings.menuAnimationTiming;
        var offCanvasId = settings.offCanvasId;
        if (offCanvas.selector.length > 0) {
            offCanvasId = offCanvas.selector;
        }
        var beforeOpen = settings.beforeOpen;
        var afterOpen = settings.afterOpen;
        var beforeClose = settings.beforeClose;
        var afterClose = settings.afterClose;
        var top = 0;
        var offClass = 'off-canvas--off--';
        var off = '';

        // Off-canvas nav
        $(menuOpenTrigger).on('click', function (e) {
            e.preventDefault();
            getOffCanvasOffClass(this);
            var id = '#' + $(this).attr('aria-controls');
            openOffCanvasNav(id);
        });
        $(menuCloseTrigger).on('click', function (e) {
            e.preventDefault();
            var id = '#' + $(this).attr('aria-controls');
            closeOffCanvasNav(id);
        });

        function getOffCanvasOffClass(button) {
            var buttonClicked = button;
            var parentClasses = $(buttonClicked).closest(menuClass).attr('class').split(' ');
            for (var i = 0; i < parentClasses.length; i++) {
                if (parentClasses[i].indexOf(offClass) > -1) {
                    off = parentClasses[i];
                }
                if (parentClasses[i].indexOf(menuSideClass) > -1) {
                    menuSide = parentClasses[i];
                    menuSide = menuSide.split(menuSideClass).pop();
                }
            }
        }

        function openOffCanvasNav(id) {
            if (beforeOpen !== null && $.isFunction(beforeOpen)) {
                beforeOpen.call(this);
            }
            top = $(document).scrollTop();
            $(overflowElement).css('top', -(top));
            setTimeout(function () {
                $(id).css('display', 'block').css(menuSide, 0);
                $(overflowElement).addClass(menuOpenClass).addClass(off);
                setTimeout(function() {
                    if (afterOpen !== null && $.isFunction(afterOpen)) {
                        afterOpen.call(this);
                    }
                }, menuAnimationTiming);
            }, menuAnimationTiming);
        }

        function closeOffCanvasNav(id) {
            if (beforeClose !== null && $.isFunction(beforeClose)) {
                beforeClose.call(this);
            }
            if ($(overflowElement).hasClass(menuOpenClass)) {
                $(overflowElement).addClass(menuClosingClass);
                setTimeout(function () {
                    $(id).css('display', '').css('right', '').css('left', '');
                    $(overflowElement).removeClass(menuOpenClass).removeClass(menuClosingClass).removeClassStartingWith(offClass);
                    $(document).scrollTop(top);
                    $(overflowElement).css('top', '');
                    setTimeout(function() {
                        if (afterClose !== null && $.isFunction(afterClose)) {
                            afterClose.call(this);
                        }
                    }, menuAnimationTiming);
                }, menuAnimationTiming);
            }
        }

        function closeAllOffCanvasNav() {
            if ($(overflowElement).hasClass(menuOpenClass)) {
                $(overflowElement).addClass(menuClosingClass);
                setTimeout(function () {
                    $('.off-canvas--menu').each(function () {
                        $(this).css('display', '').css('right', '').css('left', '');
                    });
                    $(overflowElement).removeClass(menuOpenClass).removeClass(menuClosingClass).removeClassStartingWith(offClass);
                    $(document).scrollTop(top);
                    $(overflowElement).css('top', '');
                }, menuAnimationTiming);
            }
        }

        // Overlay click to close menus
        $(overlay).on('click', function () {
            closeAllOffCanvasNav();
        });

        // Changed from portrait to landscape, close the off canvas nav to prevent bad state
        $(window).on('orientationchange', function () {
            setTimeout(function () {
                if ($(window).width() > $(window).height()) {
                    closeAllOffCanvasNav();
                }
            }, menuAnimationTiming);
        });

        // Close off canvas nav on esc
        $(document).on('keyup', function (e) {
            if (e.keyCode === 27) {
                closeAllOffCanvasNav();
            }
        });

        if (action !== null) {
            if (action === 'close') {
                closeOffCanvasNav(offCanvasId);
            }
            if (action === 'open') {
                openOffCanvasNav(offCanvasId);
            }
        }
    };
}(jQuery));
$.fn.removeClassStartingWith = function (filter) {
    $(this).removeClass(function (index, className) {
        return (className.match(new RegExp("\\S*" + filter + "\\S*", 'g')) || []).join(' ');
    });
    return this;
};

(function ($) {
    $.fn.mercuryuiTabsHorizontal = function (action, options) {
        var settings = $.extend({
            tabs: '.horizontal-tabs',
            tabTrigger: '.horizontal-tabs--tab',
            tabAccordionTrigger: '.horizontal-tabs--tab-accordion',
            tabOpen: 'tab-content-is-shown',
            tabActive: 'tab-is-active',
            tabContent: '.horizontal-tabs--tab-content',
            tabId: null,
            beforeOpen: null,
            afterOpen: null
        }, options);
        var tab = this;
        var tabs = settings.tabs;
        var tabTrigger = settings.tabTrigger;
        var tabAccordionTrigger = settings.tabAccordionTrigger;
        var tabOpen = settings.tabOpen;
        var tabActive = settings.tabActive;
        var tabContent = settings.tabContent;
        var tabId = settings.tabId;
        if (tab.selector.length > 0) {
            tabId = tab.selector;
        }
        var beforeOpen = settings.beforeOpen;
        var afterOpen = settings.afterOpen;
        $(tabTrigger).on('click', function (e) {
            e.preventDefault();
            var horizontalTab = '#' + $(this).attr('aria-controls');
            if (!$(this).hasClass(tabActive)) {
                openHorizontalTab(horizontalTab);
            }
        });
        $(tabAccordionTrigger).on('click', function (e) {
            e.preventDefault();
            var horizontalTab = '#' + $(this).attr('aria-controls');
            if (!$(this).hasClass(tabActive)) {
                openHorizontalTab(horizontalTab);
            }
        });

        function closeHorizontalTabs(id) {
            $(id + ' ' + tabContent).each(function () {
                $(this).removeClass(tabOpen).attr('aria-hidden', 'true').attr('tabindex', '');
            });
            $(id + ' ' + tabTrigger).each(function () {
                $(this).removeClass(tabActive);
                $(this).attr('aria-selected', 'false');
            });
            $(id + ' ' + tabAccordionTrigger).each(function () {
                $(this).removeClass(tabActive);
                $(this).attr('aria-selected', 'false');
            });
        }

        function getTabParentId(id) {
            var tabParent = '#' + $(id).closest(tabs).attr('id');
            return tabParent;
        }

        function openHorizontalTab(id) {
            if (beforeOpen !== null && $.isFunction(beforeOpen)) {
                beforeOpen.call(this);
            }
            var controls = id.substring(1);
            var parent = getTabParentId(id);
            closeHorizontalTabs(parent);
            $(id).addClass(tabOpen).attr('aria-hidden', 'false').attr('tabindex', '0').focus();
            $('[aria-controls="' + controls + '"]').each(function () {
                $(this).addClass(tabActive);
                $(this).attr('aria-selected', 'true');
            });
            setTimeout(function () {
                if (afterOpen !== null && $.isFunction(afterOpen)) {
                    afterOpen.call(this);
                }
            }, 100);
        }
        if (action !== null && action === 'open') {
            openHorizontalTab(tabId);
        }
    };
}(jQuery));
(function ($) {
    $.fn.mercuryuiTabsVertical = function (action, options) {
        var settings = $.extend({
            tabs: '.vertical-tabs',
            tabTrigger: '.vertical-tabs--tab',
            tabListItem: '.vertical-tabs--tab-list-item',
            tabAccordionTrigger: '.vertical-tabs--tab-accordion',
            tabOpen: 'tab-content-is-shown',
            tabActive: 'tab-is-active',
            tabContent: '.vertical-tabs--tab-content',
            tabId: null,
            beforeOpen: null,
            afterOpen: null
        }, options);
        var tab = this;
        var tabs = settings.tabs;
        var tabListItem = settings.tabListItem;
        var tabTrigger = settings.tabTrigger;
        var tabAccordionTrigger = settings.tabAccordionTrigger;
        var tabOpen = settings.tabOpen;
        var tabActive = settings.tabActive;
        var tabContent = settings.tabContent;
        var tabId = settings.tabId;
        if (tab.selector.length > 0) {
            tabId = tab.selector;
        }
        var beforeOpen = settings.beforeOpen;
        var afterOpen = settings.afterOpen;
        $(tabTrigger).on('click', function (e) {
            e.preventDefault();
            var verticalTab = '#' + $(this).attr('aria-controls');
            if (!$(this).closest(tabListItem).hasClass(tabActive)) {
                openVerticalTab(verticalTab);
            }
        });
        $(tabAccordionTrigger).on('click', function (e) {
            e.preventDefault();
            var verticalTab = '#' + $(this).attr('aria-controls');
            if (!$(this).hasClass(tabActive)) {
                openVerticalTab(verticalTab);
            }
        });

        function closeVerticalTabs(id) {
            $(id + ' ' + tabContent).each(function () {
                $(this).removeClass(tabOpen).attr('aria-hidden', 'true').attr('tabindex', '');
            });
            $(id + ' ' + tabListItem).each(function () {
                $(this).removeClass(tabActive);
            });
            $(id + ' ' + tabTrigger).each(function () {
                $(this).attr('aria-selected', 'false');
            });
            $(id + ' ' + tabAccordionTrigger).each(function () {
                $(this).removeClass(tabActive);
                $(this).attr('aria-selected', 'false');
            });
        }

        function getTabParentId(id) {
            var tabParent = '#' + $(id).closest(tabs).attr('id');
            return tabParent;
        }

        function openVerticalTab(id) {
            if (beforeOpen !== null && $.isFunction(beforeOpen)) {
                beforeOpen.call(this);
            }
            var controls = id.substring(1);
            var parent = getTabParentId(id);
            closeVerticalTabs(parent);
            $(id).addClass(tabOpen).attr('aria-hidden', 'false').attr('tabindex', '0').focus();
            $('[aria-controls="' + controls + '"]').each(function () {
                if ($(this).closest(tabListItem).hasClass(tabListItem.substring(1))) {
                    $(this).closest(tabListItem).addClass(tabActive);
                    $(this).attr('aria-selected', 'true');
                } else {
                    $(this).addClass(tabActive);
                    $(this).attr('aria-selected', 'true');
                }
            });
            setTimeout(function () {
                if (afterOpen !== null && $.isFunction(afterOpen)) {
                    afterOpen.call(this);
                }
            }, 100);
        }
        if (action !== null && action === 'open') {
            openVerticalTab(tabId);
        }
    };
}(jQuery));