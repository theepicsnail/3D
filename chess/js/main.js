requirejs.config({
    shim:{
    'Three': {
        exports: 'THREE'
    }
    }
});

require(["jquery", "Display", "TestScene", "Resource"], 
function( $,        Display,   LoadingScene,   R){
    $(function() {
        display = new Display();
        display.resize(window.innerWidth,window.innerHeight);
        display.animate();
        $('body').append(display.domElement());
        scene = new LoadingScene();
        display.setChild(scene)
    });
});
