video = "";
status = "";
detector = "";

objects = [];

function preload()
{
    video = createVideo('video.mp4');
    video.hide();
}

function setup()
{
    canvas = createCanvas(680, 400);
    canvas.center();
}

function draw()
{
    image(video, 0, 0, 680, 400);

    if(status != " ")
    {
        detector.detect(video, gotResult);
        for(i = 0; i < objects.length; i++)
        {
            document.getElementById("objectsNumber").innerHTML = "Quantidade: " + objects.length;
            document.getElementById("status").innerHTML = "Status: Objetos Detectados";
            rect(objects[i].x, objects[i].y, objects[i].height, objects[i].width);
            fill('red');
            stroke('red');
            nofill();
            porcentagem = objects[i].confidence * 100;
            text(objects[i].label + " " + porcentagem + "%");
        }
    }
}

function start()
{
    detector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detectando Objetos";
}

function modelLoaded()
{
    console.log("Modelo Carregado!");
    status = "true";
    video.loop();
    video.speed(1);
    video.volume(0);
}

function gotResult(error, results)
{
    if(error)
    {
        console.log(error);
    }
    console.log(results);

    objects = results;
}