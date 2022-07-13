
-- Tabella quadri e utente admin

CREATE TABLE `quadri` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `source` mediumtext NOT NULL,
 `titolo` varchar(255) DEFAULT NULL,
 `label` varchar(11) DEFAULT NULL,
 `descrizione` varchar(255) DEFAULT NULL,
 PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4;

CREATE TABLE `utenti` (
 `username` varchar(64) NOT NULL,
 `psw` varchar(64) NOT NULL,
 UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `utenti` (`username`, `psw`) VALUES ('admin', 'admin');

INSERT INTO `quadri` (`id`, `source`, `titolo`, `label`, `descrizione`) VALUES (NULL, 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/352px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg', 'Gioconda', 'person', 'Leonardo Da Vinci')