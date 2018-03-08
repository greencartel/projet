<?php
require_once('libs/global.php');
if (is_ajax()) {
      if (isset($_POST["action"]) && !empty($_POST["action"])) { //Checks if action value exists
          $action = $_POST["action"];
          switch($action) { // Switch case for value of action
              case "defis":
                get_defis();
                break;
              case "categories":
                get_categories();
                break;
          }
      }
  }

  // Function to check if the request is an AJAX request
  function is_ajax() {
    return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
}

function get_defis(){
    // récupère tous les défis + toutes les catégories
    $return = $_POST;
    $defis = find('SELECT * FROM defis');
    $nbDefis = count($defis);

    if($nbDefis == 0){
        $result['defis'] = 0;
    }else{
      // 1 on récupère tous les défis
      $i = 0;
      $result = array();
      foreach($defis as $defi){
          
          $result["defi".$i]['id'] = $defi['id'];
          $result["defi".$i]['titre'] = $defi['titre'];
          $result["defi".$i]['nbPoints'] = $defi['nbPoints'];
          $result["defi".$i]['description'] = $defi['description'];
          $result["defi".$i]['descriptionSup'] = $defi['descriptionSup'];
          $result["defi".$i]['cheminImage'] = $defi['cheminImage'];
          $result["defi".$i]['niveau'] = $defi['niveau'];
          $result["defi".$i]['idCategorie'] = $defi['idCategorie'];
          $result["defi".$i]['idSponsor'] = $defi['idSponsor'];
          $i++;
      }
    }
    $result['json'] = json_encode($result);
    echo json_encode($result);
}

function get_categories(){
  // récupère tous les défis + toutes les catégories
  $return = $_POST;
  $categories = find('SELECT * FROM categories');
  $nbCategories = count($categories);

  if($nbCategories == 0){
      $result['categories'] = 0;
  }else{
    // 1 on récupère tous les défis
    $i = 0;
    $result = array();
    if($nbCategories != 0){
      // on récupère nos catégories
      $i = 0;
      foreach($categories as $categorie){
        $result["categorie".$i]['id'] = $categorie['id'];
        $result["categorie".$i]['nom'] = $categorie['nom'];
        $result["categorie".$i]['cheminIcone'] = $categorie['cheminIcone'];
        $result["categorie".$i]['couleur'] = $categorie['couleur'];
        $i++;
      }
    }
  }
  $result['json'] = json_encode($result);
  echo json_encode($result);
}
?>

