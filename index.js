
var transMgr = require('./lib/transaction.manger');
var transPool = require('./lib/transaction.pool');

var poolManger = require('./lib/pool.manger');
var reportPools={};
var transactionPools={};
var poolsList={};


async function initializePools(){
  return new Promise(function(resolve,reject) {
    poolsList=poolManger.initializePools();
    resolve(poolsList);
    });
}

async function initializePoolsList(poolList){
  return new Promise(function(resolve,reject) {
    poolsList=poolManger.initializePoolsList(poolList);
    resolve(poolsList);
    });
}

async function initializeTransactionPool(accountList){
  return new Promise(function(resolve,reject) {
  transactionPools=transPool.initializeTransactionPool(accountList,applicationConfig);
  resolve(transactionPools);
  });
 }

  function getTransPoolConnect(pool,callback){
  transMgr.getPoolConnect(pool,callback);
  }

function executeTransSql(connection,sql , params ,formmat,callback){
  transMgr.executeSql(connection,sql , params ,formmat,callback);
}
function doTransCommit(connection) {
  transMgr.doCommit(connection);
}
function doTransRollBack(connection) {
  transMgr.doRollBack(connection);
}
function doTransRelease(connection) {
transMgr.doRelease(connection);
}



module.exports.initializeTransactionPool = initializeTransactionPool;

module.exports.initializePools = initializePools;
module.exports.initializePoolsList = initializePoolsList;
module.exports.poolsList = poolsList;
module.exports.transactionPools = transactionPools;
module.exports.getTransPoolConnect = getTransPoolConnect;
module.exports.executeTransSql = executeTransSql;
module.exports.doTransCommit = doTransCommit;
module.exports.doTransRollBack = doTransRollBack;
module.exports.doTransRelease = doTransRelease;
// warehouse methods




