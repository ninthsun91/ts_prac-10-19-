import Users from "../models/user";
import Posts from "../models/post";

export default {
    associate: function() {
        Users.hasMany(Posts, {
            as: "Posts",
            foreignKey: "userId"
        });
        Posts.belongsTo(Users, {
            foreignKey: "userId"
        });
    }
}