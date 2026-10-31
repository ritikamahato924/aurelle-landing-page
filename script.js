const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const navLinks = document.querySelector(".nav-links");

mobileMenuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");

  const isOpen = navLinks.classList.contains("active");

  mobileMenuBtn.setAttribute("aria-expanded", isOpen);
});

const reservationForm = document.querySelector("#reservationForm");
const successMessage = document.querySelector("#successMessage");
const successText = document.querySelector("#successText");

reservationForm.addEventListener("submit", async function(e) {
    e.preventDefault();

    const formData = new FormData(reservationForm);

    const date = formData.get("date");

    try {
        const response = await fetch(
            "https://formspree.io/f/mdeelbro",
            {
                method: "POST",
                body: formData,
                headers: {
                    "Accept": "application/json"
                }
            }
        );

        if (response.ok) {
            reservationForm.style.display = "none";
            successMessage.style.display = "block";

            successText.textContent =
                `Your reservation request for ${date} has been received. We'll contact you shortly to confirm your booking.`;

        } else {
            alert("Something went wrong. Please try again.");
        }

    } catch (error) {
        alert("Unable to submit your request. Please check your internet connection.");
    }
});
