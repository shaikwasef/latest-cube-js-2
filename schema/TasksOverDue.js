cube(`TasksOverdue`, {
  sql: `SELECT * FROM \`RegHub\`.tasks`,
  joins: {
    tenants: {
      relationship: `belongsTo`,
      sql: `TRIM(CONVERT(${CUBE}.\`tenantid\`, CHAR)) = TRIM(CONVERT(${tenants}.tenantId, CHAR))`,
    },
    users: {
      relationship: `belongsTo`,
      sql: `TRIM(CONVERT(${CUBE}.\`owner\`, CHAR)) = TRIM(CONVERT(${users}._id, CHAR))`,
    },
  },
  measures: {
    count: {
      type: `count`,
      drillMembers: [tasks, _id],
    },
  },
  dimensions: {
    tasks: {
      sql: `${CUBE}.\`id\``,
      type: `string`,
      title: `Task`,
    },
    _id: {
      sql: `${CUBE}.\`_id\``,
      type: `string`,
      primaryKey: true,
    },
    dueDate: {
      type: `string`,
      case: {
        when: [
          {
            sql: `(YEAR(CURRENT_TIMESTAMP()) - YEAR(${CUBE}.\`dueDate\`)) > 1 `,
            label: `> 1 year`,
          },
          {
            sql: `(MONTH(CURRENT_TIMESTAMP()) - MONTH(${CUBE}.\`dueDate\`)) <= 12 AND (MONTH(CURRENT_TIMESTAMP()) - MONTH(${CUBE}.\`dueDate\`)) > 1`,
            label: `> 1 month`,
          },
          {
            sql: `(MONTH(CURRENT_TIMESTAMP()) - MONTH(${CUBE}.\`dueDate\`)) <= 1 AND (DAY(CURRENT_TIMESTAMP()) - DAY(${CUBE}.\`dueDate\`)) > 7`,
            label: `> 1 week`,
          },
          {
            sql: `(DAY(CURRENT_TIMESTAMP())- DAY(${CUBE}.\`dueDate\`)) <= 7`,
            label: `> 1 day`,
          },
        ],
      },
    },
  },
  dataSource: `default`,
});
