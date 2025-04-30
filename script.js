document.addEventListener('DOMContentLoaded', () => {
    // Animación de nodos
    const canvas = document.createElement('canvas');
    canvas.id = 'node-animation';
    document.querySelector('.hero').appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let width, height;
    const nodes = [];
    const maxNodes = 100;
    const maxDistance = 150;

    function resizeCanvas() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = document.querySelector('.hero').offsetHeight;
    }

    function createNodes() {
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

    window.addEventListener('resize', resizeCanvas);

    // Tarjetas de mapas
    const mapData = [
        {
            id: 1,
            title: "Mapa de Servicios Públicos",
            description: "Ubicación de hospitales, escuelas, estaciones de policía y otros servicios públicos importantes.",
            icon: "🏥",
            link: "#"
        },
        {
            id: 2,
            title: "Mapa de Transporte Público",
            description: "Rutas de autobuses, metro y otros medios de transporte público en la comuna.",
            icon: "🚌",
            link: "#"
        },
        {
            id: 3,
            title: "Mapa de Zonas Verdes",
            description: "Parques, jardines y áreas recreativas dentro del territorio comunal.",
            icon: "🌳",
            link: "#"
        },
        {
            id: 4,
            title: "Mapa de Patrimonio Cultural",
            description: "Edificios históricos, monumentos y sitios de interés cultural.",
            icon: "🏛️",
            link: "#"
        },
        {
            id: 5,
            title: "Mapa de Desarrollo Urbano",
            description: "Proyectos actuales y futuros de desarrollo urbano en la comuna.",
            icon: "🏗️",
            link: "#"
        },
        {
            id: 6,
            title: "Mapa Turístico",
            description: "Atractivos turísticos, hoteles, restaurantes y puntos de interés para visitantes.",
            icon: "🗺️",
            link: "#"
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
            <a href="${map.link}" class="map-link">Ver Mapa</a>
        `;
        mapsContainer.appendChild(card);
    });
});
