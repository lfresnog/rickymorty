import request from 'request';

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
    if(argv.search==null){
        if(argv.search==="alive"){
            let URL = `https://rickandmortyapi.com/api/character/?name=rick&status=alive`
            request({ url: URL, json: true }, (error, response) => {
                while(response.body.info.next!==""){
                    response.body.results.forEach( (loc, i) => {
                        console.log(`   ${i}: ${loc.name}`);
                    })
                }
            });
        }
    }
}

export{list};