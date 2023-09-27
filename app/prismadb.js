const { PrismaClient } = require("@prisma/client");

global.prisma = global.prisma || new PrismaClient();
if(process.env.NODE_ENV !== "production"){
    global.prisma.$on('query', (e)=>{
        console.log(`Prisma Query:${e.query}`);
    });
}

module.exports = global.prisma