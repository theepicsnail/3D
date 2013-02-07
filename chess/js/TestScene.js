define(["Three","Selector"],
function(THREE,Selector){
//    var LightSquare = {color:0xEEEEEE,opacity:.3, transparent:true}
//    var DarkSquare = {color:0x8888FF, opacity:.7, transparent:true}
    var LightSquare = {color:0x808080}
    var DarkSquare = {color:0x008000}
    var Frame = {color:0x333333}
    var frameMaterial = new THREE.MeshLambertMaterial(Frame)
    var boardSpacing = 8;
    return function(){
        var self = this;
        this.objects = []
        this.tiles = []
        this.display = undefined;

        var light = new THREE.DirectionalLight({color:0xFFFFFF});
        light.position.set(.1,1,.1);
        this.objects.push(light);
        light = new THREE.DirectionalLight({color:0xFFFFFF});
        light.position.set(-.1,-1,-.1);
        this.objects.push(light);
        
        this.levelSelector = new Selector();
        this.levelSelector.onClick = function(intersection){
            console.log("click.");
            self.display.controls.center.y=intersection.object.position.y
        }
        this.levelSelector.onMouseover = function(intersection){
            intersection.object.material.opacity = .3
        }
        this.levelSelector.onMouseout = function(intersection){
            intersection.object.material.opacity = 0;
        }

        var levelGeom = new THREE.CubeGeometry(16,.2,16);
        var geom = new THREE.CylinderGeometry(.1,.1,16,16,1,false)
        for(var y = -boardSpacing; y <= boardSpacing ; y += boardSpacing){
            for(var x = -7; x <= 7 ; x +=2)
            for(var z = -7; z <= 7 ; z +=2){
                var color;
                if((x+8)%4 == (z+8)%4)
                    color = DarkSquare
                else
                    color = LightSquare

                var panel = new THREE.CubeGeometry(2,.1,2);
                var material = new THREE.MeshLambertMaterial(color);
                var mesh = new THREE.Mesh(panel,material);
                mesh.position.set(x,y,z);

                this.objects.push(mesh);
                this.tiles.push(mesh);
            }

//            var s = new Selector();
//            s.onClick = function(object){
//            }

            var mesh = new THREE.Mesh(geom,frameMaterial)
            mesh.rotation.x=Math.PI/2
            mesh.position.set(8,y,0)
            this.objects.push(mesh);            
            
            mesh = new THREE.Mesh(geom,frameMaterial)
            mesh.rotation.x=Math.PI/2
            mesh.position.set(-8,y,0)
            this.objects.push(mesh)
            
            
            mesh = new THREE.Mesh(geom,frameMaterial)
            mesh.rotation.z=Math.PI/2
            mesh.position.set(0,y,-8)
            this.objects.push(mesh)
            

            mesh = new THREE.Mesh(geom,frameMaterial)
            mesh.rotation.z=Math.PI/2
            mesh.position.set(0,y,8)
            this.objects.push(mesh)

            mesh = new THREE.Mesh(levelGeom,new THREE.MeshLambertMaterial(
                {color:0xffffff, transparent:true, opacity:0}))
            mesh.position.set(0,y,0)
            this.objects.push(mesh)
            this.levelSelector.addMesh(mesh)
            

        }

        this.update = function(display){
            self.display = display
        }
/*        var loader = new THREE.JSONLoader()
        loader.load("objs/Knight.js", function(geom,mats){
            var mesh =  new THREE.Mesh(geom, new THREE.MeshLambertMaterial({color:0xff0000}))
            mesh.position.x=-2
            self.display.scene.add(mesh)
            self.tiles.push(mesh) 
        });
           loader.load("objs/Queen.js", function(geom,mats){
            var mesh =  new THREE.Mesh(geom, new THREE.MeshLambertMaterial({color:0xff0000}))
            mesh.position.x=2
            self.display.scene.add(mesh)
            self.tiles.push(mesh) 
        });
        loader.load("objs/King.js", function(geom,mats){
            var mesh =  new THREE.Mesh(geom, new THREE.MeshLambertMaterial({color:0xff0000}))
            mesh.position.z=-2
            self.display.scene.add(mesh)
            self.tiles.push(mesh) 
        });
        loader.load("objs/Bishop.js", function(geom,mats){
            var mesh =  new THREE.Mesh(geom, new THREE.MeshLambertMaterial({color:0xff0000}))
            mesh.position.z=2
            self.display.scene.add(mesh)
            self.tiles.push(mesh) 
        });
        loader.load("objs/Pawn.js", function(geom,mats){
            var mesh =  new THREE.Mesh(geom, new THREE.MeshLambertMaterial({color:0xff0000}))
            self.display.scene.add(mesh)
            self.tiles.push(mesh) 
        });
 
 
        this.highlight = function(obj){
//            this.i
            var color = obj.object.material.color;
            var time = (+new Date())/1000;
            color.r = time%1
            color.g = time/2%1
            color.b = time/3%1
        }*/
        this.setDisplay = function(display){
            self.display = display;
        }
        this.start = function(){
            for(var i in self.objects){
                self.display.scene.add(self.objects[i])
            }
            self.levelSelector.display = self.display
        }
    }
});
