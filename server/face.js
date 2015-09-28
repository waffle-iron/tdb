var facePP = Meteor.npmRequire('faceppsdk');
facePP.baseUrl = Meteor.settings.FacePPBaseUrl;
facePP.api_key = Meteor.settings.FacePPAPIKey;
facePP.api_secret = Meteor.settings.FacePPAPISecret;

var wFacePPPerson = Async.wrap(facePP.person, ['create', 'delete','add_face']);
var wFacePPGroup = Async.wrap(facePP.group, ['create', 'delete']);
var wFacePPTrain = Async.wrap(facePP.train, ['identify']);
var wFacePPRecognition = Async.wrap(facePP.recognition, ['identify']);
var wFacePPInfo = Async.wrap(facePP.info, ['get_session']);
var wFacePPDetection = Async.wrap(facePP.detection,['detect']);


detectionDetect = function(url,mode){
  return wFacePPDetection.detect({url:url,mode:mode});
}
personCreate = function(personName){
  return wFacePPPerson.create({person_name:personName});
}
personDelete = function(personName){
  return wFacePPPerson.delete({person_name:personName});
}
personAddFace = function(personName,faceId){
  return wFacePPPerson.add_face({person_name:personName,face_id:faceId})
}
groupCreate = function(groupName,personName){
  return wFacePPGroup.create({group_name:groupName,person_name:personName});
}
GroupDelete = function(groupName){
  return wFacePPGroup.delete({group_name:groupName});
}
trainIdentify = function(groupName){
  return wFacePPTrain.identify({group_name:groupName});
}
recognitionIdentify = function(groupName,url){
  return wFacePPRecognition.identify({group_name:groupName,url:url}); 
}
infoGetSession = function(sessionId){
  return wFacePPInfo.get_session({session_id:sessionId});
} 