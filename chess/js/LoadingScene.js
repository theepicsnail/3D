define(["Display", "Resource", "Three"], 
function(Display,   R,          THREE){
    var material1 = new THREE.MeshLambertMaterial({color:0xff0000})
    var material2 = new THREE.MeshLambertMaterial({color:0x404040})
    var light1 = new THREE.DirectionalLight({color:0xFFFFFF})
    var light2 = new THREE.DirectionalLight({color:0xFFFFFF})
    light1.position.set(1,1,1)
    light2.position.set(-1,-1,-1)
    return function(){
        var self = this;
        this.running = true;
        this.geoms = [
            "King", 
            "Queen", 
            "Knight",
            "Bishop", 
            "Pawn", 
            "Rook", 
        ];
        this.display = undefined;
        this.setDisplay = function(disp){
            self.display = disp;
            disp.scene.add(light1)
            disp.scene.add(light2)
        }
        this.pos = 0;

        this.start = function(){
            for(var i in self.geoms){
                R.loadGeom(self.geoms[i],self.onload)
                var geom = new THREE.CubeGeometry(2,.5,2);
                var mesh = new THREE.Mesh(geom,i%2?material1:material2)
                mesh.position.x=-5+2*i
                mesh.position.y=-1
                self.display.scene.add(mesh)
            }
        }
        this.stop = function(){
            self.running = false;
        }
        this.onload = function(geom){
            if(!self.running)
                return
            var mesh = new THREE.Mesh(geom,self.pos%2?material2:material1)
            mesh.position.x=-5+2*self.pos
            mesh.position.y=-1
            self.pos++;
            self.display.scene.add(mesh);
        }
    }
});
