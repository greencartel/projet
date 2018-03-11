// addToHomescreen();

$(document).ready(function() {
    var defis = []; // defis -- contient tous les défis sous forme d'un tableau à double entrée
    var categories = []; // categories -- contient toutes les catégories sous forme d'un tableau à double entrée
    
    // pour afficher l'onglet actualité à l'arrivée sur l'application
    $('#actualite-tab').tab('show');
    // $('#defis-tab').tab('show');
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

        // on récupère d'abord les catégories (besoin pour les couleurs)
        if(categories.length == 0){
            // on n'a pas encore récupéré les catégories, on les récupère
            var data = {
                "action": "categories"
            };
            $.ajax({
                type: "POST",
                dataType: "json",
                url: "back/defis.php", // Relative or absolute path to defis.php file
                data: data,
                success: function(data) {
                    categories = JSON.parse(data['json']);
                    if(categories['categories'] == 0){
                        // pas de categories dans la bd
                        return 0;
                    }
                }
            });
        }

        if(defis.length == 0){
            // on n'a pas encore récupéré les défis, on les récupère
            var data = {
                "action": "defis"
            };
            $.ajax({
                type: "POST",
                dataType: "json",
                url: "back/defis.php", // Relative or absolute path to defis.php file
                data: data,
                success: function(data) {
                    defis = JSON.parse(data['json']);

                    // une fois récupérés, on affiche les titres des défis dans des boutons (tous lors de l'init de cet onglet)
                    var htmlToAdd = ""; // html a ajouter à nav
                    var strDefi; // chaine pour récupérer le défi
                    var strImageDefi; // url de l'image du defi
                    var strCategorie;
                    var i;
                    var j;
                    var couleurCategorie;

                    
                    if (defis['defis'] == 0){
                        // pas de defis dans la bd
                        return 0;
                    }
                    
                    // on itère sur la taille de defis car il n'y a que les defis dans cette variable
                    for(i = 0; i < Object.keys(defis).length; i++){
                        strDefi = 'defi' + i;
                        
                        for(j = 0; j < Object.keys(categories).length; j++){
                            // on récupère aussi la couleur de la catégorie du défi
                            strCategorie = 'categorie' + j;
                            if(defis[strDefi]['idCategorie'] == categories[strCategorie]['id']){
                                couleurCategorie = categories[strCategorie]['couleur'];
                                break;
                           }
                        }
                        htmlToAdd += '<div class="col-xs-2 btn-image-defi" style ="background-color:' + couleurCategorie + ';"><a id="'+ strDefi +'" class="btn" href="defi.html"><img src="' + defis[strDefi]['cheminImage'] + '"><br>' + defis[strDefi]['titre'] + '</a></div>';
                    }
                    // $('.container-btn-defi').innerHTML = htmlToAdd;
                    $('.container-btn-defi').html(htmlToAdd);
                }
            });
        }
        $(this).tab('show');
    });


    $('.container-btn-defi').on('click', '.btn-image-defi', function (e) {
        // ici, je dois choper l'id du defi que je veux puis je peux afficher le défi dans une nouvelle page !
        // on ouvre defi.html avec les bonnes infos
        var strDefi = this.getAttribute('id'); // on récupère l'id du défi à ouvrir - donne defi0 pour le defi n°0
        // $();
        // window.location = 'defi.html';
        location.href = 'http://localhost/projet/defi.html';
        alert(location.href);
        /*window.location = nouvelleAdresse;
        window.open($(this).attr('href'));
        $('.template-defi h4').html(defis[strDefi]['titre']);
        $('.template-defi .zone1').html("<img src="' + defis[strDefi]['cheminImage']'">" + defis[strDefi]['description']);
        $('.template-defi .zone2').html(defis[strDefi]['descriptionSup']);
        $('.template-defi .zone3').html('Nombre de points à gagner : <div class="nb-pts">' + defis[strDefi]['nbPoints'] + '</div><div>Je relève le défi !</div><div>Ajouter ce défi à ma wish-list !</div>');  */      
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
                <a class="nav-link" id="wishlist-tab" data-toggle="tab" href="#wishlist" role="tab" aria-controls="wishlist" aria-selected="false"><i class="fas fa-list-ul"></i><br>Wishlist</a>
            </li>

            <li class="nav-item">
                <a class="nav-link" id="actualite-tab" data-toggle="tab" href="#actualite" role="tab" aria-controls="actualite" aria-selected="false"><i class="fas fa-users"></i><br>Actu</a>
            </li>

            <li class="nav-item">
                <a class="nav-link" id="defis-tab" data-toggle="tab" href="#defis" role="tab" aria-controls="defis" aria-selected="false"><i class="fas fa-flag-checkered"></i><br>Défis</a>
            </li>
            
            <li class="nav-item">
                <a class="nav-link" id="autres-tab" data-toggle="tab" href="#autres" role="tab" aria-controls="autres" aria-selected="false"><i class="fas fa-ellipsis-h"></i><br>Autres</a>
            </li>
        </ul>`
    );*/
});