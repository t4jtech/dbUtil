
// Pool Creation....
function getPoolConnect(pool,callback){
  pool.connect().then(client =>{
   
    callback(null,client);
   }).catch(error => {
    
    callback(error);
    });
 
 }



//Execute Queries...
function executeSql(connection,sql , params ,formmat,callback){
  connection.query(sql, params).then(result => {
   callback(null,result);
  }).catch(error => {
    callback(error);
  });
 
}



function doCommit(connection) {
   connection.query('COMMIT');
}

function doRollBack(connection) {
  
   connection.query('ROLLBACK');

}

function doRelease(connection) {
   connection.release();
 }


module.exports.getPoolConnect = getPoolConnect;
module.exports.executeSql = executeSql;
module.exports.doCommit = doCommit;
module.exports.doRollBack = doRollBack;
module.exports.doRelease = doRelease;