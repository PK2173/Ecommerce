const knex = require("knex")({
    client: "mysql",
    connection: {
        host: "localhost",
        user: "root",
        password: "Praveen@123",
        database: "eccomerce"
    }
})

knex.schema.createTable("user",table=>{
    table.increments("id")
    table.string("name")
    table.string("email")
    table.string("password")
    table.string("role")
}).then((result) => {
    console.log("created Table");
}).catch((err)=>{
    // console.log(err.massage);
})

knex.schema.createTable("product",table=>{
    table.increments("id")
    table.integer('author_id').unsigned().notNullable();
    table.string("Product_name")
    table.string("Product_description")
    table.integer("prise")
    table.integer("quantity")
    table.foreign('author_id').references('user.id')
}).then((result) => {
    console.log("create_Product");
}).catch((err) => {
    // console.log(err.massage);
});

knex.schema.createTable("order",table=>{
    table.increments("id")
    table.integer("buyer_id").unsigned().notNullable();
    table.integer("product_id")
    table.string("product_name")
    table.foreign('buyer_id').references('user.id')
}).then((result)=>{
    console.log("create_order");
}).catch((err)=>{
    // console.log(err.massage);
})

module.exports = knex

