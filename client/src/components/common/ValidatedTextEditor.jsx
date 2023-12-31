import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { BsCheckLg } from 'react-icons/bs';
import ButtonFixed from '../common/ButtonFixed';
import Modal from '../detail/Modal';
import TextEditor from '../common/TextEditor';

export default function ValidatedTextEditor({ questionId, onLogin }) {
  const [body, setBody] = useState('');
  const [isBodyValid, setIsBodyValid] = useState(true);
  const [isbodyError, setIsBodyError] = useState(true);
  const [bodyLength, setBodyLength] = useState(0);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  const navigate = useNavigate();

  // const userId = localStorage.getItem('userId'); 로그인 시 저장한 유저의 아이디를 들고옵니다.
  // const token = localStorage.getItem('token');

  const handleBodyChange = (value) => {
    if (!onLogin) {
      alert('Please log in to post an answer.');
      navigate('/users/login');
    } else {
      setBody(value);
      setBodyLength(body.replace(/<[^>]*>/g, '').length);
    }
  };

  const handleConfirm = () => {
    axios
      .post(
        'http://localhost:3000/answers',
        {
          questionId: Number(questionId),
          userId: 1, //user.id
          content: body,
          createdAt: new Date().toLocaleString(), // 지우기
          modifiedAt: null, //지우기
          name: 'kimgcoding', // 지우기
          votes: 0, //지우기
        },
        {
          headers: {
            // Authorization: localStorage.getItem('token');
            // 'ngrok-skip-browser-warning': true, //ngrok 홈페이지 연결 막는 속성
          },
        }
      )
      .then((res) => {
        window.location.reload();
      })
      .catch((error) => {
        console.error(`Fail to post. Error Detail : ${error}`);
      });
    setIsPostModalOpen(false);
  };

  const handleCancel = () => {
    setIsPostModalOpen(false);
  };

  const handleSubmit = () => {
    if (isBodyValid) {
      setIsBodyError(true);
      setIsPostModalOpen(true);
    } else {
      setIsBodyError(false);
    }
  };

  useEffect(() => {
    if (bodyLength < 100) {
      setIsBodyValid(false);
    } else if (bodyLength >= 100) {
      setIsBodyValid(true);
      setIsBodyError(true);
    }
  }, [body]);

  return (
    <>
      <BodyContainer isbodyerror={isbodyError ? 1 : 0}>
        <div className="titleAndContent">
          <div className="title">Your Answer</div>
          <div className="content">
            The Answer contains details and results. Minimum 100 characters.
          </div>
        </div>
        <TextEditor
          classname="textEditor"
          value={body}
          onChange={handleBodyChange}
        />
        <div className="errMsgContainer">
          {!isBodyValid && (
            <div className="errormessage">
              <BsCheckLg />
              <div>
                The Answer must be at least 100 characters; you entered{' '}
                {bodyLength}.
              </div>
            </div>
          )}
        </div>
      </BodyContainer>
      <ButtonContainer>
        <ButtonFixed
          onClick={handleSubmit}
          color="Blue"
          label={<Link>Post Your Answer</Link>}
        ></ButtonFixed>
      </ButtonContainer>
      {isPostModalOpen && (
        <Modal
          meassage={'Are you sure you want to submit?'}
          confirmFunction={handleConfirm}
          closeFunction={handleCancel}
        />
      )}
    </>
  );
}

const BodyContainer = styled.div`
  height: 33rem;
  border: 1px solid var(--color-gray);
  border-radius: 5px;
  margin-top: 3rem;
  display: flex;
  flex-direction: column;

  .ql-editor {
    height: 18rem;
    border: 1px solid
      ${(props) => (props.isbodyerror ? 'var(--color-gray)' : 'red')};
  }
  .titleAndContent {
    padding: 1rem;
  }
  .title {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }

  .content {
    font-size: 18px;
  }
  .errMsgContainer {
    height: 100%;
    display: flex;
    align-items: center;
    padding:0.5rem;
    div {
      color: red;
    }
  }
  .errormessage {
    display: flex;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 1rem;
`;
