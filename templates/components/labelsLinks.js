this["TDB"] = this["TDB"] || {};
this["TDB"]["templates"] = this["TDB"]["templates"] || {};
this["TDB"]["templates"]["labelsLinks"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "Handlebars.registerHelper('labelsLinks', function(text, url) {\n  url = Handlebars.escapeExpression(url);\n  text = Handlebars.escapeExpression(text);\n\n  return new Handlebars.SafeString(\n    \"<a href='\" + url + \"'>\" + text + \"</a>\"\n  );\n});";
},"useData":true});;