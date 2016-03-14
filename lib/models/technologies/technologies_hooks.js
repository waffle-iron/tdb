if (Meteor.isServer){
	Technologies.before.insert(function(userId, doc){
		if (!doc.techId){
			doc.techId =  AtomicCounter.increment('techId', 1);	
		}
	});
}