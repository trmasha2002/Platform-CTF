    $(function () {
        let lol = new Date().toString();
        $('#datetimepicker2').datetimepicker({
            locale: 'ru',
            defaultDate: lol,
            formant: "YYYY-MM-DD HH:mm",
        });
    });

    $(function () {
        let lol2 = new Date();
        $('#datetimepicker3').datetimepicker({
            locale: 'ru',
            formant: "YYYY-MM-DD HH:mm",
            defaultDate: lol2,
        });
    });