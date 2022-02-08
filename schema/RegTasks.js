cube(`RegTasks`, {
  sql: `SELECT * FROM \`RegHub\`.tasks`,
  extends: users,

  joins: {},

  measures: {
    count: {
      type: `count`,
      drillMembers: [tasks, _id]
    }
  },

  dimensions: {
    tasks: {
      sql: `${CUBE}.\`id\``,
      type: `string`,
      title: `Task`
    },
    _id: {
      sql: `${CUBE}.\`_id\``,
      type: `string`,
      primaryKey: true
    }
  },

  dataSource: `default`
});
