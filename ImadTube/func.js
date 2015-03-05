
function getDownlaods(vid_link){
    resss = /watch\?v=([^\s&]+)/.exec(vid_link);
    if ( resss.length != 2 ) return 0;
    vid = resss[1];
    geturls(vid);
    return resultat_downloads;
}
////////////////////////////////////////////////////////////////////////////// DOWNLOAD
function urlParserParameters(str,isu){
    if (typeof(str)!="string") return;
    param = str.split("&");//
    var parameters={};
    $.each(param,function(k,v){
        pp = v.split("=");
        if (isu == 1){
            parameters[pp[0]] = encodeURIComponent(pp[1]);
            return 1;
        }
        parameters[pp[0]] = pp[1];
    });
    return parameters;
}
var url_base = "https://www.youtube.com/get_video_info?video_id=";
function getStream_info(vid_id){
    if(!vid_id)return;
    url = url_base+vid_id;
    var url2 = "";
    $.ajax({
        url: url,
        async: false,
        type: 'GET',
        success: function(res) {
            if(res != undefined)
                parameters = urlParserParameters(res);
        }   ,
       error: function(xhr, status, error) {
                          //alert(xhr.responseText);
                        }
    });

}
var parameters={};
var formats;
var resultat_downloads;
var urls_gotten;
function geturls(vid_id){

    urls_gotten= 0;
    parameters={};
    resultat_downloads = [];
    resultat_downloads.push({});
    resultat_downloads.push([]);
    return $.when(getStream_info(vid_id)).done(function(ob){
        //console.log(ob);
        formats = decodeURIComponent(parameters["url_encoded_fmt_stream_map"]).split(",");
        resultat_downloads[0]["title"]=encodeURIComponent(parameters["title"]);
        resultat_downloads[0]["iurlmq"]=encodeURIComponent(parameters["iurlmq"]);
        i=0;
        $.each(formats,function(k,vv){
            resultat_downloads[1].push({});
            frms = urlParserParameters(vv);
            $.each(frms,function(k,v){
                resultat_downloads[1][i][k]=encodeURIComponent(v);
            });
            i+=1;
        });
        urls_gotten=1;
    });
    
    //return resultat_downloads;
}