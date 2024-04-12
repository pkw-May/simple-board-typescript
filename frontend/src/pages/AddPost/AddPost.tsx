import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon, Title, Button, InputBox, InputLine } from '../../components';
import { PAGE_CONFIGS, BUTTON_CONFIGS } from './DATA';
import styled from 'styled-components';

const AddPost: React.FC = () => {
  const navigate = useNavigate();
  const [inputData, setInputData] = useState({
    title: '',
    content: '',
  });

  const updateInput = (
    e:
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const key = e.target.name;
    const value = e.target.value;
    setInputData(prev => ({ ...prev, [key]: value }));
  };

  const goToList = () => {
    navigate('/main');
  };

  const submitPost = () => {
    console.log('Post Submitted');
  };

  return (
    <Wrapper>
      <TopBtnWrapper>
        <Icon
          icon="back"
          iconStyle={{ color: 'gray', size: '20' }}
          onClickHandler={goToList}
        />
      </TopBtnWrapper>

      <Title title={PAGE_CONFIGS.title} />
      <InputLine
        type={PAGE_CONFIGS.inputTitle.type}
        title={PAGE_CONFIGS.inputTitle.title}
        name={PAGE_CONFIGS.inputTitle.name}
        onChangeHandler={updateInput}
      />
      <InputBox
        type="post"
        onChangeHandler={updateInput}
        name={PAGE_CONFIGS.inputContent.name}
        title={PAGE_CONFIGS.inputContent.title}
      />
      <Button
        btnName={BUTTON_CONFIGS.btnName}
        btnStyle={BUTTON_CONFIGS.btnStyle}
        onClickHandler={submitPost}
      />
    </Wrapper>
  );
};

export default AddPost;

const Wrapper = styled.div`
  width: 300px;
  ${({ theme }) => theme.flex.center}
  flex-direction: column;
  margin: auto;
  gap: 20px;
`;

const TopBtnWrapper = styled.div`
  width: 100%;
  ${({ theme }) => theme.flex.left}

  margin-top: 20px;
  margin-bottom: -30px;
`;