<?php
require_once('libs/global.php');
if (is_ajax()) {
      if (isset($_POST["action"]) && !empty($_POST["action"])) { //Checks if action value exists
          $action = $_POST["action"];
          switch($action) { // Switch case for value of action
              case "defis": get_defis(); break;
          }
      }
  }

  // Function to check if the request is an AJAX request
  function is_ajax() {
    return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
}

function get_defis(){
    // renvoie tous les défis
    $return = $_POST;
    $defis = find('SELECT * FROM defis');
    $nb_defis = count($defis);

    if($nb_defis == 0){
        $return['defis'] = 0;
    }else{
        $i = 0;
        $result = array();
        foreach($defis as $defi){
            // on récupère tous les défis
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
?>

