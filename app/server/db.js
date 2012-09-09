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

exports.insert_achievement = function(achievement, callback) {
   exports.getDb(function(db) {
      db.collection('achievement').update({"achievement": achievement}, { $set: {} }, {upsert:true },
        function(err, saved) {
          callback(saved);
      });
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
      if (!user[0]) {
	cb(false);
      } else {
	var salt = user[0]["salt"];
	var hash_ = hash(password, salt);

        cb(hash_ === user[0]["hash"] ? user[0]["_id"] : false);
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
          user_id : obj(user[0]["_id"]),
          achievement_id : obj(achievement[0]["_id"])
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
          user_id: obj(user[0]["_id"]),
          achievement_id: obj(achievement[0]["_id"])
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
      if (err) throw err;
      uc.find({"user":friend}).toArray(function(err, friend) {
        if (err) throw err;
        var link = {
          from_user_id: obj(user[0]["_id"]),
          to_user_id: obj(friend[0]["_id"])
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
      if (err) throw err;
      uc.find({"user":backuper}).toArray(function(err, backuper) {
        if (err) throw err;
        ac.find({"achievement":achievement}).toArray(function(err, achievement) {
          if (err) throw err;
          var backup = {
            user_id: obj(user[0]["_id"]),
            achievement_id: obj(achievement[0]["_id"]),
            backuper_id: obj(backuper[0]["_id"])
          };
          db.collection('backup').update(backup, { $set: {} }, {upsert:true});
        });
      });
    });
  });
}

exports.count_backup = function(userId, achievementId, cb) {
  exports.getDb(function(db) {
    var bc = db.collection('backup');

    bc.find({"user_id":obj(userId), "achievement_id": obj(achievementId)})
      .count(function(err, count) {
        if (err) throw err;
        cb(count);
      });
  });
}

function obj(input) {
  if (input instanceof ObjectId) {
    return input;
  }
  return new ObjectId(input);
}

exports.upvote_achievement = function(userId, achievementId) {
  exports.getDb(function(db) {
    var upvote = {
      user_id: obj(userId),
      achievement_id: obj(achievementId)
    };
    // OMAGAD GROS HACK ANTI DOUBLON!
    db.collection('upvote').update(upvote, { $set: {} }, { upsert:true });
  });
}

exports.count_upvote = function(achievementId, cb) {
  exports.getDb(function(db) {
    var uc = db.collection('upvote');

    uc.count({"achievement_id": obj(achievementId)}, {}, function(err, count) {
      cb(count);
    });
  });
}

exports.list_achievement = function(cb) {
  exports.getDb(function(db) {
    var achievement_collection = db.collection('achievement');

    achievement_collection.find({}, function (err, achievements) {
      if (err) throw err;
      achievements.toArray(function (err, achievements) {
        if (err) throw err;
        cb(achievements);
      });
    });
  });
}
