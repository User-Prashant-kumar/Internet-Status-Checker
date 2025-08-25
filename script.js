window.addEventListener("load", checkInternetConnection);

function checkInternetConnection() {
    const statusText = document.getElementById('StatusText'); // Match case with HTML
    const ipAddressText = document.getElementById('IpaddressText');
    const networkStrengthText = document.getElementById('NetworkStrength');
    
    statusText.textContent = 'Checking...';
    
    if (navigator.onLine) {
        fetch('https://api.ipify.org?format=json')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                ipAddressText.textContent = data.ip;
                statusText.textContent = 'Connected';
                
                // Check network information
                if (navigator.connection) {
                    const connection = navigator.connection;
                    const strength = connection.downlink ? `${connection.downlink} Mbps` : 'Unknown';
                    networkStrengthText.textContent = strength;
                } else {
                    networkStrengthText.textContent = 'Unknown (API not supported)';
                }
            })
            .catch((error) => {
                statusText.textContent = 'Connected (IP fetch failed)';
                ipAddressText.textContent = 'Unable to fetch';
                networkStrengthText.textContent = 'Unknown';
                console.error('Error:', error);
            });
    } else {
        statusText.textContent = 'Disconnected';
        ipAddressText.textContent = '-';
        networkStrengthText.textContent = '-';
    }
}

// Add event listeners for connection changes
window.addEventListener('online', checkInternetConnection);
window.addEventListener('offline', checkInternetConnection);