// addToHomescreen();

$(document).on('pagecreate', function(e) {
            $('#home-tab').on('click', function (e) {
                e.preventDefault();
                $(this).tab('show');
            });
            $('#profile-tab').on('click', function (e) {
                e.preventDefault();
                $(this).tab('show');
            });
            $('#messages-tab').on('click', function (e) {
                e.preventDefault();
                $(this).tab('show');
            });
            $('#settings-tab').on('click', function (e) {
                e.preventDefault();
                $(this).tab('show');
            });
        });