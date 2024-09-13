// Fetch formules from the backend
async function fetchFormules() {
    try {
      const response = await fetch('http://localhost:8080/formules'); // Change to your backend URL
      if (!response.ok) {
        throw new Error('Failed to fetch formules');
      }
      const formules = await response.json();
      console.log('Fetched formules:', formules);
      return formules;
    } catch (error) {
      console.error('Error fetching formules:', error);
      return [];
    }
  }
  
// Generate Swiper slides based on the formules data
function generateSwiperSlides(formules) {
  const swiperWrapper = document.querySelector('.swiper-wrapper');
  swiperWrapper.innerHTML = ''; // Clear existing slides

  formules.forEach(formule => {
    // Generate prank list items
    const prankListItems = formule.pranks.map(prank => 
      `<li>${prank.title}</li>`
    ).join('');

    const slide = document.createElement('div');
    slide.className = 'swiper-slide';
    slide.innerHTML = `
      <a href="formulaire.html?id=${formule._id}">
        <img src="${formule.imageFormule}" alt="${formule.name}" />
        <div class="cost">${formule.name} - ${formule.price}€</div>
        <div class="overlay">
          <h1>${formule.name}</h1>
          <p>${formule.description}</p>
          <div class="ratings">
            <div class="stars">
              <ion-icon class="star" name="star"></ion-icon>
              <ion-icon class="star" name="star"></ion-icon>
              <ion-icon class="star" name="star"></ion-icon>
              <ion-icon class="star" name="star"></ion-icon>
              <ion-icon class="star-half-outline" name="star-half-outline"></ion-icon>
            </div>
          </div>
          <div class="pranks-list">
            <ul>${prankListItems}</ul>
          </div>
        </div>
      </a>
    `;
    swiperWrapper.appendChild(slide);
  });
}

  
  // Initialize the Swiper instance after slides have been injected
  function initializeSwiper() {
    var swiper = new Swiper(".swiper", {
      effect: "cube",
      grabCursor: true,
      loop: true,
      speed: 1000,
      cubeEffect: {
        shadow: false,
        slideShadows: true,
        shadowOffset: 10,
        shadowScale: 0.94,
      },
      autoplay: {
        delay: 2600,
        pauseOnMouseEnter: true,
      },
    });
    
    tsParticles.load("tsparticles", {
      fpsLimit: 60,
      backgroundMode: {
        enable: true,
        zIndex: -1,
      },
      particles: {
        number: {
          value: 30,
          density: {
            enable: true,
            area: 800,
          },
        },
        color: {
          value: [
            "#3998D0",
            "#2EB6AF",
            "#A9BD33",
            "#FEC73B",
            "#F89930",
            "#F45623",
            "#D62E32",
          ],
        },
        destroy: {
          mode: "split",
          split: {
            count: 1,
            factor: {
              value: 5,
              random: {
                enable: true,
                minimumValue: 4,
              },
            },
            rate: {
              value: 10,
              random: {
                enable: true,
                minimumValue: 5,
              },
            },
            particles: {
              collisions: {
                enable: false,
              },
              destroy: {
                mode: "none",
              },
              life: {
                count: 1,
                duration: {
                  value: 1,
                },
              },
            },
          },
        },
        shape: {
          type: "circle",
          stroke: {
            width: 0,
            color: "#000000",
          },
          polygon: {
            sides: 5,
          },
        },
        opacity: {
          value: 1,
          random: false,
          animation: {
            enable: false,
            speed: 1,
            minimumValue: 0.1,
            sync: false,
          },
        },
        size: {
          value: 8,
          random: {
            enable: true,
            minimumValue: 4,
          },
          animation: {
            enable: false,
            speed: 40,
            minimumValue: 0.1,
            sync: false,
          },
        },
        collisions: {
          enable: true,
          mode: "destroy",
        },
        move: {
          enable: true,
          speed: 7,
          direction: "none",
          random: false,
          straight: false,
          out_mode: "out",
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200,
          },
        },
      },
      detectRetina: true,
    });
    
    // Masquer l'indicateur après la première interaction avec le slider
  swiper.on('slideChange', function () {
      document.querySelector('.swiper-indicator').style.display = 'none';
    });
  }
  
  // On document load, fetch formules and initialize swiper
  document.addEventListener('DOMContentLoaded', async () => {
    const formules = await fetchFormules();
    generateSwiperSlides(formules);
    initializeSwiper();
  });
  