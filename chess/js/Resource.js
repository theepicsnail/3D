define(["jquery","Three"],function($,THREE){
    var resources = [];
    var cache = {}
    var loader = new THREE.JSONLoader()
    function nextID(){
        var id = resources.length;
        resources[id] = undefined;
        return id;
    }  

    function doLoad(type, path, callback, loader){
        var cacheID = type+":"+path;
        var id = cache[cacheID];

        if(id != undefined){
            setTimeout(callback);
            return id;
        }else{
            id = nextID();
            cache[cacheID]=id;
        }
        loader(function(resource){
            resources[id] = resource;
            if(callback)
                callback(resource);
        },function(){
            resources[id] = undefined
            if(callback)
                callback(undefined);
        });
        return id;
    }


    function loadGeom(path, callback){
        var start = (+new Date())
        return doLoad("geom", path, callback, function(onload){
            loader.load("objs/"+path+".js",function(geom,mats){
                console.log(path+" loaded in "+(+new Date()-start)+"ms");
                onload(geom);
            });
        })
    }
  
    /*
    function loadImage(path, callback){
        var id = checkCache("image:"+path);
        if(id !== undefined){
            setTimeout(callback);
            return id;
        }
        else
            id = nextID();
        setCache("image:"+path,id);

        var img = new Image();
        img.onload = function(){
            resources[id] = this;
            if(callback)
                callback(img);
        }
        img.src = "resources/"+path;
        return id;
    }
    function loadLevel(path, callback){
        var id = checkCache("level:"+path)
        if (id !== undefined){
            setTimeout(callback);
            return id;
        }else
            id = nextID();
        setCache("level:"+path,id);

        $.getJSON('levels/'+path,function(data){
            resources[id] = data;
            if(callback)
                callback(data);
        });
        return id;
    }*/


    function getResource(id){
        return resources[id];
    }
    return {
        loadGeom:loadGeom,
        get:getResource
    }
});
