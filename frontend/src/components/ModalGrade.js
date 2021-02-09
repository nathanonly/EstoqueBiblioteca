import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
//react modal cria layout que abre outra tela quando clica, por exemplo
//exemplo edit, abre uma tela para editar
Modal.setAppElement('#root');

export default function ModalGrade({ onSave, onClose, selectedGrade }) {
  const { id, student } = selectedGrade;

  const [gradeBook, setGradeBook] = useState(selectedGrade.student);
  const [gradeAutor, setGradeAutor] = useState(selectedGrade.subject);
  const [gradeEditora, setGradeEditora] = useState(selectedGrade.type);
  const [gradeValue, setGradeValue] = useState(selectedGrade.value);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      onClose(null);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    //evita recarregar a página ao apertar enter

    const formData = {
      id,
      book: gradeBook,
      autor: gradeAutor,
      editora: gradeEditora,
      newValue: gradeValue,
    };
    onSave(formData);
  };
  const handleClose = () => {
    onClose(null);
  };
  const handleGradeChange = (event) => {
    if (event.target.id === 'inputName') {
      setGradeBook(event.target.value);
      // console.log('name');
    }
    if (event.target.id === 'inputSubject') {
      //  console.log('book');
      setGradeAutor(event.target.value);
    }
    if (event.target.id === 'inputType') {
      //  console.log('editora');
      setGradeEditora(event.target.value);
    }
    if (event.target.id === 'inputGrade') {
      //  console.log('genero');
      setGradeValue(event.target.value);
    }
  };
  return (
    //form monitora o enter por padrão, quando aperta enter chama onsubmit
    <div>
      <Modal isOpen={true}>
        <div style={styles.flexRow}>
          <span style={styles.title}>{student}</span>
          <button
            className="waves-effect waves-lights btn red"
            onClick={handleClose}
          >
            X
          </button>
        </div>

        <form onSubmit={handleFormSubmit}>
          <div className="input-field">
            <input
              id="inputName"
              type="text"
              value={gradeBook}
              onChange={handleGradeChange}
            />
            <label className="active" htmlFor="inputName">
              Nome do livro:
            </label>
          </div>
          <div className="input-field">
            <input
              id="inputSubject"
              type="text"
              value={gradeAutor}
              onChange={handleGradeChange}
            />
            <label className="active" htmlFor="inputSubject">
              Nome do autor:
            </label>
          </div>
          <div className="input-field">
            <input
              id="inputType"
              type="text"
              value={gradeEditora}
              onChange={handleGradeChange}
            />
            <label className="active" htmlFor="inputType">
              Editora:
            </label>
          </div>
          <div className="input-field">
            <input
              id="inputGrade"
              type="text"
              value={gradeValue}
              onChange={handleGradeChange}
            />
            <label className="active" htmlFor="inputGrade">
              Gênero:
            </label>
          </div>
          <div style={styles.flexRow}>
            <button className="waves-effect waves-light btn">Salvar</button>
          </div>
        </form>
      </Modal>
    </div>
  );
  //colocar label em input é padrão do materialize
}

const styles = {
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBotton: '40px',
  },
  title: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
  },
};
