/*
visDep = new Tracker.Dependency();

var drawVis = function(){
  var network = null;
  var layoutMethod = "hubsize";

  function destroy() {
    if (network !== null) {
      network.destroy();
      network = null;
    }
  }

  function tipoToString(tipo){
    switch(tipo){
      case 1: return 'vp'; break;
      case 2: return 'dir'; break;
      case 3: return 'ger'; break;
      case 4: return 'coord'; break;
    }
  }

  var nodes = [];
  var edges = [];
  var coords = [];

  destroy();
  var nodeSelecionado = Session.get('nodeSelecionado') || null;


  
  //debugger;
  var constroiHierarquia = function (model, raiz, level, paiVirtual, incluirRaiz){
    level = level || 0;
    paiVirtual = paiVirtual || null;
    incluirRaiz = incluirRaiz || false
    if (incluirRaiz){
      var r  = model.findOne({_id:raiz});
      nodes.push({
        id: r._id,
        label: '',
        group: "a",
        level: level,
        physics:false,
        x:150
      })
      level++;
      edges.push({
        from: paiVirtual,
        to: r._id
      })
    }

    var ramos = model.find({pai:raiz}).fetch();
    _.each(ramos, function(ramo){
      nodes.push({
        id: ramo._id,
        label: '',
        group: tipoToString(ramo.tipo),
        level: level,
        physics:false
      })

      if (level>0 && !paiVirtual){
        edges.push({
          from: raiz,
          to: ramo._id
        })
      }else{
        edges.push({
          from: paiVirtual,
          to: ramo._id
        })
      }

      if (ramo.tipo==4){
        coords.push(ramo._id);
        //if (coordLevel == null) coordLevel = level;
      }

      var temFilhos = model.find({pai:ramo._id}).count() > 0;
      if (temFilhos) constroiHierarquia(model, ramo._id,level+1);        

    })
  }

  console.log("Com Áreas------");
  constroiHierarquia(Areas, nodeSelecionado);
  console.log(nodes);
  console.log(edges);

  var areaRaiz = Areas.findOne({_id: nodeSelecionado}) || {tipo: 0};
  var cargoLevel = 4 - areaRaiz.tipo;
  console.log("Coords",coords);


  cargosRaizes = Cargos.find({
    pai:null,
    areaId: {$in : coords}
  }).fetch();

  console.log("CargosRaizes",cargosRaizes);
  console.log("cargoLevel", cargoLevel);

  _.each(cargosRaizes,function(cargo){
    constroiHierarquia(Cargos, cargo._id, cargoLevel+3, cargo.areaId,true);
  });

  console.log("Com Cargos------");
  console.log(nodes);
  console.log(edges);

  var options = {
    physics:{
      enabled:true
    },
    autoResize: true,
    width: '100%',
    height: '400px',        
    autoResize:true,
    layout: {
      hierarchical: {
        sortMethod: 'hubsize',
        direction: 'UD',
        levelSeparation: 100
      }
    },
    edges: {
      arrows: {to : true }
    }
  };

  var container = document.getElementById('visualization');
  var data = {
    nodes: nodes,

  };

  network = new vis.Network(container, data, options);

  return ;

  if (!nodeSelecionado) return ;
  var area = Areas.findOne({_id: nodeSelecionado});
  var i;
    
  for (i=0;i<4-area.tipo;i++){
    var areasFilhas = Areas.find({pai: area._id}).fetch();

    _.each(areasFilhas,function(area){
      nodes.push({
        id:area._id,
        label: area.nome,
        group: tipoToString(area.tipo),
        level: i
      })
    })
  }


  var container = document.getElementById('visualization');
  var data = {
    nodes: nodes,
    edges: edges
  };

  network = new vis.Network(container, data, options);

  return ;
    
    // randomly create some nodes and edges
    for (var i = 0; i < 36; i++) {
      nodes.push({
        id: i, 
        label: String(i), 
        level:i % 6,
        size:100,

      });
    }
    edges.push({from: 0, to: 1});
    edges.push({from: 1, to: 2});
    edges.push({from: 2, to: 3});
    edges.push({from: 4, to: 5});

    // create a network
    var container = document.getElementById('visualization');
    var data = {
      nodes: nodes,
      edges: edges
    };

    var options = {
      autoResize: true,
      width: '100%',
      height: '400px',        
      autoResize:true,
      layout: {
        hierarchical: {
          sortMethod: 'hubsize',
          direction: 'UD',
          levelSeparation: 25
        }
      },
      edges: {
        smooth: true,
        arrows: {to : true }
      }
    };
    network = new vis.Network(container, data, options);

    network.moveTo({
      position: {x:0, y:0},
      scale: 1,
      offset: {x:100, y:150},
      animation: { // -------------------> can be a boolean too!
        duration: 500,
        easingFunction: 'linear'
      }
    })
 
}
*/