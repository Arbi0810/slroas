/**
 * Stretch Galley.
 * Description:       Stretch Gallery - jQuery responsive slider that allows you to create a nice portfolio gallery with smooth animation on hover and lot of customization settings.
 * Version:           2.6.0
 * Author:            irrealix
 * Author URI:        http://irrealix.com/
 * Email:             irrealix@gmail.com
 */



(function (jQuery, window) {
    "use strict";

    jQuery.fn.stretch_gallery = function (options) {
        options = jQuery.extend({
            width: "100%",
            height: "400px",
            border_size: "0px",
            border_color: "transparent",
            border_radius: "0px",
            caption_size: "20px",
            caption_font: "sans-serif",
            caption_weight: "200",
            caption_color: "#000000",
            description_font: "sanspserif",
            description_weight: "12px",
            description_size: "12px",
            description_color: "#000000",
            plate_height: "85px",
            plate_color: "rgba(255,255,255,0.5)",
            animation_speed: "1000",
            skew_angle: "-15",
            flash_on_hover: "1",
            flash_width: "50",
            initial_opened: "3",
            show_text_block: true,
            text_block_type: "caption-descr",
            plate_reveal: "opacity",
            plate_position: "bottom",
            url_type: "text_block",
            auto_play: "false",
            auto_play_delay: "5000",
            image_closed_filter: "none",
            image_opened_filter: "none",
            image_relaxed_filter: "none"
        }, options);
        var make = function () {
            var timer,
                gwidth,
                gheight,
                slide_width,
                bgImgHeight,
                bgImgWidth,
                left_shift,
                count = 0,
                images_count = 0,
                flash_on_hover = parseInt(options.flash_on_hover, 10),
                $this = jQuery(this);

            jQuery.extend(jQuery.easing, {
                def: 'easeOutQuad',
                swing: function (x, t, b, c, d) {

                    return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
                },
                easeOutExpo: function (x, t, b, c, d) {
                    return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
                }
            });
            $this.addClass("stretch-gallery_2_5_1").css({
                "width": options.width,
                "height": options.height,
                "background": options.border_color
            });
            gwidth = $this.width();
            gheight = $this.height();

            left_shift = Math.abs(gheight * Math.sin(options.skew_angle * Math.PI / 180));

            $this.find("img").css({
                "filter": options.image_relaxed_filter,
                "transition": "all " + parseInt(options.animation_speed, 10) + "ms",
                "-webkit-filter": options.image_relaxed_filter,
                "-webkit-transition": "all " + parseInt(options.animation_speed, 10) + "ms",
                "margin-left": (-1) * left_shift / 2 + "px"
            });



            jQuery.easing.def = "easeOutExpo";

            $this.find(".sg-slide").css({
                "border-radius": options.border_radius,
                "transform": "skewX(" + options.skew_angle + "deg)",
                'display': 'table-cell'
            });
            $this.find(".sg-dummy").css({
                "transform": "skewX(" + (-1) * options.skew_angle + "deg)"
            });
            $this.find(".sg_caption").css({
                "font-family": options.caption_font,
                "font-weight": options.caption_weight,
                "font-size": options.caption_size,
                "color": options.caption_color
            });

            if (options.text_block_type === "caption-descr") {
                $this.find(".sg_description").show().css({
                    "font-family": options.description_font,
                    "font-weight": options.description_weight,
                    "font-size": options.description_size,
                    "color": options.description_color
                });
            } else {
                $this.find(".sg_description").hide();
            }

            function get_left_shift() {
                var text_block_left;
                if (options.skew_angle < 0) {
                    if (options.plate_position == "top") {
                        text_block_left = 0;
                    }
                    if (options.plate_position == "center") {
                        text_block_left = -left_shift / 2;
                    }
                    if (options.plate_position == "bottom") {
                        text_block_left = -left_shift;
                    }
                }
                if (options.skew_angle > 0) {
                    if (options.plate_position == "top") {
                        text_block_left = -left_shift;
                    }
                    if (options.plate_position == "center") {
                        text_block_left = -left_shift / 2;
                    }
                    if (options.plate_position == "bottom") {
                        text_block_left = 0;
                    }
                }
                return text_block_left;
            }

            if (options.show_text_block == true) {
                if (options.plate_reveal == "from-left") {
                    $this.find(".pos").removeClass("from-top from-bottom from-right").addClass("from-left");
                }
                if (options.plate_reveal == "from-top") {
                    $this.find(".pos").removeClass("from-left from-bottom from-right").addClass("from-top");
                }
                if (options.plate_reveal == "from-right") {
                    $this.find(".pos").removeClass("from-top from-bottom from-left").addClass("from-right");
                }
                if (options.plate_reveal == "from-bottom") {
                    $this.find(".pos").removeClass("from-top from-left from-right").addClass("from-bottom");
                }
                if (options.plate_reveal == "opacity") {
                    $this.find(".pos").removeClass("from-top from-left from-right from-bottom");
                }
                if (options.plate_reveal == "not-hide") {

                    $this.find(".sg_text_block").removeClass("from-top from-left from-right from-bottom").addClass("show").css({
                        "left": get_left_shift()
                    });
                }

                $this.find(".sg_text_block").css({

                    "transition": "all " + parseInt(options.animation_speed, 10) + "ms",
                    "background": options.plate_color,
                    "border-radius": options.border_radius,
//                    "height": options.plate_height,
                    "width": "calc( 100% + " + (2 * left_shift) + "px)",
                    "margin-left": (-1) * left_shift / 2 + "px"
                });
                
                $this.find(".pos").css({"height": options.plate_height,"transition": "all " + parseInt(options.animation_speed, 10) + "ms",});

                if (options.plate_position == "top") {


                    $this.find(".pos").removeClass("center bottom").addClass("top").css({
                        "top": "0px",
                        "bottom": "auto"

                    });
                }
                if (options.plate_position == "center") {

                    $this.find(".pos").removeClass("top bottom").addClass("center").css({
                        "top": "50%",
                        "bottom": "50%"
                    });
                }
                if (options.plate_position == "bottom") {

                    $this.find(".pos").removeClass("center top").addClass("bottom").css({
                        "bottom": "0px",
                        "top": "auto"
                    });
                }

            } else {
                if (options.plate_reveal != "not-hide") {
                    $this.find(".sg_text_block").stop().removeClass("show");
                }
            }
            jQuery(".sg_flash").css({
                'left': '1800px',
                'width': options.flash_width + "px",
                'height': options.height
            });
            $this.find(".sg-slide").each(function () {
                images_count = images_count + 1;
            });
            gwidth = gwidth - (images_count - 1) * parseInt(options.border_size, 10);
            $this.find(".sg-slide").each(function () {
                slide_width = gwidth / images_count;
                jQuery(this).css({
                    "width": slide_width,
                    "height": gheight
                });
                if (count !== 0) {
                    jQuery(this).css({
                        "margin-left": options.border_size
                    });
                }
                count = count + 1;
            });

            $this.off();

            function stretch_slide($cur_slide) {

                if ($cur_slide.hasClass("opened") == false) {


                    var img_count = 0,
                        d,
                        sel_width,
                        slide_width,
                        text_block_left = 0,
                        gallery = $cur_slide.parent().parent();
                    gallery.find(".sg-slide").each(function () {
                        img_count = img_count + 1;

                    });
                    gallery.find(".sg-slide").removeClass("opened");
                    $cur_slide.addClass("opened");

                    gheight = $this.height();
                    gwidth = $this.width() - (img_count - 1) * parseInt(options.border_size, 10);
                    bgImgWidth = $cur_slide.find('img').width();
                    bgImgHeight = $cur_slide.find('img').height();
                    d = gheight / bgImgHeight;
                    sel_width = Math.ceil(bgImgWidth * d) - (2 * left_shift);
                    if ((sel_width + images_count * 15) > gwidth) {
                        sel_width = gwidth - img_count * 15;
                    }
                    slide_width = (gwidth - sel_width) / (img_count - 1);
                    //                        if (slide_width<100){slide_width=100;}
                    
                    text_block_left = get_left_shift();
                    
                    gallery.find(".sg-slide").stop().animate({
                        'width': slide_width
                    }, parseInt(options.animation_speed, 10));


                    if (flash_on_hover == 1) {
                        gallery.find(".sg_flash").stop().hide();
                        var flash_pos = -options.flash_width - 10;

                        $cur_slide.find(".sg_flash").stop().show().css({
                            'left': sel_width + "px"
                        }).animate({
                            'left': flash_pos + "px"
                        }, parseInt(options.animation_speed, 10), function () {
                            $cur_slide.find(".sg_flash").hide();
                        });
                    } else {
                        gallery.find(".sg_flash").hide();
                    }

                    $cur_slide.stop().animate({
                        'width': sel_width
                    }, parseInt(options.animation_speed, 10));


                    gallery.find("img").css({
                        "filter": options.image_closed_filter,
                        "transition": "all " + parseInt(options.animation_speed, 10) + "ms",
                        "-webkit-filter": options.image_closed_filter,
                        "-webkit-transition": "all " + parseInt(options.animation_speed, 10) + "ms"
                    });


                    $cur_slide.find("img").css({
                        "filter": options.image_opened_filter,
                        "transition": "all " + parseInt(options.animation_speed, 10) + "ms",
                        "-webkit-filter": options.image_opened_filter,
                        "-webkit-transition": "all " + parseInt(options.animation_speed, 10) + "ms"
                    });



                    if (options.show_text_block == true) {
                        //hide text block from all slides
                        if (options.plate_reveal != "not-hide") {
                            gallery.find(".sg_text_block").stop().removeClass("show");
                            gallery.find(".pos").stop().removeClass("show");
                        }

                        //show text block for current slide
                        $cur_slide.find(".sg_text_block").stop().css({
                            'left': text_block_left + 'px'
                        }).addClass("show");
                        $cur_slide.find(".pos").stop().addClass("show");
                    }
                }
            }

            function close_slides() {

            }

            $this.on("mouseenter touchmove", ".sg-slide", function (e) {

                //e.preventDefault();



                var $cur_slide = jQuery(this);

//                console.log("touchstart" + $cur_slide.index());

                stop_timer();

                stretch_slide($cur_slide);

            });


            $this.on("mouseleave", ".sg-slide", function () {
//                console.log("touchend");
                jQuery(this).removeClass("opened");
                var img_count = 0;
                jQuery(this).parent().parent().find(".sg-slide").each(function () {
                    img_count = img_count + 1;
                });
                gwidth = $this.width() - (img_count - 1) * parseInt(options.border_size, 10);
                slide_width = gwidth / img_count;
                $this.find(".sg-slide").stop().animate({
                    'width': slide_width
                }, parseInt(options.animation_speed, 10));

                $this.find("img").css({
                    "filter": options.image_relaxed_filter,
                    "transition": "all " + parseInt(options.animation_speed, 10) + "ms",
                    "-webkit-filter": options.image_relaxed_filter,
                    "-webkit-transition": "all " + parseInt(options.animation_speed, 10) + "ms"
                });


                if (options.show_text_block == true) {
                    if (options.plate_reveal != "not-hide") {
                        $this.find(".sg_text_block").stop().removeClass("show");
                    }
                }
            });

            $this.on("mouseleave", ".sg", function () {
                start_timer();
                jQuery(this).find('.sg-slide').removeClass("opened");
            });


            function swapImages() {
                var $active = jQuery(this).find('.sg-slide.opened');
                var $next = ($active.next().length > 0) ? $active.next() : jQuery(this).find('.sg-slide:first');
                $active.removeClass('opened');
                stretch_slide($next);

            };

            function start_timer() {

                if (options.auto_play == "true") {
                    var $cur_slide = jQuery(this).find('.sg-slide:first');
                    stretch_slide($cur_slide);
                    timer = setInterval(swapImages, options.auto_play_delay);
                }
            }

            function stop_timer() {
                clearInterval(timer);
            }

            start_timer();

            if (options.initial_opened > -1) {
                jQuery(this).find('.sg-slide').each(function (index) {
                    if (index == parseInt(options.initial_opened)) {
                        stretch_slide(jQuery(this));
                    }
                })
            }

            function resize() {
                gwidth = $this.width();
                var img_count = 0;
                $this.find(".sg-slide").each(function () {
                    img_count = img_count + 1;
                });
                $this.find(".sg").css("width", gwidth + 100);
                slide_width = gwidth / img_count - parseInt(options.border_size, 10);
                $this.find(".sg-slide").stop().animate({
                    'width': slide_width
                }, 10);
            }





            jQuery(window).resize(function () {
                resize();

            });


        };

        return this.each(make);
    };
})(jQuery, window);
