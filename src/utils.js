import request from 'request';
import chalk from 'chalk';

const recur = function recur (url, name){ 
    request({ url: url, json: true }, (error, response) => {
        if(response.body.error){console.log(chalk.red(`What you are searching doesnt exist.`))}
        else{
            response.body.results.forEach( (loc, i) => {
                console.log(`   ${i}: ${loc.name}`);
                if(name){console.log(chalk.yellow(`       ID: ${loc.id}`));}
            }) 
        if(response.body.info.next !== ""){
            if(name){recur(response.body.info.next,name);}
                else{recur(response.body.info.next);}
            }
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
    if(!argv.status && !argv.napage && argv.search){
        let URL = `https://rickandmortyapi.com/api/character/?name=${argv.search}`;
        recur(URL,argv.search);
    }
}

const view = function view(argv){
        let URL = `https://rickandmortyapi.com/api/character/${argv.id}`;
        request({ url: URL, json: true }, (error, response) => {
            console.log(`${chalk.yellow(`Name: `)}${response.body.name}\n${chalk.yellow(`Status: `)}${response.body.status}\n${chalk.yellow(`Specie: `)}${response.body.species}\n${chalk.yellow(`Origin: `)}${response.body.origin.name}`);
        });
    }
    
export{list,view};