import sequelize from "./connection";
import Users from "../models/user";
import Posts from "../models/post";


(async() => {
    await Posts.drop();
    await Users.drop();

    await Users.sync();
    await Posts.sync();

    sequelize.close();
})();