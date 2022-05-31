module.exports = (sequelize, DataTypes) => {
    const Todo = sequelize.define(
        "Todo",
        {
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            status: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
                allowNull: false,
            },
            url: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        { tableName: "todos", underscored: true }
    );

    Todo.associate = models => {
        Todo.belongsTo(models.User, {
            foreignKey: {
                name: "userId",
                allowNull: false
            },
            onUpdate: "RESTRICT",
            onDelete: "RESTRICT",
        })
    }

    return Todo;
};
