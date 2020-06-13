var Pool = require('pg-pool');

var poolsList={};

 



   
async function initializePoolsList(poolList){

 

  if(poolList!=null && poolList.length>0){
    for(var i=0;i<poolList.length;i++){
      var poolNme = poolList[i];
      
        poolsList[poolNme] =  await createPostGresPool();
        
    } }
   return poolsList;
}






  



  async function createPostGresPool(){
   
    return new Promise(function(resolve,reject) {

      var pool = new Pool({
        database:"postgres",
        user: "postgres",
        password:"acc2020",
        host:"3.7.227.232",
        port: 5432,
        max:  60, // set pool max size to 20
        min:  1 // set min pool size to 4
        
      })
      resolve(pool);
    
    });
  }


  




module.exports.initializePoolsList = initializePoolsList;