// addToHomescreen();

$(document).ready(function() {
    var defis = []; // defis -- contient tous les défis sous forme d'un tableau à double entrée
    var categories = []; // categories -- contient toutes les catégories sous forme d'un tableau à double entrée
    var couleurCategorie; // couleur catégorie sélectionnée


    // pour afficher l'onglet actualité à l'arrivée sur l'application
    $('#actualite-tab').tab('show');
    
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

    // traitements page fil d'actualité

    // bouton like devient rempli si vide et vice versa
    $('.actu-like').on('click', function(){
        var child = $(this).children('i')[0];
        if(child.classList.contains('far')){
            // c'est le coeur vide, on met fas et on vire far pour coeur plein
            child.classList.remove('far');
            child.classList.add('fas');
        }else if(child.classList.contains('fas')){
            // c'est le coeur plein, on met far et on vire fas pour coeur vide
            child.classList.remove('fas');
            child.classList.add('far');
        }
    });


    // traitements page défis

    function afficheCategories(){
        // affiche les categories
        $('.container-categories').removeClass('container-categories-none');

        // masque le reste
        $('.container-defis').addClass('container-defis-none'); // défis
        $('.container-un-defi').addClass('container-un-defi-none'); // 1 défi

        $('#defis header .row .btn-retour').addClass('btn-retour-un-defi-none');
        $('#defis header .row .btn-retour').addClass('btn-retour-defis-none');
        
        // $('#defis header .row .btn-retour').html = ''; // plus besoin du btn-retour
    }

    function afficheDefis(){
        // affiche les défis
        $('.container-defis').removeClass('container-defis-none');

        // masque le reste
        $('.container-categories').addClass('container-categories-none'); // catégories
        $('.container-un-defi').addClass('container-un-defi-none'); // 1 défi

        // traitement bouton retour
        $('#defis header .row .btn-retour').addClass('btn-retour-un-defi-none');
        $('#defis header .row .btn-retour').removeClass('btn-retour-defis-none');
    }


    // function hexToRgb(hex) {
    //     var bigint = parseInt(hex, 16);
    //     var r = (bigint >> 16) & 255;
    //     var g = (bigint >> 8) & 255;
    //     var b = bigint & 255;

    //     return r + "," + g + "," + b;
    // }


    function afficheUnDefi(){
        // affiche 1 défi
        $('.container-un-defi').removeClass('container-un-defi-none');

        // masque le reste
        $('.container-categories').addClass('container-categories-none'); // catégories
        $('.container-defis').addClass('container-defis-none'); // défis
        
        // traitement bouton retour
        $('#defis header .row .btn-retour').addClass('btn-retour-defis-none');
        $('#defis header .row .btn-retour').removeClass('btn-retour-un-defi-none');
        alert(hexToRgb(couleurCategorie));
        $('.container-un-defi').css('background-color', couleurCategorie); // ajout couleur

    }


    // clic sur défis tab :  récupération données + affichage catégories
    $('#menuContainer li.nav-item').on('click', '#defis-tab', function (e) {
        e.preventDefault();

        // on récupère les défis si besoin
        if(defis.length == 0){
            var data = {
                "action": "defis"
            };
            $.ajax({
                type: "POST",
                dataType: "json",
                url: "back/defis.php", // Relative or absolute path to defis.php file
                data: data
            })
            .done(function(data){
                defis = JSON.parse(data['json']);
                if (defis['defis'] == 0){
                    // pas de defis dans la bd, on part
                    return 0;
                }
            });
        }

        // on récupère les catégories si besoin
        if(Object.keys(categories).length == 0){
            var data = {
                "action": "categories"
            };
            $.ajax({
                type: "POST",
                dataType: "json",
                url: "back/defis.php", // Relative or absolute path to defis.php file
                data: data
            })
            .done(function( data ) {
                categories = JSON.parse(data['json']);

                // à partir de là, on a nos categories, on les affiche dans container-categories
                var i;
                var strCategorie;
                var couleurCategorie;
                var htmlToAdd = ""; // html a ajouter au container
                for (var strCategorie of Object.keys(categories)) {
                    couleurCategorie = categories[strCategorie]['couleur'];
                    htmlToAdd += '<div class="col-6 btn-image-categorie" style="background-color:' + couleurCategorie + ';"><img src="' + categories[strCategorie]['cheminIcone'] + '" id="' + strCategorie + '"><br>' + categories[strCategorie]['nom'] + '</div>';
                }

                $('.container-content-defi .container-categories .row').html(htmlToAdd); // on ajoute enfin ce html avec les div
                
            });
        }
        afficheCategories(); // on affiche les catégories
        $(this).tab('show');
    });


    // clic sur une catégorie : on affiche les défis correspondants
    $('.container-content-defi .container-categories .row').on('click', '.btn-image-categorie img', function(){
        var idCategorie = $(this)[0].id; // idCategorie dont on veut les défis
        var htmlToAdd = ""; // html a ajouter
        var i;
        var strDefi; // defi0 si défi n°0
        var strCategorie; // categorie0 si catégorie n°0

        // on itère sur les defis et on recupere ceux qui sont de cette categorie
        for (var strDefi of Object.keys(defis)) {
            strCategorie = 'categorie' + defis[strDefi]['idCategorie']; // (dans defis, on a juste le n° de la categorie)
            
            if(strCategorie == idCategorie){
                // le defi doit etre affiché
                htmlToAdd += '<div class="col-6 btn-image-defi"><img id="' + strDefi + '" src="' + defis[strDefi]['cheminImage'] + '"><br>' + defis[strDefi]['titre'] + '</div>';
                couleurCategorie = categories[strCategorie]['couleur'];
            }
        }
        if(htmlToAdd == ""){
            // pas de défis
            $('.container-defis .row').addClass('div-no-defi');
            couleurCategorie = '#ffffff'
            htmlToAdd += '<div>Aucun défi dans cette catégorie</div>';
        }else{
            $('.container-defis .row').removeClass('div-no-defi');
        }
        $('.container-defis').css('background-color', couleurCategorie); // ajout couleur
        $('.container-defis .row').html(htmlToAdd); // ajout du html
        afficheDefis(); // on affiche les défis

        // ajout du btn retour pour cette page
        // $('#defis header .row .btn-retour').html('<i class="far fa-arrow-alt-circle-left"></i>');

    });


    // clic sur un défi - on affiche son contenu
    $('.container-content-defi .container-defis .row').on('click', '.btn-image-defi', function(){
        var strDefi = $(this).children()[0].id; // idDefi du défi que l'on veut afficher
        var htmlToAdd = '<h4>' + defis[strDefi]['titre'] + '</h4><br><div class="zone1"><img src="' + defis[strDefi]['cheminImage'] + '">'+ defis[strDefi]['description'] + '</div><div class="zone2">' + defis[strDefi]['descriptionSup'] + '</div><div class="zone3">Nombre de points à gagner : <div class="nb-pts">' + defis[strDefi]['nbPoints'] + '</div><div>Je relève le défi !</div><div>Ajouter ce défi à ma wish-list !</div></div>';

        $('.container-un-defi .row').html(htmlToAdd);
        afficheUnDefi();
    });


    // traitements bouton retour
    $('#defis header .row .btn-retour-defis').on('click', function(){
        // on veut retourner aux catégories
        afficheCategories();
        
        // $('.container-defis').css('background-color', peachpuff); // on remet la couleur du body
        // $(this).html = '';
    });

    $('#defis header .row .btn-retour-un-defi').on('click', function(){
        // on veut retourner à la liste des défis
        afficheDefis();
    });


    // a voir : le swipe.... désactiver ?
    /*$( "#defis" ).on( "swipe", function retourArriere(){
         $('.container-categories').removeClass('container-categories-none');
    });*/

    $('#profil-tab').on('click', function (e) {
        e.preventDefault();
        $(this).tab('show');
    });



    /* // A decommenter qd ok -- ne sera jamais ok...
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



