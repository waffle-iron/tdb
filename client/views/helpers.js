Template.registerHelper('$log',function(what){
  console.log(what);
})
Template.registerHelper('$concat', function (a,b){
  a = String(a);
  b = String(b);
  return a + b;
})
Template.registerHelper('logg',function(what){
  console.log(what);
})

Template.registerHelper('concat',function(){
  console.log(arguments);
});

Template.registerHelper('isInRoles', function(roles){
  if (!roles) return true;
  roles.push('god');
  if (Roles.userIsInRole(Meteor.userId(), roles)){
    console.log("AQUI!");
    return true;
  }
  
  var autho = false;

  var autho = _.find(roles, function(role){ 
    return Roles.userIsInRole(Meteor.userId(),role); 
  });

  
  return autho;
});

Template.registerHelper('formatarData',function(data){
  return formatarData(data,'DD/MM/YYYY');
});

Template.registerHelper('formatarDataMesDia',function(data){
  return formatarData(data,'DD/MM');
});
/*
Template.registerHelper('formatarRole',function(role){
    switch (role){
      case 'admin':
        return 'Administrador';
      break;
      case 'socio':
        return 'Sócio';
      break;
      case 'gestor':
        return "Gestor";
      break;
      case 'funcionario':
        return "Funcionário";
      break;
    }
});
*/

Template.registerHelper('formatarStatusFolha',function(status){
    switch (status){
      case 'aberta':
        return '<span class="label label-success">Aberta</span>';
      break;
      case 'fechada':
        return '<span class="label label-info">Fechada</span>';
      break;
    }
});

Template.registerHelper('formatarStatus',function(status){
    switch (status){
      case 'inativo':
        return 'Inativo / Pendente';
      break;
      case 'ativo':
        return 'Ativo';
      break;
      case 'demitido':
        return "Demitido";
      break;
    }
});
Template.registerHelper('formatarReais',function(valor){
  return accounting.formatMoney(valor, "R$ ", 2, ".", ","); 
});


Template.registerHelper('formatarDataHorario',function(data){
  return formatarData(data,'DD/MM/YYYY HH:mm:ss');
});
Template.registerHelper('for', function(from, to, incr, block) {
    var accum = '';
    for(var i = from; i < to; i += incr)
        accum += block.fn(i);
    return accum;
});


Template.registerHelper('debug', function (optionalValue) {
  if (typeof console !== "undefined" || typeof console.log !== "undefined") {
    console.log("Current Context");
    console.log("====================");
    console.log(this);
    if (optionalValue) {
      console.log("Value");
      console.log("====================");
      console.log(optionalValue);
    }

    return '';
  }

  // For IE8
  alert(this);

  if (optionalValue) {
    alert(optionalValue);
  }

  return '';
});

Template.registerHelper('constant', function (what) {
  return Meteor.App[what.toUpperCase()];
});


Template.registerHelper('formatarRole',function(role,cor){
  cor = cor || false;
  return formatarRole(role,cor);
})

Template.registerHelper('formatarStatusOnline',function(status){
  switch(status){
    case true:
      return "<span class='text-green'>Online</span>";
    break;
    case false:
      return "<span class='text-danger'>Offline</span>";
    break;    
  }
})

Template.registerHelper('formatarAreasTipo',function(tipo){
  return formatarAreasTipo(tipo);
})