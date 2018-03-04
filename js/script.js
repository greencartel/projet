// addToHomescreen();

$(document).ready(function() {
    var defis = []; // defis -- contient tous les défis sous forme d'un tableau à double entrée

    $('#amis-tab').on('click', function (e) {
        e.preventDefault();
        $(this).tab('show');
    });
    $('#wishlist-tab').on('click', function (e) {
        e.preventDefault();
        $(this).tab('show');
    });
    $('#actualite-tab').on('click', function (e) {
        e.preventDefault();
        $(this).tab('show');
    });

    // Récupération des défis -- lors du clic sur le tab défis
    $('#menuContainer li.nav-item').on('click', '#defis-tab', function (e) {
        e.preventDefault();
        
        if(defis.length == 0){
            // on n'a pas encore récupéré les défis, on les récupère
            var data = {
                "action": "defis"
            };
            $.ajax({
                type: "POST",
                dataType: "json",
                url: "back/defis.php", // Relative or absolute path to response.php file
                data: data,
                success: function(data) {
                    defis = JSON.parse(data['json']);

                    // une fois récupérés, on affiche les titres des défis dans des boutons (tous lors de l'init de cet onglet)
                    
                    var htmlToAdd = ""; // html a ajouter à nav
                    var strDefi; // chaine pour récupérer le défi
                    var i;
                    for(i = 0; i < Object.keys(defis).length; i++){
                        strDefi = 'defi' + i;
                        htmlToAdd += '<a class="btn btn-primary btn-defi" id="'+ strDefi +'" href="defi.html">'+ defis[strDefi]['titre'] + '</a>';
                        // <a class="btn btn-primary btn-defi" href="defi.html">Défi 1</a>
                    }
                    $('.container-btn-defi').html(htmlToAdd);
                }
            });   
        }
        $(this).tab('show');
    });


    $('.btn-defi').on('click', function (e) {
        // ici, je dois choper l'id du defi que je veux puis je peux afficher le défi dans une nouvelle page !
        // on ouvre defi.html avec les bonnes infos
        var strDefi = this.getAttribute('id'); // on récupère l'id du défi à ouvrir - donne defi0 pour le defi n°0
        // $();
        window.open($(this).attr('href'));
        $('.template-defi h4').html(defis[strDefi]['titre']);
        $('.template-defi .zone1').html("<img src="' + defis[strDefi]['cheminImage']'">" + defis[strDefi]['description']);
        $('.template-defi .zone2').html(defis[strDefi]['descriptionSup']);
        $('.template-defi .zone3').html('Nombre de points à gagner : <div class="nb-pts">' + defis[strDefi]['nbPoints'] + '</div><div>Je relève le défi !</div><div>Ajouter ce défi à ma wish-list !</div>');        
    });

    $('#profil-tab').on('click', function (e) {
        e.preventDefault();
        $(this).tab('show');
    });


    // $('#menuContainer li.nav-item').on('click', '#defis-tab', function () {
    //     // e.preventDefault();
    //     alert('clic profil-tab');
    // });


    /* // A decommenter qd ok

    $('#menuContainer').html(`<ul class="nav nav-tabs" role="tablist">
            <li class="nav-item">
                <a class="nav-link active" id="amis-tab" data-toggle="tab" href="#amis" role="tab" aria-controls="amis" aria-selected="true"><i class="fas fa-users"></i><br>Amis</a>
            </li>

            <li class="nav-item">
                <a class="nav-link" id="wishlist-tab" data-toggle="tab" href="#wishlist" role="tab" aria-controls="wishlist" aria-selected="false"><i class="fas fa-clipboard-list"></i><br>Wishlist</a>
            </li>

            <li class="nav-item">
                <a class="nav-link" id="actualite-tab" data-toggle="tab" href="#actualite" role="tab" aria-controls="actualite" aria-selected="false"><i class="fas fa-dot-circle"></i><br>Actu</a>
            </li>

            <li class="nav-item">
                <a class="nav-link" id="defis-tab" data-toggle="tab" href="#defis" role="tab" aria-controls="defis" aria-selected="false"><i class="fas fa-list-alt"></i> <br>Défis</a>
            </li>

            <li class="nav-item">
                <a class="nav-link" id="profil-tab" data-toggle="tab" href="#profil" role="tab" aria-controls="profil" aria-selected="false"><i class="fas fa-user-circle"></i> <br>Profil</a>
            </li>
        </ul>`
    );*/
});