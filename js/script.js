// addToHomescreen();

$(document).ready(function() {
    var defis = []; // defis -- contient tous les défis sous forme d'un tableau à double entrée
    var categories = []; // categories -- contient toutes les catégories sous forme d'un tableau à double entrée
    var couleurCategorie; // couleur catégorie sélectionnée
    var titreCategorie;

    var btnSvg = '<svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" class="style-scope yt-icon" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g class="style-scope yt-icon"><path d="M14 10H2v2h12v-2zm0-4H2v2h12V6zm4 8v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM2 16h8v-2H2v2z" class="style-scope yt-icon"></path></g></svg>';

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
    function hexToRgba(hex, opac) {
        var bigint = parseInt(hex, 16);
        var r = (bigint >> 16) & 255;
        var g = (bigint >> 8) & 255;
        var b = bigint & 255;

        return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + opac + ')';
    }

    function afficheCategories(){
        // affiche les categories
        $('.container-categories').removeClass('container-categories-none');
        $('.container-sponsor-content-defi').removeClass('container-sponsor-content-none');

        // masque le reste
        $('.container-defis').addClass('container-defis-none'); // défis
        $('.container-un-defi').addClass('container-un-defi-none'); // 1 défi

        $('#defis header .row .btn-retour-un-defi').addClass('btn-retour-un-defi-none');
        $('#defis header .row .btn-retour-defis').addClass('btn-retour-defis-none');
        
        $('.titre-defis-tab').html('Catégories');
        // $('#defis header .row .btn-retour').html = ''; // plus besoin du btn-retour
    }

    function afficheDefis(titreCategorie){
        // affiche les défis
        $('.container-defis').removeClass('container-defis-none');
        $('.container-sponsor-content-defi').removeClass('container-sponsor-content-none');

        // masque le reste
        $('.container-categories').addClass('container-categories-none'); // catégories
        $('.container-un-defi').addClass('container-un-defi-none'); // 1 défi

        // traitement bouton retour
        $('#defis header .row .btn-retour-un-defi').addClass('btn-retour-un-defi-none');
        $('#defis header .row .btn-retour-defis').removeClass('btn-retour-defis-none');
        $('#defis div h1.titre-defis-tab').html(titreCategorie);
    }

    function afficheUnDefi(titreDefi){
        // affiche 1 défi
        $('.container-un-defi').removeClass('container-un-defi-none');

        // masque le reste
        $('.container-categories').addClass('container-categories-none'); // catégories
        $('.container-defis').addClass('container-defis-none'); // défis
        
        // traitement bouton retour
        $('#defis header .row .btn-retour-defis').addClass('btn-retour-defis-none');
        $('#defis header .row .btn-retour-un-defi').removeClass('btn-retour-un-defi-none');
        $('.container-un-defi').css('background-color', couleurCategorie); // ajout couleur

        // masque les contenus sponsorisés
        $('.container-sponsor-content-defi').addClass('container-sponsor-content-none');

        $('.titre-defis-tab').html('');
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
                    couleurCategorie = hexToRgba(categories[strCategorie]['couleur'], 1);
                    htmlToAdd += '<div class="col-6 btn-image-categorie"><img src="' + categories[strCategorie]['cheminIcone'] + '" id="' + strCategorie + '" style="border-color:' + couleurCategorie + ';"><br>' + categories[strCategorie]['nom'] + '</div>';
                }

                $('.container-content-defi .container-categories .row').html(htmlToAdd); // on ajoute enfin ce html avec les div
                
            });
        }
        else{
            var i;
            var strCategorie;
            var couleurCategorie;
            var htmlToAdd = ""; // html a ajouter au container
            for (var strCategorie of Object.keys(categories)) {
                couleurCategorie = hexToRgba(categories[strCategorie]['couleur'], 1);
                htmlToAdd += '<div class="col-6 btn-image-categorie"><img src="' + categories[strCategorie]['cheminIcone'] + '" id="' + strCategorie + '" style="border-color:' + couleurCategorie + ';"><br>' + categories[strCategorie]['nom'] + '</div>';
            }

            $('.container-content-defi .container-categories .row').html(htmlToAdd); // on ajoute enfin ce html avec les div

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
                htmlToAdd += '<div class="col-6 btn-image-defi"><img id="' + strDefi + '" src="' + defis[strDefi]['cheminImage'] + '"><br><p>' + defis[strDefi]['titre'] + '</p></div>';
                couleurCategorie = hexToRgba(categories[strCategorie]['couleur'], 0.3);
            }
        }
        if(htmlToAdd == ""){
            // pas de défis
            $('.container-defis .row').addClass('div-no-defi');
            couleurCategorie = hexToRgba('ffffff', 1);
            htmlToAdd += '<div>Aucun défi dans cette catégorie</div>';
        }else{
            $('.container-defis .row').removeClass('div-no-defi');
        }

        // $('#defis .container-defis').css('background-color', couleurCategorie); // ajout couleur
        $('.container-defis').css('background-color', couleurCategorie); // ajout couleur
        $('.container-defis .row').html(htmlToAdd); // ajout du html
        // alert('idCategorie = ' + idCategorie + ', categories[idCategorie] = ' + categories[idCategorie] + ', categories[idCategorie][\'titre\'] = ' + categories[idCategorie]['nom']);
        titreCategorie = categories[idCategorie]['nom'];
        afficheDefis(titreCategorie); // on affiche les défis

        // ajout du btn retour pour cette page
        // $('#defis header .row .btn-retour').html('<i class="far fa-arrow-alt-circle-left"></i>');

    });


    // clic sur un défi - on affiche son contenu
    $('.container-content-defi .container-defis .row').on('click', '.btn-image-defi', function(){
        var strDefi = $(this).children()[0].id; // idDefi du défi que l'on veut afficher
        // var htmlToAdd = '<h2 class="titre-defi">' + defis[strDefi]['titre'] + '</h2><br><div class="description-defi"><img src="' + defis[strDefi]['cheminImage'] + '">'+ defis[strDefi]['description'] + '</div><div class="description-defi">' + defis[strDefi]['descriptionSup'] + '</div><div class="pts-defis">Nombre de points à gagner : <div class="nb-pts">' + defis[strDefi]['nbPoints'] + '</div><div>Je relève le défi !</div><div>' + btnSvg + '</div></div>';

        var htmlToAdd = '<h2 class="titre-defi">' + defis[strDefi]['titre'] + '</h2><br><div class="description-defi"><img src="' + defis[strDefi]['cheminImage'] + '">'+ defis[strDefi]['description'] + '</div><div class="description-defi">' + defis[strDefi]['descriptionSup'] + '</div><div class="container-accept-defi"><div class="row"><div class="col-3 nb-pts">' + defis[strDefi]['nbPoints'] + '</div><div class="col-6 btn-accept-defi"><div><i class="fas fa-child"></i><p>Je me lance</p></div></div><div class="col-3">' + btnSvg + '</div></div></div>';
        // <img id="myBtn" src="img/btn-defi-accept.png" alt="accepter le défi">
        $('.container-un-defi .row').html(htmlToAdd);
        afficheUnDefi(defis[strDefi]['titre']);
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
        afficheDefis(titreCategorie);
    });


    // ============================== popup défi ==============================
    // Get the modal
    var modal = document.getElementById('myModal');

    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal
    $('.container-un-defi .row').on('click', '.btn-accept-defi', function(){
        modal.style.display = "block";
    });

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    // =========================================================================



    // a voir : le swipe.... désactiver ?
    /*$( "#defis" ).on( "swipe", function retourArriere(){
         $('.container-categories').removeClass('container-categories-none');
    });*/

    $('#profil-tab').on('click', function (e) {
        e.preventDefault();
        $(this).tab('show');
    });



    // clic sur wishlist tab :  récupération données + affichage 'wishlist'
    $('#menuContainer li.nav-item').on('click', '#wishlist-tab', function (e) {
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

                var strDefi;
                var htmlToAdd = '<div class="row">';
                var couleurCategorie;

                strDefi = 'defi5';
                couleurCategorie = categories['categorie' + defis[strDefi]['idCategorie']]['couleur'];
                htmlToAdd += '<div class="col-6 btn-image-defi" style="background-color:' + couleurCategorie + ';"><img src="' + defis[strDefi]['cheminImage'] + '"><br>' + defis[strDefi]['titre'] + '</div>';
                strDefi = 'defi9';
                htmlToAdd += '<div class="col-6 btn-image-defi"><img src="' + defis[strDefi]['cheminImage'] + '"><br>' + defis[strDefi]['titre'] + '</div>';
                strDefi = 'defi10';
                htmlToAdd += '<div class="col-6 btn-image-defi"><img src="' + defis[strDefi]['cheminImage'] + '"><br>' + defis[strDefi]['titre'] + '</div>';
                strDefi = 'defi16';
                htmlToAdd += '<div class="col-6 btn-image-defi"><img src="' + defis[strDefi]['cheminImage'] + '"><br>' + defis[strDefi]['titre'] + '</div>';
                htmlToAdd += '</div>';
                $('#wishlist .container-defis-sauv').html(htmlToAdd);           
            });
        }
        else{
            var strDefi;
                var htmlToAdd = '<div class="row">';
                var couleurCategorie;

                strDefi = 'defi5';
                couleurCategorie = categories['categorie' + defis[strDefi]['idCategorie']]['couleur'];
                htmlToAdd += '<div class="col-6 btn-image-defi" style="background-color:' + couleurCategorie + ';"><img src="' + defis[strDefi]['cheminImage'] + '"><br>' + defis[strDefi]['titre'] + '</div>';
                strDefi = 'defi9';
                htmlToAdd += '<div class="col-6 btn-image-defi"><img src="' + defis[strDefi]['cheminImage'] + '"><br>' + defis[strDefi]['titre'] + '</div>';
                strDefi = 'defi10';
                htmlToAdd += '<div class="col-6 btn-image-defi"><img src="' + defis[strDefi]['cheminImage'] + '"><br>' + defis[strDefi]['titre'] + '</div>';
                strDefi = 'defi16';
                htmlToAdd += '<div class="col-6 btn-image-defi"><img src="' + defis[strDefi]['cheminImage'] + '"><br>' + defis[strDefi]['titre'] + '</div>';
                htmlToAdd += '</div>';
                $('#wishlist .container-defis-sauv').html(htmlToAdd);
        }
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



//barre de progression// 

// var maxprogress = 250;   // total à atteindre
// var actualprogress = 0;  // valeur courante
// var itv = 0;  // id pour setinterval
// function prog()
// {
//   if(actualprogress >= maxprogress) 
//   {
//     clearInterval(itv);   	
//     return;
//   }	
//   var progressnum = document.getElementById("progressnum");
//   var indicator = document.getElementById("indicator");
//   actualprogress += 1;	
//   indicator.style.width=actualprogress + "px";
//   progressnum.innerHTML = actualprogress;
//   if(actualprogress == maxprogress) clearInterval(itv);   
// }