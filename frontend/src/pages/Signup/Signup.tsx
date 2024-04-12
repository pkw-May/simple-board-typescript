import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormValidation } from '../../hooks/useFormValidation';
import { useCheckEmail } from '../../hooks/useCheckEmail';
import { Icon, Title, InputLine, Button, WarningLine } from '../../components';
import {
  CHECK_BTN_CONFIG,
  INPUT_CONFIGS,
  PAGE_CONFIGS,
  SIGNUP_BTN_CONFIG,
} from './DATA';

import styled from 'styled-components';
import { AccountContext } from '../../ContextAPI/AccountContext';

type InputKey = 'userId' | 'password' | 'checkPassword';
type InputData = Record<
  InputKey,
  {
    checked?: boolean;
    value: string;
    valid: boolean;
    error: string;
  }
>;

const Signup = () => {
  const navigate = useNavigate();
  const { authenticate } = useContext(AccountContext);
  const { checkExist } = useCheckEmail();
  const { validateUserId, validatePassword } = useFormValidation();
  const [inputData, setInputData] = useState({
    userId: { value: '', valid: false, checked: false, error: '' },
    password: { value: '', valid: false, error: '' },
    checkPassword: { value: '', valid: false, error: '' },
  });
  const { title } = PAGE_CONFIGS;

  const updateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const key = e.target.name as InputKey;
    const value = e.target.value;

    setInputData(prev => ({
      ...prev,
      [key]: { ...prev[key], value: value },
    }));
  };

  const goBack = () => {
    navigate('/signin');
  };

  const checkId = () => {
    console.log('check id!');
    if (!inputData.userId.valid) {
      const { valid, error } = validateUserId(inputData.userId.value);
      setInputData(prev => ({
        ...prev,
        userId: {
          ...prev.userId,
          valid: valid,
          error: error,
        },
      }));
      if (valid) {
        const { valid, message } = checkExist(inputData.userId.value);
        setInputData(prev => ({
          ...prev,
          userId: {
            ...prev.userId,
            checked: valid,
            valid: valid,
            error: message,
          },
        }));
      }
    } else {
      const { valid, message } = checkExist(inputData.userId.value);
      setInputData(prev => ({
        ...prev,
        userId: {
          ...prev.userId,
          checked: valid,
          valid: valid,
          error: message,
        },
      }));
    }
  };

  const submitData = async (e: React.MouseEvent<HTMLButtonElement> | any) => {
    if (
      inputData.userId.valid &&
      inputData.userId.value &&
      inputData.password.valid &&
      inputData.password.value &&
      inputData.checkPassword.valid &&
      inputData.checkPassword.value
    ) {
      // ======================================//
      /** ✨✨✨--- REDUX & 에러 핸들링 ---✨✨✨ */

      // POST USER API CALL!!!!!!!

      const result = await authenticate('may@gmail.com', 'qwer1234!');
      if (result) {
        window.alert('회원가입 성공!!');
        navigate('/main');
      }
      // ======================================//
    } else {
      if (inputData.userId.valid && !inputData.userId.checked) {
        setInputData(prev => ({
          ...prev,
          userId: {
            ...prev.userId,
            valid: false,
            error: '아이디 중복을 확인해 주세요.',
          },
        }));
      }

      if (!inputData.userId.valid) {
        const { valid, error } = validateUserId(inputData.userId.value);
        setInputData(prev => ({
          ...prev,
          userId: {
            ...prev.userId,
            valid: valid,
            error: error,
          },
        }));
        if (!inputData.userId.checked) {
          window.alert('아이디 중복 확인을 진행합니다.');
          checkId();
        }
      }

      if (!inputData.password.valid) {
        const { valid, error } = validatePassword(inputData.password.value);
        setInputData(prev => ({
          ...prev,
          password: {
            ...prev.password,
            valid: valid,
            error: error,
          },
        }));
      }

      if (inputData.password.value !== inputData.checkPassword.value) {
        setInputData(prev => ({
          ...prev,
          checkPassword: {
            ...prev.checkPassword,
            valid: false,
            error: '비밀번호가 일치하지 않습니다.',
          },
        }));
      } else {
        setInputData(prev => ({
          ...prev,
          checkPassword: {
            ...prev.checkPassword,
            valid: true,
            error: '',
          },
        }));
      }
    }
  };

  useEffect(() => {
    setInputData(prev => ({
      ...prev,
      userId: {
        ...prev.userId,
        checked: false,
        valid: false,
        error: '',
      },
    }));
  }, [inputData.userId.value]);

  useEffect(() => {
    setInputData(prev => ({
      ...prev,
      password: {
        ...prev.password,
        valid: false,
        error: '',
      },
    }));
  }, [inputData.password.value]);

  useEffect(() => {
    setInputData(prev => ({
      ...prev,
      checkPassword: {
        ...prev.checkPassword,
        valid: false,
        error: '',
      },
    }));
  }, [inputData.checkPassword.value]);

  return (
    <Wrapper>
      <TopBtnWrapper>
        <Icon
          iconStyle={{ size: '20', color: 'gray' }}
          icon="back"
          onClickHandler={goBack}
        />
      </TopBtnWrapper>
      <Title title={title} />

      <CheckWrapper>
        <InputLine
          key={INPUT_CONFIGS[0].name}
          type={INPUT_CONFIGS[0].type}
          title={INPUT_CONFIGS[0].title}
          name={INPUT_CONFIGS[0].name}
          onChangeHandler={updateInput}
        />
        <Button
          btnName={CHECK_BTN_CONFIG.btnName}
          btnStyle={CHECK_BTN_CONFIG.btnStyle}
          onClickHandler={checkId}
        />
        {inputData[INPUT_CONFIGS[0].name as InputKey].error && (
          <WarningLine
            isInfo={inputData[INPUT_CONFIGS[0].name as InputKey].valid}
            warning={inputData[INPUT_CONFIGS[0].name as InputKey].error}
          />
        )}
      </CheckWrapper>

      {INPUT_CONFIGS.slice(1).map(({ type, title, name }) => {
        return (
          <InputWrapper key={name}>
            <InputLine
              type={type}
              title={title}
              name={name}
              onChangeHandler={updateInput}
            />
            {inputData[name as InputKey].error && (
              <WarningLine
                isInfo={inputData[name as InputKey].valid}
                warning={inputData[name as InputKey].error}
              />
            )}
          </InputWrapper>
        );
      })}

      <Button
        btnName={SIGNUP_BTN_CONFIG.btnName}
        btnStyle={SIGNUP_BTN_CONFIG.btnStyle}
        onClickHandler={submitData}
      />
    </Wrapper>
  );
};

export default Signup;

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
  margin-bottom: -20px;
`;

const InputWrapper = styled.div`
  width: 100%;
  ${({ theme }) => theme.flex.center}
  flex-direction: column;
`;

const CheckWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 2.5fr 1fr;
  gap: 6px;
  align-items: end;
`;