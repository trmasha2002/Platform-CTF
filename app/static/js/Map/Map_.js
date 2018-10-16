ymaps.ready(init);
// let visible_form = false;
function get_coords_by_click(e) {
    let coords = e.get('coords');
    let pos = e.get('clientPixels');
    // if(visible_form){
    //     let rect = $("#create_place_card")[0].getBoundingClientRect();
    //     if (!(pos[0] < rect.right && pos[0] > rect.left && pos[1] < rect.bottom && pos[1] > rect.top))
    //     {
    //         visible_form = false;
    //         $("#create_place_card").hide();
    //     }
    // }
    // else{
    let constrain = function(v, min, max){
        return (v < min ? min : v) > max ? max : (v < min ? min : v);
    }
    let map_rect = $("#map")[0].getBoundingClientRect();
    $("#create_place_card").show();
    $("#create_place_card")[0].style.left = constrain(pos[0] - $("#create_place_card")[0].clientWidth*0.3, map_rect.left, map_rect.right - $("#create_place_card")[0].clientWidth) + 'px';
    $("#create_place_card")[0].style.top = constrain(pos[1] - $("#create_place_card")[0].clientHeight, map_rect.top, map_rect.bottom - $("#create_place_card")[0].clientHeight)+ 'px';
    $("#coords-field")[0].value = coords[0] + "; " + coords[1];
    //visible_form = true;
    //}
}

function get_coords_by_address(address) {
    let coords = [];
    ymaps.geocode(address).then(function (res)
    {
        let firstGeoObject = res.geoObjects.get(0);
        coords = firstGeoObject.geometry.getCoordinates();
    });
    console.log(coords);
    return coords;
}

function get_data()
{
    let objects_from_server = [];
    $.ajax(
        {
            type: "POST",
            url: "http://localhost:8080/api/getmapobjects",
            dataType: "json",
            success: function (data) {
                objects_from_server = data.result;
            },
            async: false
        });
    return objects_from_server;
}

function init() {
    let objects_from_server;
    let objects_on_map = [];

    let myMap = new ymaps.Map("map", {
        center: [55.76, 37.64],
        zoom: 10
    },
        {
            searchControlProvider: 'yandex#search'
        });

    objects_from_server = get_data();

    console.log(objects_from_server);

    for (let i = 0; i < objects_from_server.length; i++)
    {
        ymaps.geocode(objects_from_server[i].place).then(function (res)
        {
        let firstGeoObject = res.geoObjects.get(0);
        let coords = firstGeoObject.geometry.getCoordinates();

        objects_on_map.push(new ymaps.Placemark(coords,
                {
                    balloonContentHeader: objects_from_server[i].name,
                    balloonContentBody: objects_from_server[i].place,
                    balloonContentFooter: "<a href='/tournaments/" + objects_from_server[i].id + "'>Перейти в турнир</a>",
                    old_preset: "islands#violetDotIcon"
                },
                {
                    preset: "islands#violetDotIcon",
                })
            );

        ymaps.geoQuery(objects_on_map).addToMap(myMap);

        });

    }

    let button = new ymaps.control.Button(
        {
            data: {
                content: 'Радиус',
                title: 'Нажмите на кнопку'
            },

            options: {
                layout: ymaps.templateLayoutFactory.createClass(
                    "<div class='btn map-button {% if state.selected %}" +
                    "background-orange" +
                    "{% endif %}' " +
                    "title='{{ data.title }}'>" +
                    "{{ data.content }}" +
                    "</div>"
                ),
                position:
                    {
                        right: '5px',
                        top: '45px'
                    }
            }
        });

    let range = new ymaps.control.Button(
        {
            data: {
                content: '',
                title: 'Нажмите на кнопку'
            },

            options: {
                layout: ymaps.templateLayoutFactory.createClass(
                    "<div class='range-block hide'>" +
                    "<div>" +
                    "<input type='range' id='change_radius' value='3000' min='1000' max='20000' step='50'>" +
                    "</div>" +
                    "<span class='output-radius'>3000m</span>" +
                    "<div>"
                ),
                position:
                    {
                        right: '45px',
                        top: '83px'
                    }
            }
        });


    let myCircle = new ymaps.Circle([
        [55.76, 37.60],
        1000
    ], {
        balloonContent: "Радиус круга - 10 км",
    }, {
        draggable: true,
        fillColor: "#DB709377",
        strokeColor: "#990066",
        strokeOpacity: 0.8,
        strokeWidth: 5
    });

    myMap.controls.add(button);

    button.state.set('selected', false);

    myMap.controls.add(range);
    button.events.add('click', function ()
    {
        if (button.state._data.selected)
        {
            myMap.geoObjects.remove(myCircle);
            myMap.geoObjects.each(function (obj)
            {
                obj.options.set('preset', obj.properties._data.old_preset);
            });
            $(".range-block").addClass("hide");
        }

        else
            {
                console.log(myCircle);
                myCircle.geometry._coordinates = myMap.getCenter();
                myMap.geoObjects.add(myCircle);

                let objects_inside_circle = ymaps.geoQuery(myMap.geoObjects).searchIntersect(myCircle);

                objects_inside_circle.setOptions('preset', 'islands#redDotIcon');

                $(".range-block").removeClass("hide");
                $("#change_radius").on("input change", function () {
                    let value = this.value;
                    myCircle.geometry.setRadius(value);
                    myMap.geoObjects.each(function (obj)
                    {
                        obj.options.set('preset', obj.properties._data.old_preset);
                    });
                    objects_inside_circle = ymaps.geoQuery(myMap.geoObjects).searchIntersect(myCircle);
                    objects_inside_circle.setOptions('preset', 'islands#redDotIcon');
                    $(".output-radius").text(value + "m");
                })
            }
    });

    myCircle.events.add('drag', function () {
        myMap.geoObjects.each(function (obj)
            {
                obj.options.set('preset', obj.properties._data.old_preset);
            });
        let objects_inside_circle = ymaps.geoQuery(myMap.geoObjects).searchIntersect(myCircle);
        objects_inside_circle.setOptions('preset', 'islands#redDotIcon');
    });
}
