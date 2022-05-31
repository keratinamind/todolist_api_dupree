module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
      'User',
      {
        username: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            isEmail: true
          }
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false
        }
      },
      {
        underscored: true
      }
    );
  
    User.associate = models => {
      User.hasMany(models.List, {
        foreignKey: {
          name: 'userId',
          allowNull: false
        },
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
      });
    };
  
    return User;
  };
  