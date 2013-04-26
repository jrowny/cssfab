app.directive('markdown', function() {
    var converter = new Showdown.converter();

    var link = function(scope, element, attrs, model) {
        var editor = element.children('.markdown_editor'),
            view = element.children('.markdown_view'); 

        var completeEdit = function(){
            view.html(converter.makeHtml(scope.ngModel));
            view.show();
            editor.hide();
        };

        view.on("click", function(){
            view.hide();
            editor.show();
            editor.focus();
        });

        editor.on("blur focusout", function(){
            completeEdit();
        });

        completeEdit();
    };
    return {
        restrict: 'E',
        priority: 0,
        scope:{
            ngModel: "="
        },
        replace: true,
        link: link,
        template: '<div class="markdown_container"><div class="markdown_view"></div><textarea class="markdown_editor" ng-model="ngModel"></textarea></div>'
    };
});