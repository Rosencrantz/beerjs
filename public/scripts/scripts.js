(function($){
	var KEY = {
		addListener : function () {
			if (document.addEventListener) {
				document.addEventListener("keydown", this.keydown, false);
			}
			else {
				alert("Your browser will not be able to access the sand-boxed code");
			}
		},
		keybody : document.getElementsByTagName("body")[0],
		keydown : function (event) {					
			var keycode = event.keyCode,
				direction;

			switch (keycode){
				case 38: // UP
				case 40: // DOWN
					event.preventDefault();
					BEER.slide((keycode === 38) ? "^" : "v");
					break;
				default:
					// KEY.keylog(keycode);
			}

			KEY.keybody.focus();
		},
		init : function () {
			this.addListener();
			this.keybody.focus();
		}
	};
	KEY.init();

	var BEER = {
		direction: null,
		offsets: [],
		sections: ["#splash", "#about", "#sponsors", "#location", "#rsvp"],
		section: 0,
		scull: function () {
			$("#beer").animate({
				top: (this.offsets[this.section] / $("#foot").offset().top) * $("#beer").height() + 30 + "px"
			}, 1000);
		},
		scroll: function () {
			$("body").animate({scrollTop: this.offsets[this.section]}, 1000);
			BEER.scull();
			BEER.show();
		},
		scrolling: null,
		scrolled: function (section) {
			if (this.scrolling) {clearTimeout(this.scrolling)};

			this.scrolling = setTimeout(function () {
				if (section !== BEER.section) {
					BEER.section = section;
					BEER.scull();
					BEER.show();
				}
				$($("input")[0]).val([section, BEER.section].join(", "));
			}, 1200);
		},
		slide: function (direction) {
			var section = (direction === "^") ? this.section -= 1 : this.section += 1,
				length = this.sections.length - 1;// yay zer0 indexing

			if (section < 0) this.section = 0;
			if (section > length) this.section = length;
			
			this.scroll();
		},
		skip: function (section) {
			this.section = section;

			this.scroll();
		},
		show: function () {
			// $("nav a").removeClass("current").eq(this.section).addClass("current");
			$("nav a").removeClass("current").animate({
				color: "whitesmoke"
			}, 500).eq(this.section).animate({
				color: "#FCC732"
			}, 500).addClass("current");
		},
		setup: function (once) {
			var $aside, $content, $nav, height, width;
			
			if (once) {
				height = $(window).height();
				width = $(window).width() / 2;
				$aside = $("aside");
				$content = $("#content");
				$nav = $("nav a");

				$(this.sections).each(function(index){
					$(BEER.sections[index]).css("height", height);
				});

				$aside.css("left", width - ($aside.outerWidth() / 2));
				$content.fadeIn();

				$nav.each(function(index){
					$(this).click(function(event){
						event.preventDefault();
						BEER.skip(index);
					}).attr("href", "");
				});

				$aside.fadeIn("slow");
			}
			else {
				$("#splash, #about, #sponsors, #location, #rsvp").waypoint(function(event, direction){
					BEER.scrolled((direction === "down") ? $(this).index() : $(this).index() - 1);
				}).each(function(index){
					BEER.offsets.push($(BEER.sections[index]).offset().top);
				});

				$("h6").lettering();
				$("a.external").attr("target", "beer");
			}
		},
		init: function () {
			this.setup(true);
			this.setup();
			this.slide("^");
			this.scull();
		}
	}
	BEER.init();
})(jQuery);