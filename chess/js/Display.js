define(["jquery","Three"], 
    function($, THREE){
        var camera;
        var controls;
        var scene;
        var renderer;
        var projector;
        var child;

        return function(){
            var self = this;
            console.log(THREE) 
            this.camera = new THREE.PerspectiveCamera( 
                        45, window.innerWidth / window.innerHeight, 1, 15000 );
            this.camera.position.set(0,0,10)

            this.controls = new THREE.OrbitControls( this.camera );
            this.renderer = new THREE.WebGLRenderer();
            this.projector = new THREE.Projector();
            this.scene = new THREE.Scene();
            this.scene.add(this.camera);
           
 
            this.resize = function(width, height){
                self.camera.aspect = width/height;
                self.camera.updateProjectionMatrix();
                self.renderer.setSize(width,height);
            }
            this.animate = function(){
                requestAnimationFrame(self.animate);
                self.render()
                self.update()
            }

            this.render = function(){
                self.renderer.render(self.scene, self.camera);
            }

            this.update = function(){
                if(self.child && self.child.update) 
                    self.child.update.call(self.child,self);
                if(self.controls && self.controls.update)
                    self.controls.update()
            }

            this.setChild = function(child){
                if(self.child!=undefined){
                    if(self.child.stop)
                        self.child.stop()
                }
                self.child = child
                self.reset()
                if(!self.child)
                    return 
                if(self.child.setDisplay)
                    self.child.setDisplay(self)
                if(self.child.start)
                    self.child.start()
            }

            this.reset = function(){
                var i;
                for(i = self.scene.children.length ; i >=0 ; --i){
                    self.scene.remove(self.scene.children[i])
                }
                self.scene.add(self.camera)
            }

            this.domElement = function (){
                return self.renderer.domElement
            }
        }
    }
);
