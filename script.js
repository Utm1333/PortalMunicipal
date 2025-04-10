// JavaScript for the Municipal Portal

// Map data - normally this would come from a server/API
const mapData = [
    {
        id: 1,
        title: "Mapa de Servicios Públicos",
        description: "Ubicación de hospitales, escuelas, estaciones de policía y otros servicios públicos importantes.",
        color: "#3498db",
        icon: "🏢",
        link: "#mapa-servicios"
    },
    {
        id: 2,
        title: "Mapa de Transporte Público",
        description: "Rutas de autobuses, metro y otros medios de transporte público en la comuna.",
        color: "#e74c3c",
        icon: "🚌",
        link: "#mapa-transporte"
    },
    {
        id: 3,
        title: "Mapa de Zonas Verdes",
        description: "Parques, jardines y áreas recreativas dentro del territorio comunal.",
        color: "#2ecc71",
        icon: "🌳",
        link: "#mapa-zonas-verdes"
    },
    {
        id: 4,
        title: "Mapa de Patrimonio Cultural",
        description: "Edificios históricos, monumentos y sitios de interés cultural.",
        color: "#f39c12",
        icon: "🏛️",
        link: "#mapa-patrimonio"
    },
    {
        id: 5,
        title: "Mapa de Desarrollo Urbano",
        description: "Proyectos actuales y futuros de desarrollo urbano en la comuna.",
        color: "#9b59b6",
        icon: "🏗️",
        link: "#mapa-desarrollo"
    },
    {
        id: 6,
        title: "Mapa Turístico",
        description: "Atractivos turísticos, hoteles, restaurantes y puntos de interés para visitantes.",
        color: "#1abc9c",
        icon: "🗺️",
        link: "#mapa-turistico"
    }
];

// Function to create map cards
function createMapCard(map, index) {
    const delay = index * 100; // Staggered animation delay
    
    const card = document.createElement('div');
    card.className = 'map-card slide-in';
    card.style.animationDelay = `${delay}ms`;
    
    card.innerHTML = `
        <div class="map-image" style="background-color: ${map.color}20">
            <span class="map-icon" style="color: ${map.color}">${map.icon}</span>
        </div>
        <div class="map-details">
            <h4>${map.title}</h4>
            <p>${map.description}</p>
            <a href="${map.link}" class="map-link">Ver Mapa</a>
        </div>
    `;
    
    return card;
}

// Load map cards when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const mapsContainer = document.getElementById('maps-container');
    
    // Add maps to the container
    mapData.forEach((map, index) => {
        const card = createMapCard(map, index);
        mapsContainer.appendChild(card);
    });
    
    // Add event listener to CTA button
    const ctaButton = document.querySelector('.cta-button');
    ctaButton.addEventListener('click', () => {
        const mapsSection = document.querySelector('.section-title');
        mapsSection.scrollIntoView({ behavior: 'smooth' });
    });
    
    // Add scroll animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all map cards and other elements that should animate on scroll
    document.querySelectorAll('.map-card, .section-title').forEach(el => {
        observer.observe(el);
    });
});
