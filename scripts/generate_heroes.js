var options = {
    interaction: {
        zoomView: true

    },


    nodes: {
        font: { color: 'black', },
        margin: 5,
        /*scaling: {
            min: 10,
            max: 30,
            label: {
                enabled: false,
                min: 14,
                max: 30,
                maxVisible: 30,
                drawThreshold: 5
            },
        },*/

        shape: 'circle',

        widthConstraint: {
            maximum: 80
        },
    },
    edges: {
        smooth: {
            enabled: true,
            type: "straightCross",
            roundness: 0.2

        },
        width: 0.5,
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
        repulsion: {
            nodeDistance: 1,
        },
    },

};



function generate_heroes() {
    var urlSvg = "https://graphics.straitstimes.com/STI/STIMEDIA/Interactives/2018/04/marvel-cinematic-universe-whos-who-interactive/images_doc/marvel/nodeIcons/"
    document.getElementById('changeView').innerHTML = `<div id="heroes"></div> <div class="legend-container" id="legend">`

    

    $.getJSON("data/marvel-data.json")
        .done(function (data) {
            var heroes = data.characters
            var relations = data.relationship
            var movies_data = data.movies
            var alter_ego = data.alter_ego
            var heroes_nodes = []
            var heroes_edges = []
            for (const key in heroes) {
                var value = heroes[key]
                var alias = get_alias(value.alias)
                if (value.type == "hero") {
                    var movies = Object.keys(value.movies)
                    //console.log(movies)
                    var alter_ego_name
                    var alter_ego_name_exist = false
                    var name
                    for (const key in alter_ego) {
                        if (value.id == alter_ego[key].origin_id) {
                            alter_ego_name = alter_ego[key].name
                            alter_ego_name_exist = true
                        }
                    }
                    if (alter_ego_name_exist) {
                        name = "NAME: " + value.name + "\n" + "ALTER EGO: " + alter_ego_name + "\n"

                    } else
                        name = "NAME: " + value.name + "\n"
                    var film_of_characters = "MOVIES:\n"
                    for (const key in movies_data) {
                        var film = movies_data[key];
                        //console.log(key)
                        for (i = 0; i < movies.length; i++) {
                            if (movies[i] == film.id) {
                                film_of_characters = film_of_characters + "- " + film.name + " " + film.year + "\n"
                            }
                        }

                    }
                    heroes_nodes.push({
                        id: value.id,
                        //label: String(alias + value.name ),
                        shape: 'circularImage',
                        image: urlSvg + value.id + ".svg",
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
                        color: { color: type_relation },
                        physics: false,
                    })
                }
            }
            var data = {
                nodes: heroes_nodes,
                edges: heroes_edges
            };
           network = new vis.Network(container, data, options);
        });


    var container = document.getElementById('heroes');
    document.getElementById('legend-container').innerHTML = `<h2>FILTER</h2> <div class="relation">
    
    <botton type="button" onclick="setOnlyFriends_hero()" style="background-color: rgb(104, 169, 77);color: black">Friend</botton>
  </div>
  <div class="relation">
    <botton type="button" onclick="setOnlyEnemy_hero()" style="background-color: rgb(102, 75, 154);color: black">Enemy</botton>
  </div>
  <div class="relation">
    <botton type="button" onclick="setOnlyFamily_hero()" style="background-color: rgb(224, 133, 35);color: black">Family</botton>
  </div>
  <div class=" relation">
      <botton type="button" onclick="setOnlyWork_hero()" style="background-color: rgb(214, 207, 126);color: black">Work</botton>
  </div>
  <div class="relation">
    <botton type="button" onclick="setOnlyRomace_hero()" style="background-color: rgb(239, 65, 35);color: black">Romance</botton>
  </div>

</div>`
}
function setOnlyFriends_hero(){
    
        var urlSvg = "https://graphics.straitstimes.com/STI/STIMEDIA/Interactives/2018/04/marvel-cinematic-universe-whos-who-interactive/images_doc/marvel/nodeIcons/"
        document.getElementById('changeView').innerHTML = `<div id="heroes"></div> <div class="legend-container" id="legend">`
    
       
    
    
        $.getJSON("data/marvel-data.json")
            .done(function (data) {
                var heroes = data.characters
                var relations = data.relationship
                var movies_data = data.movies
                var alter_ego = data.alter_ego
                var heroes_nodes = []
                var heroes_edges = []
                for (const key in heroes) {
                    var value = heroes[key]
                    var alias = get_alias(value.alias)
                    if (value.type == "hero") {
                        var movies = Object.keys(value.movies)
                        //console.log(movies)
                        var alter_ego_name
                        var alter_ego_name_exist = false
                        var name
                        for (const key in alter_ego) {
                            if (value.id == alter_ego[key].origin_id) {
                                alter_ego_name = alter_ego[key].name
                                alter_ego_name_exist = true
                            }
                        }
                        if (alter_ego_name_exist) {
                            name = "NAME: " + value.name + "\n" + "ALTER EGO: " + alter_ego_name + "\n"
    
                        } else
                            name = "NAME: " + value.name + "\n"
                        var film_of_characters = "MOVIES:\n"
                        for (const key in movies_data) {
                            var film = movies_data[key];
                            //console.log(key)
                            for (i = 0; i < movies.length; i++) {
                                if (movies[i] == film.id) {
                                    film_of_characters = film_of_characters + "- " + film.name + " " + film.year + "\n"
                                }
                            }
    
                        }
                        heroes_nodes.push({
                            id: value.id,
                            //label: String(alias + value.name ),
                            shape: 'circularImage',
                            image: urlSvg + value.id + ".svg",
                            title: name + film_of_characters
                        })
                    }
                }
                for (const key in relations) {
                    var value = relations[key]
                    var type_relation = setcolor(value.relationship)
                    if (value.relationship == 0) {
                        heroes_edges.push({
                            from: value.id,
                            to: value.target_id,
                            color: { color: type_relation },
                            physics: false,
                        })
                    }
                }
                var data = {
                    nodes: heroes_nodes,
                    edges: heroes_edges
                };
               network = new vis.Network(container, data, options);
            });
    
    
        var container = document.getElementById('heroes');
        document.getElementById('legend-container').innerHTML = ` <h2>FILTER</h2><div class="relation">
        <botton type="button" onclick="setOnlyFriends_hero()" style="background-color: rgb(104, 169, 77);color: black">Friend</botton>
      </div>
      <div class="relation">
        <botton type="button" onclick="setOnlyEnemy_hero()" style="background-color: rgb(102, 75, 154);color: black">Enemy</botton>
      </div>
      <div class="relation">
        <botton type="button" onclick="setOnlyFamily_hero()" style="background-color: rgb(224, 133, 35);color: black">Family</botton>
      </div>
      <div class=" relation">
          <botton type="button" onclick="setOnlyWork_hero()" style="background-color: rgb(214, 207, 126);color: black">Work</botton>
      </div>
      <div class="relation">
        <botton type="button" onclick="setOnlyRomace_hero()" style="background-color: rgb(239, 65, 35);color: black">Romance</botton>
      </div>
    
    </div>`
    }

function setOnlyEnemy_hero(){
    
        var urlSvg = "https://graphics.straitstimes.com/STI/STIMEDIA/Interactives/2018/04/marvel-cinematic-universe-whos-who-interactive/images_doc/marvel/nodeIcons/"
        document.getElementById('changeView').innerHTML = `<div id="heroes"></div> <div class="legend-container" id="legend">`
    
        
    
    
        $.getJSON("data/marvel-data.json")
            .done(function (data) {
                var heroes = data.characters
                var relations = data.relationship
                var movies_data = data.movies
                var alter_ego = data.alter_ego
                var heroes_nodes = []
                var heroes_edges = []
                for (const key in heroes) {
                    var value = heroes[key]
                    var alias = get_alias(value.alias)
                    if (value.type == "hero") {
                        var movies = Object.keys(value.movies)
                        //console.log(movies)
                        var alter_ego_name
                        var alter_ego_name_exist = false
                        var name
                        for (const key in alter_ego) {
                            if (value.id == alter_ego[key].origin_id) {
                                alter_ego_name = alter_ego[key].name
                                alter_ego_name_exist = true
                            }
                        }
                        if (alter_ego_name_exist) {
                            name = "NAME: " + value.name + "\n" + "ALTER EGO: " + alter_ego_name + "\n"
    
                        } else
                            name = "NAME: " + value.name + "\n"
                        var film_of_characters = "MOVIES:\n"
                        for (const key in movies_data) {
                            var film = movies_data[key];
                            //console.log(key)
                            for (i = 0; i < movies.length; i++) {
                                if (movies[i] == film.id) {
                                    film_of_characters = film_of_characters + "- " + film.name + " " + film.year + "\n"
                                }
                            }
    
                        }
                        heroes_nodes.push({
                            id: value.id,
                            //label: String(alias + value.name ),
                            shape: 'circularImage',
                            image: urlSvg + value.id + ".svg",
                            title: name + film_of_characters
                        })
                    }
                }
                for (const key in relations) {
                    var value = relations[key]
                    var type_relation = setcolor(value.relationship)
                    if (value.relationship == 1) {
                        heroes_edges.push({
                            from: value.id,
                            to: value.target_id,
                            color: { color: type_relation },
                            physics: false,
                        })
                    }
                }
                var data = {
                    nodes: heroes_nodes,
                    edges: heroes_edges
                };
               network = new vis.Network(container, data, options);
            });
    
    
        var container = document.getElementById('heroes');
        document.getElementById('legend-container').innerHTML = ` <h2>FILTER</h2><div class="relation">
        <botton type="button" onclick="setOnlyFriends_hero()" style="background-color: rgb(104, 169, 77);color: black">Friend</botton>
      </div>
      <div class="relation">
        <botton type="button" onclick="setOnlyEnemy_hero()" style="background-color: rgb(102, 75, 154);color: black">Enemy</botton>
      </div>
      <div class="relation">
        <botton type="button" onclick="setOnlyFamily_hero()" style="background-color: rgb(224, 133, 35);color: black">Family</botton>
      </div>
      <div class=" relation">
          <botton type="button" onclick="setOnlyWork_hero()" style="background-color: rgb(214, 207, 126);color: black">Work</botton>
      </div>
      <div class="relation">
        <botton type="button" onclick="setOnlyRomace_hero()" style="background-color: rgb(239, 65, 35);color: black">Romance</botton>
      </div>
    
    </div>`
    }

function setOnlyFamily_hero(){
    
        var urlSvg = "https://graphics.straitstimes.com/STI/STIMEDIA/Interactives/2018/04/marvel-cinematic-universe-whos-who-interactive/images_doc/marvel/nodeIcons/"
        document.getElementById('changeView').innerHTML = `<div id="heroes"></div> <div class="legend-container" id="legend">`
    
        
    
        $.getJSON("data/marvel-data.json")
            .done(function (data) {
                var heroes = data.characters
                var relations = data.relationship
                var movies_data = data.movies
                var alter_ego = data.alter_ego
                var heroes_nodes = []
                var heroes_edges = []
                for (const key in heroes) {
                    var value = heroes[key]
                    var alias = get_alias(value.alias)
                    if (value.type == "hero") {
                        var movies = Object.keys(value.movies)
                        //console.log(movies)
                        var alter_ego_name
                        var alter_ego_name_exist = false
                        var name
                        for (const key in alter_ego) {
                            if (value.id == alter_ego[key].origin_id) {
                                alter_ego_name = alter_ego[key].name
                                alter_ego_name_exist = true
                            }
                        }
                        if (alter_ego_name_exist) {
                            name = "NAME: " + value.name + "\n" + "ALTER EGO: " + alter_ego_name + "\n"
    
                        } else
                            name = "NAME: " + value.name + "\n"
                        var film_of_characters = "MOVIES:\n"
                        for (const key in movies_data) {
                            var film = movies_data[key];
                            //console.log(key)
                            for (i = 0; i < movies.length; i++) {
                                if (movies[i] == film.id) {
                                    film_of_characters = film_of_characters + "- " + film.name + " " + film.year + "\n"
                                }
                            }
    
                        }
                        heroes_nodes.push({
                            id: value.id,
                            //label: String(alias + value.name ),
                            shape: 'circularImage',
                            image: urlSvg + value.id + ".svg",
                            title: name + film_of_characters
                        })
                    }
                }
                for (const key in relations) {
                    var value = relations[key]
                    var type_relation = setcolor(value.relationship)
                    if (value.relationship == 3) {
                        heroes_edges.push({
                            from: value.id,
                            to: value.target_id,
                            color: { color: type_relation },
                            physics: false,
                        })
                    }
                }
                var data = {
                    nodes: heroes_nodes,
                    edges: heroes_edges
                };
               network = new vis.Network(container, data, options);
            });
    
    
        var container = document.getElementById('heroes');
        document.getElementById('legend-container').innerHTML = ` <h2>FILTER</h2><div class="relation">
        <botton type="button" onclick="setOnlyFriends_hero()" style="background-color: rgb(104, 169, 77);color: black">Friend</botton>
      </div>
      <div class="relation">
        <botton type="button" onclick="setOnlyEnemy_hero()" style="background-color: rgb(102, 75, 154);color: black">Enemy</botton>
      </div>
      <div class="relation">
        <botton type="button" onclick="setOnlyFamily_hero()" style="background-color: rgb(224, 133, 35);color: black">Family</botton>
      </div>
      <div class=" relation">
          <botton type="button" onclick="setOnlyWork_hero()" style="background-color: rgb(214, 207, 126);color: black">Work</botton>
      </div>
      <div class="relation">
        <botton type="button" onclick="setOnlyRomace_hero()" style="background-color: rgb(239, 65, 35);color: black">Romance</botton>
      </div>
    
    </div>`
    }

function setOnlyWork_hero(){
    
        var urlSvg = "https://graphics.straitstimes.com/STI/STIMEDIA/Interactives/2018/04/marvel-cinematic-universe-whos-who-interactive/images_doc/marvel/nodeIcons/"
        document.getElementById('changeView').innerHTML = `<div id="heroes"></div> <div class="legend-container" id="legend">`
    
       
    
    
        $.getJSON("data/marvel-data.json")
            .done(function (data) {
                var heroes = data.characters
                var relations = data.relationship
                var movies_data = data.movies
                var alter_ego = data.alter_ego
                var heroes_nodes = []
                var heroes_edges = []
                for (const key in heroes) {
                    var value = heroes[key]
                    var alias = get_alias(value.alias)
                    if (value.type == "hero") {
                        var movies = Object.keys(value.movies)
                        //console.log(movies)
                        var alter_ego_name
                        var alter_ego_name_exist = false
                        var name
                        for (const key in alter_ego) {
                            if (value.id == alter_ego[key].origin_id) {
                                alter_ego_name = alter_ego[key].name
                                alter_ego_name_exist = true
                            }
                        }
                        if (alter_ego_name_exist) {
                            name = "NAME: " + value.name + "\n" + "ALTER EGO: " + alter_ego_name + "\n"
    
                        } else
                            name = "NAME: " + value.name + "\n"
                        var film_of_characters = "MOVIES:\n"
                        for (const key in movies_data) {
                            var film = movies_data[key];
                            //console.log(key)
                            for (i = 0; i < movies.length; i++) {
                                if (movies[i] == film.id) {
                                    film_of_characters = film_of_characters + "- " + film.name + " " + film.year + "\n"
                                }
                            }
    
                        }
                        heroes_nodes.push({
                            id: value.id,
                            //label: String(alias + value.name ),
                            shape: 'circularImage',
                            image: urlSvg + value.id + ".svg",
                            title: name + film_of_characters
                        })
                    }
                }
                for (const key in relations) {
                    var value = relations[key]
                    var type_relation = setcolor(value.relationship)
                    if (value.relationship == 4) {
                        heroes_edges.push({
                            from: value.id,
                            to: value.target_id,
                            color: { color: type_relation },
                            physics: false,
                        })
                    }
                }
                var data = {
                    nodes: heroes_nodes,
                    edges: heroes_edges
                };
               network = new vis.Network(container, data, options);
            });
    
    
        var container = document.getElementById('heroes');
        document.getElementById('legend-container').innerHTML = `<h2>FILTER</h2> <div class="relation">
        <botton type="button" onclick="setOnlyFriends_hero()" style="background-color: rgb(104, 169, 77);color: black">Friend</botton>
      </div>
      <div class="relation">
        <botton type="button" onclick="setOnlyEnemy_hero()" style="background-color: rgb(102, 75, 154);color: black">Enemy</botton>
      </div>
      <div class="relation">
        <botton type="button" onclick="setOnlyFamily_hero()" style="background-color: rgb(224, 133, 35);color: black">Family</botton>
      </div>
      <div class=" relation">
          <botton type="button" onclick="setOnlyWork_hero()" style="background-color: rgb(214, 207, 126);color: black">Work</botton>
      </div>
      <div class="relation">
        <botton type="button" onclick="setOnlyRomace_hero()" style="background-color: rgb(239, 65, 35);color: black">Romance</botton>
      </div>
    
    </div>`
    }

function setOnlyRomace_hero(){
    
        var urlSvg = "https://graphics.straitstimes.com/STI/STIMEDIA/Interactives/2018/04/marvel-cinematic-universe-whos-who-interactive/images_doc/marvel/nodeIcons/"
        document.getElementById('changeView').innerHTML = `<div id="heroes"></div> <div class="legend-container" id="legend">`
    
      
    
    
        $.getJSON("data/marvel-data.json")
            .done(function (data) {
                var heroes = data.characters
                var relations = data.relationship
                var movies_data = data.movies
                var alter_ego = data.alter_ego
                var heroes_nodes = []
                var heroes_edges = []
                for (const key in heroes) {
                    var value = heroes[key]
                    var alias = get_alias(value.alias)
                    if (value.type == "hero") {
                        var movies = Object.keys(value.movies)
                        //console.log(movies)
                        var alter_ego_name
                        var alter_ego_name_exist = false
                        var name
                        for (const key in alter_ego) {
                            if (value.id == alter_ego[key].origin_id) {
                                alter_ego_name = alter_ego[key].name
                                alter_ego_name_exist = true
                            }
                        }
                        if (alter_ego_name_exist) {
                            name = "NAME: " + value.name + "\n" + "ALTER EGO: " + alter_ego_name + "\n"
    
                        } else
                            name = "NAME: " + value.name + "\n"
                        var film_of_characters = "MOVIES:\n"
                        for (const key in movies_data) {
                            var film = movies_data[key];
                            //console.log(key)
                            for (i = 0; i < movies.length; i++) {
                                if (movies[i] == film.id) {
                                    film_of_characters = film_of_characters + "- " + film.name + " " + film.year + "\n"
                                }
                            }
    
                        }
                        heroes_nodes.push({
                            id: value.id,
                            //label: String(alias + value.name ),
                            shape: 'circularImage',
                            image: urlSvg + value.id + ".svg",
                            title: name + film_of_characters
                        })
                    }
                }
                for (const key in relations) {
                    var value = relations[key]
                    var type_relation = setcolor(value.relationship)
                    if (value.relationship == 5) {
                        heroes_edges.push({
                            from: value.id,
                            to: value.target_id,
                            color: { color: type_relation },
                            physics: false,
                        })
                    }
                }
                var data = {
                    nodes: heroes_nodes,
                    edges: heroes_edges
                };
               network = new vis.Network(container, data, options);
            });
    
    
        var container = document.getElementById('heroes');
        document.getElementById('legend-container').innerHTML = `<h2>FILTER</h2> <div class="relation">
        <botton type="button" onclick="setOnlyFriends_hero()" style="background-color: rgb(104, 169, 77);color: black">Friend</botton>
      </div>
      <div class="relation">
        <botton type="button" onclick="setOnlyEnemy_hero()" style="background-color: rgb(102, 75, 154);color: black">Enemy</botton>
      </div>
      <div class="relation">
        <botton type="button" onclick="setOnlyFamily_hero()" style="background-color: rgb(224, 133, 35);color: black">Family</botton>
      </div>
      <div class=" relation">
          <botton type="button" onclick="setOnlyWork_hero()" style="background-color: rgb(214, 207, 126);color: black">Work</botton>
      </div>
      <div class="relation">
        <botton type="button" onclick="setOnlyRomace_hero()" style="background-color: rgb(239, 65, 35);color: black">Romance</botton>
      </div>
    
    </div>`
    }

function get_alias(alias) {
    if (alias != undefined) {
        return alias + "\n"
    } else
        return ""
}

function setcolor(num) {
    if (num == 0) return "green"
    if (num == 1) return "purple"
    if (num == 2) return "lightblue"
    if (num == 3) return "orange"
    if (num == 4) return "yellow"
    if (num == 5) return "red"
    if (num == 6) return "black"
}