AutoForm.setDefaultTemplate('bootstrap3-horizontal');

//
//  Autoform Fix for array fields
//
AutoForm.hooks({
  updateClassificacoesForm: {
    before: {
      update: function(doc) {
        function corrige(campo) {
          let ref;
          if (((ref = doc.$set) !== null ? ref[campo] : void 0) !== null) {
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
