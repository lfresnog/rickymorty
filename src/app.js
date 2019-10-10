import yargs from 'yargs';
import {list} from './utils';

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

// yargs.command({
//     command:'view',
//     describe:'Data of a particular character',
//     builder:{
//         name:{
//             describe:'specific name of character',
//             demandOption:true,
//             type:'string',
//         },
        //id:{
    //             describe:'id',
    //             demandOption:false,
    //             type:'number',
    //         },
//     },
//     handler: search,
// })

yargs.parse();