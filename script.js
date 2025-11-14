// Make the bags on the home page clickable
document.addEventListener("DOMContentLoaded", () => {
  const bagCards = document.querySelectorAll(".bag-card");

  bagCards.forEach((card) => {
    card.addEventListener("click", () => {
      const target = card.getAttribute("data-target");
      if (target) {
        window.location.href = target;
      }
    });

    card.addEventListener("keypress", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        const target = card.getAttribute("data-target");
        if (target) {
          window.location.href = target;
        }
      }
    });
  });

  // Simple proof-of-concept tracking on donate page:
  // clicking "Sponsor this child" flips the status badge.
  const sponsorButtons = document.querySelectorAll(".sponsor-btn");

  sponsorButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".child-card");
      if (!card) return;

      const statusBadge = card.querySelector(".status-badge");
      const currentStatus = card.getAttribute("data-status");

      if (currentStatus === "available") {
        card.setAttribute("data-status", "sponsored");
        statusBadge.textContent = "Sponsored";
        statusBadge.classList.remove("status-available");
        statusBadge.classList.add("status-sponsored");
        btn.textContent = "Already sponsored";
        btn.disabled = true;
      }
    });
  });
});
