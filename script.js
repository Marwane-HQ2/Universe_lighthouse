const TAU = Zdog.TAU
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function lightHouse () {
    const illo = new Zdog.Illustration({ // Window Shape ?
        element: '#lighthouse', // La classe de notre canva
        resize: 150,

        translate: {y: 60, z:-70},
        rotate: {x: TAU/3 - TAU/15}, // Sympathique
        dragRotate: false,
    })

    let lighthouseGroup = new Zdog.Group({
        addTo: illo,
        rotate: { y: TAU/2}, //  x: TAU/-4,

    })
    let maxZ
    let lastEllispse
    for (let i=0; i<13;i++) {
        let color
        if (i%2 == 0) {
            color = "#D0D0D0"
        } else {
            color = "#ee3939"
        }
        lastEllispse = new Zdog.Cylinder({ 
            addTo: lighthouseGroup,
            diameter: 50-i*2,
            length: 10,
            color: color,
            translate: {z:-9*i},
            // quarters: 3,
        })
        maxZ = -9*i
        maxD = 80-i*5
    }

    new Zdog.Cylinder({
        addTo: illo,
        diameter: maxD-7,
        length: 40,
        stroke: false,
        color: "#D0D0D0",
        backface: "#ee3939",

        translate: {z:-maxZ},
    })

    let glass = new Zdog.Cylinder({ // La vitre
        addTo: illo,
        diameter: maxD,
        length: 70,
        stroke: false,
        color: "#2C2C2C",
        backface: "#2C2C2C",
        opacity: 0.1,

        translate: {z:-maxZ-7},
    })
    glass.render = function( ctx ) {
        ctx.globalCompositeOperation = 'source-over'
        Zdog.Shape.prototype.render.apply( this, arguments )
    }

    new Zdog.Hemisphere({
        addTo: glass,
        diameter: maxD,
        stroke: false,
        color: '#2C2C2C',
        backface: '#2C2C2C',

        translate: {z:35},
    })

    new Zdog.Hemisphere({ // Le gyrophare qui tournera 
        addTo: lastEllispse,
        diameter: maxD-7,
        // fill enabled by default
        // disable stroke for crisp edge
        stroke: false,
        color: '#EA0',
        backface: '#D0D0D0',

        translate: {z:maxZ + 90},
        rotate: {y: TAU/2},
    })

    // GALAXIE A PARTIR D'ICI
    // Planètes
    let planetOne = new Zdog.Group({
        addTo: illo,
        translate: {x: -60, z: 80},
    })
    new Zdog.Shape({
        addTo: planetOne,
        stroke: 18,
        color: '#7D0552',
    });

    let planet = new Zdog.Group({ // PLANETE AVEC ANNEAU
        addTo: illo,
        
        translate: {x: 60, z: 90},
    })
    
    new Zdog.Shape({ 
        addTo: planet,
        stroke: 18,
        color: '#560319',
    });

    new Zdog.Ellipse({ // ANNEAU DE LA PLANETE
        addTo: planet,
        diameter: 25,
        stroke: 4,
        color: '#CD5C5C',
        rotate: {x: TAU/6},
        
    })

    function createPlanet (size, vector) {
        let colorPlanets = ["#1D3B73", "#E74C3C", "#2ECC71", "#F39C12", "#8E44AD", "#3498DB", "#D35400", "#9B59B6", "#16A085", "#34495E"]
        if (randomInt(1, 2) === 1) {
            let planet = new Zdog.Group({ // PLANETE AVEC ANNEAU
                addTo: illo,
                
                translate: vector,
            })
            
            new Zdog.Shape({ 
                addTo: planet,
                stroke: 18+size,
                color: colorPlanets[randomInt(0, colorPlanets.length-1)],
            });
        
            new Zdog.Ellipse({ // ANNEAU DE LA PLANETE
                addTo: planet,
                diameter: 25+size,
                stroke: 4,
                color: colorPlanets[randomInt(0, colorPlanets.length-1)],
                rotate: {x: TAU/6},
                
            })
        }
        else {
            let planetOne = new Zdog.Group({
                addTo: illo,
                translate: vector,
            })
            new Zdog.Shape({
                addTo: planetOne,
                stroke: 18+size,
                color: '#7D0552',
            });
        }
    }

    // ETOILE

    function createStar (size, vector, rotation) {
        function calcStarPath (size) {
            let path = [];
            let starRadiusA = 3 *size; // ICI POUR MODIFIER LA TAILLE
            let starRadiusB = 1.7 *size; // ICI POUR MODIFIER LA TAILLE
            for ( let i=0; i<10; i++ ) {
            let radius = i % 2 ? starRadiusA : starRadiusB;
            let angle = TAU * i/10 + TAU/4;
            let point = {
                x: Math.cos( angle ) * radius,
                y: Math.sin( angle ) * radius,
            };
            path.push( point );
            }
            return path;
        }
        let starColor ="#FFA62F"
        new Zdog.Shape({
            path: calcStarPath(size),
            addTo: illo,
            translate: vector,
            stroke: 10,
            color: starColor,
            fill: true,
            rotate: rotation,
        });
    }

    const STAR_COORDONATES = []
    const PLAN_COORDONNATES = []

    let COO = {
        x: [-20, -30, -40, 60, 90, 120], 
        y: [-20, -30, -40, 60, 90, 120],
        z: [-20, -30, -40, 60, 90, 120],
    }

    let COO_P = {
        x: [-50, -70, -90, 110, 140, 170],
        y: [-55, -75, -95, 115, 145, 175],
        z: [-60, -80, -100, 120, 150, 180]
    }

    function shuffleList(list) {
        return list.sort(() => Math.random() - 0.5);
    }

    // PLEIN D'ETOILES
    for (let j=0; j<2; j++){
        shuffleList(COO.x)
        shuffleList(COO.y)
        shuffleList(COO.z)
        for (let i in COO.x) {
            STAR_COORDONATES.push([{x: COO.x[i]+randomInt(0, 40), y: COO.y[i]+randomInt(0, 40), z: COO.z[i]+randomInt(0, 40)}, {x: TAU/randomInt(1, 6), y: TAU/randomInt(1, 6), z: TAU/randomInt(1, 6)}])
        }
    }

    for (let j=0; j<3; j++){
        shuffleList(COO_P.x)
        shuffleList(COO_P.y)
        shuffleList(COO_P.z)
        for (let i in COO_P.x) {
            PLAN_COORDONNATES.push([{x: COO_P.x[i]+randomInt(0, 40), y: COO_P.y[i]+randomInt(0, 40), z: COO_P.z[i]+randomInt(0, 40)}])
        }
    }

    for (let i in STAR_COORDONATES)  {
        if (randomInt(1, 5) > 3) {
            let v = PLAN_COORDONNATES[i]
            createPlanet(randomInt(1, 12), v[0])
        }
        else{
            let v = STAR_COORDONATES[i]
            createStar(randomInt(1, 4), v[0],v[1])
        }    
    }
    
    function animateModel() {
        illo.rotate.z += 0.03
        illo.updateRenderGraph()
        requestAnimationFrame(animateModel)
    }
    animateModel()
}

lightHouse()


