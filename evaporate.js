const fs = require('fs');
const bencode = require('bencode');
const tracker = require('./tracker.js');

const input = document.querySelector('#torrent_file')
const preview = document.querySelector('.preview')
const fileTypes = [
    "application/x-bittorrent"
  ]
  
  function validFileType(file) {
    return fileTypes.includes(file.type)
  }
  function returnFileSize(number) {
    if(number < 1024) {
      return number + 'bytes'
    } else if(number >= 1024 && number < 1048576) {
      return (number/1024).toFixed(1) + 'KB'
    } else if(number >= 1048576) {
      return (number/1048576).toFixed(1) + 'MB'
    }
  }
  function getTrackerInformation(trackerprotocol) {
console.log(trackerprotocol)
  }
function updateTorrentInformation() {
  while(preview.firstChild) {
    preview.removeChild(preview.firstChild)
  }
  const curFiles = input.files
  if(curFiles.length === 0) {
    const para = document.createElement('p')
    para.textContent = 'No files currently selected for upload'
    preview.appendChild(para)
  } else {
    const list = document.createElement('ol')
    preview.appendChild(list)
    for(const file of curFiles) {
      const listItem = document.createElement('li')
      const para = document.createElement('p')
      if(validFileType(file)) {
        para.textContent = `File name ${file.name}, file size ${returnFileSize(file.size)}.`
        listItem.appendChild(para)
      } else {
        para.textContent = `File name ${file.name}: Not a valid file type. Update your selection.`
        listItem.appendChild(para)
      }

      list.appendChild(listItem)
      const torrent = bencode.decode(fs.readFileSync(file.path))
      const trackerprotocol = torrent.announce.toString('utf8').split(':', 1)
      switch (trackerprotocol[0]) {
        case 'http':
            getTrackerInformation('http')
          break;
        case 'udp':
         getTrackerInformation('udp')
          break;
        default:
          console.log(`Unknown Protocol ${expr}.`);
      }
    }
  }
  

}
input.addEventListener('change', updateTorrentInformation)
// input.style.opacity = 0
// // Open the DevTools.