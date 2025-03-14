// ThingSpeak API URL for your channel's field 2 data (replace with your ThingSpeak channel and field API key)
const THINGSPEAK_API_URL = 'https://api.thingspeak.com/channels/2875425/fields/2/last.json?api_key=P2D675KBE0ZCBLVF';

// Function to fetch the water level data from ThingSpeak
async function fetchWaterLevel() {
    try {
        const response = await fetch(THINGSPEAK_API_URL);
        const data = await response.json();
        
        // Assuming the most recent data is in the first entry
        const waterLevel = data.feeds[0].field2;

        // Display the water level on the page
        document.getElementById('water-level').textContent = `Current Water Level: ${waterLevel} cm`;

        // Check if the water level is <= 30.00 and trigger the alarm if true
        if (parseFloat(waterLevel) <= 30.00) {
            document.getElementById('alarm').style.display = 'block';
        } else {
            document.getElementById('alarm').style.display = 'none';
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        document.getElementById('water-level').textContent = 'Error fetching data.';
    }
}

// Fetch water level data every 10 seconds
setInterval(fetchWaterLevel, 10000);

// Initial fetch when the page loads
fetchWaterLevel();
