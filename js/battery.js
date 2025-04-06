/* Variables
-------------------------------------------------- */

const chargeStatus = document.querySelector('#battery dd:nth-of-type(1)');

const chargeLevel = document.querySelector('#battery dd:nth-of-type(2) output');

const chargeMeter = document.querySelector('#battery dd:nth-of-type(2) progress');

/* Functions
-------------------------------------------------- */
function updateBatteryStatus(battery) {
    console.log(battery);
    if (battery.charging === true) {
        chargeStatus.textContent = "Charging...";
    } else {
        chargeStatus.textContent = "Discharging";
    }
    chargeLevel.textContent = (battery.level * 100) + "%";
    chargeMeter.value = battery.level * 100;

    /* lab 5 extension */
    const imageUrl = 'https://robohash.org/' + chargeMeter.value + '.png'; /*creates url to robothash.org that changes based on battery charge */
    robotImage = document.querySelector('#robot-Image'); /*gets img tag with robot image id */
    robotImage.src=imageUrl; /*sets the src to the url created to pull the associated robot battery image*/
    robotImage.alt='Robot representing ' + chargeLevel.textContent + ' battery level'; /*sets alt to describe the image better */
}


navigator.getBattery().then(battery => {

    console.log(battery);

    updateBatteryStatus(battery);

    battery.addEventListener("chargingchange", function () {
        updateBatteryStatus(battery);
    })
    
    battery.addEventListener("levelchange", function () {
        updateBatteryStatus(battery);
    })
})

