let beatHistory = [];       // stores the times the drum was kicked betwen beats
let bpm = 0;                // stores beats per minute estimate
let BPM_INDICATOR;
const ESC = 27;             // press ESC to reset the bpm
const USE_AT_MOST = 2;      // the max number of past beats to consider for bpm calculation


/**
 * Calculates beats per minute
 * The calculation will use only USE_AT_MOST of the last inputs for the calculation
 * Figure out the total time elapsed, divide by beats, convert milliseconds to minutes
 */
function calcBPM() {
  if (!beatHistory || beatHistory.length < 2) {
    return undefined;
  }
  const len = beatHistory.length;
  const use = Math.min(USE_AT_MOST, len - 1);
  const timePerBeat = (beatHistory[len - 1] - beatHistory[len - 1 - use]) / use;
  return (1 / timePerBeat) * 1000 * 60;
}

function addBeat() {
  beatHistory.push(Date.now());
  bpm = calcBPM(beatHistory, USE_AT_MOST);
  if (bpm) {
    bpm = Math.round(bpm);
    BPM_INDICATOR.innerHTML = `${bpm} bpm`;
  }
}

function keyEventHandler(e) {
  if (e.keyCode === ESC) {
    beatHistory = [];
    BPM_INDICATOR.innerHTML = 'Tap Tap Tap';
  } else {
    addBeat();
  }
}

function init() {
  window.addEventListener('keydown', keyEventHandler);
  window.addEventListener('mousedown', addBeat);
  BPM_INDICATOR = document.querySelector('#bpm');
}
