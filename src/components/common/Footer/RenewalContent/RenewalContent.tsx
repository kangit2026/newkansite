import React, { FC } from 'react'
import { InputEmail } from '../InputEmail/InputEmail'
import { styled } from 'stitches.config'
import { Diamond } from '@components/common/Diamond'
import { ErrorMessage } from '@components/common/ErrorMessage'
import useTranslation from 'next-translate/useTranslation'
import { useMutation } from 'react-query'
import { Formik } from 'formik'
import { subscribe } from '@utils/api/subscribe'
import { Spinner } from '@components/Spinner'

export const RenewalContent: FC = () => {
  const { t } = useTranslation('common')

  const {
    mutate,
    isLoading,
    isError,
    isSuccess,
    reset: resetMutation
  } = useMutation(subscribe)

  return (
    <Content>
      <ContainerLogo>
        <Diamond />
      </ContainerLogo>
      <TextContent>
        <TextRenewal>
          {isSuccess
            ? t('footer.subscribe_success')
            : `${t('footer.subscribe')}:`}
        </TextRenewal>
      </TextContent>
      <ContentEmail>
        <Formik
          initialValues={{
            email: ''
          }}
          validate={({ email }) => {
            const errors = {}

            if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)
            ) {
              errors['email'] = 'invalid'
            }

            return errors
          }}
          onSubmit={(values, { resetForm }) => {
            mutate(
              { ...values },
              {
                onSuccess: () => {
                  resetForm()
                }
              }
            )
          }}
        >
          {({
            values,
            errors,
            dirty,
            handleChange,
            handleBlur,
            handleSubmit
          }) => (
            <form onSubmit={handleSubmit}>
              <ErrorMessage
                css={{ p: 10, textAlign: 'center' }}
                isVisible={isError}
                text={t('footer.subscribe_error')}
              />
              <InputEmail
                name="email"
                value={values.email}
                onChange={(e) => {
                  handleChange(e)
                  resetMutation()
                }}
                onBlur={handleBlur}
                placeholder={t('footer.input')}
                disabled={isLoading}
                success={isSuccess}
              />
              {isSuccess ? (
                <SendButton
                  onClick={() => {
                    resetMutation()
                  }}
                  type="button"
                >
                  {t('footer.send_again')}
                </SendButton>
              ) : (
                <SendButton
                  visible={dirty}
                  disabled={!!errors.email || isLoading}
                  type="submit"
                >
                  {isLoading && (
                    <Spinner css={{ m: '0 13px -4px 0' }} />
                  )}
                  {t('footer.send')}
                </SendButton>
              )}
            </form>
          )}
        </Formik>
      </ContentEmail>
    </Content>
  )
}

const Content = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  background: '$ads',
  borderRadius: '8px',
  m: '31px -17px',
  pt: 64,

  '@md': {
    display: 'flex',
    width: 640,
    m: '67px 0',
    pt: 7
  },

  '@lg': {
    display: 'flex',
    width: 464,
    m: '30px 0px 0px'
  }
})

const ContainerLogo = styled('div', {
  mx: 'auto',

  [`& ${Diamond}`]: {
    width: 21,
    height: 21,
    ml: 1
  },

  '@md': {
    pt: 74,
    pl: 0
  }
})

const SendButton = styled('button', {
  padding: 0,
  background: 'transparent',
  border: 'none',
  color: '$accent',
  cursor: 'pointer',
  transition: '150ms opacity ease',
  height: 58,
  width: '100%',
  fontSize: 12,
  fontWeight: 400,
  br: '0 0 8px 8px',

  '&:disabled': {
    opacity: 0.5,
    cursor: 'not-allowed'
  },

  variants: {
    visible: {
      true: {
        opacity: 1,
        pointerEvents: 'unset'
      },
      false: {
        opacity: '0!important',
        pointerEvents: 'none'
      }
    }
  },

  '@md': {
    height: 72,
    fontSize: 16
  },

  '@lg': {
    height: 76
  }
})

const TextContent = styled('div', {
  width: 299,
  mt: 35,
  ml: 3,

  '@md': {
    width: 400
  }
})

const TextRenewal = styled('h3', {
  fontWeight: 400,
  fontSize: 32,
  lineHeight: '40px',
  textAlign: 'center',
  color: '$accent',

  '@md': {
    fontSize: 42,
    fontWeight: 350,
    lineHeight: '1.24em',
    maxWidth: 390,
    m: '6px auto 0'
  },

  '@lg': {
    fontSize: 42,
    fontWeight: 350,
    lineHeight: '52px',
    m: '7px 20px auto'
  }
})

const ContentEmail = styled('div', {
  width: '100%',
  mt: 40,

  '@md': {
    width: 640,
    mt: 59
  },

  '@lg': {
    width: 464,
    mt: 58
  }
})
