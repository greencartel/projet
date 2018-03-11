// addToHomescreen();

$(document).ready(function() {
    var defis = []; // defis -- contient tous les défis sous forme d'un tableau à double entrée
    var categories = []; // categories -- contient toutes les catégories sous forme d'un tableau à double entrée

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

    // récupération des défis et des catégories -- lors du clic sur le tab défis
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

                // à partir de là, on a nos categories, on les affiche
                var i;
                var strCategorie;
                var couleurCategorie;
                var htmlToAdd = ""; // html a ajouter au container
                for (var strCategorie of Object.keys(categories)) {
                    couleurCategorie = categories[strCategorie]['couleur'];
                    htmlToAdd += '<div class="col-6 btn-image-categorie" style ="background-color:' + couleurCategorie + ';"><a class="btn" href="#"><img src="' + categories[strCategorie]['cheminIcone'] + '" id="' + strCategorie + '"><br>' + categories[strCategorie]['nom'] + '</a></div>';
                }

                $('.container-content-defi')[0].classList.add('container-categories');
                $('.container-categories .row').html(htmlToAdd); // on ajoute enfin ce html avec les div
                
            });
        }
        $(this).tab('show');
    });


    $('.container-content-defi .row').on('click', '.btn-image-categorie a img', function(){
        // on a cliqué sur une catégorie : on le sait car sélecteur '.btn-image-categorie a img'
        var idCategorie = $(this)[0].id; // idCategorie dont il faut afficher les défis !
        var htmlToAdd = ""; // html a ajouter
        var i;
        var strDefi;
        var strCategorie;
        // on itère sur les defis et on recupere ceux qui sont de cette categorie
        for (var strDefi of Object.keys(defis)) {
            strCategorie = 'categorie' + defis[strDefi]['idCategorie']; // dans defis, on a juste le n° de la categorie
            if(strCategorie == idCategorie){
                // le defi doit etre affiché
                htmlToAdd += '<div class="col-6 btn-image-defi"><img id="' + strDefi + '" src="' + defis[strDefi]['cheminImage'] + '"><br>' + defis[strDefi]['titre'] + '</div>';
            }
        }

        $('.container-content-defi')[0].classList.add('container-categories-none');
        $('.container-content-defi')[0].classList.remove('container-categories');
        $('.container-content-defi')[0].classList.add('container-defis');
        // alert($('.container-content-defi')[0].classList);
        alert(htmlToAdd);
        $('.container-defis .row').html(htmlToAdd); // on ajoute enfin ce html avec les div
        

        // !!!!!!!!!!! $('.container-content-defi').css('backgroungcolor=couleur Categorie')
    });

    $('#profil-tab').on('click', function (e) {
        e.preventDefault();
        $(this).tab('show');
    });


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


//FIL D'ACTUALITE - boutons 

// $(document).ready(() => {
//     const button = $(".btn");
  
//     button.click(() => {
//       if (button.text() == " ") {
//         button.html('<i class="far fa-heart"></i>');
//       } else {
//         button.html('<i class="fas fa-heart"></i>');
//       }
//     });
//   });


// $(document).on('click','#bouton_like',function(){
//     var $this=$(this);
   

// $(document).on('click','#hide_button',function(){
//     var $this=$(this);
//      $this.prop('id','show_button');
//     $this.val("Show");
// });

