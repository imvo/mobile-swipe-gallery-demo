(function() {
    var Slider = function (options) {
        this.images = options;
        this.el = {
            slider: $("#slider"),
            holder: $(".holder"),
            imgSlide: $(".slide-image")
        };
        this.buildSlider = function (targetImg) {
            var targetUrl = $(targetImg).attr('src');
            var targetImage = targetUrl.replace('img/', '');

            var currentImageIdx = this.images.indexOf(targetImage) + (this.transitionRight ? 1 : -1);
            if (currentImageIdx === -1) {
                currentImageIdx = this.images.length - 1;
            }
            else if (currentImageIdx >= this.images.length) {
                currentImageIdx = 0;
            }
            var prevImageIdx = currentImageIdx - 1;
            var nextImageIdx = currentImageIdx + 1;

            if (currentImageIdx === 0) {
                prevImageIdx = this.images.length - 1;
            }
            else if (currentImageIdx === this.images.length - 1) {
                nextImageIdx = 0;
            }

            //rebuild slider and reset position
            $('#slide-1').attr('src', 'img/' + this.images[prevImageIdx]);
            $('#slide-2').attr('src', 'img/' + this.images[currentImageIdx]);
            $('#slide-3').attr('src', 'img/' + this.images[nextImageIdx]);

            $(".holder").css('transform', 'translateX(-340px)');

        };

        this.slideWidth = this.el.slider.width();
        this.touchStartX = undefined;
        this.touchMoveX = undefined;
        this.movex = undefined;
        this.index = 1;

        this.init = function () {
            this.bindUIEvents();
            $(".holder").css('transform', 'translateX(-340px)')
        };

        this.bindUIEvents = function () {

            this.el.holder.on("touchstart", function (event) {
                this.start(event);
            }.bind(this));

            this.el.holder.on("touchmove", function (event) {
                this.move(event);
            }.bind(this));

            this.el.holder.on("touchend", function (event) {
                this.end(event);
            }.bind(this));

        };

        this.start = function (event) {
            this.movex = 0;
            this.touchStartX = event.originalEvent.touches[0].pageX;
        };

        this.move = function (event) {

            //current touch position
            this.touchMoveX = event.originalEvent.touches[0].pageX;

            // translate holder
            this.movex = this.slideWidth + (this.touchStartX - this.touchMoveX);

            this.el.holder.css('transform', 'translateX(-' + this.movex + 'px)');
        };

        this.end = function (event) {

            // distance swiped
            var absMove = Math.abs(this.slideWidth - this.movex);

            // check for image switching
            if (absMove > this.slideWidth / 3 && this.movex) {
                if (this.movex >  this.slideWidth) {
                    this.index++;
                    this.transitionRight = true;
                } else if (this.movex < this.slideWidth) {
                    this.index--;
                    this.transitionRight = false;
                }
                //make image transition
                this.el.holder.css('transform', 'translateX(-' + this.index * this.slideWidth + 'px)');
                this.buildSlider(event.target);
            }
            else {
                //cancel image transition
                this.el.holder.css('transform', 'translateX(-' + this.index * this.slideWidth + 'px)');
            }
            this.index = 1;
        };
        this.init();
    };

    var images = ['1.png', '2.png', '3.png', '4.png', '5.png', '6.png']

    var sliderOne = new Slider(images);
})();