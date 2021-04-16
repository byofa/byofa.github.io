// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Runner = Matter.Runner,
    Composite = Matter.Composite,
    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint,
    Vertices = Matter.Vertices,
    Events = Matter.Events;
    Common = Matter.Common;

// create an engine
var engine = Engine.create();

// get values of canvas responsive
var siz = document.getElementById("faces");
var w = siz.offsetWidth;
var h = siz.offsetHeight;

// create a renderer and setup
var render = Render.create({
    canvas: test,
    engine: engine,
    options: {
        wireframes: false,
        background: 'transparent',
        wireframeBackground: 'transparent',
        width: w,
        height: h,
        // showBounds: true,
        render: {
            setPixelRatio: 'auto'
        }
    }
});

// create vertice
var face = Vertices.fromPath("54.8 8.4 56.5 8.2 58.5 8.5 60.2 8.7 69 9.2 76.4 13.2 83.8 17.7 87 19.5 91 21.2 93 24.4 93.8 26 94.1 28 94.7 29.7 96.1 34.2 97.4 38.8 99 43.4 100 46.2 101.1 49.1 101.7 52.2 102.7 59.5 102 67.5 101.7 74.8 101.2 83.7 101.8 92.8 100.4 101.7 100.1 103 99.5 104 99.2 105.2 99 106.5 99 107.8 98.7 109.1 97.8 112.2 95.8 115.2 94.4 118.1 92.4 122.1 90.8 126.7 88.1 130.2 86.5 132.2 84.4 133.7 82.5 135.1 76.5 140.1 70.1 143.2 62.4 144.4 49.7 146.1 37.2 143.2 28 133.8 26.1 131.8 24.8 129.7 23.5 127.4 22.7 126.2 21.7 125.1 21 123.8 18.7 119 18.7 114 17.8 108.8 17.2 106.2 16.2 104 15.7 101.4 14.7 96.5 14.2 91.7 13.8 86.8 12.7 76.4 7.1 67.1 7.5 56.4 7.7 52.2 9.4 48.1 10.7 44.2 12.2 39.5 14 34.4 16.7 30.1 18.4 27.4 20.7 25 23.1 22.8 28 18.4 33.5 14 39.7 11.4 44.5 9.4 49.7 9.1 54.8 8.4");

// create bodies
var scaly = w/1920;
var scalF =(w*1.1)/1920;
var addFace = function() {
    var boxFace = Bodies.fromVertices(Common.random(0,w), 0, face, {
        render: {
            sprite: {
                texture: './img/photo.png',
                xOffset: -0.03,
                yOffset: -0.03,
                xScale: scalF,
                yScale: scalF                
            }
        }
    }
    );
    Body.scale(boxFace, scaly, scaly);
    Composite.add(engine.world, boxFace);
};
// create walls
var wallA = Bodies.rectangle(w + 50, h / 2, 100, h, {
    isStatic: true,
    render: {
        fillStyle: 'transparent'
    }
}),
    wallB = Bodies.rectangle(-50, h / 2, 100, h, {
        isStatic: true,
        render: {
            fillStyle: 'transparent'
        }
    }),
    ground = Bodies.rectangle(w / 2, h + 50, w, 100, {
        isStatic: true,
        render: {
            fillStyle: 'transparent'
        }
    });

// create mouse and option
var mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: {
                lineWidth: 0,
                visible: false
            }
        }
    });
render.mouse = mouse;
// create events
Events.on(mouseConstraint, "mousedown", addFace);

// fit the render viewport to the scene
Render.lookAt(render, {
    min: { x: 0, y: 0 },
    max: { x: w, y: h }
});
// add all of the bodies and mouse to the world
Composite.add(engine.world, [ground, wallA, wallB, mouseConstraint]);

// run the engine
Runner.run(engine);

// run the renderer
Render.run(render);
