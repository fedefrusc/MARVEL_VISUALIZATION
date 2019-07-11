function generate_avengers() {
    var urlSvg = "https://graphics.straitstimes.com/STI/STIMEDIA/Interactives/2018/04/marvel-cinematic-universe-whos-who-interactive/images_doc/marvel/nodeIcons/"
    document.getElementById('changeView').innerHTML = `<div id="avengers"></div> <div class="legend-container" id="legend">`

    
    var options = {
        interaction: {
            zoomView: true

        },

        edges: {
            smooth:{
                enabled: true,
                type: "straightCross",
                roundness: 0.5

            },
            color: {
                color:'#848484',
                highlight:'#848484',
                hover: '#848484',
                inherit: 'from',
                opacity:1.0
              },
          
            width: 1.5,
          },
        nodes: {
            font: { color: 'black',background: 'white' },
            margin: 5,
            scaling: {
                min: 10,
                max: 10,
                label: {
                    enabled: false,
                    min: 14,
                    max: 30,
                    maxVisible: 30,
                    drawThreshold: 5
                },
            },

            shape: 'circle',
            widthConstraint: {
                maximum: 80
            },
        },
        layout: {
            randomSeed: 011111,
        },        

        
        // http://visjs.org/docs/network/physics.html#
        physics: {
            barnesHut: {
              avoidOverlap: 1,
              centralGravity: 0.7,
            },
            repulsion:{
                nodeDistance: 1,
              },
        },
        
    };



    $.getJSON("data/marvel-data.json")
        .done(function (data) {
            var heroes = data.characters
            var movies_data = data.movies
            var alter_ego = data.alter_ego
            var relations = data.relationship
            var heroes_nodes = []
            var heroes_edges = []
            for (const key in heroes) {
                var value = heroes[key]
                if (value.affiliation.avengers == true) {
                    var movies = Object.keys(value.movies)
                    
                    var alter_ego_name
                    var alter_ego_name_exist = false
                    var name
                    for(const key in alter_ego){
                        if(value.id==alter_ego[key].origin_id){
                            alter_ego_name = alter_ego[key].name
                            alter_ego_name_exist= true
                        }
                    }
                    if(alter_ego_name_exist){
                        name = "NAME: "+value.name + "\n" + "ALTER EGO: " + alter_ego_name + "\n"

                    }else
                        name = "NAME: "+value.name + "\n"
                    var film_of_characters = "MOVIES:\n"    
                    for(const key in movies_data){
                        var film = movies_data[key];
                       
                        for(i = 0; i < movies.length; i++){
                            if(movies[i]==film.id){
                                film_of_characters = film_of_characters + "- " + film.name + " " + film.year + "\n"
                            }
                        }

                    }
                    heroes_nodes.push({
                        id: value.id,
                       
                        shape: 'circularImage',
                        image: urlSvg+value.id+".svg",
                        title: name + film_of_characters
                        })
            }
                   
                
            }
            for (const key in relations) {
                    var value = relations[key]
                    var type_relation = setcolor(value.relationship)
                    if (value.relationship == 0 || value.relationship == 1 || value.relationship == 5 || value.relationship == 3 || value.relationship == 4) {
                    heroes_edges.push({
                    from: value.id,
                    to: value.target_id,
                    color: {color : type_relation},
                    physics: false,
                    
                  
                })
            }
            }
            var data = {
                nodes: heroes_nodes,
                edges: heroes_edges
            };
            network = new vis.Network(container, data, options);
            network.on('click', function(){
                
            })

            
        });
    var container = document.getElementById('avengers');
    document.getElementById('legend-container').innerHTML = `<h2>FILTER</h2>  <div class="relation">
    <botton type="button" onclick="setOnlyFriends()" style="background-color: rgb(104, 169, 77);color: black">Friend</botton>
  </div>
  <div class="relation">
    <botton type="button" onclick="setOnlyEnemy()" style="background-color: rgb(102, 75, 154);color: black">Enemy</botton>
  </div>
  <div class="relation">
    <botton type="button" onclick="setOnlyFamily()" style="background-color: rgb(224, 133, 35);color: black">Family</botton>
  </div>
  <div class=" relation">
      <botton type="button" onclick="setOnlyWork()" style="background-color: rgb(214, 207, 126);color: black">Work</botton>
  </div>
  <div class="relation">
    <botton type="button" onclick="setOnlyRomace()" style="background-color: rgb(239, 65, 35);color: black">Romance</botton>
  </div>

</div>`
   
}


function setOnlyFriends() {
    var urlSvg = "https://graphics.straitstimes.com/STI/STIMEDIA/Interactives/2018/04/marvel-cinematic-universe-whos-who-interactive/images_doc/marvel/nodeIcons/"
    document.getElementById('changeView').innerHTML = `<div id="avengers"></div> <div class="legend-container" id="legend">`

    
    var options = {
        interaction: {
            zoomView: true

        },

        edges: {
            smooth:{
                enabled: true,
                type: "straightCross",
                roundness: 0.5

            },
            color: {
                color:'#848484',
                highlight:'#848484',
                hover: '#848484',
                inherit: 'from',
                opacity:1.0
              },
          
            width: 1.5,
          },
        nodes: {
            font: { color: 'black',background: 'white' },
            margin: 5,
            scaling: {
                min: 10,
                max: 10,
                label: {
                    enabled: false,
                    min: 14,
                    max: 30,
                    maxVisible: 30,
                    drawThreshold: 5
                },
            },

            shape: 'circle',
            widthConstraint: {
                maximum: 80
            },
        },
        layout: {
            randomSeed: 011111,
        },        

        
        // http://visjs.org/docs/network/physics.html#
        physics: {
            barnesHut: {
              avoidOverlap: 1,
              centralGravity: 0.7,
            },
            repulsion:{
                nodeDistance: 1,
              },
        },
        
    };



    $.getJSON("data/marvel-data.json")
        .done(function (data) {
            var heroes = data.characters
            var movies_data = data.movies
            var alter_ego = data.alter_ego
            var relations = data.relationship
            var heroes_nodes = []
            var heroes_edges = []
            for (const key in heroes) {
                var value = heroes[key]
                if (value.affiliation.avengers == true) {
                    var movies = Object.keys(value.movies)
                    //console.log(movies)
                    var alter_ego_name
                    var alter_ego_name_exist = false
                    var name
                    for(const key in alter_ego){
                        if(value.id==alter_ego[key].origin_id){
                            alter_ego_name = alter_ego[key].name
                            alter_ego_name_exist= true
                        }
                    }
                    if(alter_ego_name_exist){
                        name = "NAME: "+value.name + "\n" + "ALTER EGO: " + alter_ego_name + "\n"

                    }else
                        name = "NAME: "+value.name + "\n"
                    var film_of_characters = "MOVIES:\n"    
                    for(const key in movies_data){
                        var film = movies_data[key];
                        //console.log(key)
                        for(i = 0; i < movies.length; i++){
                            if(movies[i]==film.id){
                                film_of_characters = film_of_characters + "- " + film.name + " " + film.year + "\n"
                            }
                        }

                    }
                    heroes_nodes.push({
                        id: value.id,
                        //label: String(value.name),
                        shape: 'circularImage',
                        image: urlSvg+value.id+".svg",
                        title: name + film_of_characters
                        })
            }
                   
                
            }
            for (const key in relations) {
                    var value = relations[key]
                    var type_relation = setcolor(value.relationship)
                    if (value.relationship == 0 ) {
                    heroes_edges.push({
                    from: value.id,
                    to: value.target_id,
                    color: {color : type_relation},
                    physics: false,
                    
                  
                })
            }
            }
            var data = {
                nodes: heroes_nodes,
                edges: heroes_edges
            };
            network = new vis.Network(container, data, options);
            network.on('click', function(){
                
            })

            //console.log(network.getSeed())
        });
    var container = document.getElementById('avengers');
    document.getElementById('legend-container').innerHTML = `<h2>FILTER</h2>  <div class="relation">
    <botton type="button" onclick="setOnlyFriends()" style="background-color: rgb(104, 169, 77);color: black">Friend</botton>
  </div>
  <div class="relation">
    <botton type="button" onclick="setOnlyEnemy()" style="background-color: rgb(102, 75, 154);color: black">Enemy</botton>
  </div>
  <div class="relation">
    <botton type="button" onclick="setOnlyFamily()" style="background-color: rgb(224, 133, 35);color: black">Family</botton>
  </div>
  <div class=" relation">
      <botton type="button" onclick="setOnlyWork()" style="background-color: rgb(214, 207, 126);color: black">Work</botton>
  </div>
  <div class="relation">
    <botton type="button" onclick="setOnlyRomace()" style="background-color: rgb(239, 65, 35);color: black">Romance</botton>
  </div>

</div>`
}

function setOnlyEnemy() {
    var urlSvg = "https://graphics.straitstimes.com/STI/STIMEDIA/Interactives/2018/04/marvel-cinematic-universe-whos-who-interactive/images_doc/marvel/nodeIcons/"
    document.getElementById('changeView').innerHTML = `<div id="avengers"></div> <div class="legend-container" id="legend">`

    
    var options = {
        interaction: {
            zoomView: true

        },

        edges: {
            smooth:{
                enabled: true,
                type: "straightCross",
                roundness: 0.5

            },
            color: {
                color:'#848484',
                highlight:'#848484',
                hover: '#848484',
                inherit: 'from',
                opacity:1.0
              },
          
            width: 1.5,
          },
        nodes: {
            font: { color: 'black',background: 'white' },
            margin: 5,
            scaling: {
                min: 10,
                max: 10,
                label: {
                    enabled: false,
                    min: 14,
                    max: 30,
                    maxVisible: 30,
                    drawThreshold: 5
                },
            },

            shape: 'circle',
            widthConstraint: {
                maximum: 80
            },
        },
        layout: {
            randomSeed: 011111,
        },        

        
        // http://visjs.org/docs/network/physics.html#
        physics: {
            barnesHut: {
              avoidOverlap: 1,
              centralGravity: 0.7,
            },
            repulsion:{
                nodeDistance: 1,
              },
        },
        
    };



    $.getJSON("data/marvel-data.json")
        .done(function (data) {
            var heroes = data.characters
            var movies_data = data.movies
            var alter_ego = data.alter_ego
            var relations = data.relationship
            var heroes_nodes = []
            var heroes_edges = []
            for (const key in heroes) {
                var value = heroes[key]
                if (value.affiliation.avengers == true) {
                    var movies = Object.keys(value.movies)
                    //console.log(movies)
                    var alter_ego_name
                    var alter_ego_name_exist = false
                    var name
                    for(const key in alter_ego){
                        if(value.id==alter_ego[key].origin_id){
                            alter_ego_name = alter_ego[key].name
                            alter_ego_name_exist= true
                        }
                    }
                    if(alter_ego_name_exist){
                        name = "NAME: "+value.name + "\n" + "ALTER EGO: " + alter_ego_name + "\n"

                    }else
                        name = "NAME: "+value.name + "\n"
                    var film_of_characters = "MOVIES:\n"    
                    for(const key in movies_data){
                        var film = movies_data[key];
                        //console.log(key)
                        for(i = 0; i < movies.length; i++){
                            if(movies[i]==film.id){
                                film_of_characters = film_of_characters + "- " + film.name + " " + film.year + "\n"
                            }
                        }

                    }
                    heroes_nodes.push({
                        id: value.id,
                        //label: String(value.name),
                        shape: 'circularImage',
                        image: urlSvg+value.id+".svg",
                        title: name + film_of_characters
                        })
            }
                   
                
            }
            for (const key in relations) {
                    var value = relations[key]
                    var type_relation = setcolor(value.relationship)
                    if (value.relationship == 1 ) {
                    heroes_edges.push({
                    from: value.id,
                    to: value.target_id,
                    color: {color : type_relation},
                    physics: false,
                    
                  
                })
            }
            }
            var data = {
                nodes: heroes_nodes,
                edges: heroes_edges
            };
            network = new vis.Network(container, data, options);
            network.on('click', function(){
                
            })

            //console.log(network.getSeed())
        });
    var container = document.getElementById('avengers');
    document.getElementById('legend-container').innerHTML = `<h2>FILTER</h2>  <div class="relation">
    <botton type="button" onclick="setOnlyFriends()" style="background-color: rgb(104, 169, 77);color: black">Friend</botton>
  </div>
  <div class="relation">
    <botton type="button" onclick="setOnlyEnemy()" style="background-color: rgb(102, 75, 154);color: black">Enemy</botton>
  </div>
  <div class="relation">
    <botton type="button" onclick="setOnlyFamily()" style="background-color: rgb(224, 133, 35);color: black">Family</botton>
  </div>
  <div class=" relation">
      <botton type="button" onclick="setOnlyWork()" style="background-color: rgb(214, 207, 126);color: black">Work</botton>
  </div>
  <div class="relation">
    <botton type="button" onclick="setOnlyRomace()" style="background-color: rgb(239, 65, 35);color: black">Romance</botton>
  </div>

</div>`
}
function setOnlyFamily() {
    var urlSvg = "https://graphics.straitstimes.com/STI/STIMEDIA/Interactives/2018/04/marvel-cinematic-universe-whos-who-interactive/images_doc/marvel/nodeIcons/"
    document.getElementById('changeView').innerHTML = `<div id="avengers"></div> <div class="legend-container" id="legend">`

    
    var options = {
        interaction: {
            zoomView: true

        },

        edges: {
            smooth:{
                enabled: true,
                type: "straightCross",
                roundness: 0.5

            },
            color: {
                color:'#848484',
                highlight:'#848484',
                hover: '#848484',
                inherit: 'from',
                opacity:1.0
              },
          
            width: 1.5,
          },
        nodes: {
            font: { color: 'black',background: 'white' },
            margin: 5,
            scaling: {
                min: 10,
                max: 10,
                label: {
                    enabled: false,
                    min: 14,
                    max: 30,
                    maxVisible: 30,
                    drawThreshold: 5
                },
            },

            shape: 'circle',
            widthConstraint: {
                maximum: 80
            },
        },
        layout: {
            randomSeed: 011111,
        },        

        
        // http://visjs.org/docs/network/physics.html#
        physics: {
            barnesHut: {
              avoidOverlap: 1,
              centralGravity: 0.7,
            },
            repulsion:{
                nodeDistance: 1,
              },
        },
        
    };



    $.getJSON("data/marvel-data.json")
        .done(function (data) {
            var heroes = data.characters
            var movies_data = data.movies
            var alter_ego = data.alter_ego
            var relations = data.relationship
            var heroes_nodes = []
            var heroes_edges = []
            for (const key in heroes) {
                var value = heroes[key]
                if (value.affiliation.avengers == true) {
                    var movies = Object.keys(value.movies)
                    //console.log(movies)
                    var alter_ego_name
                    var alter_ego_name_exist = false
                    var name
                    for(const key in alter_ego){
                        if(value.id==alter_ego[key].origin_id){
                            alter_ego_name = alter_ego[key].name
                            alter_ego_name_exist= true
                        }
                    }
                    if(alter_ego_name_exist){
                        name = "NAME: "+value.name + "\n" + "ALTER EGO: " + alter_ego_name + "\n"

                    }else
                        name = "NAME: "+value.name + "\n"
                    var film_of_characters = "MOVIES:\n"    
                    for(const key in movies_data){
                        var film = movies_data[key];
                        //console.log(key)
                        for(i = 0; i < movies.length; i++){
                            if(movies[i]==film.id){
                                film_of_characters = film_of_characters + "- " + film.name + " " + film.year + "\n"
                            }
                        }

                    }
                    heroes_nodes.push({
                        id: value.id,
                        //label: String(value.name),
                        shape: 'circularImage',
                        image: urlSvg+value.id+".svg",
                        title: name + film_of_characters
                        })
            }
                   
                
            }
            for (const key in relations) {
                    var value = relations[key]
                    var type_relation = setcolor(value.relationship)
                    if (value.relationship == 3 ) {
                    heroes_edges.push({
                    from: value.id,
                    to: value.target_id,
                    color: {color : type_relation},
                    physics: false,
                    
                  
                })
            }
            }
            var data = {
                nodes: heroes_nodes,
                edges: heroes_edges
            };
            network = new vis.Network(container, data, options);
            network.on('click', function(){
                
            })

            //console.log(network.getSeed())
        });
    var container = document.getElementById('avengers');
    document.getElementById('legend-container').innerHTML = `<h2>FILTER</h2>  <div class="relation">
    <botton type="button" onclick="setOnlyFriends()" style="background-color: rgb(104, 169, 77);color: black">Friend</botton>
  </div>
  <div class="relation">
    <botton type="button" onclick="setOnlyEnemy()" style="background-color: rgb(102, 75, 154);color: black">Enemy</botton>
  </div>
  <div class="relation">
    <botton type="button" onclick="setOnlyFamily()" style="background-color: rgb(224, 133, 35);color: black">Family</botton>
  </div>
  <div class=" relation">
      <botton type="button" onclick="setOnlyWork()" style="background-color: rgb(214, 207, 126);color: black">Work</botton>
  </div>
  <div class="relation">
    <botton type="button" onclick="setOnlyRomace()" style="background-color: rgb(239, 65, 35);color: black">Romance</botton>
  </div>

</div>`
}

function setOnlyWork() {
    var urlSvg = "https://graphics.straitstimes.com/STI/STIMEDIA/Interactives/2018/04/marvel-cinematic-universe-whos-who-interactive/images_doc/marvel/nodeIcons/"
    document.getElementById('changeView').innerHTML = `<div id="avengers"></div> <div class="legend-container" id="legend">`

    
    var options = {
        interaction: {
            zoomView: true

        },

        edges: {
            smooth:{
                enabled: true,
                type: "straightCross",
                roundness: 0.5

            },
            color: {
                color:'#848484',
                highlight:'#848484',
                hover: '#848484',
                inherit: 'from',
                opacity:1.0
              },
          
            width: 1.5,
          },
        nodes: {
            font: { color: 'black',background: 'white' },
            margin: 5,
            scaling: {
                min: 10,
                max: 10,
                label: {
                    enabled: false,
                    min: 14,
                    max: 30,
                    maxVisible: 30,
                    drawThreshold: 5
                },
            },

            shape: 'circle',
            widthConstraint: {
                maximum: 80
            },
        },
        layout: {
            randomSeed: 011111,
        },        

        
        // http://visjs.org/docs/network/physics.html#
        physics: {
            barnesHut: {
              avoidOverlap: 1,
              centralGravity: 0.7,
            },
            repulsion:{
                nodeDistance: 1,
              },
        },
        
    };



    $.getJSON("data/marvel-data.json")
        .done(function (data) {
            var heroes = data.characters
            var movies_data = data.movies
            var alter_ego = data.alter_ego
            var relations = data.relationship
            var heroes_nodes = []
            var heroes_edges = []
            for (const key in heroes) {
                var value = heroes[key]
                if (value.affiliation.avengers == true) {
                    var movies = Object.keys(value.movies)
                    //console.log(movies)
                    var alter_ego_name
                    var alter_ego_name_exist = false
                    var name
                    for(const key in alter_ego){
                        if(value.id==alter_ego[key].origin_id){
                            alter_ego_name = alter_ego[key].name
                            alter_ego_name_exist= true
                        }
                    }
                    if(alter_ego_name_exist){
                        name = "NAME: "+value.name + "\n" + "ALTER EGO: " + alter_ego_name + "\n"

                    }else
                        name = "NAME: "+value.name + "\n"
                    var film_of_characters = "MOVIES:\n"    
                    for(const key in movies_data){
                        var film = movies_data[key];
                        //console.log(key)
                        for(i = 0; i < movies.length; i++){
                            if(movies[i]==film.id){
                                film_of_characters = film_of_characters + "- " + film.name + " " + film.year + "\n"
                            }
                        }

                    }
                    heroes_nodes.push({
                        id: value.id,
                        //label: String(value.name),
                        shape: 'circularImage',
                        image: urlSvg+value.id+".svg",
                        title: name + film_of_characters
                        })
            }
                   
                
            }
            for (const key in relations) {
                    var value = relations[key]
                    var type_relation = setcolor(value.relationship)
                    if (value.relationship == 4 ) {
                    heroes_edges.push({
                    from: value.id,
                    to: value.target_id,
                    color: {color : type_relation},
                    physics: false,
                    
                  
                })
            }
            }
            var data = {
                nodes: heroes_nodes,
                edges: heroes_edges
            };
            network = new vis.Network(container, data, options);
            network.on('click', function(){
                
            })

            //console.log(network.getSeed())
        });
    var container = document.getElementById('avengers');
    document.getElementById('legend-container').innerHTML = ` <h2>FILTER</h2> <div class="relation">
    <botton type="button" onclick="setOnlyFriends()" style="background-color: rgb(104, 169, 77);color: black">Friend</botton>
  </div>
  <div class="relation">
    <botton type="button" onclick="setOnlyEnemy()" style="background-color: rgb(102, 75, 154);color: black">Enemy</botton>
  </div>
  <div class="relation">
    <botton type="button" onclick="setOnlyFamily()" style="background-color: rgb(224, 133, 35);color: black">Family</botton>
  </div>
  <div class=" relation">
      <botton type="button" onclick="setOnlyWork()" style="background-color: rgb(214, 207, 126);color: black">Work</botton>
  </div>
  <div class="relation">
    <botton type="button" onclick="setOnlyRomace()" style="background-color: rgb(239, 65, 35);color: black">Romance</botton>
  </div>

</div>`
}

function setOnlyRomace() {
    var urlSvg = "https://graphics.straitstimes.com/STI/STIMEDIA/Interactives/2018/04/marvel-cinematic-universe-whos-who-interactive/images_doc/marvel/nodeIcons/"
    document.getElementById('changeView').innerHTML = `<div id="avengers"></div> <div class="legend-container" id="legend">`

    
    var options = {
        interaction: {
            zoomView: true

        },

        edges: {
            smooth:{
                enabled: true,
                type: "straightCross",
                roundness: 0.5

            },
            color: {
                color:'#848484',
                highlight:'#848484',
                hover: '#848484',
                inherit: 'from',
                opacity:1.0
              },
          
            width: 1.5,
          },
        nodes: {
            font: { color: 'black',background: 'white' },
            margin: 5,
            scaling: {
                min: 10,
                max: 10,
                label: {
                    enabled: false,
                    min: 14,
                    max: 30,
                    maxVisible: 30,
                    drawThreshold: 5
                },
            },

            shape: 'circle',
            widthConstraint: {
                maximum: 80
            },
        },
        layout: {
            randomSeed: 011111,
        },        

        
        // http://visjs.org/docs/network/physics.html#
        physics: {
            barnesHut: {
              avoidOverlap: 1,
              centralGravity: 0.7,
            },
            repulsion:{
                nodeDistance: 1,
              },
        },
        
    };



    $.getJSON("data/marvel-data.json")
        .done(function (data) {
            var heroes = data.characters
            var movies_data = data.movies
            var alter_ego = data.alter_ego
            var relations = data.relationship
            var heroes_nodes = []
            var heroes_edges = []
            for (const key in heroes) {
                var value = heroes[key]
                if (value.affiliation.avengers == true) {
                    var movies = Object.keys(value.movies)
                    //console.log(movies)
                    var alter_ego_name
                    var alter_ego_name_exist = false
                    var name
                    for(const key in alter_ego){
                        if(value.id==alter_ego[key].origin_id){
                            alter_ego_name = alter_ego[key].name
                            alter_ego_name_exist= true
                        }
                    }
                    if(alter_ego_name_exist){
                        name = "NAME: "+value.name + "\n" + "ALTER EGO: " + alter_ego_name + "\n"

                    }else
                        name = "NAME: "+value.name + "\n"
                    var film_of_characters = "MOVIES:\n"    
                    for(const key in movies_data){
                        var film = movies_data[key];
                        //console.log(key)
                        for(i = 0; i < movies.length; i++){
                            if(movies[i]==film.id){
                                film_of_characters = film_of_characters + "- " + film.name + " " + film.year + "\n"
                            }
                        }

                    }
                    heroes_nodes.push({
                        id: value.id,
                        //label: String(value.name),
                        shape: 'circularImage',
                        image: urlSvg+value.id+".svg",
                        title: name + film_of_characters
                        })
            }
                   
                
            }
            for (const key in relations) {
                    var value = relations[key]
                    var type_relation = setcolor(value.relationship)
                    if (value.relationship == 5 ) {
                    heroes_edges.push({
                    from: value.id,
                    to: value.target_id,
                    color: {color : type_relation},
                    physics: false,
                    
                  
                })
            }
            }
            var data = {
                nodes: heroes_nodes,
                edges: heroes_edges
            };
            network = new vis.Network(container, data, options);
            network.on('click', function(){
                
            })

            //console.log(network.getSeed())
        });
    var container = document.getElementById('avengers');
    document.getElementById('legend-container').innerHTML = `<h2>FILTER</h2>  <div class="relation">
    <botton type="button" onclick="setOnlyFriends()" style="background-color: rgb(104, 169, 77);color: black">Friend</botton>
  </div>
  <div class="relation">
    <botton type="button" onclick="setOnlyEnemy()" style="background-color: rgb(102, 75, 154);color: black">Enemy</botton>
  </div>
  <div class="relation">
    <botton type="button" onclick="setOnlyFamily()" style="background-color: rgb(224, 133, 35);color: black">Family</botton>
  </div>
  <div class=" relation">
      <botton type="button" onclick="setOnlyWork()" style="background-color: rgb(214, 207, 126);color: black">Work</botton>
  </div>
  <div class="relation">
    <botton type="button" onclick="setOnlyRomace()" style="background-color: rgb(239, 65, 35);color: black">Romance</botton>
  </div>

</div>`
}


function setcolor(num){
    if (num == 0 ) return "green"
    if (num == 1 ) return "purple"
    if (num == 2 ) return "lightblue"
    if (num == 3 ) return "orange"
    if (num == 4 ) return "yellow"
    if (num == 5 ) return "red"
    if (num == 6 ) return "white"
}