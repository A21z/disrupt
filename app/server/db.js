var db = new Db('disrupt', new Server('fooo.fr', 27017, {}));
var _client = null;

exports.getDb = function(cb) {
   if (_client) {
      cb(_client);
   } else {
      db.open(function(err, client) {
        if (err) {
          console.log(err);
        }
        _client = client;
        cb(client);
      });
   }
}

exports.close = function() {
  if (_client) {
    _client.close();
  }
}

exports.insert_achievement = function(achievement) {
   exports.getDb(function(db) {
      db.collection('achievement').update({"achievement": achievement}, { $set: {} }, {upsert:true });
   });
}

function hash(password, salt) {
  var crypto = require('crypto');
  var shasum = crypto.createHash('sha1');
  shasum.update(salt + password);
  return shasum.digest('hex');
}

exports.insert_user = function(user, password) {
  exports.getDb(function(db) {
    var salt = Math.random().toString();
    db.collection('users').update({
      "user": user
    }, {
      $set: {
	"salt": salt,
        "hash": hash(password, salt)
      }
    }, { upsert:true });
  });
}

exports.user_login = function(user, password, cb) {
  exports.getDb(function(db) {
    var user_collection = db.collection('users');
    var user_cursor = user_collection.find({"user":user}, function(err, user) {
      user.toArray(function(err, user) {
	console.log(user);
	if (!user[0]) {
	  cb(false);
	} else {
	  var salt = user[0]["salt"];
	  var hash_ = hash(password, salt);

	  console.log("logged:", hash_ === user[0]["hash"]);
	  cb(hash_ === user[0]["hash"]);
	}
      });
    });
  });
}

exports.add_achievement = function(user, achievement, atdate) {
   exports.getDb(function(db) {
      var user_collection = db.collection('users');
      var user_cursor = user_collection.find({"user":user});
      var achievement_collection = db.collection('achievement');
      var achievement_cursor = achievement_collection.find({"achievement":achievement});

      var achievement_status = {
         status : "pending",
         date : atdate,
         user_id : user_cursor[0]["_id"],
         achievement_id : achievement_cursor[0]["_id"]
      };
      db.collection('achievement_status').save(achievement_status);
   });
}

exports.add_friend = function(user, friend) {
   exports.getDb(function(db) {
      var user_collection = db.collection('users');
      var user_cursor = user_collection.find({"user":user});
      var friend_cursor = user_collection.find({"user":friend});

      var link = {
         from_user_id: user_cursor[0]["_id"],
         to_user_id: friend_cursor[0]["_id"]
      };
      db.achievement('friend_link').save(link);
   });
}

exports.backup_achievement = function(user, backuper, achievement) {
   exports.getDb(function(db) {
      var user_collection = db.collection('users');
      var user_cursor = user_collection.find({"user":user});
      var backuper_cursor = user_collection.find({"user":backuper});
      var achievement_collection = db.collection('achievement');
      var achievement_cursor = achievement_collection.find({"achievement":achievement});

      var backup = {
         user_id: user_cursor[0]["_id"],
         achievement_id: achievement_cursor[0]["_id"],
         backuper_id: backuper_cursor[0]["_id"]
      };
      db.collection('backup').update(backup, { $set: {} }, {upsert:true});
   });
}

exports.upvote_achievement = function(user, achievement) {
   exports.getDb(function(db) {
      var user_collection = db.collection('users');
      var user_cursor = user_collection.find({"user":user});
      var achievement_collection = db.collection('achievement');
      var achievement_cursor = achievement_collection.find({"achievement":achievement});

      var upvote = {
         user_id: user_cursor[0]["_id"],
         achievement_id: achievement_cursor[0]["_id"]
      };
      // OMAGAD GROS HACK ANTI DOUBLON!
      db.collection('upvote').update(upvote, { $set: {} }, { upsert:true });
   });
}

exports.list_achievement = function(cb) {
   exports.getDb(function(db) {
      var achievement_collection = db.collection('achievement');

      achievement_collection.find({}, function (err, achievements) {
        achievements.toArray(function (err, achievements) {
          cb(achievements);
        });
      });
   });
}
