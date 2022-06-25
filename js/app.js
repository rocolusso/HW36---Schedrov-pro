'use strict';
void  function (){
    const payload = {
        formSelector:'#todoForm',
        todosContainerSelector:'#todoItems'
    };
    const app = controller(
        view(),
        model(),
        payload
    );
}();

