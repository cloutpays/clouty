import styled from 'styled-components';

export const OuterContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #232323;
  @media (max-width: 768px) {
    background: transparent;
  }
  border-radius: 7px;
  padding: 60px;
`;
