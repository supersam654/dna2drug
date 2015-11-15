var http = require('http')
var fs = require('fs')
var request = require('request')
var AdmZip = require('adm-zip')

// This was started at aound 5:00 AM and finished at 7:00 AM after coding for the past 12 hours.
// Please don't judge.
exports.getTrials = function(mutation, callback) {
  var mutation_url = ''
  if (!mutation.indexOf('_') !== -1) {
    mutation_url = mutation
  } else {
    mutation_url = mutation.substring(0, mutation.indexOf('_'))
  }
  var base_url = 'https://clinicaltrials.gov/ct2/results/download?down_stds=top10&down_typ=fields&down_flds=shown&down_fmt=plain&term=breast+cancer+' + mutation_url + '&show_down=Y'
  console.log(base_url)
  request(base_url)
    .pipe(fs.createWriteStream('trials.zip'))
    .on('close', function () {
      console.log('File written!')
      // reading archives
      var zip = new AdmZip("./trials.zip")
      var zipEntries = zip.getEntries() // an array of ZipEntry records

      zipEntries.forEach(function(zipEntry) {
         var text = zip.readAsText(zipEntry)
         var regex = new RegExp("Study [1-9]")
         var textArr = text.split(regex)
         var studies = []
         for (var i = 1; i < textArr.length; i++) {
           var study = textArr[i]
           var j = 0
           var studyObj = {"title": "", "recruitment": "","interventions": "", "url": ""}
           title = false
           recruit = false
           inter = false
           url = false
           while (j < study.length) {
             if (!title) {
               var index = study.indexOf('Title:', j) + 26
               studyObj.title = study.substring(index, study.indexOf('  ', index))
               studyObj.title = studyObj.title.replace('\n', '')
               studyObj.title = studyObj.title.replace('\r', '')
               title = true
             } else if (!recruit) {
               var index = study.indexOf('Recruitment:') + 26
               studyObj.recruitment = study.substring(index, study.indexOf('  ', index))
               studyObj.recruitment = studyObj.recruitment.replace('\n', '')
               studyObj.recruitment = studyObj.recruitment.replace('\r', '')
               recruit = true
             } else if (!inter) {
               var index = study.indexOf('Interventions:') + 26
               studyObj.interventions = study.substring(index, study.indexOf('  ', index))
               studyObj.interventions = studyObj.interventions.replace('\n', '')
               studyObj.interventions = studyObj.interventions.replace('\r', '')
               inter = true
             } else if (!url) {
               var index = study.indexOf('URL:') + 26
               studyObj.url = study.substring(index, study.indexOf('\n', index))
               studyObj.url = studyObj.url.replace('\n', '')
               studyObj.url = studyObj.url.replace('\r', '')
               url = true
             } else {
               j = study.length
             }
           }
           studies.push(studyObj)
         }
         callback(studies)
      })
    })
}
