import React from 'react';
import Action from './Action';

export default function GradesControl({
  grades,
  onDelete,
  onPersist,
  onTestei,
}) {
  const tableGrades = [];

  let currentStudent = grades[0].student;
  let currentSubject = grades[0].subject;
  let currentGrades = [];
  let id = 1;

  grades.forEach((grade) => {
    if (grade.subject !== currentSubject) {
      tableGrades.push({
        id: id++,
        student: currentStudent,
        subject: currentSubject,
        grades: currentGrades,
      });
      currentSubject = grade.subject;
      currentGrades = [];
    }

    if (grade.student !== currentStudent) {
      currentStudent = grade.student;
    }
    currentGrades.push(grade);
  });

  //após o loop, adiciona último elemento
  tableGrades.push({
    id: id++,
    student: currentStudent,
    subject: currentSubject,
    grades: currentGrades,
  });
  console.log(tableGrades);

  const handleActionClick = (id, type) => {
    const grade = grades.find((grade) => grade.id === id);
    if (type === 'delete') {
      onDelete(grade);
      return;
    }
    if (type === 'add') {
      const lastGrade = grades.find((grade) => grade.id === grades.length);
      onTestei(lastGrade);
      return;
    }
    // ou colocava dentro do else

    onPersist(grade);
  };
  const handleclickname = (event) => {
    const bla = event.target;
    console.log(bla);
    onPersist(bla);
    // const grade = grades.find((grade) => grade.id === id);
    // if (type === 'delete') {
    //   onDelete(grade);
    //   return;
    //
    // // ou colocava dentro do else

    // onPersist(grade);
  };

  return (
    <div className="container center">
      <table style={styles.table} className="striped" key={id}>
        <thead>
          <tr>
            <th style={{ width: '30%' }}>Livro</th>
            <th style={{ width: '20%' }}>Autor</th>
            <th style={{ width: '20%' }}>Editora</th>
            <th style={{ width: '20%' }}>Gênero Literário</th>
            <th style={{ width: '20%' }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {grades.map(({ id, subject, student, type, value, isDeleted }) => {
            return (
              <tr key={id}>
                <td>
                  <button className="btn" onClick={handleclickname}>
                    {student}
                  </button>
                </td>
                <td>
                  <button className="btn">{subject}</button>
                </td>
                <td>
                  <button className="btn">{type}</button>
                </td>
                <td>
                  <button className="btn">{isDeleted ? '-' : value}</button>
                </td>
                <td>
                  <div>
                    <Action
                      onActionClick={handleActionClick}
                      id={id}
                      type={'edit'}
                    />
                    {!isDeleted && (
                      <Action
                        onActionClick={handleActionClick}
                        id={id}
                        type="delete"
                      />
                    )}
                  </div>
                  <Action
                    onActionClick={handleActionClick}
                    id={id}
                    type={'add'}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td style={{ textAlign: 'right' }}>
              <strong>Quantidade de itens</strong>
            </td>
            <td>
              <span>{grades.length}</span>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
  //grades.map, mapeando pois as linhas repetem
}

const styles = {
  goodGrade: {
    fontWeight: 'bold',
    color: 'green',
  },
  badGrade: {
    fontWeight: 'bold',
    color: 'red',
  },
  table: {
    margin: '20px',
    padding: '10px',
  },
};
