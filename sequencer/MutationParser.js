var mutations = require('./mutations.json')

exports.matchMutation = function(seq, callback) {
  console.log('matching mutations')
  for (var i = 0; i < mutations.genes.length; i++) {
    var result = checkMutation(seq, mutations.genes[i])
    if (result != false) {
      console.log('confirmed a match!')
      callback(result)
      matched = true
    }
  }
  if (!matched) {
    callback('No match found!')
  }
}

function checkMutation(seq, gene) {
  console.log('checking gene: ' + gene.name)
  var base = gene.sequence
  var mutations = []
  for (var i = 0; i < base.length; i++) {
    if (seq.charAt(i) != base.charAt(i)) {
      for (var j = 0; j < gene.mutations.length; j++) {
        if (gene.mutations[j].index == i && gene.mutations[j].replaceWith == seq.charAt(i)) {
          mutations.push(gene.mutations[j].name)
        } else {
          console.log('no match!')
          return false
        }
      }
    }
  }

  if (mutations.length == 0) {
    return 'BASE'
  }
  return mutations.toString()
}
