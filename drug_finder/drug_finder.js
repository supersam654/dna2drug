var candidates = require('./candidates')

function retrieveCandidates(gene) {
  var treatmentCandidates
  if (gene in candidates.candidateDrugs &&
      (typeof gene === 'string' || gene instanceof String)) {
    treatmentCandidates = candidates.candidateDrugs[gene]
  } else {
    console.log(
        'drug_finder::retrieveCandidates received not a string or unknown key')
  }
  return treatmentCandidates
}

exports.getCandidates(gene, callback) {
  callback(retrieveCandidates(gene))
}
