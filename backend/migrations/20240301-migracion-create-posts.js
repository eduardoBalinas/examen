'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Crea la tabla "Posts"
    await queryInterface.createTable('Posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      autor: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      contenido: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users', // Nombre de la tabla de referencia (puede variar)
          key: 'id', // Nombre de la columna de referencia (puede variar)
        },
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    // Añade una clave foránea para la relación con la tabla "Users"
    await queryInterface.addConstraint('Posts', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'fk_userId',
      references: {
        table: 'Users', // Nombre de la tabla de referencia (puede variar)
        field: 'id', // Nombre de la columna de referencia (puede variar)
      },
      onDelete: 'cascade', // Elimina automáticamente las entradas relacionadas al eliminar un usuario
      onUpdate: 'cascade', // Actualiza automáticamente las entradas relacionadas al actualizar un usuario
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Elimina la tabla "Posts"
    await queryInterface.dropTable('Posts');
  },
};
