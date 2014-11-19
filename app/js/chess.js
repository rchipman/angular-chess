Chess = angular.module("chess", []);

Chess.factory("boardService", function() {
    function isDark(a, n) {
        return (n % 2 && _.contains(['A', 'C', 'E', 'G'], a)) || (!(n % 2) && _.contains(['B', 'D', 'F', 'H'], a))
    }

    function getSpecialPiece(player, a) {
        piece = {player: player}
        if (a == 'A' || a == 'H') {
            piece.type = 'R'
        } else if (a == 'B' || a == 'G') {
            piece.type = 'N'
        } else if (a == 'C' || a == 'F') {
            piece.type = 'B'
        } else if (a == 'D') {
            if (piece.player == 'black') {
                piece.type = 'Q'
            } else {
                piece.type = 'K'
            }
        } else {
            if (piece.player == 'white') {
                piece.type = 'Q'
            } else {
                piece.type = 'K'
            }
        }
        return piece;
    }

    function getPiece(a, n) {
        piece = null
        if (n == 8) {
            piece = getSpecialPiece('black', a)
        } else if (n == 7) {
            piece = {'player': 'black', type: 'P'}
        } else if (n == 2) {
            piece = {'player': 'white', type: 'P'}
        } else if (n == 1) {
            piece = getSpecialPiece('white', a)
        }
        return piece;
    }

    function initBoard() {
        alpha = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
        num = [8, 7, 6, 5, 4, 3, 2, 1];

        squares = []
        for (i = 0; i < num.length; i++) {
            n = num[i];
            for (y = 0; y < alpha.length; y++) {
                a = alpha[y];
                coords = a + n;
                square = {
                    coords: coords,
                    dark: isDark(a, n),
                    viableMove: false,
                    piece: getPiece(a, n)
                }
                squares.push(square);
            }
        }
        return squares;
    }

    return {
        getBoard: function() { return initBoard() }
    };
})

Chess.controller("playarea", ["$scope", "boardService", function($scope, boardService) {

    $scope.board = boardService.getBoard();

    function setValidMove(coords) {
        board = _.map($scope.board, function(square) {
            square.viableMove = false;
            return square;
        })
        _.findWhere(board, {coords: coords}).viableMove = true;
        return board;
    }

    $scope.getMovementOptions = function(square) {
        if (square.piece != null) {
            square.selected = true;
            $scope.board = setValidMove(square.coords);
        }
    }

}]);

Chess.directive("board", function() {
    return {
        templateUrl: "partials/board.tpl.html"
    };
});
