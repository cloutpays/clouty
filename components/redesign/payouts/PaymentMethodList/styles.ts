import styled from 'styled-components';

export const OuterContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  @media (max-width: 768px) {
    overflow-x: auto;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const Option = styled.a`
  width: 172px;
  height: 111px;
  background: #121111;
  border-radius: 9px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;
  flex: 0 0 auto;
  @media (max-width: 768px) {
    margin-right: 8px;
  }
`;

export const Text = styled.span`
  font-weight: bold;
  font-size: 18px;
  letter-spacing: 0.01em;
  text-align: center;
  flex: 1;
`;

export const Icon = styled.img.attrs((props: { icon: any }) => ({
  src: '/static/img/redesign/paymentOptions/' + props.icon + '.svg',
}))<React.HTMLProps<HTMLImageElement> & { icon: any }>`
  height: 24px;
`;

export const Checkmark = styled.img`
  height: 12px;
  width: 17px;
  position: absolute;
  left: 17px;
  top: 17px;
`;
