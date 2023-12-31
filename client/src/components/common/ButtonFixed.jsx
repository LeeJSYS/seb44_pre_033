import styled from 'styled-components';

export default function ButtonFix({ label, color, length, onClick }) {
  return (
    <>
      {color === 'Blue' ? (
        <BlueButtonFixed onClick={onClick} label={label} length={length}>
          {label}
        </BlueButtonFixed>
      ) : color === 'Red' ? (
        <RedButtonFixed onClick={onClick} label={label} length={length}>
          {label}
        </RedButtonFixed>
      ) : (
        <GrayButtonFixed onClick={onClick} label={label} length={length}>
          {label}
        </GrayButtonFixed>
      )}
    </>
  );
}

const ButtonFixed = styled.button`
  /* 버튼 기본 설정 */
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => props.length * 20}rem;
  height: 2.6rem;
  padding: 0.5rem;
  font-size: 1.1rem;
  border-radius: 4px;
`;

const BlueButtonFixed = styled(ButtonFixed)`
  /* 파란색 버튼 */
  background-color: var(--color-blue);
  color: white;
  border: 1px solid var(--color-blue);
  &:hover {
    background-color: #075ec3;
  }
  a {
    color: white;
  }
`;

const GrayButtonFixed = styled(ButtonFixed)`
  /* 회색 버튼 */
  background-color: #e1ecf4;
  color: #39739d;
  border: 1px solid #7aa7c7;
  &:hover {
    background-color: #0063bf;
  }
  a {
    color: #39739d;
  }
`;

const RedButtonFixed = styled(ButtonFixed)`
  /* 빨간색 버튼 */
  background-color: #ffffff;
  color: #ff0000;
  &:hover {
    background-color: #ffdcdc;
  }
  a {
    color: #ff0000;
  }
`;
