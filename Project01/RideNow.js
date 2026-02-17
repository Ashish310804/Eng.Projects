function searchVehicle() {
    let typeInput = document.getElementById("type").value.toLowerCase();
    let cards = document.querySelectorAll(".vehicle-card");
    let resultText = document.getElementById("searchResult");

    let found = false;

    cards.forEach(card => {
        let vehicleType = card.getAttribute("data-type");

        if (vehicleType.includes(typeInput) || typeInput === "") {
            card.style.display = "block";
            found = true;
        } else {
            card.style.display = "none";
        }
    });

    if (!found) {
        resultText.innerText = "No vehicles found!";
        resultText.style.color = "red";
    } else {
        resultText.innerText = "";
    }
}
