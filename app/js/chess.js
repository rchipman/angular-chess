Chess = angular.module("chess", []);

Chess.controller("playarea",
["$scope", "boardService", "pieceService", "coordsService",
function($scope, boardService, pieceService, coordsService) {

    $scope.board = boardService.getBoard();
    $scope.currentPlayer = 'white';
    currentSelectedSquare = null;

    function endTurn(oldCoords, newCoords) {
        $scope.board = boardService.processMove($scope.board, oldCoords, newCoords);
        if ($scope.currentPlayer === 'white') {
            $scope.currentPlayer = 'black';
        } else {
            $scope.currentPlayer = 'white';
        }
    }

    $scope.squareClicked = function(square) {
        if (square.piece != null && square.piece.player == $scope.currentPlayer) {
            currentSelectedSquare = square
            square.selected = true;
            coordsObj = coordsService.getCoordsObj(square.coords);
            service = pieceService[square.piece.type.toLowerCase()];
            possibleSquares = service.getPossibleSquares(coordsObj, square.piece.player, boardService.getPiecePositions($scope.board));
            $scope.board = boardService.setValidMoves($scope.board, possibleSquares);
        } else if (square.viableMove && currentSelectedSquare !== null) {
            endTurn(currentSelectedSquare.coords, square.coords);
        }
    }

}]);

Chess.directive("board", function() {
    return {
        templateUrl: "partials/board.tpl.html"
    };
});
