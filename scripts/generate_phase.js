function generate_phase() {
    var urlPng = "https://graphics.straitstimes.com/STI/STIMEDIA/Interactives/2018/04/marvel-cinematic-universe-whos-who-interactive/images_doc/marvel/nodeIcons/"
    document.getElementById('legend-container').innerHTML = " "
    document.getElementById('changeView').innerHTML =  `<div class="row">
    <div class="column"><h2 id="title_phase">PHASE ONE</h2><div id="phase1"></div></div>
    <div class="column"><h2 id="title_phase">PHASE TWO</h2><div id="phase2"></div></div>
    <div class="column"><h2 id="title_phase">PHASE THREE</h2><div id="phase3"></div>
    </div>  `
var options1 = {
    interaction:{
        zoomView: false
    },
    
    
    nodes: {
        font: { color: 'white', },
        margin: 5,
        scaling: {
            min: 10,
            max: 30,
            label: {
                enabled: false,
                min: 14,
                max: 30,
                maxVisible: 30,
                drawThreshold: 5
            },
        },

        shape: 'circularImage',
        widthConstraint: {
            maximum: 80
        },
        size: 65,
    },
    edges: {

    },
    layout: {
        improvedLayout: true,
        hierarchical: {
            enabled: true,
            levelSeparation: 150,
            nodeSpacing: 100,
            treeSpacing: 200,
            blockShifting: true,
            edgeMinimization: true,
            parentCentralization: true,
            direction: 'UD',        // UD, DU, LR, RL
            sortMethod: 'hubsize'   // hubsize, directed

        }
    },

    // http://visjs.org/docs/network/physics.html#
    physics: {
        enabled: true,
    }
};
var options2 = {
    interaction:{
        zoomView: false

    },
    
    nodes: {
        font: { color: 'white' },
        margin: 5,
        scaling: {
            min: 10,
            max: 30,
            label: {
                enabled: false,
                min: 14,
                max: 30,
                maxVisible: 30,
                drawThreshold: 5
            },
        },
        shape: 'circularImage',
        widthConstraint: {
            maximum: 80
        },
        size: 65,
    },
    edges: {
        
    },
    layout: {
        improvedLayout: true,
        hierarchical: {
            enabled: true,
            levelSeparation: 150,
            nodeSpacing: 100,
            treeSpacing: 200,
            blockShifting: true,
            edgeMinimization: true,
            parentCentralization: true,
            direction: 'UD',        // UD, DU, LR, RL
            sortMethod: 'hubsize'   // hubsize, directed

        }
    },

    // http://visjs.org/docs/network/physics.html#
    physics: {
        enabled: true,
    }
};
var options3 = {
    interaction:{
        zoomView: false

    },
    
    nodes: {
        font: { color: 'black' },
        margin: 5,
        
        

      
        size: 65,
        shape: 'circularImage',
        widthConstraint: {
            maximum: 80
        },
    },
    edges: {

    },
    layout: {
        improvedLayout: true,
        hierarchical: {
            enabled: true,
            levelSeparation: 150,
            nodeSpacing: 100,
            treeSpacing: 200,
            blockShifting: true,
            edgeMinimization: true,
            parentCentralization: true,
            direction: 'UD',        // UD, DU, LR, RL
            sortMethod: 'hubsize'   // hubsize, directed

        }
    },

    // http://visjs.org/docs/network/physics.html#
    physics: {
        enabled: true,
    }
};

$.getJSON("data/marvel-data.json")
    .done(function (data) {
        var heroes = data.characters
        var movies = data.movies
        var movies_nodes_phase_1 = []
        var movies_nodes_phase_2 = []
        var movies_nodes_phase_3 = []
        var movies_edges_phase_1 = []
        var movies_edges_phase_2 = []
        var movies_edges_phase_3 = []
        for (const key in movies) {
            var value = movies[key];
            var charInfilm = ""
            for (const key in heroes) {
                var movies_hero = Object.keys(heroes[key].movies)
                if(movies_hero.includes(value.id)){
                    charInfilm = charInfilm+ "-" + heroes[key].name+"\n"
                } 
            }
            if (value.name != "None" && value.phase == 1) {
                movies_nodes_phase_1.push({
                    id: value.index,
                    title: String(value.name +" " + value.year + "\nCHARACTERS:\n" +charInfilm),
                    //color: 'grey',
                    image: urlPng+value.id+".png",
                   
                })
            }
            
            if (value.name != "None" && value.phase == 2) {
                movies_nodes_phase_2.push({
                    id: value.index,
                    title: String(value.name +" " + value.year + "\nCHARACTERS:\n" +charInfilm),
                    image: urlPng+value.id+".png",
                   
                })
            }
            if (value.name != "None" && value.phase == 3) {
                movies_nodes_phase_3.push({
                    id: value.index,
                    title: String(value.name +" " + value.year + "\nCHARACTERS:\n" +charInfilm),
                    image: urlPng+value.id+".png",
                   
                })
            }
        }
        var index = 0
        while (index < 5) {
            movies_edges_phase_1.push({
                from: index,
                to: index + 1
            })
            index += 1

        }
        index += 1
        while (index < 11) {
            movies_edges_phase_2.push({
                from: index,
                to: index + 1
            })
            index += 1

        }
        index += 1
        while (index < 18) {
            movies_edges_phase_3.push({
                from: index,
                to: index + 1
            })
            index += 1

        }
        var data1 = {
            nodes: movies_nodes_phase_1,
            edges: movies_edges_phase_1

        }
        var data2 = {
            nodes: movies_nodes_phase_2,
            edges: movies_edges_phase_2

        }
        var data3 = {
            nodes: movies_nodes_phase_3,
            edges: movies_edges_phase_3

        }

        var phase1 = new vis.Network(container1, data1, options1);
        var phase2 = new vis.Network(container2, data2, options2);
        var phase3 = new vis.Network(container3, data3, options3)
        
    });

var container1 = document.getElementById('phase1');
var container2 = document.getElementById('phase2');
var container3 = document.getElementById('phase3');
}
