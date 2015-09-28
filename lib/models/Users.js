Schema.OAB = new SimpleSchema({
    numero: {
        type: String
    },
    data: {
        type: Date,
        autoform: {
          type: "bootstrap-datepicker",
          datePickerOptions:
              {
                  format: "dd/mm/yyyy",
                  language: "pt-BR"
              }          
        }
    }
});

Schema.ContaBancaria = new SimpleSchema({
  bancoId: {
    type: String
  },
  agencia:{
    type: String
  },
  conta:{
    type:String
  }
})

Schema.UserProfile = new SimpleSchema({
    nome: {
        type: String,
        regEx: /^[a-zA-Z- ]{2,25}$/,
        optional:true
    },
    sobrenome: {
        type: String,
        regEx: /^[a-zA-Z ]{2,25}$/,
        optional:true
    },
    nomeCompleto: {
        type: String,
        autoValue: function(){
            var nome = this.field("profile.nome");
            var sobrenome = this.field("profile.sobrenome");
            if (nome.isSet && sobrenome.isSet){
             return nome.value + " " + sobrenome.value;
            }
        },
        autoform:{
            omit: true
        },
        optional:true
    },
    nascimento: {
        type: Date,
        optional:true,
        autoform: {
          type: "bootstrap-datepicker",
          datePickerOptions:
              {
                  format: "dd/mm/yyyy",
                  language: "pt-BR"
              }          
        }
    },
    genero: {
        type: String,
        optional:true,
        allowedValues: ['masculino', 'feminino'],
        autoform: {
          type: 'select-radio-inline',     
          options: [
            {value:"feminino", label:"Feminino"},
            {value:"masculino", label:"Masculino"}
          ]
        }
    },
    cpf:{
      type:String,
      optional:true,
      autoform:{
        type:"cpf"
      }
    },
    rg:{
      type:String,
      optional:true,
      autoform:{
        type:"rg"
      }
    },    
    endereco:{
      type:String,
      optional:true,
    },    
    telefone:{
      type:String,
      optional:true,
      autoform:{
        type:"telefone"
      }
    },    
    celular:{
      type:String,
      optional:true,
      autoform:{
        type:"celular"
      }
    },   
    email:{
      type:String,
      optional:true
    },
    oab:{
      type: Schema.OAB,
      optional:true,
      blackbox:true
    },
    contaBancaria:{
      type: Schema.contaBancaria,
      optional:true,
      blackbox:true
    },
    avatar: {
      type: Object,
      optional:true,
      blackbox:true
    },    
    "avatar.publicId": {
      type: String
    },

});


Schema.Info = new SimpleSchema({
    setorId:{
      type:String,
      autoform: {
          type: "selectize",
          firstOption:"Selecione um setor",
          options: function () { return Setores.quickList();}
      }        
    },
    cargoId:{
      type:String,
      autoform: {
          type: "selectize",
          firstOption:"Selecione um cargo",
          options: function () { return Cargos.quickList();}
      }  
    },
    salario:{
      type:Number,
      decimal:true,
      autoform:{
        type:"reais"
      }
    },
    transporteId:{
      type:String,
      decimal:true,
      autoform: {
          type: "selectize",
          firstOption:"Selecione um tipo de transporte",
          options: function () { return Transportes.quickList();}
      }   
    },
    va:{
      type:Number,
      decimal:true,
      autoform:{
        type:"reais"
      }
    },
    admissao:{
      type: Date,
      autoform: {
        type: "bootstrap-datepicker",
        datePickerOptions:
            {
                format: "dd/mm/yyyy",
                language: "pt-BR"
            }          
      }      
    },
    convidadoPor:{
      type:String,
      optional:true,
      autoform:{
        omit:true
      }
    },
    ativouEm:{
      type: String,
      optional:true,
      autoform:{
        omit:true
      }
    },
    remunerado:{
      type: Boolean,
      autoform: {
        type: 'selectize',
        options:[
          {value:true,label:'Sim'},
          {value:false,label:'Não'}
        ],        
      }
    },
    status:{
      type:String,
      allowedValues: ['inativo', 'ativo','demitido'],
      autoform:{
        type: 'selectize',
        options:[
          {value:'inativo',label:'Inativo'},
          {value:'ativo',label:'Ativo'},
          {value:'demitido',label:'Demitido'}
        ],
      }
    }
});





Schema.InviteUser = new SimpleSchema({
    email:{
        type: String
    },
    roles:{
        type:String,
        allowedValues: ['admin','socio','gestor','funcionario'],
        autoform: {
          type: 'selectize',
          options: [
            {value:"admin", label:"Admin"},
            {value:"socio", label:"Sócio"},
            {value:"gestor", label:"Gestor"},
            {value:"funcionario", label:"Funcionário"}
          ]
        }
    },
    info:{
      type: Schema.Info,
    }
})


Schema.Users = new SimpleSchema({
    emails: {
        type: [Object],
        // this must be optional if you also use other login services like facebook,
        // but if you use only accounts-password, then it can be required
        autoform: {
            omit:true
        },
    },
    "emails.$.address": {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    "emails.$.verified": {
        type: Boolean
    },
    profile: {
        type: Schema.UserProfile,
        optional: true,
        autoform:{
            omit:true
        }
    },
    info:{
      type: Schema.Info,
      optional:true,
      blackbox:true
    },
    services: {
        type: Object,
        optional: true,
        blackbox: true,
        autoform:{
            omit:true
        }
    },
    roles: {
        type: Object,
        optional: true,
        blackbox: true
    },
    status:{
      type:Object,
      blackbox:true,
      optional:true
    }    
});


Meteor.users.quickList = function() {
    return this.find().map(function (c) {
//        console.log(c);
        var nome = (c.profile.nomeCompleto)? c.profile.nomeCompleto : c.emails[0].address;
        return {label: nome, value: c._id};
    });
};
var somarFerias = function(ferias){
  return _.reduce(ferias, function(memo, f){ 
    return memo + f.dias;
  }, 0);
}

Meteor.users.helpers({
  role:function(){
    var roles = Roles.getRolesForUser(this._id);
    return roles[0];
  },
  nascimentoFormatado:function(){
    return formatarData(this.profile.nascimento);
  },
  link:function(){
    return FlowRouter.path('users.view',{id:this._id});
  },
  nome: function(){
    try{
      return (this.profile && this.profile.nomeCompleto) ? this.profile.nomeCompleto : this.emails[0].address;
    }catch(e){
      return "Indefinido";
    }
  },
  setor: function(){
      console.log(this);
      if (this.info){
        return Setores.findOne({_id: this.info.setorId});
      }
  },
  cargo: function(){
      if (this.info){
        return Cargos.findOne({_id: this.info.cargoId});
      }
  },
  criadoPor:function(){
    return Meteor.users.findOne({_id: this.criadoPorId});
  },
  transporte:function(){
    return Transportes.findOne({_id: this.info.transporteId});
  },
  feriasAcumuladas:function(){
    var admissao = moment.utc(this.info.admissao);
    var agora = moment();
    var anosNaEmpresa = agora.diff(admissao,'years');
    return {
      dias: anosNaEmpresa * 30,
      periodos: anosNaEmpresa
    }
  },
  feriasColetivasGozadas:function(){
    var feriasColetivas = FeriasColetivas.find().fetch();
    return {
      periodos: feriasColetivas.length,
      dias: somarFerias(feriasColetivas)
    }    
  },
  feriasPessoaisGozadas:function(){
    var feriasPessoais = FeriasPessoais.find({
      userId: this._id,
      status:'aceita'
    }).fetch();

    return {
      periodos: feriasPessoais.length,
      dias: somarFerias(feriasPessoais)
    }    
  },
  pagamentos:function(){
    return Pagamentos.find({
      userId: this._id
    })
  }
})

TabularTables.Users = new Tabular.Table({
  sub: new SubsManager(),
  name: "UsersList",
  collection: Meteor.users,
  extraFields: ['_id','profile','info.setorId','info.cargoId'],
    columns: [
    {
      title:"Email",
      data: 'emails.0.address',
      tmpl: Meteor.isClient && Template.userLink,
      width:"20%",
      sType:"html"
    },
    {
      title:"Nome",
      data: 'profile.nomeCompleto',
      width:"60%"
    },
    {
      title:"Setor",
      data : 'setor()',
      createdCell: Meteor.isClient && getLink, render: function(){}
    },
    {
      title:"Cargo",
      data : 'cargo()',
      createdCell: Meteor.isClient && getLink, render: function(){}
    },
    {
      title:"Grupo",
      data :'role()',
      render:function(val){
        return formatarRole(val);
      }
    },        
    {title:"Ações",tmpl: Meteor.isClient && Template.usersAcoes,width:"20%"}
  ],
  bLengthChange:false,
  bPaginate:true
});



Meteor.users.attachSchema(Schema.Users);
Meteor.users.attachBehaviour('timestampable');