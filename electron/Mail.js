const styles = {
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    borderSpacing: 1,
  },
  borderTable: {
    border: '1px solid #767676',
    paddingLeft: '8px',
  },
  containerDetails: {
    backgroundColor: '#f5f9fc',
    padding: '8px',
    width: '100%',
    borderRadius: '4px',
  },
};
export const ReportEmail = ({ User, Data }) => ({
  subject: 'Devolución de material',
  body: (
    <div style={{ paddingLeft: '8px' }}>
      <h3>Reporte de devolución de equipo</h3>

      <h4>Detalles de usuario</h4>
      <p style={styles.containerDetails}>
        <strong>{User.InstitutionalCode + ' '}</strong>
        {User.FirstName + ' ' + User.FatherLastname + ' ' + User.MotherLastname}
      </p>

      <div>
        <table style={styles.table}>
          <thead style={{ backgroundColor: '#f5f9fc' }}>
            <tr style={styles.borderTable}>
              <th scope="col" style={styles.borderTable}>
                #
              </th>
              <th scope="col" style={styles.borderTable}>
                Tipo de equipo
              </th>
              <th scope="col" style={styles.borderTable}>
                Descripción
              </th>
              <th scope="col" style={styles.borderTable}>
                Código
              </th>
              <th scope="col" style={styles.borderTable}>
                Estado del equipo
              </th>
              <th scope="col" style={styles.borderTable}>
                Fecha de devolución
              </th>
            </tr>
          </thead>
          <tbody>
            {Data.map((rows) => (
              <tr key={rows.Id}>
                <td scope="row" style={styles.borderTable}>
                  {rows.Id}
                </td>
                <td style={styles.borderTable}>{rows.EquipmentTypeName}</td>
                <td style={styles.borderTable}>{rows.Description}</td>
                <td style={styles.borderTable}>{rows.Code}</td>
                <td style={styles.borderTable}>
                  {rows.EquipmentQualityStatusName}
                </td>
                <td style={styles.borderTable}>
                  {new Date(rows.DateReturn).toLocaleDateString(undefined, {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h4>Observaciones</h4>
      <p style={styles.containerDetails}>{Data[0].Comentarios}</p>
    </div>
  ),
});
