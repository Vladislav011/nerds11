var head = document.getElementsByTagName('head')[0];

// Save the original method
var insertBefore = head.insertBefore;

// Replace it!
head.insertBefore = function (newElement, referenceElement) {

    if (newElement.href && newElement.href.indexOf('https://fonts.googleapis.com/css?family=Roboto') === 0) {

        console.info('Prevented Roboto from loading!');
        return;
    }
     if (newElement.tagName.toLowerCase() === 'style'
        && newElement.styleSheet
        && newElement.styleSheet.cssText
        && newElement.styleSheet.cssText.replace('\r\n', '').indexOf('.gm-style') === 0) {
        return;
    }
    // intercept style elements for other browsers
    if (newElement.tagName.toLowerCase() === 'style'
        && newElement.innerHTML
        && newElement.innerHTML.replace('\r\n', '').indexOf('.gm-style') === 0) {
        return;
    }
    insertBefore.call(head, newElement, referenceElement);
};

var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map-canvas'), {
    center: {lat: 59.939123, lng: 30.319992},
    zoom: 17
  });

  var image = {
  		url: '../nerds/img/marker.png',
        size: new google.maps.Size(231, 190),
        origin: new google.maps.Point(0,0),
        anchor: new google.maps.Point(50, 190)};
  var myLatLng = new google.maps.LatLng(59.938589,30.323059);
  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    icon: image
  });
}

var feedbackBtn = document.querySelector(".write-us");
var popup = document.querySelector(".modal-content");
var feedbackClose = document.querySelector(".feedback-close");
var yourName = popup.querySelector("[name=your-name]");
var email = popup.querySelector("[name=email]");
var form = popup.querySelector("form");
var storage = localStorage.getItem("name", yourName.value);

feedbackBtn.addEventListener("click", function(event) {
	event.preventDefault();
	popup.classList.add("modal-content-show");
	if (storage) {
		yourName.value = storage;
		email.focus();
	} else {
		yourName.focus();
	}
});

feedbackClose.addEventListener("click", function() {
	event.preventDefault();
	popup.classList.remove("modal-content-show");
});

  form.addEventListener("submit", function(event) {
    if (!yourName.value || !email.value) {
      event.preventDefault();
      popup.classList.remove("modal-error");
      setTimeout(function() {
          popup.classList.add("modal-error") }, 50);
    }
  });

window.addEventListener("keydown", function(event) {
	if (event.keyCode == 27) {
		if (popup.classList.contains("modal-content-show")) {
		popup.classList.remove("modal-content-show");
		}	
	}
});

