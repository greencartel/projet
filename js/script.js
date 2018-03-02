// addToHomescreen();

$(document).ready(function() {
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

    $('#menuContainer').html(`<ul class="nav nav-tabs" id="nav1" role="tablist">
            <li class="nav-item">
                <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true"><i class="fas fa-users"></i><br>Amis</a>
            </li>

            <li class="nav-item">
                <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="wishlist" aria-selected="false"><i class="fas fa-clipboard-list"></i><br>Wishlist</a>
            </li>

            <li class="nav-item">
                <a class="nav-link" id="messages-tab" data-toggle="tab" href="#messages" role="tab" aria-controls="messages" aria-selected="false"><i class="fas fa-dot-circle"></i><br>Actu</a>
            </li>

            <li class="nav-item">
                <a class="nav-link" id="settings-tab" data-toggle="tab" href="#settings" role="tab" aria-controls="settings" aria-selected="false"><i class="fas fa-list-alt"></i> <br>Défis</a>
            </li>

            <li class="nav-item">
                <a class="nav-link" id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false"><i class="fas fa-user-circle"></i> <br>Profil</a>
            </li>
        </ul>`
    );
});