import { Model, DataTypes, InferAttributes, InferCreationAttributes,
    CreationOptional, ForeignKey, NonAttribute } from 'sequelize'
import sequelize from '../config/connection';
import Users from './user';


class Posts extends Model<
    InferAttributes<Posts>, InferCreationAttributes<Posts>> {

    declare postId: CreationOptional<number>;
    declare userId: ForeignKey<number>;
    declare title: string;
    declare content: string;

    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
    
    declare user: NonAttribute<Users>;
}

Posts.init({
    postId: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'userId'
        },
        onDelete: 'cascade'
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
},{
    sequelize
});

export default Posts;