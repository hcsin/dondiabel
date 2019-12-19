/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/**
 * Author:  aggut
 * Created: Dec 18, 2019
 */

INSERT INTO `demodrop_database`.`user` (`id`, `email`, `password`, `role`, `username`) 
VALUES ('1', 'admin01@dd.nl', '$2y$12$qYSszhFjZYpdxxxOTx95Q.qcTzSKVlL7zC5NuRT5QuMkvXR6F1/Oa', 'ROLE_ADMIN', 'admin');
/*password = admin*/

INSERT INTO `demodrop_database`.`user` (`id`, `email`, `password`, `role`, `username`) 
VALUES ('2', 'user01@dd.nl', '$2y$12$Mu9E0gDEjiftcr9v2BJdBeUnYaMRVqPj9TiI2xu64W4ZnSAJSGZ7K', 'ROLE_USER', 'user');
/*password = user*/
