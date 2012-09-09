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
    var uc = db.collection('users');
    uc.find({"user":user}).toArray(function(err, user) {
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
}

exports.add_achievement = function(user, achievement, atdate) {
  exports.getDb(function(db) {
    var uc = db.collection('users');
    var ac = db.collection('achievement');

    uc.find({"user":user}).toArray(function(err, user) {
      if (err) throw err;
      ac.find({"achievement":achievement}).toArray(function(err, achievement) {
        if (err) throw err;
        db.collection('achievement_status').save({
          status : "pending",
          date : atdate,
          user_id : user[0]["_id"],
          achievement_id : achievement[0]["_id"]
        });
      });
    });
  });
}

exports.update_user_achievement = function(user, achievement) {
  exports.getDb(function(db) {
    var uc = db.collection('users');
    var ac = db.collection('achievements');
    var asc = db.collection('achievement_status');
  
    uc.find({"user": user}).toArray(function(err, user) {
      if (err) throw err;
      as.find({"achievement":achievement}).toArray(function(err, achievement) {
        if (err) throw err;
        // FIXME: if achievement not entered ?
        db.collection('achievement_status').update({
          user_id: user[0]["_id"],
          achievement_id: achievement[0]["_id"]
        }, {
          $set: {
            status: "done"
          }
        });
      });
    });
  });
}

exports.add_friend = function(user, friend) {
  exports.getDb(function(db) {
    var uc = db.collection('users');

    uc.find({"user":user}).toArray(function(err, user) {
      uc.find({"user":friend}).toArray(function(err, friend) {
        var link = {
          from_user_id: user[0]["_id"],
          to_user_id: friend[0]["_id"]
        };
        db.achievement('friend_link').save(link);
      });
    });
  });
}

exports.backup_achievement = function(user, backuper, achievement) {
  exports.getDb(function(db) {
    var uc = db.collection('users');
    var ac = db.collection('achievement');

    uc.find({"user":user}).toArray(function(err, user) {
      uc.find({"user":backuper}).toArray(function(err, backuper) {
        ac.find({"achievement":achievement}).toArray(function(err, achievement) {
          var backup = {
            user_id: user[0]["_id"],
            achievement_id: achievement[0]["_id"],
            backuper_id: backuper[0]["_id"]
          };
          db.collection('backup').update(backup, { $set: {} }, {upsert:true});
        });
      });
    });
  });
}

exports.upvote_achievement = function(user, achievement) {
  exports.getDb(function(db) {
    var uc = db.collection('users');
    var ac = db.collection('achievement');

    uc.find({"user":user}).toArray(function(err, user) {
      ac.find({"achievement":achievement}).toArray(function(err, achievement) {
        var upvote = {
          user_id: user[0]["_id"],
          achievement_id: achievement[0]["_id"]
        };
        // OMAGAD GROS HACK ANTI DOUBLON!
        db.collection('upvote').update(upvote, { $set: {} }, { upsert:true });
      });
    });
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
