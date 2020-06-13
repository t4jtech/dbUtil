

var Pool = require('pg-pool');
var transactionPool={};




  
async function initializeTransactionPool(accountname,applicationConfig){
  reportMgr.ReportConfig.reportURL= applicationConfig.dbConfigUrl;
   reportMgr.ReportConfig.reportSchema=applicationConfig.dbConfigSchema;

    var query = {};
    query["status"]=1;
    if(accountname!=''){
      var inJson={};
      inJson["$in"]=accountname;
     query["accountname"]=inJson;
     }
    query["dbname"]=applicationConfig.transactionDB;
    query["dbtype"]=applicationConfig.transactionType;
    query["configType"]=applicationConfig.configType;
    query["environment"]=applicationConfig.environment;
    var client = await reportMgr.getClient(reportMgr.ReportConfig);
    var db = await reportMgr.getClientConnection(client,reportMgr.ReportConfig);
    var configList = await getDbConfigList(query,db);
    transactionPool= await createtransactionPool(configList,applicationConfig.transactionDB);
    reportMgr.doClose(client);
    
     return transactionPool;
    }
    

    function getDbConfigList(query,db){
    
      return new Promise(function(resolve,reject) {
       reportMgr.executeSql(db,"DBCONFIG",[],query,{} , function (error, configList) {
          if(error){  
            reject(error);
           }
          resolve(configList);
       });
      });
    }

    async function createtransactionPool(configList,dbname){
      for(var i=0;i<configList.length;i++){
        var config =configList[i];
        var poolAlias=config["poolAlias"];
         transactionPool[poolAlias] =  await createPostGresPool(config);
        return transactionPool;
      }

    }
     

      async function createPostGresPool(config){
        var poolAlias=config["poolAlias"];
       
        return new Promise(function(resolve,reject) {

          var pool = new Pool({
            database: config["database"],
            user: config["username"],
            password: config["password"],
            host:config["hostname"],
            port: 5432,
            max:  parseInt(config["poolMax"]), // set pool max size to 20
            min:  parseInt( config["poolMin"]) // set min pool size to 4
            
          })
          resolve(pool);
        
        });
      }
  

    module.exports.initializeTransactionPool = initializeTransactionPool;

    module.exports.transactionPool = transactionPool;