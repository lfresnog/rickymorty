import yargs from 'yargs';
import {list,view} from './utils';

yargs.command({
    command:'list',
    describe:'Show names of characters of different categories',
    builder:{
        search:{
            describe:'name of character',
            demandOption:false,
            type:'string',
        },
        status: {
            describe: 'alive or dead',
            demandOption: false,
            type: 'string',
          },
          npage: {
            describe: 'page',
            demandOption: false,
            type: 'number',
          },
    },
    handler: list,
})

yargs.command({
    command:'view',
    describe:'Data of a particular character',
    builder:{
        id:{
                describe:'id',
                demandOption:true,
                type:'number',
            },
    },
    handler: view,
})

yargs.parse();