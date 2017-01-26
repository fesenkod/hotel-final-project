var slider = {
	slides:['01.jpg','02.jpg','03.jpg','04.jpg','05.jpg'],
	frame:0,
	set: function(picture) {
		document.getElementById("image").firstElementChild.src = "img/" + picture;
	},
	init: function() {
		this.set(this.slides[this.frame]);
	},
	left: function() {
		this.frame--;
		if(this.frame < 0) this.frame = this.slides.length-1;
		this.set(this.slides[this.frame]);
	},
	right: function() {
		this.frame++;
		if(this.frame == this.slides.length) this.frame = 0;
		this.set(this.slides[this.frame]);
	}
};
window.onload = function() {
	slider.init();
};
