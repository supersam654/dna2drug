var masterList = [];

// use this to add the candidate drugs for a single gene
function addCandidateArray(candidate) {
  if (candidate instanceof Array && candidate.length !== 0){
    masterList.push(candidate)
  } else {
    console.log(candidate)
    console.log("drug_optimizer::addCandidateArray received invalid input")
  }
  return true;
}

// this is the function you call to get the optimal drugs
// TODO: take into account cost, reliability, side effects, etc.
function getOptimalTreatment() {
  return findFewestDrugs()
}

// this is an optimizer that returns the smallest possible list of drugs
function findFewestDrugs() {
  var solution = []
  for (var i = 0; i < masterList.length; i++) {
    if (i == 0) {
      solution.push(masterList[0][0])
      for (var j = 1; j < masterList[0].length; j++) {
        solution.push(masterList[0][j])
      }
    } else {
      var currentCandidates = masterList[i]
      if (solution.indexOf(currentCandidates[0]) === -1) {// first treatment isn't in solutions
        solution.push(currentCandidates[0]) // so we add it (assumes first drug is optimal, which is true for this heuristic)
      } else {
        for (var j = 1; j < currentCandidates.length; j++) {
          solution.push(currentCandidates[j])
        }
      }
    }
  }
  return solution;
}

exports.findTreatment = function (callback) {
  callback(getOptimalTreatment())
}

exports.addCandidates = function (candidates, callback) {
  callback(addCandidateArray(candidates))
}
