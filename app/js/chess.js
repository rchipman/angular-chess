Chess = angular.module("chess", []);

Chess.controller("playarea", ["$scope", function($scope) {
    $scope.model = {
        test: '1234567890'
    };
}]);

Chess.directive("board", function() {
    return {
        template: "Test: {{model.test}}"
    };
});
