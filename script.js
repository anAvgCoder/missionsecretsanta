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
});

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("children-grid");

  fetch("children.txt")
    .then(response => response.text())
    .then(text => {
      const lines = text.trim().split(/\r?\n/);

      lines.forEach(line => {
        if (!line.includes("|")) return;

        const [avatar, title, about, link, rawStatus] = line.split("|");

        const status = rawStatus.trim().toLowerCase();
        const isAvailable = status === "available";

        const card = document.createElement("article");
        card.classList.add("child-card");
        card.dataset.status = status;

        card.innerHTML = `
          <div class="child-avatar">${avatar}</div>
          <div class="child-info">
            <h2>${title}</h2>
            <p class="child-about">${about}</p>
            <a href="${link}" class="btn-secondary" target="_blank" rel="noopener">
              View Amazon Wish List
            </a>
            <div class="child-status">
              <span class="status-badge ${
                isAvailable ? "status-available" : "status-sponsored"
              }">${isAvailable ? "Available" : "Sponsored (Thank you!)"}</span>
            </div>
          </div>
        `;

        container.appendChild(card);
      });
    });
});

document.addEventListener("DOMContentLoaded", () => {
  const GOAL = 750;
  const CURRENT_AMOUNT = 706;

  const amountSpan = document.getElementById("goal-amount");
  const barFill = document.getElementById("goal-bar-fill");

  if (amountSpan && barFill) {
    amountSpan.textContent = CURRENT_AMOUNT.toLocaleString();
    const percent = Math.min(CURRENT_AMOUNT / GOAL, 1) * 100;
    barFill.style.width = `${percent}%`;

    if (CURRENT_AMOUNT >= GOAL) {
      barFill.style.background = "#22c55e";
    } else {
      barFill.style.background = "#ef4444";
    }
  }
});
