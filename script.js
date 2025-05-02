document.addEventListener('DOMContentLoaded', () => {
    // Animación de nodos dentro del contenedor .hero
    const canvas = document.createElement('canvas');
    canvas.id = 'node-animation';

    // Aseguramos que el canvas esté dentro del div .hero
    const heroContainer = document.querySelector('.hero');
    heroContainer.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let width, height;
    const nodes = [];
    const maxNodes = 100;
    const maxDistance = 150;

    function resizeCanvas() {
        // Ajustar el tamaño del canvas al tamaño del contenedor .hero
        width = canvas.width = heroContainer.offsetWidth;
        height = canvas.height = heroContainer.offsetHeight;
    }

    function createNodes() {
        // Crear nodos dentro de los límites del canvas
        nodes.length = 0; // Limpiar nodos existentes
        for (let i = 0; i < maxNodes; i++) {
            nodes.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 1.5,
                vy: (Math.random() - 0.5) * 1.5,
                radius: Math.random() * 3 + 1
            });
        }
    }

    function drawNodes() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.fill();
        }

        connectNodes();
    }

    function connectNodes() {
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < maxDistance) {
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / maxDistance})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    }

    function updateNodes() {
        for (let node of nodes) {
            node.x += node.vx;
            node.y += node.vy;

            // Rebote dentro de los límites del canvas
            if (node.x < 0 || node.x > width) node.vx *= -1;
            if (node.y < 0 || node.y > height) node.vy *= -1;
        }
    }

    function animate() {
        drawNodes();
        updateNodes();
        requestAnimationFrame(animate);
    }

    resizeCanvas();
    createNodes();
    animate();

    window.addEventListener('resize', () => {
        resizeCanvas();
        createNodes(); // Regenerar nodos para ajustar al nuevo tamaño
    });

    // Tarjetas de mapas (mantienen su funcionalidad original)
    const mapData = [
        {
            id: 1,
            title: "Proyectos Municipales 2024",
            description: "Proyectos municipales a Febrero de 2024(DEMO)..",
            icon: "🏗️",
            link: "https://utm1333.github.io/proyectos_2024/#11/-30.1062/-71.3551"
        },
        {
            id: 2,
            title: "Mapa de Transporte Público",
            description: "EN CONSTRUCCIÓN.",
            icon: "🚌",
            link: "#"
        },
        {
            id: 3,
            title: "Mapa Áreas Verdes",
            description: "Áreas verdes comunales que son Bien Nacional de Uso Público.",
            icon: "🌳",
            link: "https://utm1333.github.io/AreasVerdes/#13/-29.9683/-71.3030"
        },
        {
            id: 4,
            title: "Mapa de Patrimonio Cultural",
            description: "EN CONSTRUCCIÓN.",
            icon: "🏛️",
            link: "#"
        },
        {
            id: 5,
            title: "Zonificación Plano Regulador Comunal",
            description: "Zonificación plano regulador comunal Coquimbo aprobado el  año 2019.",
            icon: "🗺️",
            link: "https://utm1333.github.io/PRCCoquimbo2019/#13/-29.9799/-71.3239"
        },
        {
            id: 6,
            title: "Mapa Vías de Evacuación",
            description: "Vías de evacuación en caso de emergencias o desastres.",
            icon: "📢",
            link: "https://utm1333.github.io/vias_evacuacion/#13/-29.9658/-71.3263"
        }
    ];

    const mapsContainer = document.getElementById('maps-container');

    mapData.forEach(map => {
        const card = document.createElement('div');
        card.className = 'map-card';
        card.innerHTML = `
            <div class="icon">${map.icon}</div>
            <h3>${map.title}</h3>
            <p>${map.description}</p>
            <a href="${map.link}" class="map-link" target="_blank" rel="noopener noreferrer">Ver Mapa</a>
        `;
        mapsContainer.appendChild(card);
    });
});