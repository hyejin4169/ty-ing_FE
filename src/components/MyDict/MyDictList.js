import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { actionCreators as wordActions } from '../../redux/modules/word';
import MyDict from './MyDict';
import { MyPageTitleWord } from '../../pages/MyPage/style';
import styled from 'styled-components';

const MyDictList = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(wordActions.loadDictDB());
  }, []);

  const saveDict = useSelector((state) => state.word.dict_list2);

  return (
    <React.Fragment>
      <MyPageTitleWord>
        <h3>최근에 저장한 단어</h3>
        <div onClick={() => history.push('/mypage/all')}>
          전체 보기
          <svg
            width='11'
            height='16'
            viewBox='0 0 11 16'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M2 2L8 8L2 14'
              stroke='#878889'
              strokeWidth='2'
              strokeLinecap='round'
            />
          </svg>
        </div>
      </MyPageTitleWord>
      <div>
        <BoxSaveWord>
          <Title>최근에 저장한 단어</Title>
          <SeeAll onClick={() => history.push('/mypage/all')}>
            전체 보기 &gt;
          </SeeAll>
        </BoxSaveWord>
        <MyDict saveDict={saveDict} />
      </div>
    </React.Fragment>
  );
};

const BoxSaveWord = styled.div`
  display: flex;
  margin-left: 70px;
`;

const Title = styled.p`
  font-family: noto-sans;
  font-weight: bold;
  font-size: 32px;
  margin-left: 20px;
`;

const SeeAll = styled.p`
  font-family: Montserrat;
  font-weight: medium;
  font-size: 22px;
  margin-left: 10px;
  margin-top: auto;
  margin-bottom: auto;
  cursor: pointer;
`;

export default MyDictList;
