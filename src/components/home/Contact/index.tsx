import React, { FC, HTMLAttributes } from 'react'
import { css, styled } from 'stitches.config'
import { Formik } from 'formik'
import useTranslation from 'next-translate/useTranslation'
import { useMutation } from 'react-query'
import { contact } from '@utils/api/contact'
import { Spinner } from '@components/Spinner'
import { ErrorMessage } from '@components/common/ErrorMessage'

export type ContactProps = HTMLAttributes<HTMLImageElement> & {
  component: any
}

export const Contact: FC<ContactProps> = ({
  component
}: ContactProps) => {
  const { t } = useTranslation('contacts')
  const {
    mutate,
    isLoading,
    isError,
    isSuccess,
    reset: resetMutation
  } = useMutation(contact)

  const inputs = [
    {
      type: 'name',
      name: 'name',
      placeholder: t('name')
    },
    {
      type: 'phone',
      name: 'phone',
      placeholder: t('phone')
    },
    {
      type: 'email',
      name: 'email',
      placeholder: t('email')
    },
    {
      name: 'message',
      placeholder: t('message'),
      component: Message,
      as: 'textarea'
    }
  ]

  return (
    <Outer>
      {component}
      <Wrapper>
        <Title>{t('heading')}</Title>
        <Formik
          initialValues={{
            name: '',
            phone: '',
            email: '',
            message: ''
          }}
          validateOnChange={false}
          validateOnBlur={false}
          validate={(values) => {
            const errors = {}

            if (!values.name) {
              errors['name'] = 'required'
            }

            if (!values.message) {
              errors['message'] = 'required'
            }

            if (
              !/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/i.test(
                values.phone
              )
            ) {
              errors['phone'] = 'invalid'
            }

            if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
                values.email
              )
            ) {
              errors['email'] = 'invalid'
            }

            return errors
          }}
          onSubmit={(values, { validateForm }) => {
            validateForm(values)
            mutate(values)
          }}
        >
          {({
            values,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
            setErrors,
            resetForm
          }) => (
            <FormWrapper>
              <SuccessMessage visible={isSuccess}>
                <SuccessText>{t('success')}</SuccessText>
                <Submit
                  css={{ mt: 70, '@lg': { mb: 50 } }}
                  type="button"
                  onClick={() => {
                    resetMutation()
                    resetForm()
                  }}
                >
                  {t('send_again')}
                </Submit>
              </SuccessMessage>

              <Form onSubmit={handleSubmit}>
                <div className={formWrapper()}>
                  {inputs.map(
                    ({ name, component = Input, ...props }) => {
                      const InputComponent: any = component

                      return (
                        <InputWrapper key={name}>
                          <InputComponent
                            {...props}
                            name={name}
                            onChange={(e) => {
                              handleChange(e)
                              setErrors({ ...errors, [name]: null })
                              resetMutation()
                            }}
                            onBlur={handleBlur}
                            invalid={!!errors[name]}
                            value={values[name]}
                          />
                        </InputWrapper>
                      )
                    }
                  )}
                  <ErrorMessage
                    css={{ pb: 25 }}
                    isVisible={isError}
                    text={t('error')}
                  />
                  <Submit type="submit">
                    {isLoading && (
                      <Spinner css={{ m: '0 13px -4px 0' }} />
                    )}
                    {t('send')}
                  </Submit>
                </div>
              </Form>
            </FormWrapper>
          )}
        </Formik>
      </Wrapper>
    </Outer>
  )
}

const SuccessMessage = styled('div', {
  height: '100%',
  background: '$background',
  position: 'absolute',
  zIndex: 1,

  variants: {
    visible: {
      true: {
        opacity: 1,
        visibility: 'visible',
        transition: '150ms opacity ease'
      },
      false: {
        opacity: 0,
        visibility: 'hidden',
        transition: '150ms opacity ease, 0ms visibility linear 150ms'
      }
    }
  }
})

const SuccessText = styled('div', {
  color: '$accent',
  fontSize: 32,
  mt: -30,

  '@md': {
    fontSize: 42,
    mt: -50
  }
})

const FormWrapper = styled('div', {
  position: 'relative'
})

const Form = styled('form', {})

const Outer = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  '@lg': {
    flexDirection: 'row',
    mb: -101
  }
})

const Wrapper = styled('div', {
  paddingLeft: 38,
  position: 'relative',

  '@md': {
    paddingLeft: 150,
    paddingRight: 59
  },

  '@lg': {
    width: '50%',
    paddingLeft: 'calc(((100vw - 1392px) / 2) + (1392px / 10) - 25px)'
  }
})

const Title = styled('div', {
  height: 72,
  width: 266,
  display: 'inline-block',
  background: '$background',
  fontSize: 24,
  margin: '56px 0',
  ml: -16,
  mt: 200,
  px: 16,
  lineHeight: '36px',
  color: '$accent',

  '&:before': {
    content: '',
    position: 'absolute',
    width: '100vw',
    height: '1px',
    background: '$border',
    top: 73,
    left: 0,
    zIndex: -1
  },

  '@md': {
    width: 'unset',
    ml: -24,

    px: 24,
    fontSize: 26
  },

  '@lg': {
    mt: 256,

    '&:before': {
      top: 273
    }
  }
})

const InputWrapper = styled('div', {
  position: 'relative',

  '&:before': {
    content: '',
    width: '0',
    height: '1px',
    background: '$accent',
    position: 'absolute',
    bottom: '32px',
    transition: 'width 175ms ease'
  },

  '&:hover': {
    '&:before': {
      width: '100%'
    }
  }
})

const formWrapper = css({
  display: 'flex',
  flexDirection: 'column',

  '@lg': {
    pb: 128
  }
})

const FormInput = styled('input', {
  mb: 32,
  backgroundColor: 'transparent',
  width: '100%',
  border: 'none',
  borderBottom: '1px solid $nav',
  fontSize: 20,
  lineHeight: '36px',
  color: '$accent',
  transition: '175ms border-color ease, 150ms color ease',

  variants: {
    invalid: {
      true: {
        color: '$error',
        borderColor: '$error'
      }
    }
  },

  '&::placeholder': {
    color: '$accent',
    opacity: 1,
    transition: '150ms opacity ease'
  },

  '&:focus': {
    borderBottom: '1px solid $accent',

    '&::placeholder': {
      opacity: 0.5
    }
  }
})

const Input = styled(FormInput, {
  height: 52
})

const Message = styled(FormInput, {
  display: 'block',
  height: 200,
  resize: 'none'
})

const Submit = styled('button', {
  width: 'fit-content',
  height: 52,
  background: '$nav',
  borderRadius: 60,
  border: 'none',
  fontSize: 16,
  lineHeight: '32px',
  transition: 'transform 100ms',
  color: '$accent',
  cursor: 'pointer',
  padding: '0 40px',

  '&:hover': {
    transform: 'scale(1.03)'
  },

  '&:active': {
    transform: 'scale(0.97)'
  },

  '@md': {
    height: 48
  }
})
