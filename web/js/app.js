var apigClient = apigClientFactory.newClient();

function showImage(src, width, height, alt) {
    var img = document.createElement("img");
    img.src = src;
    img.width = width;
    img.height = height;
    img.alt = alt;
};

$(document).ready(function(){

    $("#but_upload").click(function(){
        var files = $('#file')[0].files[0];
        let config = {
            headers:{'Content-Type': files.type , "X-Api-Key":"mx8tz2VTth8EXvR2g04H47Uwiuv1hVqTaNl75BS5", }
        };

        url = 'https://1xymj1ltm8.execute-api.us-east-1.amazonaws.com/dev/upload/cloudhw3photos/' + files.name
        axios.put(url,files,config).then(response=>{
            alert("Upload successful!!");
        })
    });
});

var rec=Recorder({
    bitRate:32,
    sampleRate:24000
    });

record.onclick = e => {
    console.log('I was clicked')
    record.disabled = true;
    record.style.backgroundColor = "blue"
    stopRecord.disabled=false;

    rec.open(function(){
        rec.start();
    },function(msg,isUserNotAllow){
        console.log((isUserNotAllow?"UserNotAllow，":"")+"can't record:"+msg);
    });
}
stopRecord.onclick = e => {
    console.log("I was clicked")
    record.disabled = false;
    stop.disabled=true;
    record.style.backgroundColor = "red"
    rec.stop(function(blob,duration){
        console.log(URL.createObjectURL(blob),"Duration:"+duration+"ms");
        console.log(blob);
        rec.close();
        var audio=document.createElement("audio");
        audio.controls=true;
        document.body.appendChild(audio);
        audio.src=URL.createObjectURL(blob);
        sendData(blob);
    });
}


$('#btngo').click(function(){
    query = $('#searchin').val();
    params = {q: query};
    apigClient.searchGet(params, {}, {})
        .then(function(result){
        console.log(result);
        let img_list = result.data
        for (var i = 0; i < img_list.length; i++) {
            img_url = img_list[i];
            new_img = document.createElement('img');
            new_img.src = img_url;
            document.body.appendChild(new_img);
        }
        
        }).catch(function(result){
        console.log(result);
        });

});