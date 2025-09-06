SELECT  DISTINCT 
    R.id AS id,
    R.idPersonajeEmisor AS idPersonajeEmisor,
    PE.nombre AS nombrePersonajeEmisor,
    R.idPersonajeReceptor AS idPersonajeReceptor,
    PR.nombre AS nombrePersonajeReceptor,
    R.idMovimiento AS idMovimiento,
    M.nombre AS nombreMovimiento,
    E.id AS idEscenario,
    E.nombre AS nombreEscenario,
    R.idPosicion AS idPosicion,
    POS.nombre AS nombrePosicion,
    R.rage AS rage,
    R.di AS di,
    R.porcentajeKO AS porcentajeKO
FROM registro R
INNER JOIN personaje PE ON R.idPersonajeEmisor = PE.id
INNER JOIN personaje PR ON R.idPersonajeReceptor = PR.id
INNER JOIN movimiento M ON R.idMovimiento = M.id
INNER JOIN escenario E ON R.idEscenario = E.id
INNER JOIN posicion POS ON R.idPosicion = POS.id
ORDER BY R.id;