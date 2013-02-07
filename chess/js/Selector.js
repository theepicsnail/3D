define(["Three","jquery"],
function(THREE,  $){

    
    return function (display){
        var self = this;
        this.display = display
        this.meshes = [];
        this.onMouseover = undefined;
        this.onMouseout = undefined;
        this.onClick = undefined;
        this.currentObj = undefined;

        this.addMesh = function(mesh){
            self.meshes.push(mesh)
        }
        this.removeMesh = function(mesh){
            var idx = self.meshes.indexOf(mesh)
            if(idx>=0)
                self.meshes.pop(idx)
        }
        this.getIntersection = function(event){
            var display = self.display;
            var x = event.clientX;
            var y = event.clientY;
            var width = display.domElement().width
            var height = display.domElement().height
            var vector = new THREE.Vector3(x/width*2-1, 
                                          -y/height*2+1, 1)
            display.projector.unprojectVector(vector, display.camera)
            vector = vector.sub(display.camera.position).normalize()
            var ray = new THREE.Raycaster(display.camera.position,vector)

            var intersects = ray.intersectObjects(self.meshes)

            if(intersects != undefined)
                intersects = intersects[0]
            return intersects
        }

        $('body').mousemove(function(event){
            if(!(self.onMouseover || self.onMouseout))
                return
            var intersects = self.getIntersection(event);
            console.log(intersects, self.currentObj)
            if(self.onMouseout && (intersects != self.currentObj) && self.currentObj){
                self.onMouseout(self.currentObj)
                self.currentObj = undefined;
            }

            if(intersects == undefined)
                return;

            if(self.onMouseover && (intersects != self.currentObj)){
                self.currentObj = intersects
                self.onMouseover(self.currentObj)
            }
        });

        $('body').click(function (event){
            if(self.onClick == undefined)
                return
            var intersects = self.getIntersection(event);
            console.log(intersects)
            if(intersects == undefined)
                return
            self.currentObj = intersects
            self.onClick(self.currentObj);
        });
    }
});
