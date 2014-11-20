Chess.factory("coordsService", function() {
    alphaToNum = {'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8};
    numToAlpha = _.invert(alphaToNum);

    getCoordsObj = function(coords) {
        return {a: coords[0], x: alphaToNum[coords[0]], y: parseInt(coords[1])};
    }

    getCoordsFlat = function (x, y) {
        return numToAlpha[x] + y;
    }

    return {
        getCoordsObj: getCoordsObj,
        getCoordsFlat: getCoordsFlat
    }
})
