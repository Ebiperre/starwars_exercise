
const Table = ({name, gender, height}) => {
  return (
    <tr>
        <td>{name}</td>
        <td>{gender}</td>
        <td>{height}cm</td>
    </tr>
  )
}

export default Table