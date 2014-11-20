Chess.factory("pawnService", ["coordsService", function(coordsService) {

    function getPossibleMoves(coordsObj, player, piecePositions) {
        piecePositionCoords = _.pluck(piecePositions, 'coords');
        startingPosition = {white: 2, black: 7}
        possibleCoords = []
        if (player === 'white') {
            add = 1
        } else {
            add = -1
        }
        x = coordsObj.x
        y = coordsObj.y + add
        moveCoords = coordsService.getCoordsFlat(x, y);
        if (!_.contains(piecePositionCoords, moveCoords)) {
            possibleCoords.push(moveCoords);
        }
        if (coordsObj.y == startingPosition.white || coordsObj.y == startingPosition.black) {
            moveCoords = coordsService.getCoordsFlat(x, y + add);
            if (!_.contains(piecePositionCoords, moveCoords)) {
                possibleCoords.push(moveCoords);
            }
        }
        return possibleCoords.concat(getPossibleAttacks(x, y, piecePositions, player));
    }

    function getPossibleAttacks(x, y, piecePositions, player) {
        piecePositionCoords = _.pluck(piecePositions, 'coords');
        var possibleCoords = [];
        possibleAttacks = [coordsService.getCoordsFlat(x + 1, y), coordsService.getCoordsFlat(x - 1, y)]
        viableAttacks = _.reduce(_.intersection(piecePositionCoords, possibleAttacks),
            (function (coordsArray, coords) {
                console.log(_.findWhere(piecePositions, {coords: coords}));
                if (_.findWhere(piecePositions, {coords: coords}).player !== player) {
                    coordsArray.push(coords);
                }
                return coordsArray;
            })
        , []);
        possibleCoords = possibleCoords.concat(viableAttacks);
        return possibleCoords;
    }

    return {
        getPossibleSquares: getPossibleMoves
    }
}])
