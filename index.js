// Inicializa o Google Maps
function initMap() {
    
    const defaultLocation = { lat: -23.5505, lng: -46.6333 };
    const map = new google.maps.Map(document.getElementById("map"), {
        center: defaultLocation,
        zoom: 12,
    });

    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    
    window.findRoute = function() {
        const destination = document.getElementById('destination').value;
        if (!destination) {
            alert("Por favor, insira um destino.");
            return;
        }

        const request = {
            origin: defaultLocation,
            destination: destination,
            travelMode: 'DRIVING'
        };

        directionsService.route(request, function(result, status) {
            if (status === 'OK') {
                directionsRenderer.setDirections(result);
            } else {
                alert("Não foi possível encontrar a rota: " + status);
            }
        });
    };
}


const availabilitySelect = document.getElementById('availability');
const statusText = document.getElementById('status-text');

availabilitySelect.addEventListener('change', function() {
    const selectedValue = availabilitySelect.value;
    statusText.textContent = selectedValue.charAt(0).toUpperCase() + selectedValue.slice(1);
});


const timeLimitInput = document.getElementById('time-limit');
timeLimitInput.addEventListener('input', function() {
    const timeLimit = parseInt(timeLimitInput.value, 10);
    if (timeLimit < 10) {
        timeLimitInput.value = 10;
    }
});


window.onload = function() {
    initMap();
};


