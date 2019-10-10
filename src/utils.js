import request from 'request';

const recur = function recur (url, name){ 
    request({ url: url, json: true }, (error, response) => {
            response.body.results.forEach( (loc, i) => {
                console.log(`   ${i}: ${loc.name}`);
                if(name){console.log(`       ID: ${loc.id}`);}
            }) 
            if(response.body.info.next !== ""){
                if(name){recur(response.body.info.next,name);}
                else{recur(response.body.info.next);}
            }  
    });
}

const list = function (argv){
    const baseURL = 'https://rickandmortyapi.com/api/character/';
    if(!argv.search && !argv.status){
        if(!argv.npage){
            request({ url: baseURL, json: true }, (error, response) => {
                response.body.results.forEach( (loc, i) => {
                    console.log(`   ${i}: ${loc.name}`);
                })
            });
        }else{
            let URL = `${baseURL}?page=${argv.npage}`; 
            request({ url: URL, json: true }, (error, response) => {
                response.body.results.forEach( (loc, i) => {
                    console.log(`   ${i}: ${loc.name}`);
                })
            });
        }
    }
    if(!argv.search && !argv.npage && argv.status){
            let URL = `https://rickandmortyapi.com/api/character/?status=${argv.status}`;
            recur(URL);
    }
    if(!argv.status && argv.napage && argv.search){
        let URL = `https://rickandmortyapi.com/api/character/?name=${argv.search}`;
        recur(URL,argv.search);
    }
}

const view = function view(argv){
        let URL = `https://rickandmortyapi.com/api/character/${argv.id}`;
        request({ url: URL, json: true }, (error, response) => {
            console.log(response.body.name);
            console.log(response.body.status);
            console.log(response.body.species);
            console.log(response.body.origin.name);   
        });
    }
    
export{list,view};