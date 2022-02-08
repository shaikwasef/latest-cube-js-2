cube(`RegTasksByStatus`, {
  sql: `SELECT * FROM \`RegHub\`.reg_config_status_task`,
  joins: {
    RegMapStatus: {
      relationship: `belongsTo`,
      sql: `${CUBE.taskId} = ${RegMapStatus.status}`
    }
  },

  dimensions: {
    taskStatus: {
      sql: `${CUBE}.\`status.task.name\``,
      type: `string`,
      title: `Status`
    },
    taskId: {
      sql: `${CUBE}.\`status.task.id\``,
      type: `string`,
      primaryKey: true,
      shown: true
    }
  },
  dataSource: `default`
});
