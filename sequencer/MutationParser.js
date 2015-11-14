var mutations = require('./mutations.json')

exports.matchMutation = function(seq) {
  for (var i = 0; i < mutations.length; i++) {
    for (var j = 0; j < mutations[i].length; j++) {
      if (mutations[i].sequence.indexOf(seq) != -1)  {
        return mutations[i].name
      }
    }
  }
  return 'No match found!'
}
