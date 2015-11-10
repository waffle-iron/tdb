//AutoForm.setDefaultTemplateForType('afFormGroup', 'pages');
AutoForm.setDefaultTemplate("bootstrap3-horizontal");


AutoForm.hooks({
  updateClassificacoesForm: {
    before: {
      update: function(doc) {
      	console.log(doc);
        var ref;

        var corrige = function(campo){
	        if (((ref = doc.$set) != null ? ref[campo] : void 0) != null) {
	          doc.$set[campo] = _.without(doc.$set[campo], null);
	        }
        }

        corrige('atribuicoes');
        corrige('conhecimentos');
        corrige('formacao');
        corrige('experiencia');

        return doc;
      }
    }
  }
});