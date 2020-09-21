$(function(){
    $("#slider").slider({
        min : 3,
        max : 30,
        slide : function(event, ui) {
            $("#circle").height(ui.value);
            $("#circle").width(ui.value);
    }
    });
    
    //declare variables
    
    //paintingerasing or not
    var paint = false; 
    
    //painting or erasing
    var paint_erase = "paint"; 
    
    //get the canvas and context
    var canvas = document.getElementById("paint"); 
    var ctx = canvas.getContext("2d");
        
    //get the canvas container
    var container = $("#container");
    
    //mouse position
    var mouse = {x: 0, y: 0}; //x & y are coordinates of container; x is the distance from left board of container to the mouse and y is the distance from the top board of the container to the mouse 
    
    //onload load saved work from localStorage
//    if(localStorage.getItem("x") !=null) {
//        window.alert("x is there and it is equal to " + localStorage.getItem("x"));
//    };    
//    
    if(localStorage.getItem("imgCanvas") !=null) {
        var img = new Image();
        img.onload = function() {
            ctx.drawImage(img, 0, 0);
        }
        img.src = localStorage.getItem("imgCanvas");
    };    
    
    
    //set drawing parameters (lineWidth, lineJoin, lineCap)
    ctx.lineWidth = 3; //initial diameter of our circle    
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    
    //click inside container
    container.mousedown(function(e){ //e -> is the event
        paint = true;
//        window.alert(paint);
        ctx.beginPath();
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
        ctx.moveTo(mouse.x, mouse.y); //position of the mouse.x & mouse.y are properties of mouse variables
    });
    
    //move the mouse while holding mouse key
//    container.mousemove(function(e) { //e -> is the event
//        mouse.x = e.pageX - this.offsetLeft;
//        mouse.y = e.pageY - this.offsetTop;
//        if(paint == true) {
//            if(paint_erase == "paint") {
//                //get color input
//                ctx.strokeStyle = "red";
//            } else {
//                //white color
//                ctx.strokeStyle = "white";
//            }
//            ctx.lineTo(mouse.x, mouse.y);
//            ctx.stroke();
//        }
//    }); 
    container.mousemove(function(e) { //e -> is the event
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
        if(paint == true) {
            if(paint_erase == "paint") {
                //get color input
                ctx.strokeStyle = $("#paintColor").val();
            } else {
                //white color
                ctx.strokeStyle = "white";
            }
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        }
    }); 
    //mouse-up -> we are not paintingerasing anymore
    container.mouseup(function() {
        paint = false;
    });
    
    //if we leave the container we are not paintingerasing anymore
    container.mouseleave(function() {
        paint = false;
    });
    
    //click on the reset button
    $("#reset").click(function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        paint_erase = "paint";
        $("#erase").removeClass("eraseMode");
    });
    
    //click on the save button
        //localStorage : store data with no expiration time
        //sessionStorage : store data for the session of the user, once the user will close its browser all the data will be lost
//    $("#save").click(function() {
//        if(typeof(localStorage) !=null) {
//        localStorage.setItem("x", 5);
//    } else {
//        window.alert("Your device or browser does not support local storage!");
//        }
//    });
     $("#save").click(function() {
        if(typeof(localStorage) !=null) {
        localStorage.setItem("imgCanvas", canvas.toDataURL());
//            window.alert(localStorage.getItem("imgCanvas"));
    } else {
        window.alert("Your device or browser does not support local storage!");
        }
    });
    
    //click on the erase button
    $("#erase").click(function() {
        if(paint_erase == "paint") {
            paint_erase = "erase";
        } else {
            paint_erase = "paint";
        }
        $(this).toggleClass("eraseMode");
    });
    
    //change color input
    $("#paintColor").change(function() {
        $("#circle").css("background-color", $(this).val());
    });

    //change lineWidth using slider
    $("#slider").slider({
        min : 3,
        max : 30,
        slide : function(event, ui) {
            $("#circle").height(ui.value);
            $("#circle").width(ui.value);
            ctx.lineWidth = ui.value;
    }
    });
    
    //functions
    //here no functions are neeeded
         

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
// --> CANVAS RELATED CODE <--
    
//    var canvas = document.getElementById("paint");
//    var context = canvas.getContext('2d');
//    
//    //draw a line 
//    //declare a new path
//    context.beginPath();
//    
//    //define line width
//    context.lineWidth = 40;
//    
//    //set the line color
//    context.strokeStyle = '#42e565';
//    
//    //set cap to the line (round, butt, square)
//    context.lineCap ="round";
//    
//    //set line join style (bevel, round, miter)
//    context.lineJoin = "round";    
//    
//    //position the context point which is the start point
//    context.moveTo(50, 50);
//    
//    //draw a straight line from starting point to a new position
//    context.lineTo(200, 200);
//    
//    //draw another line
//    context.lineTo(400, 100);
//    
//    //make line visible
//    context.stroke();
});