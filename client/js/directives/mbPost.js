define(['angular'], function(angular){
   'use strict';
    return [function(){
        return {
            templateUrl: 'client/partials/post-template.html',
            scope: {
                externalPost: '&mbPost',
                externalRemovePost: '&removePost',
                externalEditPost: '&editPost',
                externalAddComment: '&addComment',
                externalRemoveComment: '&removeComment',
                externalEditComment: '&editComment',
                editable: '&editable'
            },
            link: function(scope, element, attrs){
                if(attrs.editPost === undefined){
                    scope.editPost = false;
                }
                if(attrs.removePost === undefined){
                    scope.removePost = false;
                }
                if(attrs.addComment === undefined){
                    scope.addComment = false;
                }
                if(attrs.removeComment === undefined){
                    scope.removeComment = false;
                }
                if(attrs.editComment === undefined){
                    scope.editComment = false;
                }
            },
            controller: ['$scope', function($scope){
                $scope.editToggle = false;
                $scope.editPost = function(obj){
                    $scope.editToggle = false;
                    $scope.externalEditPost(obj);
                };
                $scope.$watch(function () {
                        return $scope.externalPost();
                    },
                    function(newVal, oldVal) {
                        $scope.post = angular.copy($scope.externalPost());
                    },
                    true);

                $scope.removeComment = function(commentId){
                    $scope.externalRemoveComment({
                        commentId: commentId,
                        postId: $scope.externalPost.id
                    });
                };
                $scope.editComment = function(commentId, comment){
                    $scope.externalEditComment({
                        commentId: commentId,
                        postId: $scope.externalPost.id,
                        data: comment
                    });
                };
                $scope.addComment = function(comment){
                    $scope.externalAddComment({
                        postId: $scope.post.id,
                        data: comment
                    });
                };
                $scope.temporaryAddComment = {};
                $scope.editCancel = function(){
                    $scope.editToggle = false;
                    $scope.post = angular.copy($scope.externalPost());
                };
                $scope.post = angular.copy($scope.externalPost());
                $scope.removePost = $scope.externalRemovePost;
            }]

        };
    }];
});