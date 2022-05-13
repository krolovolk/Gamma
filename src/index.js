import "./styles.css";

const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const noteB = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
const cleanNotes = ["C", "D", "E", "F", "G", "A", "B"];

// function chords(root) {
//   const i = notes.indexOf(root);
//   let majorChord = [root, notes[(i+4)%12], notes[(i+7)%12]];
//   let minorChord = [root, notes[(i+3)%12], notes[(i+7)%12]];
//   console.log(majorChord, minorChord);
//   return [majorChord, ' - ', minorChord];
// }
function getMajorChord(root) {
  const i = notes.indexOf(root);
  return [root, notes[(i + 4) % 12], notes[(i + 7) % 12]];
}
function getMinorChord(root) {
  const i = notes.indexOf(root);
  return [root, notes[(i + 3) % 12], notes[(i + 7) % 12]];
}
function loopChords(root, chords) {
  if (chords.length > notes.length) return true;
  let curChord = getMajorChord(root);
  chords.push(curChord);
  loopChords(curChord[2], chords);
}
function getMajorGamma(root) {
  const iRoot = notes.indexOf(root);
  // const patternMajor = [1, 1, 0.5, 1, 1, 1, 0.5]
  const majorSteps = [0, 2, 4, 5, 7, 9, 11, 12];
  return majorSteps.map((i, e) => notes[(iRoot + i) % 12]);
}
// console.log(getMajorGamma("C"));
function getMinorGamma(root) {
  const iRoot = notes.indexOf(root);
  // const patternMinor = [1, 0.5, 1, 1, 0.5, 1, 1]
  const minorSteps = [0, 2, 3, 5, 7, 8, 10, 12];
  return minorSteps.map((i, e) => notes[(iRoot + i) % 12]);
}
// console.log(getMinorGamma("F"));

function humanizeGamma(gamma) {
  let res = [];
  let startIndex = 0;
  gamma.forEach((item, i, arr) => {
    if (i === 0 || i + 1 === arr.length) {
      res.push(item);
      startIndex = notes.indexOf(item.charAt(0));
    } else {
      if (item.charAt(0) === cleanNotes[startIndex + i]) {
        res.push(item);
      } else {
        res.push(noteB[notes.indexOf(item)]);
      }
    }
  });

  // let res = gamma.map((e, i, arr) => {
  //   if (i > 0) {
  //     if (e.charAt(0) === arr[i - 1].charAt(0)) {
  //       return notesBemol[notes.indexOf(e)];
  //     }
  //     return e;
  //   } else {
  //     return e;
  //   }
  //   return e;
  // });
  console.log(gamma);
  console.log(res);
}

let majorChords = [];
loopChords("C", majorChords);
// console.log(majorChords);
const outLoopChords = majorChords.map((e) => e[0] + ": " + e.join("-"));

// const out = getMajorGamma("F") + "<br>" + getMinorGamma("A");
const out =
  getMajorGamma("C") +
  "<br>" +
  getMinorGamma("A") +
  "<br>" +
  getMajorGamma("G");
// humanizeGamma(getMajorGamma("E"));

document.getElementById("app").innerHTML = out;
// найти все мажорные и минорные гаммы
//  и вывести попарно параллельные тональности
