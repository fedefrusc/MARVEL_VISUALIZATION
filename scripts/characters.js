function generate_characters() {
    var urlSvg = "https://graphics.straitstimes.com/STI/STIMEDIA/Interactives/2018/04/marvel-cinematic-universe-whos-who-interactive/images_doc/marvel/nodeIcons/"
    document.getElementById('changeView').innerHTML = `<div id="characters"></div> <div class="legend-container" id="legend">`
    
    var options = {
        interaction: {
            zoomView: true

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

            shape: 'circle',
            widthConstraint: {
                maximum: 80
            },
        },
        edges: {
            width: 0.5,
        },
        layout: {
            
        },

        
        physics: {
            enabled: true,
        }
    };


    $.getJSON("data/marvel-data.json")
        .done(function (data) {
            var characters = data.characters
            var relations = data.relationship
            var movies_data = data.movies
            var alter_ego = data.alter_ego
            var characters_nodes = []
            var characters_edges = []
            for (const key in characters) {
                var value = characters[key]
                if (value.name != "None") {
                    var movies = Object.keys(value.movies)
                    
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
                        
                        for (i = 0; i < movies.length; i++) {
                            if (movies[i] == film.id) {
                                film_of_characters = film_of_characters + "- " + film.name + " " + film.year + "\n"
                            }
                        }

                    }
                    characters_nodes.push({
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
                if(value.relationship == 0 ||value.relationship == 1 ||value.relationship ==3||value.relationship == 4 ||value.relationship == 5){
                characters_edges.push({
                    from: value.id,
                    to: value.target_id,
                    color: {color : type_relation},
                    physics: false,
                })
            }
            }
            var data = {
                nodes: characters_nodes,
                edges: characters_edges
            };
            new vis.Network(container, data, options);
        });
    var container = document.getElementById('characters');
    document.getElementById('legend-container').innerHTML = `  <div class="relation">
    <p style="background-color: rgb(104, 169, 77);color: black">Friend</p>
  </div>
  <div class="relation">
    <p style="background-color: rgb(102, 75, 154);color: black">Enemy</p>
  </div>
  <div class="relation">
    <p style="background-color: rgb(224, 133, 35);color: black">Family</p>
  </div>
  <div class=" relation">
      <p style="background-color: rgb(214, 207, 126);color: black">Work</p>
  </div>
  <div class="relation">
    <p style="background-color: rgb(239, 65, 35);color: black">Romance</p>
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