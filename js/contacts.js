function initMap(a, i, n, p) {
    var t = new google.maps.Map(document.getElementById(a), {
            center: {
                lat: i,
                lng: n
            },
            mapTypeId: google.maps.MapTypeId.TERRAIN,
            zoom: 16,
            disableDefaultUI: !0
        }),
        p = new google.maps.Marker({
            position: {
                lat: i,
                lng: n
            },
            map: t,
            icon: p,
            scaledSize: new google.maps.Size(50, 50)
        })
}

function initMaps() {
    initMap("map-poland", 51.075388, 17.047415, "/static/img/icons/marker-pl.png"), initMap("map-ukraine", 49.550452, 25.589567, "/static/img/icons/marker-ua.png"), initMap("map-ukrpoland", 53.120473, 17.994532, "/static/img/icons/marker-ua.png"), initMap("map-od", 46.506124, 30.722745, "/static/img/icons/vlf.png"), initMap("map-mk", 46.970999, 31.988272, "/static/img/icons/vlf.png")
}