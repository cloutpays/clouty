import styled from 'styled-components';

export const OuterContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #232323;
  border-radius: 7px;
  padding: 60px;
  @media (max-width: 768px) {
    background: transparent;
    padding: 25px;
  }
  padding-bottom: 120px;
`;
