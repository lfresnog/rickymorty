import request from 'request';

const recur = function realive (url){ 
    request({ url: URL, json: true }, (error, response) => {
            response.body.results.forEach( (loc, i) => {
                console.log(`   ${i}: ${loc.name}`);
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
            let URL = `https://rickandmortyapi.com/api/character/?status=${algv.status}`;
            recur(URL);
    }
    if(argv.search){
        let URL = `https://rickandmortyapi.com/api/character/?name=${argv.search}`;
        recur(URL);
    }
}

export{list};