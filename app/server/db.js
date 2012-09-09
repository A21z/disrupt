var db = new Db('disrupt', new Server('127.0.0.1', 27017, {}));
var _client = null;

exports.getDb = function(cb) {
   if (_client) {
      cb(_client);
   } else {
      db.open(function(err, client) {
        _client = client;
        cb(client);
      });
   }
}

exports.insert_achievement = function(achievement) {
   exports.getDb(function(db) {
      db.collection('achievement').save({"achievement": achievement});
   });
}

exports.insert_user = function(user) {
   exports.getDb(function(db) {
      db.collection('user').save(user);
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
      db.collection('backup').save(backup);
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
      db.collection('upvote').save(upvote);
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
