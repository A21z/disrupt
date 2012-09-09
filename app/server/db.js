var db_name = 'disruptdb';
var db_addr = 'disrupt-Alban17z-db-0.dotcloud.com';
var db_port = 36350;
var db_user = 'root';
var db_password = '3YJee5wMGhwJFgEIGyhp';

var db = new Db(db_name, new Server(db_addr, db_port, {}), {});
var is_open = false;

var getDb = function(cb) {
   if (is_open) {
      cb(db);
   } else {
      db.open(function(err) {
         db.authenticate(db_user, db_password, function(err) {
            // Bite. erreur
         });
         is_open = true;
      }
      cb(db);
   }
}

exports.insert_achievement = function(achievement) {
   getDb(function(db) {
      db.collection('achievement').save(achievement);
   }
}

exports.insert_user = function(user) {
   getDb(function(db) {
      db.collection('user').save(user);
   }
}

exports.add_achievement = function(user, achievement, atdate) {
   getDb(function(db) {
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
   }
}

exports.add_friend = function(user, friend) {
   getDb(function(db) {
      var user_collection = db.collection('users');
      var user_cursor = user_collection.find({"user":user});
      var friend_cursor = user_collection.find({"user":friend});

      var link = {
         from_user_id: user_cursor[0]["_id"],
         to_user_id: friend_cursor[0]["_id"]
      };
      db.achievement('friend_link').save(link);
   }
}

exports.backup_achievement = function(user, backuper, achievement) {
   getDb(function(db) {
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
   }
}

exports.upvote_achievement = function(user, achievement) {
   getDb(function(db) {
      var user_collection = db.collection('users');
      var user_cursor = user_collection.find({"user":user});
      var achievement_collection = db.collection('achievement');
      var achievement_cursor = achievement_collection.find({"achievement":achievement});

      var upvote = {
         user_id: user_cursor[0]["_id"],
         achievement_id: achievement_cursor[0]["_id"]
      };
      db.collection('upvote').save(upvote);
   }
}

exports.list_achievement = function(cb) {
   getDb(function(db) {
      var achievement_collection = db.collection('achievement');

      achievement_collection.find.foreach(cb);
   }
}
