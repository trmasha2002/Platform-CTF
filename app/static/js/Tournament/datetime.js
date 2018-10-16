$(function () {
        let lol = new Date().toString();
        $('#datetimepicker2').datetimepicker({
            locale: 'ru',
            defaultDate: lol,
        });
    });

    $(function () {
        let lol2 = new Date();

        lol2.setDate(lol2.getDate() + 2);
        lol2.setHours(lol2.getHours() + 5);
        console.log(lol2);
        $('#datetimepicker3').datetimepicker({
            locale: 'ru',
            defaultDate: lol2,
        });
    });