/*

Copyright (c) 2016, #!/nixfixers
All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice,
   this list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its contributors
   may be used to endorse or promote products derived from this software
   without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

*/

'use strict;'

//
//  Declare an accessor for the slide puzzle namespace
//
var getSlidePuzzleNs = (function () {
    var spNs =  {};

    var accessor = function () {
        return spNs;
    };

    return accessor;
}());


(function () {
    //  Get the namespace
    var spNs = getSlidePuzzleNs();

    //
    //  Load the slide puzzle
    //
    spNs.load = (function (jqObj) {
        var container, puzzleBoardHeight, puzzleBoard, puzzleControls;

        //  If no jquery object passed in
        if (!jqObj) {
            throw('Slidepuzzle load requires a jQuery instance passed as an argument.');
        }
        else {
            spNs.jq = jqObj;

            //  Only init if the expected container div exists
            container = spNs.jq('#nf-slide-puzzle');

            if (!container) {
                throw('Slidepuzzle requires a div with id nf-slide-puzzle.');
            }
            else {
                //  Init the game container divs
                puzzleBoardHeight = 0;
                (function () {
                    //  Add the puzzle board and control divs
                    var divs = [
                        '<div id=\'nf-slide-puzzle-board\'>',
                        '</div>',
                        '<div id=\'nf-slide-puzzle-controls\'>',
                        '</div>'
                    ];

                    container.append(divs.join(''));
                    puzzleBoard = spNs.jq('#nf-slide-puzzle-board');
                    puzzleControls = spNs.jq('#nf-slide-puzzle-controls');

                    if (puzzleBoard) {
                        //  Try to get the height, toggle container divs if needed
                        (function () {
                            var hiddenParents = [];
                            var trackHiddenParents = (function (that) {
                                var node = {
                                               obj : that,
                                               visibility : that.css('visibility')
                                           };
                                hiddenParents.push(node);
                            });
                            var index, count, currNode;

                            //  Cache the parents that have display set to none
                            puzzleBoard.parents().each(function () {
                                var that = spNs.jq(this);
                                var displayVal = that.css('display');
                                if (displayVal) {
                                    displayVal = displayVal.toLowerCase();
                                    if (displayVal === 'none') {
                                        trackHiddenParents(that);
                                    }
                                }
                            });

                            //  Toggle and set the visibility to hidden for each hidden parent
                            index = 0;
                            count = hiddenParents.length;
                            for( ; index < count; index++) {
                                currNode = hiddenParents[index];
                                currNode.obj.css('visibility', 'hidden');
                                currNode.obj.toggle();
                            }

                            //  There should now be a height for the container div.
                            //  If there is not, then parent css needs to be updated.
                            puzzleBoardHeight = puzzleBoard.height();

                            //  Reset the toggle visibility for each hidden parent
                            index = 0;
                            for( ; index < count; index++) {
                                currNode = hiddenParents[index];
                                currNode.obj.toggle();
                                currNode.obj.css('visibility', currNode.visibility);
                            }
                        }());
                    }
                }());


                //  If there is no puzzle board height, fail out.
                if (!puzzleBoardHeight) {
                    throw('nf-slide-puzzle-board div has no height. Please set a height in css.');
                }
                //  Else there is a puzzle board height, continue.
                else {
                    //
                    //  Init the game state tracking
                    //
                    (function () {
                        spNs.state = (function () {
                            var state = {};

                            //  Set the static vars and accessors
                            (function () {
                                var isShuffling = false;
                                var isPlaying = false;
                                var isPaused = false;
                                var isQuit = false;
                                var isInitting = true;

                                state.getIsShuffling = (function () {
                                    return isShuffling;
                                });
                                state.setIsShuffling = (function () {
                                    isShuffling = true;
                                    isPlaying = isPaused = isQuit = isInitting = false;
                                    state.setStatusBarText('Shuffling');
                                });
                                state.getIsPlaying = (function () {
                                    return isPlaying;
                                });
                                state.setIsPlaying = (function () {
                                    isPlaying = true;
                                    isShuffling = isPaused = isQuit = isInitting = false;
                                    state.setStatusBarText('Playing');
                                });
                                state.getIsPaused = (function () {
                                    return isPaused;
                                });
                                state.setIsPaused = (function () {
                                    isPaused = true;
                                    isShuffling = isPlaying = isQuit = isInitting = false;
                                    state.setStatusBarText('Paused');
                                });
                                state.getIsQuit = (function () {
                                    return isQuit;
                                });
                                state.setIsQuit = (function () {
                                    isQuit = true;
                                    isShuffling = isPlaying = isPaused = isInitting = false;
                                    state.setStatusBarText('Stopped');
                                });
                                state.getIsInitting = (function () {
                                    return isInitting;
                                });
                                state.setStatusBarText = (function (text) {
                                    var textDiv = spNs.jq('#nf-slide-puzzle-status-bar-text');
                                    if (textDiv) {
                                        textDiv.html(text);
                                    }
                                });

                                state.setStatusBarText('Initializing');
                            }());

                            return state;
                        }());
                    }());


                    //
                    //  Init the game options
                    //
                    (function () {
                        spNs.options = (function () {
                            var options = {};

                            //  Init the levels
                            options.levels = (function () {
                                var levels = {};

                                var levelPrototype = (function () {
                                    var getTilesPerSide = (function () {
                                        return this.tilesPerSide || 0;
                                    });
                                    var setTilesPerSide = (function (len) {
                                        this.tilesPerSide = len;
                                    });
                                    var getTilesPerBoard = (function () {
                                        return Math.pow(this.tilesPerSide, 2) - 1;
                                    });
                                    var getMaxTime = (function () {
                                        return Math.floor(Math.pow(this.tilesPerSide, 4) / 2);
                                    });
                                    var getMaxMoves = (function () {
                                        return Math.floor(Math.pow(this.tilesPerSide, 3.5));
                                    });
                                    var getShuffleMoves = (function () {
                                        return Math.pow(this.tilesPerSide, 4.5);
                                    });
                                    var level = {
                                        getTilesPerSide : (function () {
                                            return getTilesPerSide;
                                        }()),
                                        setTilesPerSide : (function () {
                                            return setTilesPerSide;
                                        }()),
                                        getTilesPerBoard : (function () {
                                            return getTilesPerBoard;
                                        }()),
                                        getMaxTime : (function () {
                                            return getMaxTime;
                                        }()),
                                        getMaxMoves : (function () {
                                            return getMaxMoves;
                                        }()),
                                        getShuffleMoves : (function () {
                                            return getShuffleMoves;
                                        }())
                                    }

                                    return level;
                                }());
                                var newLevel = (function () {
                                    var Level = (function () {});
                                    Level.prototype = levelPrototype;
                                    return new Level();
                                });

                                var constTilesPerSide = { small : 3, medium : 4, large : 5 };
                                var constLevel = undefined;
                                var currLevel = null;

                                for (constLevel in constTilesPerSide) {
                                    currLevel = newLevel();
                                    currLevel.setTilesPerSide(constTilesPerSide[constLevel]);
                                    levels[constLevel] = currLevel;
                                }
                                return levels;
                            }());

                            //  Init the current options
                            options.current = (function() {
                                var current = {};

                                //  Set the current static vars and accessors
                                (function () {
                                    var level = null;
                                    var useTimeLeft = false;
                                    var useMovesLeft = false;

                                    current.getLevel = (function () {
                                        return level;
                                    });

                                    current.setLevel = (function (key) {
                                        level = options.levels[key];
                                    });

                                    current.getUseTimeLeft = (function () {
                                        return useTimeLeft;
                                    });

                                    current.setUseTimeLeft = (function (flag) {
                                        useTimeLeft = flag;
                                    });

                                    current.getUseMovesLeft = (function () {
                                        return useMovesLeft;
                                    });

                                    current.setUseMovesLeft = (function (flag) {
                                        useMovesLeft = flag;
                                    });
                                }());

                                return current;

                            }());

                            return options;
                        }());
                    }());


                    //
                    //  Init the game counters
                    //
                    (function () {
                        spNs.counters = (function () {
                            var counters = {};

                            var counterPrototype = (function () {
                                var initCount = (function () {
                                    this.count = 0;
                                    return this;
                                });
                                var getCount = (function () {
                                    return this.count;
                                });
                                var decCount = (function (count) {
                                    this.count -= count;
                                    return this;
                                });
                                var counter = {
                                    initCount : (function () {
                                        return initCount;
                                    }()),
                                    getCount : (function () {
                                        return getCount;
                                    }()),
                                    decCount : (function () {
                                        return decCount;
                                    }())
                                };

                                return counter;
                            }());
                            var newCounter = (function () {
                                var Counter = (function () {});
                                Counter.prototype = counterPrototype;
                                return new Counter();
                            });

                            counters.timeLeft = (function () {
                                var counter = newCounter();

                                //  Set the static vars and accessors
                                (function () {
                                    var interval = undefined;
                                    var that = null;
                                    var msecs = 1000;
                                    var cronjob = (function () {
                                       //  Is still playing
                                       if (spNs.state.getIsPlaying()) {
                                           //  Decrease the time and display
                                           that.decCount(1)
                                               .display();

                                           //  If no more time
                                           if (!that.getCount()) {
                                               that.clearInterval();
                                               spNs.actions.puzzleUnsolved();
                                           }
                                       }
                                       //  Else clear the timeout
                                       else {
                                           that.clearInterval();
                                       }
                                    });

                                    counter.setInterval = (function () {
                                        that = this;

                                        if (interval) {
                                            counter.clearInterval();
                                        }
                                        interval = setInterval(cronjob, msecs);
                                    });
                                    counter.clearInterval = (function () {
                                        if (interval) {
                                            clearInterval(interval);
                                            interval = undefined;
                                        }
                                    });
                                }());

                                counter.initCount = (function () {
                                    this.count = spNs.options
                                                     .current
                                                     .getLevel()
                                                     .getMaxTime();
                                    return this;
                                });
                                counter.display = (function () {
                                    spNs.jq('#nf-slide-puzzle-option-counter-container-timer')
                                        .html(this.count);
                                    return this;
                                });
                                counter.start = (function () {
                                    this.setInterval();
                                    return this;
                                });
                                counter.stop = (function () {
                                    this.clearInterval();
                                    return this;
                                });

                                return counter;
                            }());

                            counters.movesLeft = (function () {
                                var counter = newCounter();

                                counter.initCount = (function () {
                                    this.count = spNs.options
                                                     .current
                                                     .getLevel()
                                                     .getMaxMoves();
                                    return this;
                                });
                                counter.display = (function () {
                                    spNs.jq('#nf-slide-puzzle-option-counter-container-moves')
                                        .html(this.count);
                                    return this;
                                });

                                return counter;
                            }());

                            return counters;
                        }());
                    }());


                    //
                    //  Init the game controls
                    //
                    (function () {
                        //  Init the play buttons
                        (function () {
                            var playButtonIn = (function (event) {
                                var button = spNs.jq(event.target);

                                if (!button.hasClass('disabled')) {
                                    button.addClass('hovered');
                                }
                            });
                            var playButtonOut = (function (event) {
                                var button = spNs.jq(event.target);

                                button.removeClass('hovered');
                            });
                            var html, playButtons;

                            //  Add the control div
                            html = [
                                '<div id=\'nf-slide-puzzle-control-play-container\' ',
                                     'class=\'nf-slide-puzzle-control-container\'>',
                                  '<div class=\'nf-slide-puzzle-control-label\'>Play</div>',
                                  '<div class=\'nf-slide-puzzle-control-button-set\'>',
                                    '<div id=\'nf-slide-puzzle-control-play-play\' ',
                                          'class=\'nf-slide-puzzle-control-button ',
                                                  'nf-slide-puzzle-control-play\'>Play</div>',
                                    '<div id=\'nf-slide-puzzle-control-play-pause\' ',
                                          'class=\'nf-slide-puzzle-control-button ',
                                                  'nf-slide-puzzle-control-play\'>Pause</div>',
                                    '<div id=\'nf-slide-puzzle-control-play-quit\' ',
                                         'class=\'nf-slide-puzzle-control-button ',
                                                 'nf-slide-puzzle-control-play\'>Quit</div>',
                                  '</div>',
                                '</div>'
                            ];
                            puzzleControls.append(html.join(''));

                            playButtons = spNs.jq('#nf-slide-puzzle-control-play-container');
                            playButtons.on('mouseover',
                                           '.nf-slide-puzzle-control-play',
                                           playButtonIn);
                            playButtons.on('mouseout',
                                           '.nf-slide-puzzle-control-play',
                                           playButtonOut);
                        }());
                        //  Init the level options
                        (function () {
                            var html, levelsContainer, levelOption, level, levelName;
                            var levelIn = (function(event) {
                                var newLevel, newLevelId, levelParent, currLevelId;

                                //  Only process event if puzzle quit
                                if (spNs.state.getIsQuit()) {
                                    newLevel = spNs.jq(event.target);
                                    newLevelId = newLevel.attr('id');
                                    levelParent = spNs.jq('#nf-slide-puzzle-option-level-container');
                                    currLevelId = levelParent.attr('data-curr-level');

                                    //  Do not process event for already selected item
                                    if (currLevelId !== newLevelId) {
                                        newLevel.addClass('hovered');
                                    }
                                }
                            });
                            var levelOut = (function(event) {
                                //  Only process event if puzzle quit
                                if (spNs.state.getIsQuit()) {
                                    spNs.jq('.nf-slide-puzzle-option-level')
                                          .removeClass('hovered');
                                }
                            });
                            var levelClicked = (function(event) {
                                var levelButton, newLevelId, levelParent,
                                    currLevelId, levelName, levelButtons;

                                //  Only process event if puzzle quit
                                if (spNs.state.getIsQuit() || spNs.state.getIsInitting()) {
                                    levelButton = spNs.jq(event.target);
                                    newLevelId = levelButton.attr('id');
                                    levelParent = spNs.jq('#nf-slide-puzzle-option-level-container');
                                    currLevelId = levelParent.attr('data-curr-level');

                                    //  Do not process event for already selected item
                                    if (currLevelId !== newLevelId) {
                                        //  Set the new level
                                        levelName = levelButton.attr('data-level');
                                        spNs.options.current.setLevel(levelName);

                                        //  Reset the selected button
                                        levelButtons = spNs.jq('.nf-slide-puzzle-option-level');
                                        levelButtons.removeClass('selected');
                                        levelButton.addClass('selected')
                                                   .removeClass('hovered');
                                        levelParent.attr('data-curr-level', newLevelId);

                                        //  Set the counters
                                        spNs.counters.timeLeft.initCount().display();
                                        spNs.counters.movesLeft.initCount().display();

                                        //  Reset the board
                                    spNs.board.reset();
                                    }
                                }
                            });

                            //  Add the option div
                            html = [
                                '<div id=\'nf-slide-puzzle-option-level-container\' ',
                                     'class=\'nf-slide-puzzle-control-container ',
                                             'nf-slide-puzzle-option-container\' ',
                                     'data-curr-level=\'\'>',
                                  '<div class=\'nf-slide-puzzle-control-label\'>Level</div>',
                                  '<div class=\'nf-slide-puzzle-control-button-set\'>',
                                  '</div>',
                                '</div>'
                            ];
                            puzzleControls.append(html.join(''));
                            levelsContainer = spNs.jq('#nf-slide-puzzle-option-level-container');
                            levelOption = levelsContainer
                                              .children('.nf-slide-puzzle-control-button-set')
                                              .eq(0);

                            //  Populate the control div
                            for (levelName in spNs.options.levels) {
                                html = [
                                    '<div id=\'nf-slide-puzzle-option-level-',
                                              levelName,
                                              '\' ',
                                         'class=\'nf-slide-puzzle-control-button ',
                                                 'nf-slide-puzzle-option-level\' ',
                                         'data-level=\'',
                                              levelName,
                                                    '\'>',
                                       levelName.charAt(0).toUpperCase() + levelName.slice(1),
                                    '</div>'
                                ];
                                levelOption.append(html.join(''));
                            }

                            //  Init the event handlers
                            levelOption.on('mouseover',
                                           '.nf-slide-puzzle-option-level',
                                           levelIn);
                            levelOption.on('mouseout',
                                           '.nf-slide-puzzle-option-level',
                                           levelOut);
                            levelOption.on('click',
                                           '.nf-slide-puzzle-option-level',
                                           levelClicked);
                        }());
                        //  Init the counter options
                        (function () {
                            var counterIn = (function (event) {
                                var label;

                                if (spNs.state.getIsQuit()) {
                                    label = spNs.jq(event.target)
                                                .children('.nf-slide-puzzle-option-counter-label')
                                                .eq(0);

                                    label.addClass('hovered');
                                }
                            });
                            var counterOut = (function (event) {
                                var label = spNs.jq(event.target)
                                                .children('.nf-slide-puzzle-option-counter-label')
                                                .eq(0);

                                label.removeClass('hovered');
                            });
                            //  Add the counter options div
                            var html = [
                                '<div id=\'nf-slide-puzzle-option-counters-container\' ',
                                     'class=\'nf-slide-puzzle-control-container ',
                                             'nf-slide-puzzle-option-container\'>',
                                  '<div class=\'nf-slide-puzzle-control-label\'>Count</div>',
                                  '<div class=\'nf-slide-puzzle-option-counter-set\'>',
                                  '</div>',
                                '</div>'
                            ];
                            var countersDiv, setDiv;

                            puzzleControls.append(html.join(''));
                            countersDiv = spNs.jq('#nf-slide-puzzle-option-counters-container');
                            setDiv = countersDiv.children('.nf-slide-puzzle-option-counter-set')
                                                .eq(0);

                            countersDiv.on('mouseenter',
                                      '.nf-slide-puzzle-option-counter-container',
                                      counterIn);
                            countersDiv.on('mouseleave',
                                      '.nf-slide-puzzle-option-counter-container',
                                      counterOut);

                            //  Add the time counter option div
                            (function () {
                                var timerClicked = (function(event) {
                                    var lastUse, currUse, counter, label;

                                    //  Only process if puzzle quit
                                    if (spNs.state.getIsQuit()) {
                                        lastUse = spNs.options.current.getUseTimeLeft();
                                        currUse = !lastUse;
                                        spNs.options.current.setUseTimeLeft(currUse);

                                        counter =
                                           spNs.jq('#nf-slide-puzzle-option-counter-container-timer');
                                        label = counter
                                                 .parent()
                                                 .children('.nf-slide-puzzle-option-counter-label')
                                                 .eq(0);

                                        if (currUse) {
                                            spNs.counters.timeLeft.display();
                                            counter.addClass('selected');
                                            label.addClass('selected');
                                        }
                                        else {
                                            counter.removeClass('selected')
                                            label.removeClass('selected');
                                        }
                                    }
                                });
                                var html = [
                                    '<div id=\'nf-slide-puzzle-option-time-counter-container\' ',
                                         'class=\'nf-slide-puzzle-option-counter-container\'>',
                                      '<div class=\'nf-slide-puzzle-option-counter-label\'>',
                                        'Timer',
                                      '</div>',
                                      '<div id=\'nf-slide-puzzle-option-counter-container-timer\' ',
                                           'class=\'nf-slide-puzzle-option-counter-value\'>',
                                      '</div>',
                                    '</div>'
                                ];

                                setDiv.append(html.join(''));
                                spNs.jq('#nf-slide-puzzle-option-time-counter-container')
                                    .on('click', timerClicked);
                            }());
                            //  Add the move counter option div
                            (function () {
                                var movesClicked = (function(event) {
                                    var lastUse, currUse, counter, label;

                                    //  Only process if puzzle quit
                                    if (spNs.state.getIsQuit()) {
                                        lastUse = spNs.options.current.getUseMovesLeft();
                                        currUse = !lastUse;
                                        spNs.options.current.setUseMovesLeft(currUse);

                                        counter =
                                          spNs.jq('#nf-slide-puzzle-option-counter-container-moves');
                                        label = counter
                                                 .parent()
                                                 .children('.nf-slide-puzzle-option-counter-label')
                                                 .eq(0);

                                        if (currUse) {
                                            spNs.counters.movesLeft.display();
                                            counter.addClass('selected');
                                            label.addClass('selected');
                                        }
                                        else {
                                            counter.removeClass('selected')
                                            label.removeClass('selected');
                                        }
                                    }
                                });
                                var html = [
                                    '<div id=\'nf-slide-puzzle-option-move-counter-container\' ',
                                         'class=\'nf-slide-puzzle-option-counter-container\'>',
                                      '<div class=\'nf-slide-puzzle-option-counter-label\'>',
                                        'Moves',
                                      '</div>',
                                      '<div id=\'nf-slide-puzzle-option-counter-container-moves\' ',
                                           'class=\'nf-slide-puzzle-option-counter-value\'>',
                                      '</div>',
                                    '</div>'
                                ];

                                setDiv.append(html.join(''));
                                spNs.jq('#nf-slide-puzzle-option-move-counter-container')
                                    .on('click', movesClicked);
                            }());
                        }());
                        //  Init the status bar
                        (function () {
                            //  Add the status bar div
                            var html = [
                                '<div id=\'nf-slide-puzzle-status-bar-container\' ',
                                     'class=\'nf-slide-puzzle-control-container\'>',
                                  '<div class=\'nf-slide-puzzle-control-label\'>Status</div>',
                                  '<div id=\'nf-slide-puzzle-status-bar-text\'></div>',
                                '</div>'
                            ];
                            puzzleControls.append(html.join(''));
                        }());
                    }());


                    //
                    //  Init the game board
                    //
                    (function () {
                        spNs.board = (function () {
                            var board = {};

                            //  Define the tiles
                            board.tiles = (function () {
                                var tiles = {};
                                var _tiles = [];
                                var _byXY;
                                var getTileById = (function (tileId) {
                                    var tile = null;
                                    var index = parseInt(tileId.split('_').pop());

                                    if (index) {
                                        //  Get the position of the click tile object
                                        index--;
                                        if (index >= 0) {
                                            tile = _tiles[index];
                                        }
                                    }

                                    return tile;
                                });
                                var getFinalTile = (function () {
                                    var index = _tiles.length - 1;

                                    if (index >= 0) {
                                        tile = _tiles[index];
                                    }

                                    return tile;
                                });
                                var swapTiles = (function (tileId, tileInfo, finalInfo,
                                                           tile, finalTile, shuffleFunc) {
                                    var x, y, index;

                                    //  Adjust bookkeeping
                                    x = tile.getCurrX();
                                    y = tile.getCurrY();
                                    index = tile.getIndex();
                                    _byXY[x][y] = index;

                                    x = finalTile.getCurrX();
                                    y = finalTile.getCurrY();
                                    index = finalTile.getIndex();
                                    _byXY[x][y] = index;

                                    //  Move the final tile
                                    spNs.jq('#nf-slide-puzzle-tile-final').animate(finalInfo, 0);
                                    //  Move the clicked tile by animation
                                    if (shuffleFunc) {
                                        spNs.jq('#' + tileId).animate(tileInfo, 1,
                                                                     shuffleFunc);
                                    }
                                    else {
                                        spNs.jq('#' + tileId).animate(tileInfo, 50);
                                    }
                                });

                                tiles.resetTo = (function (total, perSide, width) {
                                    var tilePrototype = (function () {
                                        var getIndex = (function () {
                                            return this.index;
                                        });
                                        var setIndex = (function (val) {
                                            this.index = val;
                                            return this;
                                        });
                                        var isHome = (function () {
                                            return (this.currX === this.homeX) &&
                                                   (this.currY === this.homeY);
                                        });
                                        var getHomeX = (function () {
                                            return this.homeX;
                                        });
                                        var setHomeX = (function (x) {
                                            this.homeX = x;
                                            this.currX = x;
                                            return this;
                                        });
                                        var getHomeY = (function () {
                                            return this.homeY;
                                        });
                                        var setHomeY = (function (y) {
                                            this.homeY = y;
                                            this.currY = y;
                                            return this;
                                        });
                                        var getCurrX = (function () {
                                            return this.currX;
                                        });
                                        var incCurrX = (function () {
                                            if (this.isHome()) {
                                                tiles.incNumMisplaced();
                                            }
                                            this.currX++;
                                            if (this.isHome()) {
                                                tiles.decNumMisplaced();
                                            }
                                            return this;
                                        });
                                        var decCurrX = (function () {
                                            if (this.isHome()) {
                                                tiles.incNumMisplaced();
                                            }
                                            this.currX--;
                                            if (this.isHome()) {
                                                tiles.decNumMisplaced();
                                            }
                                            return this;
                                        });
                                        var getCurrY = (function () {
                                            return this.currY;
                                        });
                                        var incCurrY = (function () {
                                            if (this.isHome()) {
                                                tiles.incNumMisplaced();
                                            }
                                            this.currY++;
                                            if (this.isHome()) {
                                                tiles.decNumMisplaced();
                                            }
                                            return this;
                                        });
                                        var decCurrY = (function () {
                                            if (this.isHome()) {
                                                tiles.incNumMisplaced();
                                            }
                                            this.currY--;
                                            if (this.isHome()) {
                                                tiles.decNumMisplaced();
                                            }
                                            return this;
                                        });
                                        var tile = {
                                            getIndex : (function () {
                                                return getIndex;
                                            }()),
                                            setIndex : (function () {
                                                return setIndex;
                                            }()),
                                            isHome : (function () {
                                                return isHome;
                                            }()),
                                            getHomeX : (function () {
                                                return getHomeX;
                                            }()),
                                            setHomeX : (function () {
                                                return setHomeX;
                                            }()),
                                            getHomeY : (function () {
                                                return getHomeY;
                                            }()),
                                            setHomeY : (function () {
                                                return setHomeY;
                                            }()),
                                            getCurrX : (function () {
                                                return getCurrX;
                                            }()),
                                            incCurrX : (function () {
                                                return incCurrX;
                                            }()),
                                            decCurrX : (function () {
                                                return decCurrX;
                                            }()),
                                            getCurrY : (function () {
                                                return getCurrY;
                                            }()),
                                            incCurrY : (function () {
                                                return incCurrY;
                                            }()),
                                            decCurrY : (function () {
                                                return decCurrY;
                                            }())
                                        }

                                        return tile;
                                    }());
                                    var newTile = (function () {
                                        var Tile = (function () {});
                                        Tile.prototype = tilePrototype;
                                        return new Tile();
                                    });
                                    var resetTile = (function (tileId, index, perSide,
                                                               adjWidth, width, padding) {
                                        var x, y, posInfo, tile, yPos;

                                        //  Determine the x and y
                                        x = index % perSide;
                                        y = Math.floor(index / perSide);
                                        posInfo = {
                                            left: '+' + ((x * width) + padding),
                                            top: '+' + ((y * width) + padding)
                                        }

                                        //  Initialize the tile position
                                        tile = _tiles[index];
                                        tile.setHomeX(x)
                                            .setHomeY(y)
                                            .setIndex(index);

                                        //  Create and position the tile div
                                        tileDiv = spNs.jq(tileId);
                                        tileDiv.height(adjWidth)
                                               .width(adjWidth)
                                               .animate(posInfo, 0)
                                               //  Text v-align middle within div hack
                                               .css('line-height', adjWidth + 'px');

                                        //  Register the index by position
                                        if (!y) {
                                            _byXY.push([]);
                                        }
                                        _byXY[x][y] = index;
                                    });
                                    var boardDiv = spNs.jq('#nf-slide-puzzle-board');
                                    var tileHtml, tileDiv, adjWidth, padding, index, tileId;

                                    //  Cache the tile width
                                    tiles.setTileWidth(width);

                                    //  Remove the final tile and div
                                    _tiles.pop();
                                    boardDiv.children('#nf-slide-puzzle-tile-final')
                                            .eq(0)
                                            .remove();

                                    //  If an adjustement is needed
                                    if (total != _tiles.length) {
                                        //  If tiles need to be removed
                                        if (total < _tiles.length) {
                                            while (total < _tiles.length) {
                                                _tiles.pop();
                                                boardDiv.children('.nf-slide-puzzle-tile')
                                                        .last()
                                                        .remove();
                                            }
                                        }
                                        //  Else tiles need to be added
                                        else {
                                            while (total > _tiles.length) {
                                                _tiles.push(newTile());
                                                tileHtml = [
                                                    '<div id=\'nf-slide-puzzle-tile_',
                                                                _tiles.length,
                                                            '\' ',
                                                         'class=\'nf-slide-puzzle-tile\' >',
                                                       _tiles.length,
                                                    '</div>'
                                                ];
                                                boardDiv.append(tileHtml.join(''));
                                            }
                                        }
                                    }

                                    //  Read the final tile and div
                                    _tiles.push(newTile());
                                    tileHtml = [
                                        '<div id=\'nf-slide-puzzle-tile-final\' ',
                                             'class=\'nf-slide-puzzle-tile\' >',
                                        '</div>'
                                    ];
                                    boardDiv.append(tileHtml.join(''));

                                    //  Adjust the width
                                    tileDiv = spNs.jq('.nf-slide-puzzle-tile').first();
                                    adjWidth = width;
                                    adjWidth -= parseInt(tileDiv.css('marginTop')) * 2;
                                    adjWidth -= parseInt(tileDiv.css('borderTopWidth')) * 2;

                                    //  Cache the padding
                                    padding = parseInt(boardDiv.css('paddingTop'));

                                    //  Set the values to the tiles and add the divs
                                    index = 0;
                                    _byXY = [];
                                    for ( ; index < total; index++) {
                                        tileId = '#nf-slide-puzzle-tile_' + (index + 1);
                                        resetTile(tileId, index, perSide,
                                                  adjWidth, width, padding);
                                    }

                                    //  Adjust the final div
                                    resetTile('#nf-slide-puzzle-tile-final', index,
                                              perSide, adjWidth, width, padding);

                                    //  Reset the number misplaced
                                    tiles.resetNumMisplaced();
                                });
                                tiles.moveClickedTile = (function (tileId) {
                                    var canSwap, tileInfo, finalInfo, tileWidth, tileWidthInc,
                                        tile, tileX, tileY, finalTile, finalTileX, finalTileY;

                                    canSwap = false;
                                    tileInfo = finalInfo = {};
                                    tileWidth = spNs.board.tiles.getTileWidth();
                                    tileWidthInc = '=' + tileWidth + 'px';

                                    //  Get the position of the clicked tile
                                    tile = getTileById(tileId);
                                    if (tile) {
                                        tileX = tile.getCurrX();
                                        tileY = tile.getCurrY();

                                        //  Get the position of the final tile
                                        finalTile = getFinalTile();
                                        if (finalTile) {
                                            finalTileX = finalTile.getCurrX();
                                            finalTileY = finalTile.getCurrY();

                                            //  If can tile move along the y
                                            if (tileX === finalTileX) {
                                                //  If can move tile up
                                                if ((tileY - 1) === finalTileY) {
                                                    canSwap = true;
                                                    tileInfo = {top: '-' + tileWidthInc}; 
                                                    finalInfo = {top: '+' + tileWidthInc}; 
                                                    tile.decCurrY();
                                                    finalTile.incCurrY();
                                                }
                                                //  Else if can move tile down
                                                else if ((tileY + 1) === finalTileY) {
                                                    canSwap = true;
                                                    tileInfo = {top: '+' + tileWidthInc}; 
                                                    finalInfo = {top: '-' + tileWidthInc}; 
                                                    tile.incCurrY();
                                                    finalTile.decCurrY();
                                                }
                                            }
                                            //  Else if can tile move along the x
                                            else if (tileY === finalTileY) {
                                                //  If can move tile left
                                                if ((tileX - 1) === finalTileX) {
                                                    canSwap = true;
                                                    tileInfo = {left: '-' + tileWidthInc}; 
                                                    finalInfo = {left: '+' + tileWidthInc}; 
                                                    tile.decCurrX();
                                                    finalTile.incCurrX();
                                                }
                                                //  Else if can move tile right
                                                else if ((tileX + 1) === finalTileX) {
                                                    canSwap = true;
                                                    tileInfo = {left: '+' + tileWidthInc}; 
                                                    finalInfo = {left: '-' + tileWidthInc}; 
                                                    tile.incCurrX();
                                                    finalTile.decCurrX();
                                                }
                                            }
                                        }
                                    }

                                    //  If can swap
                                    if (canSwap) {
                                        swapTiles(tileId, tileInfo,
                                                  finalInfo, tile, finalTile);
                                    }

                                    return canSwap;
                                });
                                tiles.moveTileLeft = (function (shuffleFunc) {
                                    var canSwap, finalTile, finalTileX, finalTileY, currLevel,
                                        tilesPerSide, tileIndex, tileId, tile, tileWidth,
                                        tileWidthInc, tileInfo, finalInfo;

                                    canSwap = false;

                                    //  Get the position of the final tile
                                    finalTile = getFinalTile();
                                    if (finalTile) {
                                        finalTileX = finalTile.getCurrX();
                                        finalTileY = finalTile.getCurrY();

                                        //  If not out of bounds
                                        currLevel = spNs.options.current.getLevel();
                                        tilesPerSide = currLevel.getTilesPerSide();
                                        if ((finalTileX + 1) < tilesPerSide) {
                                            //  Get the tile by index
                                            tileIndex = _byXY[(finalTileX + 1)][finalTileY];
                                            tileId = 'nf-slide-puzzle-tile_' + (tileIndex + 1);
                                            tile = getTileById(tileId);
                                            if (tile) {
                                                canSwap = true;
                                                tileWidth = spNs.board.tiles.getTileWidth();
                                                tileWidthInc = '=' + tileWidth + 'px';
                                                tileInfo = {left: '-' + tileWidthInc};
                                                finalInfo = {left: '+' + tileWidthInc}; 
                                                tile.decCurrX();
                                                finalTile.incCurrX();
                                                swapTiles(tileId, tileInfo, finalInfo,
                                                          tile, finalTile, shuffleFunc);
                                            }
                                        }
                                    }

                                    return canSwap;
                                });
                                tiles.moveTileRight = (function (shuffleFunc) {
                                    var canSwap, finalTile, finalTileX, finalTileY, tileIndex,
                                        tileId, tile, tileWidth, tileWidthInc, tileInfo,
                                        finalInfo;

                                    canSwap = false;

                                    //  Get the position of the final tile
                                    finalTile = getFinalTile();
                                    if (finalTile) {
                                        finalTileX = finalTile.getCurrX();
                                        finalTileY = finalTile.getCurrY();

                                        //  If not out of bounds
                                        if ((finalTileX - 1) >= 0) {
                                            //  Get the tile by index
                                            tileIndex = _byXY[(finalTileX - 1)][finalTileY];
                                            tileId = 'nf-slide-puzzle-tile_' + (tileIndex + 1);
                                            tile = getTileById(tileId);
                                            if (tile) {
                                                canSwap = true;
                                                tileWidth = spNs.board.tiles.getTileWidth();
                                                tileWidthInc = '=' + tileWidth + 'px';
                                                tileInfo = {left: '+' + tileWidthInc};
                                                finalInfo = {left: '-' + tileWidthInc}; 
                                                tile.incCurrX();
                                                finalTile.decCurrX();
                                                swapTiles(tileId, tileInfo, finalInfo,
                                                          tile, finalTile, shuffleFunc);
                                            }
                                        }
                                    }

                                    return canSwap;
                                });
                                tiles.moveTileUp = (function (shuffleFunc) {
                                    var canSwap, finalTile, finalTileX, finalTileY, currLevel,
                                        tilesPerSide, tileIndex, tileId, tile, tileWidth,
                                        tileWidthInc, tileInfo, finalInfo;

                                    canSwap = false;

                                    //  Get the position of the final tile
                                    finalTile = getFinalTile();
                                    if (finalTile) {
                                        finalTileX = finalTile.getCurrX();
                                        finalTileY = finalTile.getCurrY();

                                        //  If not out of bounds
                                        currLevel = spNs.options.current.getLevel();
                                        tilesPerSide = currLevel.getTilesPerSide();
                                        if ((finalTileY + 1) < tilesPerSide) {
                                            //  Get the tile by index
                                            tileIndex = _byXY[finalTileX][(finalTileY + 1)];
                                            tileId = 'nf-slide-puzzle-tile_' + (tileIndex + 1);
                                            tile = getTileById(tileId);
                                            if (tile) {
                                                canSwap = true;
                                                tileWidth = spNs.board.tiles.getTileWidth();
                                                tileWidthInc = '=' + tileWidth + 'px';
                                                tileInfo = {top: '-' + tileWidthInc};
                                                finalInfo = {top: '+' + tileWidthInc}; 
                                                tile.decCurrY();
                                                finalTile.incCurrY();
                                                swapTiles(tileId, tileInfo, finalInfo,
                                                          tile, finalTile, shuffleFunc);
                                            }
                                        }
                                    }

                                    return canSwap;
                                });
                                tiles.moveTileDown = (function (shuffleFunc) {
                                    var canSwap, finalTile, finalTileX, finalTileY, tileIndex,
                                        tileId, tile, tileWidth, tileWidthInc, tileInfo,
                                        finalInfo;

                                    canSwap = false;

                                    //  Get the position of the final tile
                                    finalTile = getFinalTile();
                                    if (finalTile) {
                                        finalTileX = finalTile.getCurrX();
                                        finalTileY = finalTile.getCurrY();

                                        //  If not out of bounds
                                        if ((finalTileY - 1) >= 0) {
                                            //  Get the tile by index
                                            tileIndex = _byXY[finalTileX][(finalTileY - 1)];
                                            tileId = 'nf-slide-puzzle-tile_' + (tileIndex + 1);
                                            tile = getTileById(tileId);
                                            if (tile) {
                                                canSwap = true;
                                                tileWidth = spNs.board.tiles.getTileWidth();
                                                tileWidthInc = '=' + tileWidth + 'px';
                                                tileInfo = {top: '+' + tileWidthInc};
                                                finalInfo = {top: '-' + tileWidthInc}; 
                                                tile.incCurrY();
                                                finalTile.decCurrY();
                                                swapTiles(tileId, tileInfo, finalInfo,
                                                          tile, finalTile, shuffleFunc);
                                            }
                                        }
                                    }

                                    return canSwap;
                                });
                                //  Set tiles static vars and accessors
                                (function () {
                                    var numMisplaced = 0;
                                    var tileWidth = 0;

                                    tiles.resetNumMisplaced = (function () {
                                        numMisplaced = 0;
                                    });

                                    tiles.getNumMisplaced = (function () {
                                        return numMisplaced;
                                    });

                                    tiles.incNumMisplaced = (function () {
                                        numMisplaced++;
                                    });

                                    tiles.decNumMisplaced = (function () {
                                        numMisplaced--;
                                    });

                                    tiles.getTileWidth = (function() {
                                        return tileWidth;
                                    });

                                    tiles.setTileWidth = (function(width) {
                                        tileWidth = width;
                                    });
                                }());

                                return tiles;
                            }());

                            //  Reset the board
                            board.reset = (function () {
                                var currLevel = spNs.options.current.getLevel();
                                var maxBoardSide = board.getMaxBoardSide();
                                var tilesPerSide, tileWidth, boardSide, tileNum, numTiles;

                                //  Resize board and controls container for number of tiles
                                tilesPerSide = currLevel.getTilesPerSide();
                                tileWidth = Math.floor(maxBoardSide / tilesPerSide);
                                boardSide = tileWidth * tilesPerSide;
                                spNs.jq('#nf-slide-puzzle-board').height(boardSide)
                                                             .width(boardSide);
                                //  Only resize the control container if initializing
                                if (spNs.state.getIsInitting()) {
                                    spNs.jq('#nf-slide-puzzle-controls').height(boardSide);
                                }

                                //  Reset the tile array
                                board.tiles.resetTo(currLevel.getTilesPerBoard(),
                                                              tilesPerSide,
                                                              tileWidth);

                                //  Remove any last solved style
                                spNs.jq('#nf-slide-puzzle-board')
                                    .removeClass('solved')
                                    .removeClass('unsolved');
                                spNs.jq('.nf-slide-puzzle-tile')
                                    .removeClass('solved')
                                    .removeClass('unsolved');
                                spNs.jq('#nf-slide-puzzle-status-bar-text')
                                    .removeClass('solved')
                                    .removeClass('unsolved');
                                spNs.state.setStatusBarText('Stopped');
                            });

                            //  Set the board static vars and accessors
                            (function () {
                                var maxBoardSide = puzzleBoardHeight

                                board.getMaxBoardSide = (function () {
                                    return maxBoardSide;
                                });
                            }());

                            //  Init the event handlers
                            (function () {
                                var boardClicked = (function (event) {
                                    var tileId;

                                    //  Only process the click if playing
                                    if (spNs.state.getIsPlaying()) {
                                        tileId = spNs.jq(event.target).attr('id');
                                        spNs.actions.moveClickedTile(tileId);
                                    }
                                });

                                spNs.jq('#nf-slide-puzzle-board')
                                    .on('click', '.nf-slide-puzzle-tile', boardClicked);
                            }());

                            return board;
                        }());
                    }());


                    //
                    //  Init the game actions
                    //
                    (function () {
                        spNs.actions = (function () {
                            var actions = {};

                            //  Shuffle
                            actions.shuffle = (function () {
                                var shuffleMoves =
                                            spNs.options.current.getLevel().getShuffleMoves();
                                var moveActions = [
                                        actions.moveTileLeft,
                                        actions.moveTileRight,
                                        actions.moveTileUp,
                                        actions.moveTileDown,
                                    ];
                                var numMoveActions = moveActions.length;
                                var doShuffle = (function () {
                                    var numMoves = actions.getShuffleMoves();
                                    var moveAction, didMove;

                                    //  If board is back to start state, reset counter
                                    if (!spNs.board.tiles.getNumMisplaced()) {
                                        actions.resetShuffleMoves();
                                    }
                                    //  Else increment the counter for another pass through
                                    else {
                                        actions.incShuffleMoves();
                                    }

                                    if (numMoves < shuffleMoves) {
                                        //  Ensure that quit wasn't clicked while shuffling
                                        if (!spNs.state.getIsQuit()) {
                                            //  Randomize the move action
                                            moveAction = moveActions[Math.floor(
                                                            (Math.random() * numMoveActions))];
                                            didMove = moveAction(doShuffle);
                                            //  One of the recurses could not move, try again
                                            if (!didMove) {
                                                actions.decShuffleMoves();
                                                doShuffle();
                                            }
                                        }
                                    }
                                    else {
                                        //  Set the tiles for done shuffling
                                        spNs.jq('.nf-slide-puzzle-tile')
                                             .removeClass('shuffling');

                                        //  Recall the play action
                                        actions.play();
                                    }
                                });

                                if (spNs.state.getIsQuit()) {
                                    //  Set the state
                                    spNs.state.setIsShuffling();

                                    //  Set the buttons for selection
                                    spNs.jq('#nf-slide-puzzle-control-play-pause')
                                        .addClass('disabled');
                                    spNs.jq('#nf-slide-puzzle-control-play-quit')
                                        .removeClass('disabled');

                                    //  Disable the timer counter if not selected
                                    if (!spNs.options.current.getUseTimeLeft()) {
                                        spNs.jq('#nf-slide-puzzle-option-time-counter-container')
                                            .addClass('disabled');
                                    }
                                    //  Else initialize the value
                                    else {
                                        spNs.counters.timeLeft.initCount().display();
                                    }
                                    //  Disable the moves counter if not selected
                                    if (!spNs.options.current.getUseMovesLeft()) {
                                        spNs.jq('#nf-slide-puzzle-option-move-counter-container')
                                            .addClass('disabled');
                                    }
                                    //  Else initialize the value
                                    else {
                                        spNs.counters.movesLeft.initCount().display();
                                    }

                                    //  Remove the final tile
                                    spNs.jq('#nf-slide-puzzle-tile-final')
                                        .addClass('hidden');

                                    //  Set the board for shuffling
                                    spNs.jq('#nf-slide-puzzle-board')
                                        .removeClass('solved')
                                        .removeClass('unsolved');
                                    spNs.jq('.nf-slide-puzzle-tile')
                                        .addClass('shuffling')
                                        .removeClass('solved')
                                        .removeClass('unsolved');
                                    spNs.jq('#nf-slide-puzzle-status-bar-text')
                                        .removeClass('solved')
                                        .removeClass('unsolved');

                                    //  Start shuffling
                                    actions.resetShuffleMoves();
                                    doShuffle();
                                }
                            });

                            //  Play
                            actions.play = (function (event) {
                                //  Don't repeat action
                                if (!spNs.state.getIsPlaying()) {
                                    //  Disable the options
                                    spNs.jq('.nf-slide-puzzle-option-level')
                                        .addClass('disabled');

                                    //  Set the buttons for selection
                                    spNs.jq('#nf-slide-puzzle-control-play-play')
                                        .addClass('disabled');

                                    //  Shuffle only if currently quit
                                    if (spNs.state.getIsQuit()) {
                                        return actions.shuffle();
                                    }
                                    //  Check that quit wasn't clicked during shuffle
                                    if (!spNs.state.getIsQuit()) {
                                        //  Set the state
                                        spNs.state.setIsPlaying();

                                        //  Set the buttons for selection
                                        spNs.jq('#nf-slide-puzzle-control-play-pause')
                                            .removeClass('disabled');
                                        spNs.jq('#nf-slide-puzzle-control-play-quit')
                                            .removeClass('disabled');

                                        //  Remove the final tile
                                        spNs.jq('#nf-slide-puzzle-tile-final')
                                            .addClass('hidden');

                                        //  If using the timer, start it
                                        if (spNs.options.current.getUseTimeLeft()) {
                                            spNs.counters.timeLeft.start();
                                        }
                                    }
                                }
                            });

                            //  Pause
                            actions.pause = (function (event) {
                                //  Only pause if playing
                                if (spNs.state.getIsPlaying()) {
                                    //  Set the state
                                    spNs.state.setIsPaused();

                                    //  If using the timer, stop it
                                    if (spNs.options.current.getUseTimeLeft()) {
                                        spNs.counters.timeLeft.stop();
                                    }

                                    //  Set the buttons for selection
                                    spNs.jq('#nf-slide-puzzle-control-play-play')
                                        .removeClass('disabled');
                                    spNs.jq('#nf-slide-puzzle-control-play-pause')
                                        .addClass('disabled');
                                    spNs.jq('#nf-slide-puzzle-control-play-quit')
                                        .removeClass('disabled');

                                    //  Insert the final tile
                                    spNs.jq('#nf-slide-puzzle-tile-final')
                                        .removeClass('hidden');
                                }
                            });

                            //  Quit
                            actions.quit = (function (event, gameTriggered) {
                                //  Don't repeat action
                                if (!spNs.state.getIsQuit()) {
                                    //  Set the state
                                    spNs.state.setIsQuit();

                                    //  If using the timer
                                    if (spNs.options.current.getUseTimeLeft()) {
                                        //  Stop it
                                        spNs.counters.timeLeft.stop();
                                    }
                                    //  Else enable the div
                                    else {
                                        spNs.jq('#nf-slide-puzzle-option-time-counter-container')
                                            .removeClass('disabled');
                                    }

                                    //  Set the buttons for selection
                                    spNs.jq('#nf-slide-puzzle-control-play-play')
                                        .removeClass('disabled');
                                    spNs.jq('#nf-slide-puzzle-control-play-pause')
                                        .addClass('disabled');
                                    spNs.jq('#nf-slide-puzzle-control-play-quit')
                                        .addClass('disabled');

                                    //  Enable the moves counter if not selected
                                    if (!spNs.options.current.getUseMovesLeft()) {
                                        spNs.jq('#nf-slide-puzzle-option-move-counter-container')
                                            .removeClass('disabled');
                                    }

                                    //  If not gameTriggered, Reset the board
                                    if (!gameTriggered) {
                                        spNs.board.reset();
                                    }

                                    //  Insert the final tile
                                    spNs.jq('#nf-slide-puzzle-tile-final')
                                        .removeClass('hidden');

                                    //  Enable options
                                    spNs.jq('.nf-slide-puzzle-option-level')
                                        .removeClass('disabled');

                                    //  Set the tiles for done shuffling
                                    spNs.jq('.nf-slide-puzzle-tile')
                                         .removeClass('shuffling');
                                }
                            });

                            //  Move clicked tile
                            actions.moveClickedTile = (function (tileId) {
                                var didMove = false;
                                var usingMoves;

                                //  Only if playing
                                if (spNs.state.getIsPlaying()) {
                                    didMove = spNs.board.tiles.moveClickedTile(tileId);

                                    //  If the tile could move
                                    if (didMove) {
                                        usingMoves = spNs.options.current.getUseMovesLeft();

                                        //  If using the move count
                                        if (usingMoves) {
                                            //  Decrement and display the move count
                                            spNs.counters.movesLeft.decCount(1).display();
                                        }

                                        //  If board finished
                                        if (!spNs.board.tiles.getNumMisplaced()) {
                                            actions.puzzleSolved();
                                        }
                                        //  Else if using move counts
                                        else if (usingMoves) {
                                            //  If no more moves left
                                            if (!spNs.counters.movesLeft.getCount()) {
                                                actions.puzzleUnsolved();
                                            }
                                        }
                                    }
                                }

                                return didMove;
                            });

                            //  Move tile left
                            actions.moveTileLeft = (function (shuffleFunc) {
                                //  Only if playing or shuffling
                                if (spNs.state.getIsPlaying() ||
                                        spNs.state.getIsShuffling()) {
                                    return spNs.board.tiles.moveTileLeft(shuffleFunc);
                                }
                            });

                            //  Move tile right
                            actions.moveTileRight = (function (shuffleFunc) {
                                //  Only if playing or shuffling
                                if (spNs.state.getIsPlaying() ||
                                        spNs.state.getIsShuffling()) {
                                    return spNs.board.tiles.moveTileRight(shuffleFunc);
                                }
                            });

                            //  Move tile up
                            actions.moveTileUp = (function (shuffleFunc) {
                                //  Only if playing or shuffling
                                if (spNs.state.getIsPlaying() ||
                                        spNs.state.getIsShuffling()) {
                                    return spNs.board.tiles.moveTileUp(shuffleFunc);
                                }
                            });

                            //  Move tile down
                            actions.moveTileDown = (function (shuffleFunc) {
                                //  Only if playing or shuffling
                                if (spNs.state.getIsPlaying() ||
                                        spNs.state.getIsShuffling()) {
                                    return spNs.board.tiles.moveTileDown(shuffleFunc);
                                }
                            });

                            //  Puzzle solved
                            actions.puzzleSolved = (function () {
                                // If playing then puzzle is solved
                                if (spNs.state.getIsPlaying()) {
                                    spNs.jq('#nf-slide-puzzle-control-play-quit')
                                        .trigger('click', [true]);
                                    spNs.jq('#nf-slide-puzzle-board')
                                        .addClass('solved');
                                    spNs.jq('.nf-slide-puzzle-tile')
                                        .addClass('solved');
                                    spNs.jq('#nf-slide-puzzle-status-bar-text')
                                        .addClass('solved');
                                    spNs.state.setStatusBarText('Solved!');
                                }
                            });

                            //  Puzzle unsolved
                            actions.puzzleUnsolved = (function () {
                                // If playing then puzzle is solved
                                if (spNs.state.getIsPlaying()) {
                                    spNs.jq('#nf-slide-puzzle-control-play-quit')
                                        .trigger('click', [true]);
                                    spNs.jq('#nf-slide-puzzle-board')
                                        .addClass('unsolved');
                                    spNs.jq('.nf-slide-puzzle-tile')
                                        .addClass('unsolved');
                                    spNs.jq('#nf-slide-puzzle-status-bar-text')
                                        .addClass('unsolved');
                                    spNs.state.setStatusBarText('Unsolved!');
                                }
                            });

                            //  Set action static vars and accessors
                            (function () {
                                var shuffleMoves = 0;

                                actions.getShuffleMoves = (function () {
                                    return shuffleMoves;
                                });

                                actions.resetShuffleMoves = (function () {
                                    shuffleMoves = 0;
                                });

                                actions.incShuffleMoves = (function () {
                                    shuffleMoves++;
                                });

                                actions.decShuffleMoves = (function () {
                                    shuffleMoves--;
                                });
                            }());

                            return actions;
                        }());

                        //  Init the event handlers for actions
                        spNs.jq('#nf-slide-puzzle-control-play-play')
                              .on('click', spNs.actions.play);
                        spNs.jq('#nf-slide-puzzle-control-play-pause')
                              .on('click', spNs.actions.pause);
                        spNs.jq('#nf-slide-puzzle-control-play-quit')
                              .on('click', spNs.actions.quit);
                    }());


                    //
                    //  Make an init call available
                    //
                    (function () {
                        spNs.init = (function () {
                            //  Set the initial level to medium
                            spNs.jq('#nf-slide-puzzle-option-level-medium')
                                .trigger('click');

                            //  Set the state buttons to quit
                            spNs.jq('#nf-slide-puzzle-control-play-quit')
                                .trigger('click', [false]);
                        });
                    }());
                }
            }
        }
    });
}());
