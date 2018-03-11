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
          $idDefi = $defi['id'];
          $result["defi".$idDefi]['id'] = $idDefi;
          $result["defi".$idDefi]['titre'] = $defi['titre'];
          $result["defi".$idDefi]['nbPoints'] = $defi['nbPoints'];
          $result["defi".$idDefi]['description'] = $defi['description'];
          $result["defi".$idDefi]['descriptionSup'] = $defi['descriptionSup'];
          $result["defi".$idDefi]['cheminImage'] = $defi['cheminImage'];
          $result["defi".$idDefi]['niveau'] = $defi['niveau'];
          $result["defi".$idDefi]['idCategorie'] = $defi['idCategorie'];
          $result["defi".$idDefi]['idSponsor'] = $defi['idSponsor'];
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
        $idCategorie = $categorie['id'];
        $result["categorie".$idCategorie]['id'] = $idCategorie;
        $result["categorie".$idCategorie]['nom'] = $categorie['nom'];
        $result["categorie".$idCategorie]['cheminIcone'] = $categorie['cheminIcone'];
        $result["categorie".$idCategorie]['couleur'] = $categorie['couleur'];
        $i++;
      }
    }
  }
  $result['json'] = json_encode($result);
  echo json_encode($result);
}
?>

