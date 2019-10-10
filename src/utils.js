import request from 'request';

const recur = function realive (url, name){ 
    request({ url: url, json: true }, (error, response) => {
            response.body.results.forEach( (loc, i) => {
                console.log(`   ${i}: ${loc.name}`);
                if(name){
                console.log(`       ID: ${loc.id}`);
                }

            }) 
            if(response.body.info.next !== ""){
                realive(response.body.info.next);
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
        }
        else{
            let URL = `${baseURL}?page=${argv.npage}`; 
            request({ url: URL, json: true }, (error, response) => {
                response.body.results.forEach( (loc, i) => {
                    console.log(`   ${i}: ${loc.name}`);
                })
            });
        }
    }
    if(!argv.search && !argv.npage){
            let URL = `https://rickandmortyapi.com/api/character/?status=${argv.status}`;
            recur(URL);
    }
    if(argv.search){
        let URL = `https://rickandmortyapi.com/api/character/?name=${argv.search}`;
        recur(URL);
    }
}

const view = function view(){
    if(!argv.id){
        let URL = `https://rickandmortyapi.com/api/character/?name=${argv.name}`;
        recur(URL,argv.name);
    }
    else{
        let URL = `https://rickandmortyapi.com/api/character/${argv.id}`;
        request({ url: URL, json: true }, (error, response) => {
            console.log(`Name: ${response.build.results.name}`);
            console.log(`Name: ${response.build.results.status}`);
            console.log(`Name: ${response.build.results.species}`);
            console.log(`Name: ${response.build.results.gender}`);


    });
        
    }
    

}
export{list};