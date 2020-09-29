$(document).ready(function() {

    // The NavbarModel view is not used in this case, but is included to have
    // the MVC structure in place in case we want to extend the functionality
    // later.
    const NavbarModel = {
        init: function() {}
    };

    const NavbarView = {
        init: function() {
            this.cacheDOM();
        },

        cacheDOM: function() {
            this.navbar = document.querySelector(".navbar");
        },

        /**
         * Determines if the navbar has been scrolled past.
         * 
         * @param {number} scrollPosition The current vertical scrollbar position.
         * 
         * @returns {boolean} Returns true if the document has scrolled past the
         *                    navbar position, otherwise false.  
         */
        isScrolledPast: function(scrollPosition) {
            return scrollPosition > this.navbar.offsetHeight;
        },

        /**
         * 
         * @param {*} isScolled 
         */
        setScrolled: function(isScolled) {
            if (isScolled) {
                this.navbar.classList.add("navbar-scrolled");
            } else {
                this.navbar.classList.remove("navbar-scrolled");
            }
        },
    };

    const NavbarController = {
        /**
         * Initialize the controller.
         * 
         * Note that the associated model and view are being injected into the
         * controller. The controller will handle the initialization of the model
         * and view objects so they do not need to be initialized seperately. You
         * only need to call the init() method on the controller object.
         * 
         * @param {NavbarModel} model
         * @param {NavbarView} view 
         */
        init: function(model, view) {
            if (!model || !view) {
                throw new Error("NavbarController.init(): cannot inject null object.")
            }
            this.model = model;
            this.view = view;

            this.model.init();
            this.view.init();

            this.registerEventListeners();
        },

        registerEventListeners: function() {
            document.addEventListener('scroll', this.onScroll.bind(this));
        },

        onScroll: function(event) {
            if (this.view.isScrolledPast(window.scrollY)) {
                this.view.setScrolled(true);
            } else {
                this.view.setScrolled(false);
            }
        }

    };

    NavbarController.init(NavbarModel, NavbarView);

});