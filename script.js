let slides = document.querySelectorAll(".slide");
let dots = document.querySelectorAll(".dots span");
let index = 0;

function showSlide(i) {
  slides.forEach(slide => slide.classList.remove("active"));
  dots.forEach(dot => dot.classList.remove("active"));
  slides[i].classList.add("active");
  dots[i].classList.add("active");
  index = i;
}

setInterval(() => {
  index = (index + 1) % slides.length;
  showSlide(index);
}, 5000);

// MOBILE MENU
function toggleMenu() {
  document.getElementById("navMenu").classList.toggle("active");
}


// SCROLL ANIMATION
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});

document.querySelectorAll(".fade-up").forEach(el => {
  observer.observe(el);
});

document.querySelector(".load-more-btn").addEventListener("click", () => {
  alert("Load more posts (dynamic loading can be added)");
});

// Auto-match header/accent colors from the logo image
function applyAccentFromLogo() {
  const img = document.querySelector('.logo img');
  if (!img) return;
  const tempImg = new Image();
  tempImg.crossOrigin = 'Anonymous';
  tempImg.src = img.src;
  tempImg.onload = () => {
    const w = Math.min(50, tempImg.naturalWidth || 50);
    const h = Math.min(50, tempImg.naturalHeight || 50);
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    try {
      ctx.drawImage(tempImg, 0, 0, w, h);
    } catch (e) {
      return; // cross-origin or drawing error
    }
    const data = ctx.getImageData(0, 0, w, h).data;
    let r = 0, g = 0, b = 0, count = 0;
    for (let i = 0; i < data.length; i += 4) {
      const alpha = data[i+3];
      if (alpha === 0) continue;
      r += data[i]; g += data[i+1]; b += data[i+2]; count++;
    }
    if (!count) return;
    r = Math.round(r / count); g = Math.round(g / count); b = Math.round(b / count);
    const accent = `rgb(${r},${g},${b})`;
    const headerBg = `rgba(${r},${g},${b},0.85)`;
    document.documentElement.style.setProperty('--accent-color', accent);
    document.documentElement.style.setProperty('--header-bg', headerBg);

    // set readable text color based on luminance
    const luminance = (0.2126*r + 0.7152*g + 0.0722*b) / 255;
    const textColor = luminance < 0.6 ? 'white' : 'black';
    const header = document.querySelector('.header');
    if (header) header.style.color = textColor;
    document.querySelectorAll('nav ul li a').forEach(a => a.style.color = textColor);
  };
  tempImg.onerror = () => {};
}

document.addEventListener('DOMContentLoaded', applyAccentFromLogo);
