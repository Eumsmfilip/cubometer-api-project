module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },

    gtin13: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },

    length: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },

    width: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },

    height: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },

    weight: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });

  return Product;
};
