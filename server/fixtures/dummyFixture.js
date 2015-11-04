Meteor.startup(function(){
	chance = new Chance();
	/*
	var userId  = Accounts.createUser({email:chance.first()   +"@" + chance.last() });
	Accounts.sendEnrollmentEmail(userId);
	*/
	if (!Meteor.users.findOne({'emails.address':"admin@admin.com"})){
		var userId = Accounts.createUser({email:"admin@admin.com", password: "q1w2e3"});
		Roles.addUsersToRoles(userId, 'god',Roles.GLOBAL_GROUP);
	}

	var roles = ['god','admin','usuario']

	var rolesInDB = Meteor.roles.find({}).fetch();
	

	/*
	var out1 = JSON.parse(Assets.getText('out1.json'));
	var out2 = JSON.parse(Assets.getText('out2.json'));

	
	var res = _
	.chain(out1.aaData)
	.groupBy('Fabricante')
	.map(function(value, key) {
	    return {
	        fabricante: key,
	        cnpj : value[0].CNPJ,
	        produtos: pluckFields(value, ['NumeroCA','Equipamento','Validade'])
	    }	
	})
	.value();
	var i = 1;
	_.each(res,function(r){
		console.log(i);
		i++;
		if (r.fabricante && r.cnpj){
			var id = Fabricantes.insert({nome:r.fabricante,cnpj:r.cnpj});
			//console.log(r.produtos);
			_.each(r.produtos,function(p){
				if (id && p.Equipamento && p.NumeroCA && p.Validade){
					console.log(p.Validade);
					date = returnDate(p.Validade);
					console.log(date);
					if (date!="Invalid Date"){
						Produtos.insert({
							fabricante:id,
							nome:p.Equipamento,
							ca:p.NumeroCA,
							validade:date
						});
					}else{
						Produtos.insert({
							fabricante:id,
							nome:p.Equipamento,
							ca:p.NumeroCA
						});
					}
				}
			})
		}
	});
	



function parseDate(str) {
  var m = str.match(/^(\d{1,2})-(\d{1,2})-(\d{4})$/);
  return (m) ? new Date(m[3], m[2]-1, m[1]) : null;
}		

	function returnDate(string){
		try{
			var pieces = string.split("/")
			var dia = pieces[0];
			var mes = pieces[1];
			var ano = pieces[2];
			return new Date(ano,mes-1,dia);
		}catch(e){
			console.log(e);
			return false;
		}
	}

	function pluckFields(arr, fields) {
	  return _.map(arr, function(item) {
	    return _.pick(item, fields)
	  })
	}
	*/
});