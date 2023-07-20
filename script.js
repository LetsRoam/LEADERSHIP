var images = [
	"IMG/764709-Japan-Kyoto-Megapolis-Night.jpg",
	"IMG/457903-Japan-Kyoto-red-Japanese-Asia.jpg",
	"IMG/476739-Kyoto-Japan-dark-Asia-lantern.jpg",
	"IMG/540839-tokyo-subway.jpg",
	"IMG/781360-Daigoji-Japan-Parks-Bridges-Pagodas-Pond-Kyoto.jpg",
	"IMG/881596-Japan-Kyoto-Branches-Night-Canal.jpg",
	"IMG/915643-architecture-street-city-building-Japan-evening.jpg",
	"IMG/3004201-2550x1601-japan-kyoto-street.jpg",
	"IMG/4513169-japan-kyoto-night.jpg",
	"IMG/img3.wallspic.com-temple-japanese_architecture-sky-tree-reflection-2560x1600.jpg",
];

var heroSection = document.querySelector(".hero");
var header = document.querySelector(".sticky-header");
var currentIndex = 0;

function changeBackgroundImage() {
	heroSection.style.backgroundImage = "url('" + images[currentIndex] + "')";

	// Check the brightness of the current image to determine the background color
	var img = new Image();
	img.src = images[currentIndex];
	img.onload = function () {
		var brightness = getBrightness(img);
		if (brightness <= 128) {
			header.classList.remove("light");
			header.classList.add("dark");
		} else {
			header.classList.remove("dark");
			header.classList.add("light");
		}
	};

	currentIndex = (currentIndex + 1) % images.length;
}

// Initially display the specific image
heroSection.style.backgroundImage = "url('" + images[0] + "')";

// Call the function to change the background image every 5 seconds
setInterval(changeBackgroundImage, 5000);

// Function to calculate brightness based on image pixels
function getBrightness(image) {
	var canvas = document.createElement("canvas");
	canvas.width = image.width;
	canvas.height = image.height;

	var context = canvas.getContext("2d");
	context.drawImage(image, 0, 0);

	var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
	var brightness = 0;

	for (var i = 0; i < imageData.data.length; i += 4) {
		var r = imageData.data[i];
		var g = imageData.data[i + 1];
		var b = imageData.data[i + 2];

		brightness += Math.max(r, g, b);
	}

	brightness = Math.round(brightness / (imageData.data.length / 4));
	return brightness;
}
