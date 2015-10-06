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
    ativouEm:{
      type: String,
      optional:true,
      autoform:{
        omit:true
      }
    },
});





Schema.InviteUser = new SimpleSchema({
    email:{
        type: String
    },
    roles:{
        type:String,
        allowedValues: ['admin','gestor','funcionario'],
        autoform: {
          type: 'selectize',
          options: [
            {value:"admin", label:"Admin"},
            {value:"gestor", label:"Gestor"},
            {value:"funcionario", label:"Funcionário"}
          ]
        }
    },
    info:{
      type: Schema.Info,
      blackbox:true,
      optional:true,
      autoform:{
        omit:true
      }
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
      blackbox:true,
      autoform:{
        omit:true
      }
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

Meteor.users.helpers({
  role:function(){
    var roles = Roles.getRolesForUser(this._id);
    return roles[0];
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