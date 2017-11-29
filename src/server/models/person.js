module.exports = (sequelize, DataTypes) => {
    const Person = sequelize.define('Person', {
        id: {
            type: DataTypes.STRING(9),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        personId: {
            type: DataTypes.STRING(9),
            allowNull: false,
            field: 'person_id'
        },
        gender: {
            type: DataTypes.STRING(9),
            allowNull: false
        },
        age: {
           type: DataTypes.STRING(9),
           allowNull: false
        },
        glasses:{
            type: DataTypes.STRING(9),
            allowNull: true
        }
    },{
        tableName: 'fr_customers',
        timestamps: false,
        engine: 'InnoDB',
        charset: 'utf8'
    });
    Person.associate = (models) => {
        // Person.hasMany(models.TodoItem, {
        //     foreignKey: 'personId',
        //     as: 'todoItems'
        // });
    };
    return Person;
};
