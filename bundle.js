/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ui_js__ = __webpack_require__(7);



window.leftPressed = false;
window.rightPressed = false;
window.difficultyLevel = 1;
window.muted = false;

let difficultyModifier = 1;
let rotateSpeed = 118;
let lineSpeed1 = 4.1;
let lineSpeed2 = 2.1;
let lineLifeTimer = 108;
let ballSpeed = .088;

let bgmStartTimes1 = [0, 30.23, 50.177, 75.77, 126.03];
let bgmStartTimes2 = [0, 32.34, 56.29, 77.65];
let bgmStartTimes3 = [0, 9.9, 29.7, 49.5, 89.07, 108.88];

const mainMenu = new Image();
mainMenu.src = 'assets/images/MainMenu.png';

const menuBgm = new Audio('./assets/audio/Mangetsu.mp3');
menuBgm.loop = true;

const beginAudio = new Audio('./assets/audio/Begin.mp3');
const gameOverAudio = new Audio('./assets/audio/GameOver.mp3');

menuBgm.play();

const bgm1 = new Audio('./assets/audio/CODABuildingTheme.mp3');
bgm1.loop = true;

const bgm2 = new Audio('./assets/audio/BattleTheme1.mp3');
bgm2.addEventListener('timeupdate', function () {
  var buffer = .412;
  if (this.currentTime > this.duration - buffer) {
    this.currentTime = 2.98;
    this.play();
  }
}, false);

const bgm3 = new Audio('./assets/audio/Xeleuiem.mp3');
bgm3.addEventListener('timeupdate', function () {
  var buffer = .252;
  if (this.currentTime > this.duration - buffer) {
    this.currentTime = 9.9;
    this.play();
  }
}, false);

let bgm;
let bgmStartTimes;

function setBgm() {
  if (window.difficultyLevel === 1) {
    bgm = bgm1;
    bgmStartTimes = bgmStartTimes1;
  } else if (window.difficultyLevel === 2) {
    bgm = bgm2;
    bgmStartTimes = bgmStartTimes2;
  } else {
    bgm = bgm3;
    bgmStartTimes = bgmStartTimes3;
  }
}

setBgm();

const setDifficulty1 = function () {
  window.difficultyLevel = 1;
  difficultyModifier = 1;
  setBgm();
  rotateSpeed = 118;
  lineSpeed1 = 4.1;
  lineSpeed2 = 2.1;
  lineLifeTimer = 108;
  ballSpeed = .088;
};

const setDifficulty2 = function () {
  window.difficultyLevel = 2;
  difficultyModifier = 2;
  setBgm();
  rotateSpeed = 80;
  lineSpeed1 = 5.25;
  lineSpeed2 = 3.25;
  lineLifeTimer = 74;
  ballSpeed = .125;
};

const setDifficulty3 = function () {
  window.difficultyLevel = 3;
  difficultyModifier = 3;
  setBgm();
  rotateSpeed = 59;
  lineSpeed1 = 6.2;
  lineSpeed2 = 4.2;
  lineLifeTimer = 65;
  ballSpeed = .173;
};

const hitSound = new Audio('./assets/audio/hitSound.mp3');

document.addEventListener('DOMContentLoaded', () => {
  const gameCanvas = document.getElementById('game');
  gameCanvas.height = 500;
  gameCanvas.width = 500;
  const canvasContext = gameCanvas.getContext('2d');

  const toolsCanvas = document.getElementById('tools');
  toolsCanvas.height = 616;
  toolsCanvas.width = 616;
  const toolsCanvasContext = toolsCanvas.getContext('2d');

  let ui;

  let game = new __WEBPACK_IMPORTED_MODULE_0__game_js__["a" /* default */](
    canvasContext,
    gameCanvas,
    toolsCanvas,
    toolsCanvasContext,
    ui,
    bgm,
    menuBgm,
    gameOverAudio,
    bgmStartTimes,
    hitSound,
    lineSpeed1,
    lineSpeed2,
    difficultyModifier,
    rotateSpeed,
    lineLifeTimer,
    ballSpeed
  );

  mainMenu.onload = () => {
    ui = new __WEBPACK_IMPORTED_MODULE_1__ui_js__["a" /* default */](game, toolsCanvasContext, toolsCanvas, true, mainMenu, bgm);
    ui.render();
  };

  window.addEventListener('keydown', checkKeyPressed, false);
  window.addEventListener('keyup', checkKeyLifted, false);

  function checkKeyPressed(event) {
    switch (event.keyCode) {
      case 27:
        if (game.gameActive === true || game.gameOver === true) {
          game.gameActive = false;
          cancelAnimationFrame(game.frames);
          game.ctx.clearRect(-300, -300, gameCanvas.width + 300, gameCanvas.height + 300);
          ui.toolsCtx.clearRect(-300, -300, toolsCanvas.width + 300, toolsCanvas.height + 300);
          ui.shouldDrawMainMenu = true;
          game.hitSound.pause();
          game.hitSound.currentTime = 0;
          if (!window.muted) menuBgm.play();
          bgm.pause();
          bgm.currentTime = bgmStartTimes[Math.floor(Math.random() * bgmStartTimes.length)];
          game.gameOver = false;
        }

        break;
      case 32:
        setBgm();
        beginAudio.pause();
        gameOverAudio.pause();
        beginAudio.currentTime = 0;
        beginAudio.play();
        if (game.gameActive === false) {
          game.hitSound.pause();
          game.hitSound.currentTime = 0;
          game = new __WEBPACK_IMPORTED_MODULE_0__game_js__["a" /* default */](
            canvasContext,
            gameCanvas,
            toolsCanvas,
            toolsCanvasContext,
            ui,
            bgm,
            menuBgm,
            gameOverAudio,
            bgmStartTimes,
            hitSound,
            lineSpeed1,
            lineSpeed2,
            difficultyModifier,
            rotateSpeed,
            lineLifeTimer,
            ballSpeed
          );
          ui.game = game;
          ui.bgm = bgm;
          ui.shouldDrawMainMenu = false;
          game.gameActive = true;
          game.gameOver = false;
          menuBgm.pause();
          bgm.currentTime = bgmStartTimes[Math.floor(Math.random() * bgmStartTimes.length)];
          if (!window.muted) bgm.play();
          game.begin();
        }

        break;
      case 37:
        window.leftPressed = true;
        if (ui.shouldDrawMainMenu === true) {
          if (window.difficultyLevel === 3) {
            setDifficulty2();
          } else if (window.difficultyLevel === 2) {
            setDifficulty1();
          }
        }

        break;
      case 39:
        window.rightPressed = true;
        if (ui.shouldDrawMainMenu === true) {
          if (window.difficultyLevel === 1) {
            if (ui.stage1Victory === true) {
              setDifficulty2();
            } else {
              ui.stage3LockedDisplay = false;
              ui.stage2LockedDisplay = true;
            }
          } else if (window.difficultyLevel === 2) {
            if (ui.stage2Victory === true) {
              setDifficulty3();
            } else {
              ui.stage2LockedDisplay = false;
              ui.stage3LockedDisplay = true;
            }
          }
        }

        break;
      case 49:
        if (ui.shouldDrawMainMenu === true) {
          setDifficulty1();
        }

        break;
      case 50:
        if (ui.shouldDrawMainMenu === true) {
          if (ui.stage1Victory === true) {
            setDifficulty2();
          } else {
            ui.stage3LockedDisplay = false;
            ui.stage2LockedDisplay = true;
          }
        }

        break;
      case 51:
        if (ui.shouldDrawMainMenu === true) {
          if (ui.stage2Victory === true) {
            setDifficulty3();
          } else {
            ui.stage2LockedDisplay = false;
            ui.stage3LockedDisplay = true;
          }
        }

        break;
      case 77:
        if (game.gameActive === true) {
          if (window.muted) {
            window.muted = false;
            bgm.play();
            ui.muteButtonDisplay = false;
          } else {
            window.muted = true;
            bgm.pause();
            ui.muteButtonDisplay = true;
          }
        } else {
          if (window.muted) {
            window.muted = false;
            menuBgm.play();
            ui.muteButtonDisplay = false;
          } else {
            window.muted = true;
            menuBgm.pause();
            ui.muteButtonDisplay = true;
          }
        }
    }
  }

  function checkKeyLifted(event) {
    switch (event.keyCode) {
      case 37:
        window.leftPressed = false;
        break;
      case 39:
        window.rightPressed = false;
        break;
    }
  }

});


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__line_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__center_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__player_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_line_circle_collision__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_line_circle_collision___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_line_circle_collision__);





class Game {
  constructor(
    ctx,
    gameCanvas,
    toolsCanvas,
    toolsCtx,
    ui,
    bgm,
    menuBgm,
    gameOverAudio,
    bgmStartTimes,
    hitSound,
    lineSpeed1,
    lineSpeed2,
    difficultyModifier,
    rotateSpeed,
    lineLifeTimer,
    ballSpeed
  ) {
    this.ctx = ctx;
    this.gameCanvas = gameCanvas;
    this.lineWidth = 10;

    this.toolsCtx = toolsCtx;
    this.toolsCanvas = toolsCanvas;
    this.ui = ui;

    this.bgm = bgm;
    this.menuBgm = menuBgm;
    this.bgmStartTimes = bgmStartTimes;
    this.hitSound = hitSound;
    this.hitSound.volume = 0.7;
    this.gameOverAudio = gameOverAudio;

    this.gameActive = false;
    this.gameOver = false;
    this.difficultyModifier = difficultyModifier;

    this.lines = [];
    this.lines2 = [];
    this.frames;

    this.specialLineCount = 0;
    this.specialFlag = false;
    this.specialLineFrequency = () => (
      Math.floor(Math.random() * 15 - (5 * (this.difficultyModifier - 1))) + 1
    );

    this.specialLineQuantity = this.difficultyModifier === 1 ? 9 : 11;

    this.startTime;

    this.r = Math.floor(Math.random() * 250) + 6;
    this.g = Math.floor(Math.random() * 250) + 6;
    this.b = Math.floor(Math.random() * 250) + 6;
    this.color = 'rgb(' + this.r + ',' + this.g + ',' + this.b + ')';

    this.center = new __WEBPACK_IMPORTED_MODULE_1__center_js__["a" /* default */](ctx, gameCanvas, this.difficultyModifier, 49);

    this.interval = 0;
    this.interval2 = -(lineLifeTimer / 2);

    this.rotateTimer = 130;
    this.rotateDir = 'left';
    this.rotateSpeed = rotateSpeed;
    this.lineSpeed1 = lineSpeed1;
    this.lineSpeed2 = lineSpeed2;
    this.lineLifeTimer = lineLifeTimer;
    this.ballSpeed = ballSpeed;

    this.player = new __WEBPACK_IMPORTED_MODULE_2__player_js__["a" /* default */](ctx, gameCanvas, this.color, this.ballSpeed);

    this.gameOverScreen = new Image();
    this.gameOverScreen.src = 'assets/images/GameOver.png';
    this.stageCompleteScreen = new Image();
    this.stageCompleteScreen.src = 'assets/images/StageComplete.png';
    this.gameCompleteScreen = new Image();
    this.gameCompleteScreen.src = 'assets/images/GameComplete.png';
  }

  moveLines() {
    this.lines.forEach(line => {
      line.closeIn();
    });
    this.lines2.forEach(line => {
      line.closeIn();
    });
  };

  begin() {
    this.startTime = new Date();
    this.ui.render();
    const animateCallback = () => {
      this.render(this.ctx);
      this.frames = requestAnimationFrame(animateCallback);
    };

    if (this.gameActive === true) {
      animateCallback();
    } else {
      cancelAnimationFrame(frames);
    }

  };

  end() {
    this.color = 'red';
    if (!window.muted) this.hitSound.play();
    this.gameOverAudio.pause();
    this.gameOverAudio.currentTime = 0;
    this.gameOverAudio.play();
    this.bgm.pause();
    this.bgm.currentTime = this.bgmStartTimes[Math.floor(Math.random() * this.bgmStartTimes.length)];
    if (!window.muted) this.menuBgm.play();
    this.ui.drawFinalScore();
    this.gameActive = false;
    this.gameOver = true;
    cancelAnimationFrame(this.frames);
  }

  choosePattern(ctx) {
    let specialLines;
    if (this.specialLineFrequency() === 1) {
      switch (Math.floor(Math.random() * this.specialLineQuantity) + 1) {
        case 1:
          this.specialFlag = true;
          specialLines = [
            new __WEBPACK_IMPORTED_MODULE_0__line_js__["a" /* default */](ctx, this.gameCanvas, 1, this.color, this.lineSpeed1, this.lineSpeed2, this.lineWidth),
            new __WEBPACK_IMPORTED_MODULE_0__line_js__["a" /* default */](ctx, this.gameCanvas, 3, this.color, this.lineSpeed1, this.lineSpeed2, this.lineWidth),
            new __WEBPACK_IMPORTED_MODULE_0__line_js__["a" /* default */](ctx, this.gameCanvas, 8, this.color, this.lineSpeed1, this.lineSpeed2, this.lineWidth),
          ];
          break;
        case 2:
          this.specialFlag = true;
          specialLines = [
            new __WEBPACK_IMPORTED_MODULE_0__line_js__["a" /* default */](ctx, this.gameCanvas, 1, this.color, this.lineSpeed1, this.lineSpeed2, this.lineWidth),
            new __WEBPACK_IMPORTED_MODULE_0__line_js__["a" /* default */](ctx, this.gameCanvas, 8, this.color, this.lineSpeed1, this.lineSpeed2, this.lineWidth),
          ];
          break;
        case 3:
          this.specialFlag = true;
          specialLines = [
            new __WEBPACK_IMPORTED_MODULE_0__line_js__["a" /* default */](ctx, this.gameCanvas, 1, this.color, this.lineSpeed1, this.lineSpeed2, this.lineWidth),
            new __WEBPACK_IMPORTED_MODULE_0__line_js__["a" /* default */](ctx, this.gameCanvas, 2, this.color, this.lineSpeed1, this.lineSpeed2, this.lineWidth),
            new __WEBPACK_IMPORTED_MODULE_0__line_js__["a" /* default */](ctx, this.gameCanvas, 6, this.color, this.lineSpeed1, this.lineSpeed2, this.lineWidth),
            new __WEBPACK_IMPORTED_MODULE_0__line_js__["a" /* default */](ctx, this.gameCanvas, 7, this.color, this.lineSpeed1, this.lineSpeed2, this.lineWidth),
          ];
          break;
        case 4:
          this.specialFlag = true;
          specialLines = [
            new __WEBPACK_IMPORTED_MODULE_0__line_js__["a" /* default */](ctx, this.gameCanvas, 1, this.color, this.lineSpeed1, this.lineSpeed2, this.lineWidth),
            new __WEBPACK_IMPORTED_MODULE_0__line_js__["a" /* default */](ctx, this.gameCanvas, 2, this.color, this.lineSpeed1, this.lineSpeed2, this.lineWidth),
            new __WEBPACK_IMPORTED_MODULE_0__line_js__["a" /* default */](ctx, this.gameCanvas, 3, this.color, this.lineSpeed1, this.lineSpeed2, this.lineWidth),
            new __WEBPACK_IMPORTED_MODULE_0__line_js__["a" /* default */](ctx, this.gameCanvas, 5, this.color, this.lineSpeed1, this.lineSpeed2, this.lineWidth),
            new __WEBPACK_IMPORTED_MODULE_0__line_js__["a" /* default */](ctx, this.gameCanvas, 6, this.color, this.lineSpeed1, this.lineSpeed2, this.lineWidth),
            new __WEBPACK_IMPORTED_MODULE_0__line_js__["a" /* default */](ctx, this.gameCanvas, 7, this.color, this.lineSpeed1, this.lineSpeed2, this.lineWidth),
          ];
          break;
        case 5:
          this.specialFlag = true;
          specialLines = [
            new __WEBPACK_IMPORTED_MODULE_0__line_js__["a" /* default */](ctx, this.gameCanvas, 1, this.color, this.lineSpeed1, this.lineSpeed2, this.lineWidth),
            new __WEBPACK_IMPORTED_MODULE_0__line_js__["a" /* default */](ctx, this.gameCanvas, 2, this.color, this.lineSpeed1, this.lineSpeed2, this.lineWidth),
            new __WEBPACK_IMPORTED_MODULE_0__line_js__["a" /* default */](ctx, this.gameCanvas, 3, this.color, this.lineSpeed1, this.lineSpeed2, this.lineWidth),
            new __WEBPACK_IMPORTED_MODULE_0__line_js__["a" /* default */](ctx, this.gameCanvas, 7, this.color, this.lineSpeed1, this.lineSpeed2, this.lineWidth),
            new __WEBPACK_IMPORTED_MODULE_0__line_js__["a" /* default */](ctx, this.gameCanvas, 6, this.color, this.lineSpeed1, this.lineSpeed2, this.lineWidth),
            new __WEBPACK_IMPORTED_MODULE_0__line_js__["a" /* default */](ctx, this.gameCanvas, 8, this.color, this.lineSpeed1, this.lineSpeed2, this.lineWidth),
          ];
          break;
        case 6:
          this.specialFlag = true;
          specialLines = [
            new __WEBPACK_IMPORTED_MODULE_0__line_js__["a" /* default */](ctx, this.gameCanvas, 9, this.color, this.lineSpeed1, this.lineSpeed2, this.lineWidth, this),
          ];
          break;
        case 7:
          this.specialFlag = true;
          specialLines = [
            new __WEBPACK_IMPORTED_MODULE_0__line_js__["a" /* default */](ctx, this.gameCanvas, 10, this.color, this.lineSpeed1, this.lineSpeed2, this.lineWidth, this),
          ];
          break;
        case 8:
          this.specialFlag = true;
          specialLines = [
            new __WEBPACK_IMPORTED_MODULE_0__line_js__["a" /* default */](ctx, this.gameCanvas, 11, this.color, this.lineSpeed1, this.lineSpeed2, this.lineWidth, this),
          ];
          break;
        case 9:
          this.specialFlag = true;
          specialLines = [
            new __WEBPACK_IMPORTED_MODULE_0__line_js__["a" /* default */](ctx, this.gameCanvas, 12, this.color, this.lineSpeed1, this.lineSpeed2, this.lineWidth, this),
          ];
          break;
        case 10:
          this.specialFlag = true;
          specialLines = [
            new __WEBPACK_IMPORTED_MODULE_0__line_js__["a" /* default */](ctx, this.gameCanvas, 10, this.color, this.lineSpeed1, this.lineSpeed2, this.lineWidth, this),
            new __WEBPACK_IMPORTED_MODULE_0__line_js__["a" /* default */](ctx, this.gameCanvas, 11, this.color, this.lineSpeed1, this.lineSpeed2, this.lineWidth, this),
          ];
          break;
        case 11:
          this.specialFlag = true;
          specialLines = [
            new __WEBPACK_IMPORTED_MODULE_0__line_js__["a" /* default */](ctx, this.gameCanvas, 9, this.color, this.lineSpeed1, this.lineSpeed2, this.lineWidth, this),
            new __WEBPACK_IMPORTED_MODULE_0__line_js__["a" /* default */](ctx, this.gameCanvas, 12, this.color, this.lineSpeed1, this.lineSpeed2, this.lineWidth, this),
          ];
          break;
      }
    }

    if (specialLines) return specialLines;

    let allDiagLines = [
                new __WEBPACK_IMPORTED_MODULE_0__line_js__["a" /* default */](ctx, this.gameCanvas, 1, this.color, this.lineSpeed1, this.lineSpeed2, this.lineWidth),
                new __WEBPACK_IMPORTED_MODULE_0__line_js__["a" /* default */](ctx, this.gameCanvas, 2, this.color, this.lineSpeed1, this.lineSpeed2, this.lineWidth),
                new __WEBPACK_IMPORTED_MODULE_0__line_js__["a" /* default */](ctx, this.gameCanvas, 3, this.color, this.lineSpeed1, this.lineSpeed2, this.lineWidth),
                new __WEBPACK_IMPORTED_MODULE_0__line_js__["a" /* default */](ctx, this.gameCanvas, 4, this.color, this.lineSpeed1, this.lineSpeed2, this.lineWidth),
                ];
    let allLines = [
                new __WEBPACK_IMPORTED_MODULE_0__line_js__["a" /* default */](ctx, this.gameCanvas, 5, this.color, this.lineSpeed1, this.lineSpeed2, this.lineWidth),
                new __WEBPACK_IMPORTED_MODULE_0__line_js__["a" /* default */](ctx, this.gameCanvas, 6, this.color, this.lineSpeed1, this.lineSpeed2, this.lineWidth),
                new __WEBPACK_IMPORTED_MODULE_0__line_js__["a" /* default */](ctx, this.gameCanvas, 7, this.color, this.lineSpeed1, this.lineSpeed2, this.lineWidth),
                new __WEBPACK_IMPORTED_MODULE_0__line_js__["a" /* default */](ctx, this.gameCanvas, 8, this.color, this.lineSpeed1, this.lineSpeed2, this.lineWidth),
                ];
    return Math.floor(Math.random() * 3) === 1 ? allDiagLines : allLines;
  }

  makePatterns(ctx) {
    this.specialFlag = false;
    let chosenLines = this.choosePattern(ctx);
    if (this.interval > this.lineLifeTimer) {
      let randNum = Math.floor(Math.random() * chosenLines.length);
      if (Math.floor(Math.random() * this.difficultyModifier) === 0) {
        if (this.specialFlag === false) chosenLines.splice((randNum + Math.floor((Math.random() * 3) + 1)) % 4, 1);
      }

      if (this.specialFlag === false) chosenLines.splice(randNum, 1);
      this.specialFlag = false;
      this.lines = chosenLines;
      this.interval = 0;
    } else {
      this.interval += 1;
    }

    this.specialFlag = false;
    let chosenLines2 = this.choosePattern(ctx);
    if (this.interval2 > this.lineLifeTimer) {
      let randNum2 = Math.floor(Math.random() * chosenLines2.length);
      if (Math.floor(Math.random() * this.difficultyModifier) === 0) {
        if (this.specialFlag === false) chosenLines2.splice((randNum2 + Math.floor((Math.random() * 3) + 1)) % 4, 1);
      }

      if (this.specialFlag === false) chosenLines2.splice(randNum2, 1);
      this.specialFlag = false;
      this.lines2 = chosenLines2;
      this.interval2 = 0;
    } else {
      this.interval2 += 1;
    }
  }

  checkCollision() {
    let circle = [this.player.ball.x, this.player.ball.y];
    let radius = this.player.ball.radius;
    this.lines.forEach((line) => {
      let a = line.startPoint;
      let b = line.endPoint;
      let hit = __WEBPACK_IMPORTED_MODULE_3_line_circle_collision___default()(a, b, circle, radius);
      if (hit === true) {
        this.end();
      }
    });
    this.lines2.forEach((line) => {
      let a = line.startPoint;
      let b = line.endPoint;
      let hit = __WEBPACK_IMPORTED_MODULE_3_line_circle_collision___default()(a, b, circle, radius);
      if (hit === true) {
        this.end();
      }
    });
  }

  rotate(ctx, flip) {
    if (flip === true) this.rotateDir = this.rotateDir === 'left' ? 'right' : 'left';
    let rotation = this.rotateDir === 'left' ? -this.rotateSpeed : this.rotateSpeed;
    ctx.translate(this.gameCanvas.width / 2, this.gameCanvas.width / 2);
    ctx.rotate(Math.PI / rotation);
    ctx.translate(-this.gameCanvas.width / 2, -this.gameCanvas.width / 2);
  }

  setColor() {
    this.r += Math.floor(Math.random() * 250) + 2;
    this.r = this.r % 256;
    if (this.r < 40) this.r = 40;

    this.g += Math.floor(Math.random() * 250) + 2;
    this.g = this.g % 256;
    if (this.g < 40) this.g = 40;

    this.b += Math.floor(Math.random() * 250) + 2;
    this.b = this.b % 256;
    if (this.b < 40) this.b = 40;
    this.color = 'rgb(' + this.r + ',' + this.g + ',' + this.b + ')';
  }

  pulseCenter() {
    if (window.difficultyLevel === 1) {
      if (this.center.radius < 40) {
        this.center.radius += 20;
      } else {
        this.center.radius -= .4068;
      }
    }

    if (window.difficultyLevel === 2) {
      if (this.center.radius < 40) {
        this.center.radius += 20;
      } else {
        this.center.radius -= .513;
      }
    }

    if (window.difficultyLevel === 3) {
      if (this.center.radius < 47) {
        this.center.radius += 18;
      } else {
        this.center.radius -= .499;
      }
    }
  }

  doEvilThingsToThirdStage() {
    if (parseInt(this.ui.score) > 10 && window.difficultyLevel === 3) {
      this.center.color = 'black';
      if (parseInt(this.ui.score) > 20 && parseInt(this.ui.score) < 30) {
        this.color = 'white';
      }
      if (parseInt(this.ui.score) > 30) {
        this.rotateSpeed = 0;
      }
      if (parseInt(this.ui.score) > 35) {
        this.rotateSpeed = 59;
      }
      if (parseInt(this.ui.score) > 40) {
        this.rotateSpeed = 0;
        this.lineWidth = 13;
      }
      if (parseInt(this.ui.score) > 45) {
        this.rotateSpeed = 59;
      }
      if (parseInt(this.ui.score) > 50 && parseInt(this.ui.score.charAt(3)) % 2 !== 0) {
        this.lineWidth = 1;
        this.player.color = 'black';
      }
      if (parseInt(this.ui.score) > 50 && parseInt(this.ui.score.charAt(3)) % 2 === 0) {
        this.lineWidth = 1;
        this.player.color = 'white';
      }
    }
  }

  render(ctx) {
    if (this.gameActive === true) {
      this.makePatterns(ctx);

      if (this.ui.score > 60.0) {
        if (this.rotateSpeed > 60) this.rotateSpeed -= .05;
        this.lineSpeed1 += .001;
        if (this.player.ballSpeed < .17) this.player.ballSpeed += .00005;
        this.lineSpeed2 += .001;
        this.lineLifeTimer -= .02;
      }

      this.checkCollision();
      ctx.clearRect(-700, -700, this.gameCanvas.width + 700, this.gameCanvas.height + 700);

      if (this.rotateTimer < 1) {
        this.rotate(ctx, true);
        this.rotateTimer = Math.floor(Math.random() * 190) + 70;
      } else {
        this.rotate(ctx, false);
        this.rotateTimer = this.rotateTimer - 1;
      }

      this.setColor();

      this.doEvilThingsToThirdStage();

      this.pulseCenter();

      this.moveLines();
      this.player.render(ctx);
      this.lines.forEach((line) => {
        line.render(ctx);
      });
      this.lines2.forEach((line) => {
        line.render(ctx);
      });
      this.center.render(ctx);
    } else if (this.gameOver === true) {
      if (parseInt(this.ui.score) >= 60.0 && window.difficultyLevel === 3) {
        this.toolsCtx.drawImage(
          this.gameCompleteScreen,
          this.toolsCanvas.width / 2 - this.gameCompleteScreen.width / 2,
          this.toolsCanvas.height / 2 - this.gameCompleteScreen.height / 2
        );
      } else if (parseInt(this.ui.score) >= 60.0) {
        this.toolsCtx.drawImage(
          this.stageCompleteScreen,
          this.toolsCanvas.width / 2 - this.stageCompleteScreen.width / 2,
          this.toolsCanvas.height / 2 - this.stageCompleteScreen.height / 2
        );
      } else {
        this.toolsCtx.drawImage(
          this.gameOverScreen,
          this.toolsCanvas.width / 2 - this.gameOverScreen.width / 2,
          this.toolsCanvas.height / 2 - this.gameOverScreen.height / 2
        );
      }
    }
  };
}

/* harmony default export */ __webpack_exports__["a"] = (Game);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Line {
  constructor(ctx, gameCanvas, type, color, lineSpeed1, lineSpeed2, lineWidth, game) {
    this.ctx = ctx;
    this.gameCanvas = gameCanvas;
    this.game = game;
    this.color = color;
    this.x = 0;
    this.y = 0;
    this.halfWidth = this.gameCanvas.width / 2;
    this.halfHeight = this.gameCanvas.height / 2;
    this.fullWidth = this.gameCanvas.width;
    this.fullHeight = this.gameCanvas.height;

    this.lineSpeed1 = lineSpeed1;
    this.lineSpeed2 = lineSpeed2;

    this.lineWidth = lineWidth;
    this.type = type;
    this.handleType(type);
    this.startPoint = [0, 0];
    this.endPoint = [0, 0];
  }

  handleType(type) {
    if (type === 1) {
      this.x = -200;
      this.y = 0;
    } else if (type === 2) {
      this.x = this.gameCanvas.height + 200;
      this.y = this.gameCanvas.width;
    } else if (type === 3) {
      this.x = (this.gameCanvas.width / 2);
      this.y = -200;
    } else if (type === 4) {
      this.x = -200;
      this.y = this.gameCanvas.height / 2;
    } else if (type === 5) {
      this.x = 0;
      this.y = 0;
    } else if (type === 6) {
      this.x = this.gameCanvas.width;
      this.y = 0;
    } else if (type === 7) {
      this.x = 0;
      this.y = 0;
    } else if (type === 8) {
      this.x = 0;
      this.y = this.gameCanvas.height;
    } else if (type === 9) {
      this.x = 0;
      this.y = this.gameCanvas.height;
    } else if (type === 10) {
      this.x = -200;
      this.y = this.gameCanvas.height / 2;
    } else if (type === 11) {
      this.x = (this.gameCanvas.width / 2);
      this.y = -200;
    } else if (type === 12) {
      this.x = 0;
      this.y = 0;
    }

  }

  closeIn() {
    if (this.type < 5) {
      if (this.type === 1) {
        this.x = this.x + this.lineSpeed1;
        this.y = this.y + this.lineSpeed1;
      } else if (this.type === 2) {
        this.x = this.x - this.lineSpeed1;
        this.y = this.y - this.lineSpeed1;
      } else if (this.type === 3) {
        this.fullWidth = this.fullWidth - this.lineSpeed1;
        this.y = this.y + this.lineSpeed1;
      } else if (this.type === 4) {
        this.x = this.x + this.lineSpeed1;
        this.fullHeight = this.fullHeight - this.lineSpeed1;
      }

    } else {
      if (this.type === 5) {
        this.x = this.x + this.lineSpeed2;
        this.y = this.y + this.lineSpeed2;
        this.fullHeight = this.fullHeight - this.lineSpeed2;
      } else if (this.type === 6) {
        this.x = this.x - this.lineSpeed2;
        this.y = this.y + this.lineSpeed2;
        this.fullHeight = this.fullHeight - this.lineSpeed2;
      } else if (this.type === 7) {
        this.x = this.x + this.lineSpeed2;
        this.y = this.y + this.lineSpeed2;
        this.fullWidth = this.fullWidth - this.lineSpeed2;
      } else if (this.type === 8) {
        this.x = this.x + this.lineSpeed2;
        this.y = this.y - this.lineSpeed2;
        this.fullWidth = this.fullWidth - this.lineSpeed2;
      } else if (this.type === 9) {
        this.x = this.x + this.lineSpeed2 + 2;
        this.y = this.y - this.lineSpeed2 - 2;
        this.fullWidth = this.fullWidth - this.lineSpeed2 - 2;
      } else if (this.type === 10) {
        this.x = this.x + this.lineSpeed1 + 2;
        this.fullHeight = this.fullHeight - this.lineSpeed1 - 2;
      } else if (this.type === 11) {
        this.fullWidth = this.fullWidth - this.lineSpeed1 - 2;
        this.y = this.y + this.lineSpeed1 + 2;
      } else if (this.type === 12) {
        this.x = this.x + this.lineSpeed2 + 2;
        this.y = this.y + this.lineSpeed2 + 2;
        this.fullWidth = this.fullWidth - this.lineSpeed2 - 2;
      }

    }

  }

  render(ctx) {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.lineWidth;
    if (this.type === 1) {
      this.startPoint = [this.x, this.halfHeight];
      ctx.moveTo(this.x, this.halfHeight);
      this.endPoint = [this.halfWidth, this.y - 200];
      ctx.lineTo(this.halfWidth, this.y - 200);
    } else if (this.type === 2) {
      this.startPoint = [this.x, this.halfHeight];
      ctx.moveTo(this.x, this.halfHeight);
      this.endPoint = [this.halfWidth, this.y + 200];
      ctx.lineTo(this.halfWidth, this.y + 200);
    } else if (this.type === 3) {
      this.startPoint = [this.x, this.y];
      ctx.moveTo(this.x, this.y);
      this.endPoint = [this.fullWidth + 200, this.halfHeight];
      ctx.lineTo(this.fullWidth + 200, this.halfHeight);
    } else if (this.type === 4) {
      this.startPoint = [this.x, this.y];
      ctx.moveTo(this.x, this.y);
      this.endPoint = [this.halfWidth, this.fullHeight + 200];
      ctx.lineTo(this.halfWidth, this.fullHeight + 200);
    } else if (this.type === 5) {
      this.startPoint = [this.x, this.y];
      ctx.moveTo(this.x, this.y);
      this.endPoint = [this.x, this.fullHeight];
      ctx.lineTo(this.x, this.fullHeight);
    } else if (this.type === 6) {
      this.startPoint = [this.x, this.y];
      ctx.moveTo(this.x, this.y);
      this.endPoint = [this.x, this.fullHeight];
      ctx.lineTo(this.x, this.fullHeight);
    } else if (this.type === 7) {
      this.startPoint = [this.x, this.y];
      ctx.moveTo(this.x, this.y);
      this.endPoint = [this.fullWidth, this.y];
      ctx.lineTo(this.fullWidth, this.y);
    } else if (this.type === 8) {
      this.startPoint = [this.x, this.y];
      ctx.moveTo(this.x, this.y);
      this.endPoint = [this.fullWidth, this.y];
      ctx.lineTo(this.fullWidth, this.y);
    } else if (this.type === 9) {
      this.startPoint = [this.x, this.y];
      ctx.moveTo(this.x, this.y);
      this.endPoint = [this.fullWidth, this.y];
      ctx.lineTo(this.fullWidth, this.y);
      this.color = this.game.color;
    } else if (this.type === 10) {
      this.startPoint = [this.x, this.y];
      ctx.moveTo(this.x, this.y);
      this.endPoint = [this.halfWidth, this.fullHeight + 200];
      ctx.lineTo(this.halfWidth, this.fullHeight + 200);
      this.color = this.game.color;
    } else if (this.type === 11) {
      this.startPoint = [this.x, this.y];
      ctx.moveTo(this.x, this.y);
      this.endPoint = [this.fullWidth + 200, this.halfHeight];
      ctx.lineTo(this.fullWidth + 200, this.halfHeight);
      this.color = this.game.color;
    } else if (this.type === 12) {
      this.startPoint = [this.x, this.y];
      ctx.moveTo(this.x, this.y);
      this.endPoint = [this.fullWidth, this.y];
      ctx.lineTo(this.fullWidth, this.y);
      this.color = this.game.color;
    }

    ctx.closePath();
    ctx.stroke();
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Line);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Center {
  constructor(ctx, gameCanvas, difficultyModifier, radius) {
    this.ctx = ctx;
    this.gameCanvas = gameCanvas;
    this.radius = radius;
    if (difficultyModifier == 1) this.color = '#7C7C7C';
    if (difficultyModifier == 2) this.color = '#303030';
    if (difficultyModifier == 3) this.color = '#131313';
  }

  render(ctx) {
    let centerX = this.gameCanvas.width / 2;
    let centerY = this.gameCanvas.height / 2;
    ctx.beginPath();
    ctx.arc(centerX, centerY, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Center);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Player {
  constructor(ctx, gameCanvas, color, ballSpeed) {
    this.ctx = ctx;
    this.gameCanvas = gameCanvas;
    this.color = color;
    this.circle = {
      centerX: this.gameCanvas.width / 2,
      centerY: this.gameCanvas.height / 2,
      radius: 75,
      angle: 0,
    };
    this.ball = { x: 0, y: 0, speed: 0 };
    this.ball.x = 0;
    this.ball.y = 0;
    this.ball.radius = 8;
    this.ballSpeed = ballSpeed;
  }

  render(ctx) {

    if (window.rightPressed) {
      this.ball.speed = this.ballSpeed;
    }

    if (window.leftPressed) {
      this.ball.speed = -(this.ballSpeed);
    }

    if (!window.leftPressed && !window.rightPressed) {
      this.ball.speed = 0;
    }

    ctx.strokeStyle = this.color;

    this.ball.x = this.circle.centerX + Math.cos(this.circle.angle) * this.circle.radius;
    this.ball.y = this.circle.centerY + Math.sin(this.circle.angle) * this.circle.radius;

    this.circle.angle += this.ball.speed;

    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.ball.x, this.ball.y, this.ball.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Player);


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var pointCircleCollide = __webpack_require__(6)

var tmp = [0, 0]

function lineCircleCollide(a, b, circle, radius, nearest) {
    //check to see if start or end points lie within circle 
    if (pointCircleCollide(a, circle, radius)) {
        if (nearest) {
            nearest[0] = a[0]
            nearest[1] = a[1]
        }
        return true
    } if (pointCircleCollide(b, circle, radius)) {
        if (nearest) {
            nearest[0] = b[0]
            nearest[1] = b[1]
        }
        return true
    }
    
    var x1 = a[0],
        y1 = a[1],
        x2 = b[0],
        y2 = b[1],
        cx = circle[0],
        cy = circle[1]

    //vector d
    var dx = x2 - x1
    var dy = y2 - y1
    
    //vector lc
    var lcx = cx - x1
    var lcy = cy - y1
    
    //project lc onto d, resulting in vector p
    var dLen2 = dx * dx + dy * dy //len2 of d
    var px = dx
    var py = dy
    if (dLen2 > 0) {
        var dp = (lcx * dx + lcy * dy) / dLen2
        px *= dp
        py *= dp
    }
    
    if (!nearest)
        nearest = tmp
    nearest[0] = x1 + px
    nearest[1] = y1 + py
    
    //len2 of p
    var pLen2 = px * px + py * py
    
    //check collision
    return pointCircleCollide(nearest, circle, radius)
            && pLen2 <= dLen2 && (px * dx + py * dy) >= 0
}

module.exports = lineCircleCollide

/***/ }),
/* 6 */
/***/ (function(module, exports) {

function pointCircleCollision(point, circle, r) {
    if (r===0) return false
    var dx = circle[0] - point[0]
    var dy = circle[1] - point[1]
    return dx * dx + dy * dy <= r * r
}

module.exports = pointCircleCollision

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Ui {
  constructor(game, toolsCtx, toolsCanvas, shouldDrawMainMenu, mainMenu, bgm) {
    this.game = game;
    this.toolsCtx = toolsCtx;
    this.toolsCanvas = toolsCanvas;
    this.score;
    this.highScore1 = 0;
    this.highScore2 = 0;
    this.highScore3 = 0;
    this.shouldDrawMainMenu = shouldDrawMainMenu;
    this.mainMenu = mainMenu;
    this.bgm = bgm;

    this.stage2LockedDisplay = false;
    this.muteButtonDisplay = false;

    this.stage1Victory = false;
    this.stage2Victory = false;
    this.stage3Victory = false;
  }

  drawElapsedTime() {
    if (this.game.gameActive === true) {
      let elapsed = parseInt((new Date() - this.game.startTime));
      let hundredths = (elapsed / 1000).toFixed(2);
      if (hundredths.length < 2) hundredths = '0' + hundredths;
      this.toolsCtx.save();
      this.toolsCtx.beginPath();
      this.toolsCtx.fillStyle = 'white';
      if (parseInt(hundredths) >= 60.0) this.toolsCtx.fillStyle = 'lightgreen';

      this.toolsCtx.font = '50px Orbitron';

      this.toolsCtx.globalAlpha = 0.50;
      this.toolsCtx.fillText(hundredths, this.toolsCanvas.width - 365, 60);
      this.toolsCtx.restore();
      this.score = hundredths;
    }
  }

  drawFinalScore() {

    if (window.difficultyLevel === 1) {
      if (parseInt(this.score) > parseInt(this.highScore1)) {
        this.highScore1 = this.score;
      }
    } else if (window.difficultyLevel === 2) {
      if (parseInt(this.score) > parseInt(this.highScore2)) {
        this.highScore2 = this.score;
      }
    } else if (window.difficultyLevel === 3) {
      if (parseInt(this.score) > parseInt(this.highScore3)) {
        this.highScore3 = this.score;
      }
    }

    this.toolsCtx.save();
    this.toolsCtx.beginPath();
    this.toolsCtx.fillStyle = 'white';

    if (parseInt(this.score) >= 60.0) {
      this.toolsCtx.fillStyle = 'lightgreen';
      if (window.difficultyLevel === 1) {
        this.stage1Victory = true;
      } else if (window.difficultyLevel === 2) {
        this.stage2Victory = true;
      } else if (window.difficultyLevel === 3) {
        this.stage3Victory = true;
      }
    }

    this.toolsCtx.font = '50px Orbitron';
    this.toolsCtx.fillText(this.score, this.toolsCanvas.width - 365, 60);
    this.toolsCtx.restore();
  }

  drawHighScore() {
    if (window.difficultyLevel === 1) {
      if (this.highScore1) {
        this.toolsCtx.save();
        this.toolsCtx.beginPath();
        this.toolsCtx.fillStyle = 'white';
        this.toolsCtx.font = '26px Orbitron';
        this.toolsCtx.globalAlpha = 0.70;
        this.toolsCtx.fillText('Best: ' + this.highScore1, this.toolsCanvas.width - 585, 40);
        this.toolsCtx.restore();
      }
    } else if (window.difficultyLevel === 2) {
      if (this.highScore2) {
        this.toolsCtx.save();
        this.toolsCtx.beginPath();
        this.toolsCtx.fillStyle = 'white';
        this.toolsCtx.font = '26px Orbitron';
        this.toolsCtx.globalAlpha = 0.70;
        this.toolsCtx.fillText('Best: ' + this.highScore2, this.toolsCanvas.width - 585, 40);
        this.toolsCtx.restore();
      }
    } else if (window.difficultyLevel === 3) {
      if (this.highScore3) {
        this.toolsCtx.save();
        this.toolsCtx.beginPath();
        this.toolsCtx.fillStyle = 'white';
        this.toolsCtx.font = '26px Orbitron';
        this.toolsCtx.globalAlpha = 0.70;
        this.toolsCtx.fillText('Best: ' + this.highScore3, this.toolsCanvas.width - 585, 40);
        this.toolsCtx.restore();
      }
    }
  }

  drawMainMenu() {
    this.toolsCtx.drawImage(this.mainMenu,
      this.toolsCanvas.width / 2 - this.mainMenu.width / 2,
      this.toolsCanvas.height / 2 - this.mainMenu.height / 2
    );
    this.drawDifficulty();
  }

  drawMuteButton() {
    this.toolsCtx.beginPath();
    this.toolsCtx.strokeStyle = 'red';
    this.toolsCtx.lineWidth = 4;
    this.toolsCtx.moveTo(this.toolsCanvas.width - 181, this.toolsCanvas.height - 27);
    this.toolsCtx.lineTo(this.toolsCanvas.width - 181, this.toolsCanvas.height - 43);
    this.toolsCtx.moveTo(this.toolsCanvas.width - 183, this.toolsCanvas.height - 43);
    this.toolsCtx.lineTo(this.toolsCanvas.width - 156, this.toolsCanvas.height - 43);
    this.toolsCtx.moveTo(this.toolsCanvas.width - 158, this.toolsCanvas.height - 43);
    this.toolsCtx.lineTo(this.toolsCanvas.width - 158, this.toolsCanvas.height - 27);
    this.toolsCtx.moveTo(this.toolsCanvas.width - 169, this.toolsCanvas.height - 43);
    this.toolsCtx.lineTo(this.toolsCanvas.width - 169, this.toolsCanvas.height - 27);
    this.toolsCtx.closePath();
    this.toolsCtx.stroke();
  }

  drawDifficulty() {
    this.toolsCtx.beginPath();
    this.toolsCtx.lineWidth = 6;
    if (window.difficultyLevel === 1) {
      this.toolsCtx.strokeStyle = this.stage1Victory ? 'green' : 'blue';
      this.toolsCtx.moveTo(10, this.toolsCanvas.height - 15);
      this.toolsCtx.lineTo(75, this.toolsCanvas.height - 15);
      this.toolsCtx.moveTo(10, this.toolsCanvas.height - 65);
      this.toolsCtx.lineTo(75, this.toolsCanvas.height - 65);
      this.toolsCtx.moveTo(13, this.toolsCanvas.height - 65);
      this.toolsCtx.lineTo(13, this.toolsCanvas.height - 15);
      this.toolsCtx.moveTo(72, this.toolsCanvas.height - 65);
      this.toolsCtx.lineTo(72, this.toolsCanvas.height - 15);
    } else if (window.difficultyLevel === 2) {
      this.toolsCtx.strokeStyle = this.stage2Victory ? 'green' : 'blue';
      this.toolsCtx.moveTo(85, this.toolsCanvas.height - 14);
      this.toolsCtx.lineTo(150, this.toolsCanvas.height - 14);
      this.toolsCtx.moveTo(85, this.toolsCanvas.height - 65);
      this.toolsCtx.lineTo(150, this.toolsCanvas.height - 65);
      this.toolsCtx.moveTo(88, this.toolsCanvas.height - 65);
      this.toolsCtx.lineTo(88, this.toolsCanvas.height - 15);
      this.toolsCtx.moveTo(147, this.toolsCanvas.height - 65);
      this.toolsCtx.lineTo(147, this.toolsCanvas.height - 15);
    } else if (window.difficultyLevel === 3) {
      this.toolsCtx.strokeStyle = this.stage3Victory ? 'green' : 'blue';
      this.toolsCtx.moveTo(162, this.toolsCanvas.height - 15);
      this.toolsCtx.lineTo(227, this.toolsCanvas.height - 15);
      this.toolsCtx.moveTo(162, this.toolsCanvas.height - 65);
      this.toolsCtx.lineTo(227, this.toolsCanvas.height - 65);
      this.toolsCtx.moveTo(165, this.toolsCanvas.height - 65);
      this.toolsCtx.lineTo(165, this.toolsCanvas.height - 15);
      this.toolsCtx.moveTo(224, this.toolsCanvas.height - 65);
      this.toolsCtx.lineTo(224, this.toolsCanvas.height - 15);
    }

    this.toolsCtx.closePath();
    this.toolsCtx.stroke();
  }

  stage2Locked() {
    this.toolsCtx.save();
    this.toolsCtx.beginPath();
    this.toolsCtx.fillStyle = 'red';
    this.toolsCtx.font = '26px Orbitron';
    this.toolsCtx.fillText('Unlocked by completing Stage 1', 78, this.toolsCanvas.height - 230);
    this.toolsCtx.strokeStyle = 'red';
    this.toolsCtx.moveTo(85, this.toolsCanvas.height - 15);
    this.toolsCtx.lineTo(150, this.toolsCanvas.height - 15);
    this.toolsCtx.moveTo(85, this.toolsCanvas.height - 65);
    this.toolsCtx.lineTo(150, this.toolsCanvas.height - 65);
    this.toolsCtx.moveTo(88, this.toolsCanvas.height - 65);
    this.toolsCtx.lineTo(88, this.toolsCanvas.height - 15);
    this.toolsCtx.moveTo(147, this.toolsCanvas.height - 65);
    this.toolsCtx.lineTo(147, this.toolsCanvas.height - 15);
    this.toolsCtx.closePath();
    this.toolsCtx.stroke();
    this.toolsCtx.restore();
  }

  stage3Locked() {
    this.toolsCtx.save();
    this.toolsCtx.beginPath();
    this.toolsCtx.fillStyle = 'red';
    this.toolsCtx.font = '26px Orbitron';
    this.toolsCtx.fillText('Unlocked by completing Stage 2', 78, this.toolsCanvas.height - 230);
    this.toolsCtx.strokeStyle = 'red';
    this.toolsCtx.moveTo(162, this.toolsCanvas.height - 15);
    this.toolsCtx.lineTo(227, this.toolsCanvas.height - 15);
    this.toolsCtx.moveTo(162, this.toolsCanvas.height - 65);
    this.toolsCtx.lineTo(227, this.toolsCanvas.height - 65);
    this.toolsCtx.moveTo(165, this.toolsCanvas.height - 65);
    this.toolsCtx.lineTo(165, this.toolsCanvas.height - 15);
    this.toolsCtx.moveTo(224, this.toolsCanvas.height - 65);
    this.toolsCtx.lineTo(224, this.toolsCanvas.height - 15);
    this.toolsCtx.closePath();
    this.toolsCtx.stroke();
    this.toolsCtx.restore();
  }

  render() {
    const animateCallback = () => {
      this.toolsCtx.clearRect(0, 0, this.toolsCanvas.width, this.toolsCanvas.height);
      this.shouldDrawMainMenu === true ? this.drawMainMenu() : null;
      this.game.gameOver === false ? this.drawElapsedTime() : this.drawFinalScore();
      if (this.highScore1 > 0 || this.highScore2 > 0 || this.highScore3 > 0) this.drawHighScore();

      if (this.stage2LockedDisplay === true) {
        this.stage2Locked();
        setTimeout(() => (this.stage2LockedDisplay = false), 1500);
      }

      if (this.stage3LockedDisplay === true) {
        this.stage3Locked();
        setTimeout(() => (this.stage3LockedDisplay = false), 1500);
      }

      if (this.muteButtonDisplay === true) {
        this.drawMuteButton();
      }

      this.frames = requestAnimationFrame(animateCallback);
    };

    animateCallback();

  }
}

/* harmony default export */ __webpack_exports__["a"] = (Ui);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map